# Testing the Flask API

## ✅ Your Server is Running!

Seeing a 404 at `http://127.0.0.1:5000` actually means **your Flask server is working correctly!** 

The 404 happens because there's no route for `/` - but the API endpoints are under `/api/`.

## 🧪 Test the API Endpoints

### **1. Test Root Endpoint (After Update)**

Open in browser:
```
http://127.0.0.1:5000/
```

Should show API information.

### **2. Test Health Endpoint**

Open in browser:
```
http://127.0.0.1:5000/api/health
```

Should show:
```json
{
  "status": "healthy",
  "message": "Cancer Prediction API is running"
}
```

### **3. Test Model Status**

Open in browser:
```
http://127.0.0.1:5000/api/model-status/breast
```

Should show whether models are trained.

### **4. Test with PowerShell (curl alternative)**

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get

# Model status
Invoke-RestMethod -Uri "http://localhost:5000/api/model-status/breast" -Method Get
```

## 📝 Available API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/api/health` | GET | Health check |
| `/api/train/{cancer_type}` | POST | Train model |
| `/api/predict/{cancer_type}` | POST | Single prediction |
| `/api/predict-batch/{cancer_type}` | POST | Batch prediction |
| `/api/upload-dataset` | POST | Upload dataset |
| `/api/model-status/{cancer_type}` | GET | Check model status |

**Cancer types:** `breast`, `lung`, `prostate`

## 🔄 Restart Server (if needed)

After updating `app.py`, restart the server:

1. **Stop the server** (Ctrl+C in the terminal running `python app.py`)

2. **Start again:**
   ```powershell
   cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend
   .\venv\Scripts\activate
   python app.py
   ```

## ✅ What the 404 Means

- ✅ **Flask server IS running** (otherwise you'd get "connection refused")
- ✅ **Server is listening on port 5000**
- ❌ **No route defined for `/`** (fixed now with root endpoint)

After restarting with the updated `app.py`, visiting `http://127.0.0.1:5000/` will show API information instead of 404!

