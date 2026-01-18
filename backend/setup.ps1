# PowerShell Setup Script for Backend
# Run this script to automatically set up the backend environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cancer Prediction ML - Backend Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "Checking Python installation..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Red
    exit 1
}
Write-Host "Found: $pythonVersion" -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $backendPath
Write-Host "Working directory: $backendPath" -ForegroundColor Green
Write-Host ""

# Check if venv already exists
if (Test-Path "venv") {
    Write-Host "Virtual environment already exists." -ForegroundColor Yellow
    $response = Read-Host "Do you want to recreate it? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        Remove-Item -Recurse -Force venv
        Write-Host "Removed old virtual environment." -ForegroundColor Yellow
    } else {
        Write-Host "Using existing virtual environment." -ForegroundColor Green
    }
}

# Create virtual environment if it doesn't exist
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to create virtual environment!" -ForegroundColor Red
        exit 1
    }
    Write-Host "Virtual environment created successfully!" -ForegroundColor Green
    Write-Host ""
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "$backendPath\venv\Scripts\Activate.ps1"

if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Could not activate virtual environment automatically." -ForegroundColor Yellow
    Write-Host "Please run manually: .\venv\Scripts\activate" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "Virtual environment activated!" -ForegroundColor Green
    Write-Host ""
}

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet
Write-Host "pip upgraded!" -ForegroundColor Green
Write-Host ""

# Install requirements
Write-Host "Installing requirements..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Setup completed successfully!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Make sure virtual environment is activated (you should see (venv) in prompt)" -ForegroundColor White
        Write-Host "2. If not activated, run: .\venv\Scripts\activate" -ForegroundColor White
        Write-Host "3. Start the server: python app.py" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "ERROR: Failed to install requirements!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: requirements.txt not found!" -ForegroundColor Red
    Write-Host "Make sure you're in the backend directory." -ForegroundColor Red
    exit 1
}

