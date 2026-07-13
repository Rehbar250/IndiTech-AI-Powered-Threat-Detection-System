import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="IndiTech Cybersecurity Platform - Simulated API Backend",
    description="Mock FastAPI endpoints for bank security telemetry, user risk scoring, and AI Copilot integration.",
    version="1.0.0"
)

# Enable CORS for frontend local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- PYDANTIC MODEL SCHEMAS ---

class UserRecord(BaseModel):
  id: str
  name: str
  email: str
  department: str
  role: str
  privileges: List[str]
  riskScore: int
  baselineRiskScore: int
  status: str
  avatar: str
  location: str
  lastLogin: str

class ActivityLog(BaseModel):
  id: str
  userId: str
  userName: str
  userRole: str
  department: str
  action: str
  module: str
  ip: str
  device: str
  browser: str
  os: str
  location: str
  timestamp: str
  riskScore: int
  status: str

class AlertRecord(BaseModel):
  id: str
  userId: str
  userName: str
  department: str
  severity: str
  riskScore: int
  description: str
  timestamp: str
  aiConfidence: float
  assignedAnalyst: str
  status: str
  evidence: List[str]
  explanation: str

class ChatMessage(BaseModel):
  sender: str
  text: str
  timestamp: str

class ComplianceItem(BaseModel):
  id: str
  standard: str
  control: str
  status: str
  evidence: str
  lastAudited: str

# --- IN-MEMORY DATABASE SEED ---

mock_users = [
    {
        "id": "U101",
        "name": "Alice Smith",
        "email": "alice.smith@inditech.bank",
        "department": "Security Operations",
        "role": "SOC Analyst",
        "privileges": ["Read Alerts", "Investigate", "Trigger Actions"],
        "riskScore": 12,
        "baselineRiskScore": 12,
        "status": "ACTIVE",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        "location": "Mumbai, India",
        "lastLogin": "2026-07-14T08:30:00Z"
    },
    {
        "id": "U102",
        "name": "Bob Johnson",
        "email": "bob.johnson@inditech.bank",
        "department": "Infrastructure",
        "role": "Security Administrator",
        "privileges": ["Configure Firewall", "Manage Policy", "Read Logs"],
        "riskScore": 18,
        "baselineRiskScore": 18,
        "status": "ACTIVE",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        "location": "Mumbai, India",
        "lastLogin": "2026-07-14T09:15:00Z"
    },
    {
        "id": "U104",
        "name": "David Miller",
        "email": "david.miller@inditech.bank",
        "department": "IT Systems",
        "role": "System Administrator",
        "privileges": ["Root Access", "User Management", "Database Administrator", "Execute Commands"],
        "riskScore": 15,
        "baselineRiskScore": 15,
        "status": "ACTIVE",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        "location": "Mumbai, India",
        "lastLogin": "2026-07-14T10:00:00Z"
    }
]

mock_activities = [
    {
        "id": "A501",
        "userId": "U101",
        "userName": "Alice Smith",
        "userRole": "SOC Analyst",
        "department": "Security Operations",
        "action": "Employee Login",
        "module": "Authentication",
        "ip": "10.120.45.12",
        "device": "IN-SOC-L01",
        "browser": "Chrome",
        "os": "Windows 11",
        "location": "Mumbai, India",
        "timestamp": "2026-07-14T08:30:00Z",
        "riskScore": 5,
        "status": "ALLOWED"
    },
    {
        "id": "A505",
        "userId": "U104",
        "userName": "David Miller",
        "userRole": "System Administrator",
        "department": "IT Systems",
        "action": "Admin Login",
        "module": "Authentication",
        "ip": "10.120.10.1",
        "device": "IN-SYS-L01",
        "browser": "Chrome",
        "os": "Windows 11",
        "location": "Mumbai, India",
        "timestamp": "2026-07-14T10:00:00Z",
        "riskScore": 15,
        "status": "ALLOWED"
    }
]

mock_alerts = [
    {
        "id": "ALT-2026-002",
        "userId": "U102",
        "userName": "Bob Johnson",
        "department": "Infrastructure",
        "severity": "LOW",
        "riskScore": 28,
        "description": "Multiple failed login attempts from standard office IP",
        "timestamp": "2026-07-14T09:05:00Z",
        "aiConfidence": 94.0,
        "assignedAnalyst": "Alice Smith",
        "status": "CLOSED",
        "evidence": ["3 failed LDAP authentication attempts in 60 seconds", "Successful login on 4th attempt with MFA"],
        "explanation": "Bob Johnson entered an incorrect password three times before successfully authenticating. Flagged as human error."
    }
]

