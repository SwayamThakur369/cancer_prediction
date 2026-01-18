"""
Prediction utilities for cancer prediction models
"""
import pandas as pd
import numpy as np
import joblib
import os

from .preprocess import get_preprocessor


def load_model_and_scaler(cancer_type, model_path, scaler_path):
    """Load trained model and scaler"""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not os.path.exists(scaler_path):
        raise FileNotFoundError(f"Scaler file not found: {scaler_path}")
    
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    
    # Load feature names if available
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    feature_names = None
    if os.path.exists(feature_names_path):
        feature_names = joblib.load(feature_names_path)
    
    return model, scaler, feature_names


def predict_single(cancer_type, form_data, model_path, scaler_path):
    """
    Make single prediction from form data
    
    Args:
        cancer_type: Type of cancer (breast, lung, prostate)
        form_data: Dictionary of form inputs
        model_path: Path to saved model
        scaler_path: Path to saved scaler
    
    Returns:
        Dictionary with prediction, confidence, and metadata
    """
    # Load model and scaler
    model, scaler, feature_names = load_model_and_scaler(cancer_type, model_path, scaler_path)
    
    # Convert form data to DataFrame
    # Map form field names to feature names
    feature_mapping = get_feature_mapping(cancer_type, form_data, feature_names)
    
    # Create DataFrame with single row
    df = pd.DataFrame([feature_mapping])
    
    # Ensure columns match expected features
    if feature_names:
        # Reorder and add missing columns with 0
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0
        df = df[feature_names]
    
    # Scale features
    X_scaled = scaler.transform(df)
    
    # Predict
    prediction = model.predict(X_scaled)[0]
    probabilities = model.predict_proba(X_scaled)[0]
    confidence = float(max(probabilities)) * 100
    
    # Map prediction to human-readable format
    prediction_label = get_prediction_label(cancer_type, prediction)
    
    return {
        'prediction': prediction_label,
        'prediction_code': int(prediction),
        'confidence': round(confidence, 2),
        'probabilities': {str(i): float(p) for i, p in enumerate(probabilities)},
        'model_type': type(model).__name__,
        'features_used': len(df.columns)
    }


def get_feature_mapping(cancer_type, form_data, feature_names):
    """Map form data fields to model features"""
    mapping = {}
    
    if cancer_type.lower() == 'breast':
        # Map breast cancer form fields to CSV columns
        field_mapping = {
            'radiusMean': 'radius_mean',
            'textureMean': 'texture_mean',
            'perimeterMean': 'perimeter_mean',
            'areaMean': 'area_mean',
            'smoothnessMean': 'smoothness_mean',
            'compactnessMean': 'compactness_mean',
            'concavityMean': 'concavity_mean',
            'concavePointsMean': 'concave points_mean',
            'symmetryMean': 'symmetry_mean'
        }
        
        for form_field, csv_field in field_mapping.items():
            if form_field in form_data:
                mapping[csv_field] = float(form_data[form_field])
    
    elif cancer_type.lower() == 'lung':
        # Map lung cancer form fields
        # Note: This needs to match actual CSV structure
        for key, value in form_data.items():
            # Convert yes/no to 1/0
            if isinstance(value, str):
                if value.lower() in ['yes', 'y', '1', 'true']:
                    mapping[key.lower()] = 1
                elif value.lower() in ['no', 'n', '0', 'false']:
                    mapping[key.lower()] = 0
                else:
                    try:
                        mapping[key.lower()] = float(value)
                    except:
                        mapping[key.lower()] = 0
            else:
                mapping[key.lower()] = float(value) if value else 0
    
    elif cancer_type.lower() == 'prostate':
        # Map prostate cancer form fields
        field_mapping = {
            'age': 'age',
            'psa': 'psa',
            'psaDensity': 'psa_density',
            'gleason': 'gleason',
            'prostatevolume': 'prostate_volume',
            'dre': 'dre',
            'familyHistory': 'family_history',
            'previousBiopsy': 'previous_biopsy'
        }
        
        for form_field, csv_field in field_mapping.items():
            if form_field in form_data:
                val = form_data[form_field]
                if isinstance(val, str) and val.lower() in ['yes', 'y', '1']:
                    mapping[csv_field] = 1
                elif isinstance(val, str) and val.lower() in ['no', 'n', '0']:
                    mapping[csv_field] = 0
                else:
                    mapping[csv_field] = float(val) if val else 0
    
    return mapping


def get_prediction_label(cancer_type, prediction_code):
    """Convert prediction code to human-readable label"""
    labels = {
        'breast': {0: 'Benign', 1: 'Malignant'},
        'lung': {0: 'No', 1: 'Yes'},  # Adjust based on actual labels
        'prostate': {0: 'Low Risk', 1: 'High Risk'}  # Adjust based on actual labels
    }
    
    cancer_type_lower = cancer_type.lower()
    if cancer_type_lower in labels:
        return labels[cancer_type_lower].get(int(prediction_code), 'Unknown')
    
    return 'Unknown'


def predict_batch(cancer_type, csv_path, model_path, scaler_path):
    """
    Make batch predictions from CSV file
    
    Args:
        cancer_type: Type of cancer
        csv_path: Path to input CSV file
        model_path: Path to saved model
        scaler_path: Path to saved scaler
    
    Returns:
        DataFrame with predictions appended
    """
    # Load model and scaler
    model, scaler, feature_names = load_model_and_scaler(cancer_type, model_path, scaler_path)
    
    # Load input CSV
    df = pd.read_csv(csv_path)
    
    # Preprocess (extract features, same as training)
    preprocessor = get_preprocessor(cancer_type)
    X, _, _ = preprocessor(df)
    
    # Ensure feature order matches training
    if feature_names:
        for col in feature_names:
            if col not in X.columns:
                X[col] = 0
        X = X[feature_names]
    
    # Scale
    X_scaled = scaler.transform(X)
    
    # Predict
    predictions = model.predict(X_scaled)
    probabilities = model.predict_proba(X_scaled)
    confidences = np.max(probabilities, axis=1) * 100
    
    # Add predictions to DataFrame
    df['prediction'] = [get_prediction_label(cancer_type, p) for p in predictions]
    df['prediction_code'] = predictions
    df['confidence'] = [round(c, 2) for c in confidences]
    
    return df

