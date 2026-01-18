# Quick Start Guide - Backend Setup

## PowerShell Commands (Step by Step)

### Step 1: Navigate to Backend Directory
```powershell
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend
```

### Step 2: Create Virtual Environment
```powershell
python -m venv venv
```

### Step 3: Activate Virtual Environment

**IMPORTANT:** Use `.\` to run the script, NOT `cd`

```powershell
.\venv\Scripts\activate
```

You should see `(venv)` appear at the start of your prompt.

### Step 4: Install Requirements

**Make sure you're still in the `backend` directory** (not in venv\Scripts)

```powershell
pip install -r requirements.txt
```

### Step 5: Start the Server

```powershell
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

---

## Common Mistakes to Avoid

❌ **WRONG:** `cd activate` 
✅ **CORRECT:** `.\venv\Scripts\activate`

❌ **WRONG:** Running `pip install -r requirements.txt` from `venv\Scripts\` directory
✅ **CORRECT:** Run from `backend\` directory

❌ **WRONG:** Not activating virtual environment before installing
✅ **CORRECT:** Always activate venv first (see Step 3)

---

## Complete Command Sequence (Copy-Paste Ready)

```powershell
# Navigate to backend
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies (make sure you're in backend directory)
pip install -r requirements.txt

# Start server
python app.py
```

