"""
Flask API server for Cancer Prediction ML application
"""
import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pandas as pd
from datetime import datetime

from ml_engine.train import train_model
from ml_engine.predict import predict_single, predict_batch
from ml_engine.model_manager import (
    get_model_paths, 
    save_model_metadata, 
    get_model_status,
    check_model_exists
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = './uploads'
app.config['DATA_FOLDER'] = './data'
app.config['MODEL_FOLDER'] = './models'

# Allowed file extensions
ALLOWED_EXTENSIONS = {'csv'}

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['DATA_FOLDER'], exist_ok=True)
os.makedirs(app.config['MODEL_FOLDER'], exist_ok=True)


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_default_data_path(cancer_type):
    """Get path to default dataset for cancer type"""
    mapping = {
        'breast': 'Breast_Cancer.csv',
        'lung': 'lung_cancer.csv',
        'prostate': 'prostat_cancer.csv'
    }
    
    filename = mapping.get(cancer_type.lower())
    if filename:
        # Try backend/data first, then root directory
        backend_path = os.path.join(app.config['DATA_FOLDER'], filename)
        root_path = os.path.join('..', filename)
        
        if os.path.exists(backend_path):
            return backend_path
        elif os.path.exists(root_path):
            return root_path
        else:
            # Try root directory relative to backend
            alt_path = os.path.join('..', '..', filename)
            if os.path.exists(alt_path):
                return alt_path
    
    raise FileNotFoundError(f"Default dataset not found for {cancer_type}")


@app.route('/', methods=['GET'])
def root():
    """Root endpoint - API information"""
    return jsonify({
        'message': 'Cancer Prediction ML API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'health': '/api/health',
            'train': '/api/train/{cancer_type}',
            'predict': '/api/predict/{cancer_type}',
            'predict_batch': '/api/predict-batch/{cancer_type}',
            'upload_dataset': '/api/upload-dataset',
            'model_status': '/api/model-status/{cancer_type}'
        },
        'cancer_types': ['breast', 'lung', 'prostate']
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Cancer Prediction API is running'
    })


@app.route('/api/train/<cancer_type>', methods=['POST'])
def train_model_endpoint(cancer_type):
    """Train model for specified cancer type"""
    try:
        # Check if using default dataset or uploaded file
        use_default = request.form.get('useDefault', 'true').lower() == 'true'
        
        if use_default:
            data_path = get_default_data_path(cancer_type)
        else:
            # Check for uploaded file
            if 'file' not in request.files:
                return jsonify({
                    'error': 'No file provided for training'
                }), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({
                    'error': 'No file selected'
                }), 400
            
            if not allowed_file(file.filename):
                return jsonify({
                    'error': 'Only CSV files are allowed'
                }), 400
            
            # Save uploaded file
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{cancer_type}_{timestamp}_{filename}"
            data_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(data_path)
        
        # Get model paths
        paths = get_model_paths(cancer_type, app.config['MODEL_FOLDER'])
        
        # Train model
        metrics = train_model(
            cancer_type,
            data_path,
            paths['model'],
            paths['scaler']
        )
        
        # Save metadata
        save_model_metadata(cancer_type, metrics, app.config['MODEL_FOLDER'])
        
        return jsonify({
            'success': True,
            'message': f'Model trained successfully for {cancer_type} cancer',
            'metrics': metrics
        }), 200
        
    except FileNotFoundError as e:
        return jsonify({
            'error': str(e)
        }), 404
    except Exception as e:
        return jsonify({
            'error': f'Training failed: {str(e)}'
        }), 500


