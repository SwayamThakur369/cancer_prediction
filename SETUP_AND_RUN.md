# Setup and Run Instructions
## Cancer Prediction ML Application

---

## 🚀 **QUICK START**

### **Prerequisites**

- **Node.js** (v14.x or higher) - For frontend
- **Python** (v3.8 or higher) - For backend ML
- **npm** or **yarn** - Package manager
- **pip** - Python package manager

---

## 📋 **STEP 1: BACKEND SETUP**

### **1.1 Navigate to Backend Directory**

```bash
cd backend
```

### **1.2 Create Virtual Environment (Recommended)**

**Windows:**
```powershell
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### **1.3 Install Python Dependencies**

```bash
pip install -r requirements.txt
```

**Required packages:**
- Flask==3.0.0
- Flask-CORS==4.0.0
- pandas==2.1.4
- numpy==1.26.2
- scikit-learn==1.3.2
- joblib==1.3.2
- python-dotenv==1.0.0

### **1.4 Verify CSV Files Exist**

Ensure these files are in `backend/data/`:
- `Breast_Cancer.csv`
- `lung_cancer.csv`
- `prostat_cancer.csv`

If missing, copy from project root:
```bash
# From project root
cp Breast_Cancer.csv backend/data/
cp lung_cancer.csv backend/data/
cp prostat_cancer.csv backend/data/
```

### **1.5 Create .env File (Optional)**

Create `backend/.env`:
```env
FLASK_ENV=development
FLASK_PORT=5000
MODEL_STORAGE_PATH=./models
DATA_STORAGE_PATH=./data
UPLOAD_STORAGE_PATH=./uploads
```

### **1.6 Start Backend Server**

```bash
python app.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:5000
```

**Backend API will be available at:** `http://localhost:5000`

---

## 📋 **STEP 2: FRONTEND SETUP**

### **2.1 Navigate to Project Root**

```bash
cd ..  # If you're in backend directory
```

### **2.2 Install Frontend Dependencies**

```bash
npm install
```

### **2.3 Create Environment Variable (Optional)**

Create `.env` in project root:
```env
VITE_API_URL=http://localhost:5000/api
```

If not set, default is `http://localhost:5000/api`

### **2.4 Start Frontend Development Server**

```bash
npm start
```

**Frontend will be available at:** `http://localhost:4028`

---

## 🎯 **STEP 3: INITIAL MODEL TRAINING**

### **Option A: Train via API (Recommended)**

Before making predictions, train the models:

**Train Breast Cancer Model:**
```bash
curl -X POST http://localhost:5000/api/train/breast -F "useDefault=true"
```

**Train Lung Cancer Model:**
```bash
curl -X POST http://localhost:5000/api/train/lung -F "useDefault=true"
```

**Train Prostate Cancer Model:**
```bash
curl -X POST http://localhost:5000/api/train/prostate -F "useDefault=true"
```

### **Option B: Train via Frontend (Future Feature)**

The frontend will have a dataset management page to train models through the UI.

---

## ✅ **VERIFICATION**

### **Check Backend Health**

```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "message": "Cancer Prediction API is running"
}
```

### **Check Model Status**

```bash
curl http://localhost:5000/api/model-status/breast
```

**Expected response:**
```json
{
  "success": true,
  "status": {
    "cancer_type": "breast",
    "is_trained": true,
    "metrics": {
      "accuracy": 0.95,
      "precision": 0.94,
      "recall": 0.95
    },
    "trained_at": "2026-01-17T..."
  }
}
```

---

## 🧪 **TESTING PREDICTIONS**

### **Test Single Prediction (API)**

**Breast Cancer:**
```bash
curl -X POST http://localhost:5000/api/predict/breast \
  -H "Content-Type: application/json" \
  -d '{
    "radiusMean": 17.99,
    "textureMean": 10.38,
    "perimeterMean": 122.8,
    "areaMean": 1001.0,
    "smoothnessMean": 0.1184,
    "compactnessMean": 0.2776,
    "concavityMean": 0.3001,
    "concavePointsMean": 0.1471,
    "symmetryMean": 0.2419
  }'
```

### **Test via Frontend**

1. Open `http://localhost:4028`
2. Navigate to **Cancer Selection** page
3. Select a cancer type (Breast, Lung, or Prostate)
4. Fill in the prediction form
5. Submit and view results

---

## 📁 **PROJECT STRUCTURE**

```
cancer_prediction/
├── backend/
│   ├── app.py                    # Flask API server
│   ├── requirements.txt          # Python dependencies
│   ├── data/                     # Training datasets
│   │   ├── Breast_Cancer.csv
│   │   ├── lung_cancer.csv
│   │   └── prostat_cancer.csv
│   ├── models/                   # Trained models (created after training)
│   │   ├── breast_cancer.pkl
│   │   ├── lung_cancer.pkl
│   │   └── prostate_cancer.pkl
│   ├── uploads/                  # User-uploaded files
│   └── ml_engine/                # ML pipeline
│       ├── preprocess.py
│       ├── train.py
│       ├── predict.py
│       └── model_manager.py
├── src/
│   ├── services/
│   │   └── mlService.js          # Frontend API service
│   └── pages/
│       ├── breast-cancer-prediction/
│       ├── lung-cancer-prediction/
│       └── prostate-cancer-prediction/
├── package.json                  # Frontend dependencies
└── SETUP_AND_RUN.md             # This file
```

---

## 🔧 **TROUBLESHOOTING**

### **Backend Issues**

**Problem:** `ModuleNotFoundError: No module named 'flask'`
**Solution:** Activate virtual environment and install requirements:
```bash
cd backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

**Problem:** `Port 5000 already in use`
**Solution:** Change port in `backend/app.py` or kill process using port 5000

**Problem:** `CSV file not found`
**Solution:** Ensure CSV files are in `backend/data/` directory

### **Frontend Issues**

**Problem:** `Cannot connect to backend API`
**Solution:** 
1. Verify backend is running on port 5000
2. Check `VITE_API_URL` in `.env` file
3. Check CORS settings in `backend/app.py`

**Problem:** `Model not trained error`
**Solution:** Train the model first using training endpoints (see Step 3)

---

## 📝 **API ENDPOINTS**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/train/{cancer_type}` | POST | Train model |
| `/api/predict/{cancer_type}` | POST | Single prediction |
| `/api/predict-batch/{cancer_type}` | POST | Batch prediction (CSV) |
| `/api/upload-dataset` | POST | Upload dataset |
| `/api/model-status/{cancer_type}` | GET | Get model status |

**Cancer types:** `breast`, `lung`, `prostate`

---

## 🎓 **NEXT STEPS**

1. **Train all models** using the training endpoints
2. **Test predictions** via frontend forms
3. **Explore batch prediction** by uploading CSV files
4. **Upload custom datasets** for retraining models

---

## ⚠️ **IMPORTANT NOTES**

- Models must be **trained before making predictions**
- Models are **persisted to disk** and reused (not retrained on every prediction)
- **Backend must be running** for frontend predictions to work
- CSV files must match expected format for preprocessing

---

## 📞 **SUPPORT**

For issues or questions:
1. Check `backend/app.py` logs for errors
2. Check browser console for frontend errors
3. Verify both backend and frontend are running
4. Ensure models are trained before predictions

---

**Happy Predicting! 🎯**

