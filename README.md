# 🛡️ IndiTech – AI-Powered Threat Detection Platform for Banking

> **Detect. Analyze. Respond.**
>
> An AI-powered cybersecurity platform prototype designed to detect insider threats, privileged access misuse, and anomalous user behavior in banking environments.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 📌 Overview

**IndiTech** is an AI-powered cybersecurity platform prototype built for banks and financial institutions to detect **Privileged Access Misuse**, **Insider Threats**, and **Anomalous User Behavior**.

The platform continuously monitors privileged users, analyzes behavioral patterns, calculates AI-based risk scores, generates intelligent alerts, assists Security Operations Center (SOC) analysts using an AI Copilot, and creates professional incident reports.

This project was built as a **Hackathon Prototype** to demonstrate how Artificial Intelligence can strengthen banking security through intelligent threat detection and rapid incident response.

---

# 🚨 Problem Statement

Banks manage thousands of privileged users, including:

- Employees
- Database Administrators
- System Administrators
- Contractors
- Third-Party Vendors

Traditional authentication methods such as passwords and Multi-Factor Authentication verify identity but **cannot determine whether a user is behaving suspiciously after login**.

Examples include:

- Insider Threats
- Credential Compromise
- Unauthorized Privileged Access
- Large Confidential Data Downloads
- Suspicious Database Queries
- Privilege Escalation

Organizations need an intelligent system capable of detecting abnormal behavior before it becomes a major security incident.

---

# 💡 Solution

IndiTech uses AI-powered behavioral analytics to:

- Monitor privileged user activities
- Detect suspicious behavior
- Calculate dynamic AI Risk Scores
- Generate real-time alerts
- Assist analysts using an AI Copilot
- Produce professional incident reports

The current version uses **simulated banking data** and **mock AI logic** to demonstrate enterprise-level cybersecurity workflows.

---

# 🔐 Demo Credentials

> **Note:** This is a hackathon prototype. Authentication and MFA are simulated for demonstration purposes.

| Role | Email | Password |
|------|-------|----------|
| 👨‍💻 SOC Analyst | **alice.smith@inditech.bank** | **password** |
| 🛡 Security Administrator | **bob.johnson@inditech.bank** | **password** |
| 📊 System Administrator | **david.miller@inditech.bank** | **password** |
| 📋 Auditor | **charlie.brown@inditech.bank** | **password** |

### Demo MFA OTP

```text
123456
```

---

# 🎬 Quick Demo

1. Login using the SOC Analyst account.
2. Complete MFA verification.
3. Dashboard loads with normal banking activities.
4. Navigate to **Live Activity**.
5. Click **Simulate Threat**.
6. Observe AI Risk Score increasing.
7. Open **Alerts Center**.
8. Investigate the critical alert.
9. Ask the AI Copilot:

```
Why was David flagged?
```

10. Generate the Incident Report.
11. Block the suspicious user.

---

# ✨ Features

- ✅ Secure Authentication
- ✅ Multi-Factor Authentication (MFA)
- ✅ Executive Security Dashboard
- ✅ Live Banking Activity Monitoring
- ✅ AI Threat Detection Engine
- ✅ AI Risk Scoring
- ✅ Real-Time Security Alerts
- ✅ AI Security Copilot
- ✅ Incident Report Generation
- ✅ Audit Logs
- ✅ Compliance Dashboard
- ✅ Role-Based Access Control
- ✅ Responsive Enterprise UI

---

# 🖥️ Modules

## 🔑 Authentication

- Login
- Forgot Password
- MFA Verification

---

## 📊 Dashboard

Displays

- Total Users
- Active Sessions
- High-Risk Users
- Threats Today
- Blocked Accounts
- Critical Alerts

Charts

- Threat Distribution
- Risk Trend
- Login Timeline
- Risk Heatmap
- World Login Map

Widgets

- Recent Alerts
- AI Recommendations
- Top Risk Users
- Live Threat Feed

---

## ⚡ Live Activity

Simulates banking events including

- Employee Login
- Admin Login
- Database Access
- Payroll Download
- USB Device Connection
- Failed MFA
- Privilege Escalation
- Suspicious SQL Queries
- PowerShell Execution

---

## 🧠 AI Threat Detection

AI Risk Engine evaluates

- Unknown Device
- Login Location
- Login Time
- Failed Logins
- Database Access
- Sensitive File Download
- Privilege Escalation
- Suspicious Commands

Generates

- Risk Score
- Threat Level
- AI Explanation

---

## 🚨 Alerts Center

