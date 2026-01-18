/**
 * ML Service - API communication layer for Machine Learning operations
 */
import axios from 'axios';

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes for training
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Train model for specified cancer type
 * @param {string} cancerType - Type of cancer (breast, lung, prostate)
 * @param {boolean} useDefault - Use default dataset or uploaded file
 * @param {File|null} file - Optional file to upload for training
 * @returns {Promise} Training metrics
 */
export const trainModel = async (cancerType, useDefault = true, file = null) => {
  try {
    const formData = new FormData();
    
    if (file && !useDefault) {
      formData.append('file', file);
      formData.append('useDefault', 'false');
    } else {
      formData.append('useDefault', 'true');
    }
    
    const response = await apiClient.post(`/train/${cancerType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes for training
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Make single prediction
 * @param {string} cancerType - Type of cancer
 * @param {Object} formData - Form data for prediction
 * @returns {Promise} Prediction result
 */
export const predict = async (cancerType, formData) => {
  try {
    const response = await apiClient.post(`/predict/${cancerType}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Make batch predictions from CSV file
 * @param {string} cancerType - Type of cancer
 * @param {File} csvFile - CSV file with data to predict
 * @returns {Promise} Blob for CSV download
 */
export const predictBatch = async (cancerType, csvFile) => {
  try {
    const formData = new FormData();
    formData.append('file', csvFile);
    
    const response = await apiClient.post(`/predict-batch/${cancerType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // Important for file download
      timeout: 300000, // 5 minutes for batch processing
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Upload dataset for training
 * @param {File} csvFile - CSV file to upload
 * @param {string} cancerType - Type of cancer
 * @returns {Promise} Upload confirmation
 */
export const uploadDataset = async (csvFile, cancerType) => {
  try {
    const formData = new FormData();
    formData.append('file', csvFile);
    formData.append('cancerType', cancerType);
    
    const response = await apiClient.post('/upload-dataset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get model training status and metrics
 * @param {string} cancerType - Type of cancer
 * @returns {Promise} Model status
 */
export const getModelStatus = async (cancerType) => {
  try {
    const response = await apiClient.get(`/model-status/${cancerType}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Health check for API
 * @returns {Promise} API health status
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handle API errors and format messages
 * @param {Error} error - Axios error object
 * @returns {Error} Formatted error
 */
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.error || error.response.data?.message || 'An error occurred';
    const status = error.response.status;
    
    const apiError = new Error(message);
    apiError.status = status;
    apiError.response = error.response.data;
    return apiError;
  } else if (error.request) {
    // Request made but no response
    const apiError = new Error('Unable to connect to the server. Please check if the backend is running.');
    apiError.status = 0;
    return apiError;
  } else {
    // Error setting up request
    return new Error(error.message || 'An unexpected error occurred');
  }
};

// Export all functions as default object
const mlService = {
  trainModel,
  predict,
  predictBatch,
  uploadDataset,
  getModelStatus,
  healthCheck,
};

export default mlService;

