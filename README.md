# IndiTech | AI-Powered Threat Detection Platform for Banking

IndiTech is an enterprise-grade cybersecurity platform prototype designed for banks and financial institutions to detect **Privileged Access Misuse**, **Insider Threats**, and **Suspicious User Behavior** using real-time behavioral analytics and dynamic AI risk scoring.

The platform continuously monitors privileged administrators, vendors, and employees. It detects anomalous activities in real time, assigns risk scores, interprets threats using an AI Copilot assistant, and enables security teams to respond immediately to mitigate breaches.

---

## 🔐 Credentials & Quick Access

To access the platform, click the quick-autofill links on the login screen or enter these credentials:

| Field | Demo Credential | Note |
| :--- | :--- | :--- |
| **Email** | `alice.smith@inditech.bank` | Monitored SOC Analyst account |
| **Password** | `password` | Standard demo password |
| **MFA OTP** | `123456` | Hardware OTP token code (or leave blank) |
| **Access Role** | `SOC Analyst` | Select this profile for full mitigation privileges |

Other available role-switcher profiles:
*   **Security Administrator**: `bob.johnson@inditech.bank`
*   **Compliance Auditor**: `charlie.brown@inditech.bank`
*   **System Administrator**: `david.miller@inditech.bank` (Target threat profile)

---

## 🚀 Presentation Script & Demo Workflow

Present the prototype to judges by stepping through the interactive **Demo Flow Control Panel** (visible at the top center of the header bar):

### Step 1: Authentication & Entrance
1. Start on the login screen, autofill `alice.smith@inditech.bank` with the password `password`, and click **Authenticate Session**.
2. Input the MFA code `123456` and select **SOC Analyst** as your Access Profile. Click **Initialize Security Session**.
3. The dashboard loads. All system perimeters report green. The geotracking session map shows normal logins restricted to Mumbai and Bangalore headquarters.

### Step 2: Anomaly Appears (Geo-Jump)
1. On the top control panel, click **Next Step** (advancing to Step 2: Login Anomaly).
2. The world map updates instantly with a flashing red radar dot over **Moscow, Russia**.
3. Navigating to the **Live Activity** tab reveals the trigger: `David Miller - Admin Login - Moscow, Russia` at 02:14 AM IST.
4. Click the **AI Copilot** tab and click the prompt chip: `"Why was David flagged?"` -> the Copilot responds detailing David's geovelocity anomaly and unrecognized Linux workstation host.

### Step 3: Sabotage & Risk Spike
1. Click **Next Step** again (advancing to Step 3: Threat Spikes).
2. The aggregate risk score spikes. A critical alarm notification flashes in red next to the **Alerts Center** in the sidebar.
3. The **System Status** widget at the bottom updates to `Security Incident Active`.
4. Open the **Alerts Center** to triage David's critical alert (Risk Score: 95/100). The evidence logs detail a 1.8 GB finance payroll database export and a shell command sabotage attempt: `sh shred_audit_logs.sh && DROP TABLE client_records;`.
5. Ask the AI Copilot: `"Recommend next action."` -> it explains playbooks and root causes.

### Step 4: Mitigation Action Taken
1. In the Alerts Center details view, click the **Block User Account** button.
2. A **canvas-confetti blast** triggers in celebration of neutralizing the threat!
3. David Miller's status updates to `BLOCKED`. His session token is revoked, and the risk score recedes.
4. Navigating to **Incident Reports** displays the audit record. Open the report and click **Download PDF** to open the browser's clean print layout.
5. In **Audit Logs**, click **Export CSV** to download a spreadsheet of the forensic log trail.

---

## 🛠️ Local Setup

### Frontend (React + Vite)
From the root directory:
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

### Backend Mock APIs (FastAPI)
From the `/backend` subdirectory:
```bash
# 1. Install Python packages
pip install -r requirements.txt

# 2. Run the Uvicorn server
python -m uvicorn main:app --reload --port 8000
```
*Documentation available at: http://localhost:8000/docs*