mock_compliance = [
    {
        "id": "RBI-001",
        "standard": "RBI Security Compliance",
        "control": "Multi-Factor Authentication (MFA) Implementation",
        "status": "COMPLIANT",
        "evidence": "MFA enforced for 100% of employees, contractors, and administrators.",
        "lastAudited": "2026-06-15"
    },
    {
        "id": "RBI-002",
        "standard": "RBI Security Compliance",
        "control": "Privileged Access Management (PAM) & Activity Logging",
        "status": "UNDER_REVIEW",
        "evidence": "Privileged user logs captured. High-risk activities require real-time risk evaluation.",
        "lastAudited": "2026-07-01"
    }
]

# --- REST ENDPOINTS ---

@app.get("/")
def read_root():
  return {"status": "ONLINE", "message": "IndiTech AI Security Engine API"}

@app.get("/api/users", response_model=List[UserRecord])
def get_users():
  return mock_users

@app.get("/api/activities", response_model=List[ActivityLog])
def get_activities():
  return mock_activities

@app.get("/api/alerts", response_model=List[AlertRecord])
def get_alerts():
  return mock_alerts

@app.get("/api/compliance", response_model=List[ComplianceItem])
def get_compliance():
  return mock_compliance

@app.post("/api/mitigate/block")
def block_user(user_id: str = Body(..., embed=True)):
  # Locate user
  for u in mock_users:
    if u["id"] == user_id:
      u["status"] = "BLOCKED"
      u["riskScore"] = 5  # risk declines after lock
      
      # Log mitigation event
      new_log = {
          "id": f"A999",
          "userId": "U101",
          "userName": "Alice Smith",
          "userRole": "SOC Analyst",
          "department": "Security Operations",
          "action": f"MITIGATION TRIGGERED: Account disabled for user {user_id}",
          "module": "Mitigation",
          "ip": "10.120.45.12",
          "device": "IN-SOC-L01",
          "browser": "System Console",
          "os": "Backend API",
          "location": "Mumbai, India",
          "timestamp": datetime.datetime.utcnow().isoformat(),
          "riskScore": 0,
          "status": "ALLOWED"
      }
      mock_activities.insert(0, new_log)
      return {"status": "SUCCESS", "message": f"User account {user_id} blocked."}
  
  raise HTTPException(status_code=404, detail="User profile not found")

@app.post("/api/mitigate/mfa")
def force_mfa(user_id: str = Body(..., embed=True)):
  for u in mock_users:
    if u["id"] == user_id:
      # Log action
      new_log = {
          "id": f"A998",
          "userId": "U101",
          "userName": "Alice Smith",
          "userRole": "SOC Analyst",
          "department": "Security Operations",
          "action": f"FORCE STEP-UP MFA: Sent notification challenge to user {user_id}",
          "module": "Mitigation",
          "ip": "10.120.45.12",
          "device": "IN-SOC-L01",
          "browser": "System Console",
          "os": "Backend API",
          "location": "Mumbai, India",
          "timestamp": datetime.datetime.utcnow().isoformat(),
          "riskScore": 0,
          "status": "ALLOWED"
      }
      mock_activities.insert(0, new_log)
      return {"status": "SUCCESS", "message": f"MFA challenge pushed to user {user_id}."}
  
  raise HTTPException(status_code=404, detail="User profile not found")

@app.post("/api/copilot")
def query_copilot(query: str = Body(..., embed=True)):
  q = query.lower()
  response = "I am parsing security events. Could you specify which alert parameter or user profile you are triaging?"
  
  if "david" in q or "flagged" in q:
    response = (
        "David Miller (System Admin) is flagged with 95/100 risk. "
        "Anomalies detected: 1. Remote login from Moscow, Russia at 02:14 AM IST. "
        "2. Exfiltration of 1.8 GB Finance payroll_master database. "
        "3. Console DROP TABLE command execute. Recommended: Block account immediately."
    )
  elif "action" in q or "recommend" in q:
    response = "Recommendation: Revoke David Miller database permissions and lock Active Directory credentials."
  elif "risk score" in q or "calculate" in q:
    response = "The engine weights Unknown Device (+20), Geogeaphical Leap (+30), and Suspicious Command (+35) up to a max of 100."
    
  return {"reply": response, "timestamp": datetime.datetime.utcnow().isoformat()}
