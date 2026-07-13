# IndiTech Cybersecurity Platform - Simulated FastAPI Backend

This directory contains a simulated REST API backend written in Python using FastAPI. It models the core threat-detection and mitigation workflows for the IndiTech platform.

## Local Setup

### 1. Prerequisites
Ensure you have Python 3.8+ installed on your system.

### 2. Install Dependencies
Run the following command inside this directory to install the required packages:
```bash
pip install -r requirements.txt
```

### 3. Launch the Server
Start the Uvicorn development server:
```bash
uvicorn main:app --reload --port 8000
```

### 4. Interactive Docs
Once running, you can access the interactive Swagger UI documentation at:
- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc

## Simulated Endpoints

- `GET /api/users` - Fetch monitored bank users and their baseline risk scores.
- `GET /api/activities` - Fetch chronological telemetry security logs.
- `GET /api/alerts` - Fetch current active security alerts.
- `GET /api/compliance` - Fetch RBI and ISO 27001 regulatory compliance status checks.
- `POST /api/mitigate/block` - Revoke sessions and block user accounts.
- `POST /api/mitigate/mfa` - Dispatch step-up authentication challenges.
- `POST /api/copilot` - Conversation endpoint with the AI Security Copilot.
