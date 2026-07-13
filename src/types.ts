export type UserRole = 'SOC_ANALYST' | 'SECURITY_ADMIN' | 'RISK_MANAGER' | 'AUDITOR' | 'SYSTEM_ADMIN';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  privileges: string[];
  riskScore: number;
  baselineRiskScore: number;
  status: 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';
  avatar: string;
  location: string;
  lastLogin: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  department: string;
  action: string;
  module: string;
  ip: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  timestamp: string;
  riskScore: number;
  status: 'ALLOWED' | 'FLAGGED' | 'BLOCKED';
}

export interface AlertRecord {
  id: string;
  userId: string;
  userName: string;
  department: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number;
  description: string;
  timestamp: string;
  aiConfidence: number;
  assignedAnalyst: string;
  status: 'OPEN' | 'INVESTIGATING' | 'MITIGATED' | 'CLOSED' | 'ESCALATED';
  evidence: string[];
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface ComplianceItem {
  id: string;
  standard: string;
  control: string;
  status: 'COMPLIANT' | 'NON-COMPLIANT' | 'UNDER_REVIEW';
  evidence: string;
  lastAudited: string;
}
