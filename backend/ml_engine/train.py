"""
Model training utilities for cancer prediction
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib
import os
from datetime import datetime

from .preprocess import load_csv_data, get_preprocessor


def train_breast_cancer_model(data_path, model_path, scaler_path):
    """Train breast cancer prediction model using SVM"""
    # Load and preprocess data
    df = load_csv_data(data_path)
    preprocessor = get_preprocessor('breast')
    X, y, label_encoder = preprocessor(df)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model (SVM for breast cancer)
    model = SVC(probability=True, random_state=42, C=1.0, kernel='rbf')
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    
    # Save model and scaler
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    # Save feature names for later use
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    joblib.dump(list(X.columns), feature_names_path)
    
    metrics = {
        'accuracy': float(accuracy),
        'precision': float(precision),
        'recall': float(recall),
        'f1_score': float(f1),
        'training_samples': len(X_train),
        'test_samples': len(X_test),
        'features': len(X.columns),
        'trained_at': datetime.now().isoformat()
    }
    
    return metrics


def train_lung_cancer_model(data_path, model_path, scaler_path):
    """Train lung cancer prediction model using Random Forest"""
    # Load and preprocess data
    df = load_csv_data(data_path)
    preprocessor = get_preprocessor('lung')
    X, y, label_encoder = preprocessor(df)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y if len(np.unique(y)) > 1 else None
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model (Random Forest for lung cancer)
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        max_depth=10,
        min_samples_split=5
    )
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    
    # Save model and scaler
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    # Save feature names
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    joblib.dump(list(X.columns), feature_names_path)
    
    metrics = {
        'accuracy': float(accuracy),
        'precision': float(precision),
        'recall': float(recall),
        'f1_score': float(f1),
        'training_samples': len(X_train),
        'test_samples': len(X_test),
        'features': len(X.columns),
        'trained_at': datetime.now().isoformat()
    }
    
    return metrics


def train_prostate_cancer_model(data_path, model_path, scaler_path):
    """Train prostate cancer prediction model using Random Forest"""
    # Load and preprocess data
    df = load_csv_data(data_path)
    preprocessor = get_preprocessor('prostate')
    X, y, label_encoder = preprocessor(df)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y if len(np.unique(y)) > 1 else None
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model (Random Forest for prostate cancer)
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        max_depth=10,
        min_samples_split=5
    )
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    
    # Save model and scaler
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    # Save feature names
    feature_names_path = model_path.replace('.pkl', '_features.pkl')
    joblib.dump(list(X.columns), feature_names_path)
    
    metrics = {
        'accuracy': float(accuracy),
        'precision': float(precision),
        'recall': float(recall),
        'f1_score': float(f1),
        'training_samples': len(X_train),
        'test_samples': len(X_test),
        'features': len(X.columns),
        'trained_at': datetime.now().isoformat()
    }
    
    return metrics


def train_model(cancer_type, data_path, model_path, scaler_path):
    """Train model for specified cancer type"""
    trainers = {
        'breast': train_breast_cancer_model,
        'lung': train_lung_cancer_model,
        'prostate': train_prostate_cancer_model
    }
    
    if cancer_type.lower() not in trainers:
        raise ValueError(f"Unknown cancer type: {cancer_type}")
    
    trainer = trainers[cancer_type.lower()]
    return trainer(data_path, model_path, scaler_path)

