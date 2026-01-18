"""
Model management utilities - loading, saving, checking status
"""
import os
import joblib
from datetime import datetime
import json


def get_model_paths(cancer_type, base_path='./models'):
    """Get paths for model, scaler, and metadata files"""
    cancer_type_lower = cancer_type.lower()
    model_path = os.path.join(base_path, f'{cancer_type_lower}_cancer.pkl')
    scaler_path = os.path.join(base_path, f'{cancer_type_lower}_cancer_scaler.pkl')
    metadata_path = os.path.join(base_path, f'{cancer_type_lower}_cancer_metadata.json')
    feature_names_path = os.path.join(base_path, f'{cancer_type_lower}_cancer_features.pkl')
    
    return {
        'model': model_path,
        'scaler': scaler_path,
        'metadata': metadata_path,
        'features': feature_names_path
    }


def save_model_metadata(cancer_type, metrics, base_path='./models'):
    """Save training metrics and metadata"""
    paths = get_model_paths(cancer_type, base_path)
    
    metadata = {
        'cancer_type': cancer_type.lower(),
        'metrics': metrics,
        'trained_at': metrics.get('trained_at', datetime.now().isoformat()),
        'model_exists': True
    }
    
    os.makedirs(base_path, exist_ok=True)
    with open(paths['metadata'], 'w') as f:
        json.dump(metadata, f, indent=2)
    
    return metadata


def load_model_metadata(cancer_type, base_path='./models'):
    """Load model metadata if exists"""
    paths = get_model_paths(cancer_type, base_path)
    
    if not os.path.exists(paths['metadata']):
        return {
            'cancer_type': cancer_type.lower(),
            'model_exists': False,
            'metrics': None,
            'trained_at': None
        }
    
    with open(paths['metadata'], 'r') as f:
        metadata = json.load(f)
    
    # Check if model file actually exists
    metadata['model_exists'] = os.path.exists(paths['model'])
    
    return metadata


def check_model_exists(cancer_type, base_path='./models'):
    """Check if trained model exists"""
    paths = get_model_paths(cancer_type, base_path)
    return os.path.exists(paths['model']) and os.path.exists(paths['scaler'])


def get_model_status(cancer_type, base_path='./models'):
    """Get comprehensive model status"""
    is_trained = check_model_exists(cancer_type, base_path)
    metadata = load_model_metadata(cancer_type, base_path)
    
    return {
        'cancer_type': cancer_type.lower(),
        'is_trained': is_trained,
        'metrics': metadata.get('metrics'),
        'trained_at': metadata.get('trained_at'),
        'model_path': get_model_paths(cancer_type, base_path)['model'] if is_trained else None
    }