@app.route('/api/predict/<cancer_type>', methods=['POST'])
def predict_endpoint(cancer_type):
    """Make single prediction"""
    try:
        # Check if model exists
        if not check_model_exists(cancer_type, app.config['MODEL_FOLDER']):
            return jsonify({
                'error': f'Model not trained for {cancer_type} cancer. Please train the model first.'
            }), 404
        
        # Get form data
        form_data = request.get_json() if request.is_json else request.form.to_dict()
        
        if not form_data:
            return jsonify({
                'error': 'No input data provided'
            }), 400
        
        # Get model paths
        paths = get_model_paths(cancer_type, app.config['MODEL_FOLDER'])
        
        # Make prediction
        result = predict_single(
            cancer_type,
            form_data,
            paths['model'],
            paths['scaler']
        )
        
        # Load metadata for additional info
        from ml_engine.model_manager import load_model_metadata
        metadata = load_model_metadata(cancer_type, app.config['MODEL_FOLDER'])
        
        result['model_info'] = {
            'trained_at': metadata.get('trained_at'),
            'accuracy': metadata.get('metrics', {}).get('accuracy'),
            'model_type': result.get('model_type')
        }
        
        return jsonify({
            'success': True,
            'prediction': result
        }), 200
        
    except FileNotFoundError as e:
        return jsonify({
            'error': str(e)
        }), 404
    except Exception as e:
        return jsonify({
            'error': f'Prediction failed: {str(e)}'
        }), 500


@app.route('/api/predict-batch/<cancer_type>', methods=['POST'])
def predict_batch_endpoint(cancer_type):
    """Make batch predictions from CSV file"""
    try:
        # Check if model exists
        if not check_model_exists(cancer_type, app.config['MODEL_FOLDER']):
            return jsonify({
                'error': f'Model not trained for {cancer_type} cancer. Please train the model first.'
            }), 404
        
        # Check for uploaded file
        if 'file' not in request.files:
            return jsonify({
                'error': 'No CSV file provided'
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'error': 'Only CSV files are allowed'
            }), 400
        
        # Save uploaded file temporarily
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        temp_filename = f"batch_{timestamp}_{filename}"
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], temp_filename)
        file.save(temp_path)
        
        try:
            # Get model paths
            paths = get_model_paths(cancer_type, app.config['MODEL_FOLDER'])
            
            # Make batch predictions
            results_df = predict_batch(
                cancer_type,
                temp_path,
                paths['model'],
                paths['scaler']
            )
            
            # Save results to CSV
            output_filename = f"predictions_{timestamp}_{filename}"
            output_path = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
            results_df.to_csv(output_path, index=False)
            
            # Return CSV file
            return send_file(
                output_path,
                mimetype='text/csv',
                as_attachment=True,
                download_name=output_filename
            )
            
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
        
    except Exception as e:
        return jsonify({
            'error': f'Batch prediction failed: {str(e)}'
        }), 500


@app.route('/api/upload-dataset', methods=['POST'])
def upload_dataset():
    """Upload new dataset for training"""
    try:
        if 'file' not in request.files:
            return jsonify({
                'error': 'No file provided'
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'error': 'Only CSV files are allowed'
            }), 400
        
        cancer_type = request.form.get('cancerType', '').lower()
        if not cancer_type:
            return jsonify({
                'error': 'Cancer type must be specified'
            }), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{cancer_type}_{timestamp}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Try to read CSV to validate
        try:
            df = pd.read_csv(file_path)
            row_count = len(df)
            col_count = len(df.columns)
        except Exception as e:
            os.remove(file_path)
            return jsonify({
                'error': f'Invalid CSV file: {str(e)}'
            }), 400
        
        return jsonify({
            'success': True,
            'message': 'Dataset uploaded successfully',
            'file_path': filename,
            'rows': row_count,
            'columns': col_count
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': f'Upload failed: {str(e)}'
        }), 500


@app.route('/api/model-status/<cancer_type>', methods=['GET'])
def model_status_endpoint(cancer_type):
    """Get model training status and metrics"""
    try:
        status = get_model_status(cancer_type, app.config['MODEL_FOLDER'])
        return jsonify({
            'success': True,
            'status': status
        }), 200
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('FLASK_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

