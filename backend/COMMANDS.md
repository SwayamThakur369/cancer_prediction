# Correct PowerShell Commands

## Fix Your Current Issue

You made these mistakes:
1. ❌ `cd activate` - Wrong! `activate` is a script, not a directory
2. ❌ Running `pip install` from wrong directory

## Correct Step-by-Step Commands

### Step 1: Go to Backend Directory
```powershell
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend
```

### Step 2: Create Virtual Environment (if not created yet)
```powershell
python -m venv venv
```

### Step 3: Activate Virtual Environment
**CRITICAL:** Use `.\` to RUN the script, not `cd`

```powershell
.\venv\Scripts\activate
```

You should see `(venv)` appear before your prompt like this:
```
(venv) PS C:\Users\swayamthakur\Desktop\cancer_prediction\backend>
```

### Step 4: Install Requirements
**Make sure you're in the `backend` directory (not venv\Scripts)**

```powershell
# If you're in venv\Scripts, go back first:
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend

# Then install:
pip install -r requirements.txt
```

### Step 5: Start Server
```powershell
python app.py
```

---

## Complete Sequence (Copy & Paste)

```powershell
# 1. Navigate to backend
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend

# 2. Create venv (if needed)
python -m venv venv

# 3. Activate venv (IMPORTANT: use .\ not cd)
.\venv\Scripts\activate

# 4. Install requirements
pip install -r requirements.txt

# 5. Start server
python app.py
```

---

## Or Use the Setup Script

I've created an automated setup script. Run this instead:

```powershell
cd C:\Users\swayamthakur\Desktop\cancer_prediction\backend
.\setup.ps1
```