Displays

- Critical Alerts
- High Risk
- Medium Risk
- Low Risk

Analysts can

- Investigate
- Block User
- Force MFA
- Escalate Incident
- Close Alert

---

## 🤖 AI Copilot

Supports natural language queries such as

- Why was David flagged?
- Explain this risk score.
- Recommend next action.
- Summarize today's threats.
- Generate incident summary.

---

## 📄 Incident Reports

Automatically generates reports including

- Incident ID
- User Details
- Timeline
- AI Analysis
- Evidence
- Risk Score
- Recommended Actions

---

## 📋 Audit Logs

Tracks

- User
- Device
- IP Address
- Timestamp
- Status
- Activity

Supports

- Search
- Filters
- CSV Export

---

## 🛡 Compliance Dashboard

Displays

- RBI Compliance
- ISO 27001 Status
- MFA Coverage
- Security Score
- Audit Readiness

---

# 🧠 AI Threat Detection Workflow

```text
User Login
      │
      ▼
Activity Monitoring
      │
      ▼
Behavior Analysis
      │
      ▼
AI Risk Engine
      │
      ▼
Risk Score Calculation
      │
      ▼
Alert Generation
      │
      ▼
SOC Investigation
      │
      ▼
AI Copilot
      │
      ▼
Incident Report
```

---

# 🏗️ System Architecture

```text
Bank Users
     │
     ▼
Authentication & MFA
     │
     ▼
Activity Monitoring
     │
     ▼
Behavior Analytics
     │
     ▼
AI Risk Engine
     │
     ▼
Threat Detection
     │
     ▼
Alerts Center
     │
     ├── AI Copilot
     ├── Incident Reports
     └── Audit Logs
```

---

# 🛠️ Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

## Backend

- FastAPI (Mock APIs)

## Database

- PostgreSQL (Mock Data)

## AI

- Simulated AI Risk Engine
- AI Copilot (Prototype)

---

# 📂 Project Structure

```text
IndiTech/
├── src/
├── backend/
├── docs/
├── public/
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Rehbar250/IndiTech-AI-Powered-Threat-Detection-System.git
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

## Start Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend

```
http://localhost:8000
```

---

# 🎯 Future Scope

- AI/ML Anomaly Detection Models
- Active Directory Integration
- SIEM Integration
- WebSocket Live Monitoring
- Email & SMS Alerts
- Behavioral Biometrics
- Quantum-Safe Cryptography
- Cloud Deployment
- Mobile SOC Application
- Predictive Threat Intelligence

---

# 📷 Screenshots

> Add screenshots here after deployment.

- Login Screen
  <img width="960" height="450" alt="image" src="https://github.com/user-attachments/assets/af7561ff-46c8-4ce7-a1b2-246973d9d356" />

- Dashboard
  <img width="960" height="449" alt="image" src="https://github.com/user-attachments/assets/9fb5f52e-99f9-4847-ad8b-6afdd5fcd877" />

- Live Activity
  <img width="960" height="445" alt="image" src="https://github.com/user-attachments/assets/dc63bd75-183f-47f3-93d3-22200b9cff62" />

- Threat Detection
  <img width="960" height="447" alt="image" src="https://github.com/user-attachments/assets/2c6b7869-6ba7-4ba5-9fb4-df83686dfdb3" />
  <img width="960" height="449" alt="image" src="https://github.com/user-attachments/assets/b1d5db09-d355-4198-bab2-f9598c93c75a" />

- Alerts Center
  <img width="960" height="445" alt="image" src="https://github.com/user-attachments/assets/50b43f36-7d70-4c09-99d7-677980aab2fa" />
  
- AI Copilot
  <img width="960" height="447" alt="image" src="https://github.com/user-attachments/assets/5194045b-0ea9-48f1-b958-df08a2926fb6" />

- Incident Report
  <img width="960" height="449" alt="image" src="https://github.com/user-attachments/assets/f7c2e525-8810-4fb0-a65a-16fa0c81b44a" />


---

# 👨‍💻 Developer

**Rehbar Miyan**

AI Enthusiast | Full Stack Developer

GitHub:
https://github.com/Rehbar250

LinkedIn:
(Add your LinkedIn profile)

---

# 📜 License

This project is licensed under the **MIT License**.

---

# ⭐ Acknowledgements

Developed as a **Hackathon Prototype** to demonstrate how Artificial Intelligence can improve banking cybersecurity through insider threat detection, behavioral analytics, and intelligent incident response.

If you found this project useful, please consider giving it a ⭐ on GitHub!
