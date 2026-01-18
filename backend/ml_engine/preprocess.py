"""
Data preprocessing utilities for cancer prediction models
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder


def load_csv_data(file_path):
    """Load CSV data into pandas DataFrame"""
    try:
        df = pd.read_csv(file_path)
        return df
    except Exception as e:
        raise Exception(f"Error loading CSV file: {str(e)}")


def preprocess_breast_cancer(df):
    """Preprocess breast cancer dataset"""
    # Drop ID column if exists
    df = df.copy()
    if 'id' in df.columns:
        df = df.drop('id', axis=1)
    if 'ID' in df.columns:
        df = df.drop('ID', axis=1)
    
    # Identify target column (usually 'diagnosis' or similar)
    target_col = None
    for col in ['diagnosis', 'Diagnosis', 'target', 'Target', 'class', 'Class']:
        if col in df.columns:
            target_col = col
            break
    
    if target_col is None:
        raise ValueError("Target column not found in breast cancer dataset")
    
    # Encode target (M=1, B=0 or Malignant=1, Benign=0)
    le = LabelEncoder()
    df[target_col] = le.fit_transform(df[target_col])
    
    # Separate features and target
    X = df.drop(target_col, axis=1)
    y = df[target_col]
    
    # Handle missing values
    X = X.fillna(X.mean())
    
    return X, y, le


def preprocess_lung_cancer(df):
    """Preprocess lung cancer dataset"""
    df = df.copy()
    
    # Drop ID column if exists
    if 'id' in df.columns:
        df = df.drop('id', axis=1)
    if 'ID' in df.columns:
        df = df.drop('ID', axis=1)
    
    # Identify target column
    target_col = None
    for col in ['LUNG_CANCER', 'Lung_cancer', 'lung_cancer', 'target', 'Target', 'diagnosis']:
        if col in df.columns:
            target_col = col
            break
    
    if target_col is None:
        raise ValueError("Target column not found in lung cancer dataset")
    
    # Encode target if categorical
    le = LabelEncoder()
    if df[target_col].dtype == 'object':
        df[target_col] = le.fit_transform(df[target_col])
    
    # Encode categorical features
    categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
    categorical_cols = [col for col in categorical_cols if col != target_col]
    
    for col in categorical_cols:
        df[col] = LabelEncoder().fit_transform(df[col])
    
    # Separate features and target
    X = df.drop(target_col, axis=1)
    y = df[target_col]
    
    # Handle missing values
    X = X.fillna(X.mean())
    
    return X, y, le


def preprocess_prostate_cancer(df):
    """Preprocess prostate cancer dataset"""
    df = df.copy()
    
    # Drop ID column if exists
    if 'id' in df.columns:
        df = df.drop('id', axis=1)
    if 'ID' in df.columns:
        df = df.drop('ID', axis=1)
    
    # Identify target column
    target_col = None
    for col in ['target', 'Target', 'diagnosis', 'Diagnosis', 'result', 'Result']:
        if col in df.columns:
            target_col = col
            break
    
    if target_col is None:
        raise ValueError("Target column not found in prostate cancer dataset")
    
    # Encode target if categorical
    le = LabelEncoder()
    if df[target_col].dtype == 'object':
        df[target_col] = le.fit_transform(df[target_col])
    
    # Separate features and target
    X = df.drop(target_col, axis=1)
    y = df[target_col]
    
    # Handle missing values
    X = X.fillna(X.mean())
    
    return X, y, le


def get_preprocessor(cancer_type):
    """Get appropriate preprocessor function for cancer type"""
    preprocessors = {
        'breast': preprocess_breast_cancer,
        'lung': preprocess_lung_cancer,
        'prostate': preprocess_prostate_cancer
    }
    
    if cancer_type.lower() not in preprocessors:
        raise ValueError(f"Unknown cancer type: {cancer_type}")
    
    return preprocessors[cancer_type.lower()]

