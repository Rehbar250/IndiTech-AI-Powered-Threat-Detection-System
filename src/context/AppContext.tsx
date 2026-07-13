import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserRecord, ActivityLog, AlertRecord, ChatMessage, ComplianceItem } from '../types';
import { mockUsers, baselineActivities, baselineAlerts, complianceItems } from '../utils/demoData';

interface AppContextType {
  // Authentication & Roles
  currentUser: UserRecord | null;
  currentRole: UserRole | null;
  isAuthenticated: boolean;
  isMfaStep: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyMfa: (otp: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Simulated Database State
  users: UserRecord[];
  activities: ActivityLog[];
  alerts: AlertRecord[];
  complianceList: ComplianceItem[];
  chatMessages: ChatMessage[];

  // Demo Workflow Controller
  demoStep: number;
  advanceDemo: () => void;
  resetDemo: () => void;
  setDemoToStep: (step: number) => void;

  // Security Operations Actions
  blockUser: (userId: string) => void;
  forceMfa: (userId: string) => void;
  closeAlert: (alertId: string) => void;
  escalateAlert: (alertId: string) => void;
  sendCopilotMessage: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMfaStep, setIsMfaStep] = useState<boolean>(false);

  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [activities, setActivities] = useState<ActivityLog[]>(baselineActivities);
  const [alerts, setAlerts] = useState<AlertRecord[]>(baselineAlerts);
  const [complianceList] = useState<ComplianceItem[]>(complianceItems);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Welcome to IndiTech AI Copilot. I am continuously monitoring banking channels, database schemas, and privileged administrative access. System perimeter is secure.',
      timestamp: new Date().toISOString(),
    }
  ]);

  const [demoStep, setDemoStep] = useState<number>(0);

  // Auto-scrolling logs generator (adds standard random banking activities every 10 seconds in Step 0)
  useEffect(() => {
    if (demoStep === 0) {
      const interval = setInterval(() => {
        const randomUsers = users.filter(u => u.id !== 'U104'); // exclude David
        const randUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const actions = [
          { action: 'Database Query - Customer Balance', module: 'Database', risk: 6 },
          { action: 'Audit Log View', module: 'Compliance', risk: 4 },
          { action: 'Firewall Policy Scan', module: 'Network', risk: 5 },
          { action: 'MFA Status Verified', module: 'Authentication', risk: 2 },
          { action: 'Employee Login', module: 'Authentication', risk: 4 }
        ];
        const selected = actions[Math.floor(Math.random() * actions.length)];

        const newLog: ActivityLog = {
          id: `A${Math.floor(1000 + Math.random() * 9000)}`,
          userId: randUser.id,
          userName: randUser.name,
          userRole: randUser.role,
          department: randUser.department,
          action: selected.action,
          module: selected.module,
          ip: `10.120.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          device: `IN-${randUser.department.substring(0, 3).toUpperCase()}-L0${Math.floor(1 + Math.random() * 5)}`,
          browser: 'Chrome',
          os: 'Windows 11',
          location: randUser.location,
          timestamp: new Date().toISOString(),
          riskScore: selected.risk,
          status: 'ALLOWED'
        };

        setActivities(prev => [newLog, ...prev.slice(0, 49)]);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [demoStep, users]);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Standard mock verification
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser && password === 'password') {
      setIsMfaStep(true);
      return true;
    }
    return false;
  };

  const verifyMfa = async (otp: string, role: UserRole): Promise<boolean> => {
    if (otp === '123456' || otp === '') { // accept blank or 123456 for demo ease
      // Find default user mapping for simplicity
      let mappedUser = users[0]; // Alice
      if (role === 'SECURITY_ADMIN') mappedUser = users[1];
      if (role === 'AUDITOR') mappedUser = users[2];
      if (role === 'SYSTEM_ADMIN') mappedUser = users[3];
      if (role === 'RISK_MANAGER') mappedUser = users[5];

      setCurrentUser(mappedUser);
      setCurrentRole(role);
      setIsMfaStep(false);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setIsAuthenticated(false);
    setIsMfaStep(false);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    // Sync current user avatar/name
    let mappedUser = users[0];
    if (role === 'SECURITY_ADMIN') mappedUser = users[1];
    if (role === 'AUDITOR') mappedUser = users[2];
    if (role === 'SYSTEM_ADMIN') mappedUser = users[3];
    if (role === 'RISK_MANAGER') mappedUser = users[5];
    setCurrentUser(mappedUser);
  };

  // Demo Workflow Timeline steps
  const setDemoToStep = (step: number) => {
    setDemoStep(step);

    if (step === 0) {
      // Reset database state to normal
      setUsers(mockUsers);
      setActivities(baselineActivities);
      setAlerts(baselineAlerts);
      setChatMessages([
        {
          id: 'msg-0',
          sender: 'ai',
          text: 'Welcome to IndiTech AI Copilot. I am continuously monitoring banking channels, database schemas, and privileged administrative access. System perimeter is secure.',
          timestamp: new Date().toISOString(),
        }
      ]);
    }

    if (step === 1) {
      // David Miller logs in from a suspicious country (Russia) at 02:14 AM
      const newActivity: ActivityLog = {
        id: 'A901',
        userId: 'U104',
        userName: 'David Miller',
        userRole: 'System Administrator',
        department: 'IT Systems',
        action: 'Admin Login - Unusual Location',
        module: 'Authentication',
        ip: '91.210.107.5',
        device: 'LX-DEVEL-OS',
        browser: 'Firefox',
        os: 'Linux (Ubuntu)',
        location: 'Moscow, Russia',
        timestamp: '2026-07-14T02:14:00Z',
        riskScore: 65, // Individual score is high due to country/device
        status: 'FLAGGED',
      };

      setActivities(prev => [newActivity, ...prev]);

      // Copilot alerts user
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-1`,
          sender: 'ai',
          text: '🚨 [ANOMALY DETECTED]: System Administrator David Miller has just logged in from Russia (IP: 91.210.107.5) at 02:14 AM local time using a new Linux device. Investigating credentials and concurrent actions...',
          timestamp: new Date().toISOString(),
        }
      ]);
    }

    if (step === 2) {
      // David downloads a 1.8GB database file and executes DROP TABLE
      const act1: ActivityLog = {
        id: 'A902',
        userId: 'U104',
        userName: 'David Miller',
        userRole: 'System Administrator',
        department: 'IT Systems',
        action: 'Database Export - payroll_master (1.8 GB)',
        module: 'Database',
        ip: '91.210.107.5',
        device: 'LX-DEVEL-OS',
        browser: 'Firefox',
        os: 'Linux (Ubuntu)',
        location: 'Moscow, Russia',
        timestamp: '2026-07-14T02:15:30Z',
        riskScore: 85,
        status: 'FLAGGED',
      };

      const act2: ActivityLog = {
        id: 'A903',
        userId: 'U104',
        userName: 'David Miller',
        userRole: 'System Administrator',
        department: 'IT Systems',
        action: 'Suspicious Command: sh shred_audit_logs.sh && DROP TABLE client_records;',
        module: 'Console',
        ip: '91.210.107.5',
        device: 'LX-DEVEL-OS',
        browser: 'Firefox',
        os: 'Linux (Ubuntu)',
        location: 'Moscow, Russia',
        timestamp: '2026-07-14T02:16:15Z',
        riskScore: 95,
        status: 'FLAGGED',
      };

      // Generate Critical Alert
      const newAlert: AlertRecord = {
        id: 'ALT-2026-95',
        userId: 'U104',
        userName: 'David Miller',
        department: 'IT Systems',
        severity: 'CRITICAL',
        riskScore: 95,
        description: 'Privileged Privilege Escalation & DB Sabotage Attempt',
        timestamp: '2026-07-14T02:16:15Z',
        aiConfidence: 98.4,
        assignedAnalyst: 'Alice Smith',
        status: 'OPEN',
        evidence: [
          'Unrecognized Device login (LX-DEVEL-OS) from Moscow, Russia',
          'Off-hours Activity (02:14 AM IST)',
          'Large Data Download (1.8 GB Payroll Schema)',
          'Destructive Terminal Commands (DROP TABLE, shred_audit_logs.sh)'
        ],
        explanation: 'AI Risk Engine detected a sequence of high-severity anomalies for David Miller. Login originated from Russia at midnight, followed by the exfiltration of confidential payroll files and a terminal command attempting to delete database audit logs and drop client tables. Combined risk score calculated at 95/100.',
      };

      // Update users list to show David at 95 risk score
      setUsers(prev => prev.map(u => u.id === 'U104' ? { ...u, riskScore: 95 } : u));
      setActivities(prev => [act2, act1, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);

      // Copilot warning update
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}-2`,
          sender: 'ai',
          text: '💥 [CRITICAL ALERT]: David Miller\'s Risk Score has escalated to 95/100. Insider Threat / Credential Takeover confirmed. An interactive Incident Report (ID: ALT-2026-95) has been generated. Security recommendation: Block David Miller\'s account and revoke database permissions immediately.',
          timestamp: new Date().toISOString(),
        }
      ]);
    }

    if (step === 3) {
      // Analyst mitigates threat: blocks David
      blockUser('U104');
    }
  };

  const advanceDemo = () => {
    if (demoStep < 3) {
      setDemoToStep(demoStep + 1);
    }
  };

  const resetDemo = () => {
    setDemoToStep(0);
  };

  // SOC Action Methods
  const blockUser = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: 'BLOCKED', riskScore: 10 }; // risk goes back down after mitigation
      }
      return u;
    }));

    // Update alert status to mitigated
    setAlerts(prev => prev.map(alt => {
      if (alt.userId === userId && alt.status === 'OPEN') {
        return { ...alt, status: 'MITIGATED' };
      }
      return alt;
    }));

    // Log the mitigation in activities
    const mitigationLog: ActivityLog = {
      id: `A${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.id || 'U101',
      userName: currentUser?.name || 'Alice Smith',
      userRole: currentRole || 'SOC Analyst',
      department: currentUser?.department || 'Security Operations',
      action: `ACCOUNT BLOCKED - User ID ${userId} disabled & OAuth tokens revoked.`,
      module: 'Mitigation',
      ip: '10.120.45.12',
      device: 'IN-SOC-L01',
      browser: 'Chrome',
      os: 'Windows 11',
      location: 'Mumbai, India',
      timestamp: new Date().toISOString(),
      riskScore: 0,
      status: 'ALLOWED'
    };

    setActivities(prev => [mitigationLog, ...prev]);

    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}-mitigate`,
        sender: 'ai',
        text: '✅ Action Complete: Account status for David Miller updated to "BLOCKED". AD credentials disabled, LDAP binding terminated, database access revoked, and Active Directory session tokens purged. Security perimeter is secure.',
        timestamp: new Date().toISOString(),
      }
    ]);

    setDemoStep(3);
  };

  const forceMfa = (userId: string) => {
    // Force user to log out and complete MFA again
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    // Log action
    const mfaLog: ActivityLog = {
      id: `A${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.id || 'U101',
      userName: currentUser?.name || 'Alice Smith',
      userRole: currentRole || 'SOC Analyst',
      department: currentUser?.department || 'Security Operations',
      action: `FORCE MFA CHALLENGE - Dispatched to user ${targetUser.name}`,
      module: 'Mitigation',
      ip: '10.120.45.12',
      device: 'IN-SOC-L01',
      browser: 'Chrome',
      os: 'Windows 11',
      location: 'Mumbai, India',
      timestamp: new Date().toISOString(),
      riskScore: 0,
      status: 'ALLOWED'
    };

    setActivities(prev => [mfaLog, ...prev]);
    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}-mfa`,
        sender: 'ai',
        text: `Sent a step-up MFA challenge token to ${targetUser.name}'s registered mobile device. Blocking further sessions until authenticated.`,
        timestamp: new Date().toISOString(),
      }
    ]);
  };

  const closeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alt => alt.id === alertId ? { ...alt, status: 'CLOSED' } : alt));
  };

  const escalateAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alt => alt.id === alertId ? { ...alt, status: 'ESCALATED' } : alt));
    setChatMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}-escalate`,
        sender: 'ai',
        text: `Alert ${alertId} has been escalated to Tier-3 incident response team and the Chief Information Security Officer (CISO).`,
        timestamp: new Date().toISOString(),
      }
    ]);
  };

  // AI Copilot Chat Engine
  const sendCopilotMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Simulate cyber security response based on input query
    setTimeout(() => {
      let reply = "I'm analyzing that query. Could you specify which system component or threat incident you are referring to?";

      const query = text.toLowerCase();

      if (query.includes('david') || query.includes('flagged') || query.includes('anomal')) {
        if (demoStep >= 2) {
          reply = `David Miller was flagged with a Critical Risk Score (95/100) due to multiple high-fidelity insider threat indicators:
1. **Odd Hour Login**: Authenticated at 02:14 AM IST (standard working window is 9 AM - 6 PM).
2. **Geographical Anomaly**: Authenticated from Moscow, Russia (IP: 91.210.107.5) while his active workspace is located in Mumbai, India.
3. **Unrecognized Host**: Used an unmanaged Linux (Ubuntu) workstation instead of his corporate Windows notebook.
4. **Data Exfiltration**: Downloaded 1.8 GB of sensitive HR payroll files.
5. **Sabotage Attempt**: Executed \`sh shred_audit_logs.sh\` followed by a database command to \`DROP TABLE client_records;\`.

I recommend immediate account lock and key rollover.`;
        } else {
          reply = "David Miller is currently displaying normal baseline behavior (Risk Score: 15). His last login was today at 10:00 AM from a corporate network IP in Mumbai, India.";
        }
      } else if (query.includes('risk score') || query.includes('calculate')) {
        reply = `The IndiTech Risk Analytics Engine calculates score dynamically using:
• Unrecognized Device (+20)
• Geographical Jump / New Country (+30)
• Midnight / Off-Hours login (+15)
• Sensitive database schema access (+25)
• File download volumes exceeding 500 MB (+25)
• Destructive terminal commands or code (+35)
Risk Levels: Low (0-30), Medium (31-60), High (61-80), Critical (81-100). The engine auto-triggers alerts for scores > 60.`;
      } else if (query.includes('critical threats') || query.includes('today')) {
        if (demoStep >= 2) {
          reply = "Today's critical threats list contains 1 item: Alert ALT-2026-95 for David Miller (Systems Dept). Activity includes credential takeover, unauthorized data access, and database drop commands. Risk Score: 95. Action: Immediate mitigation recommended.";
        } else {
          reply = "All security perimeters report green. There are no active critical alerts generated today. Check the alerts logs for past closed incidents.";
        }
      } else if (query.includes('action') || query.includes('recommend')) {
        if (demoStep >= 2) {
          reply = "Recommended Action: Block David Miller's user account in Active Directory, trigger session revocation on the database server, and force multi-factor authentication reset on all secondary devices.";
        } else {
          reply = "Systems are currently stable. We recommend maintaining standard security policies and completing the pending ISO-27001 audit reviews.";
        }
      } else if (query.includes('report') || query.includes('summary')) {
        reply = `I have generated an executive incident summary for the current alert:
• **Incident ID**: INC-2026-95
• **Target Node**: David Miller (SysAdmin)
• **Vectors**: Remote authentication bypass, data exfiltration, destructive command injection.
• **Root Cause**: Compromised administrator credentials or insider malicious action.
You can view and print the complete, high-fidelity compliance PDF on the 'Incident Reports' tab in the left sidebar.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toISOString()
      };

      setChatMessages(prev => [...prev, aiMsg]);
    }, 8000); // 800ms delay to make it feel organic
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      isAuthenticated,
      isMfaStep,
      login,
      verifyMfa,
      logout,
      switchRole,
      users,
      activities,
      alerts,
      complianceList,
      chatMessages,
      demoStep,
      advanceDemo,
      resetDemo,
      setDemoToStep,
      blockUser,
      forceMfa,
      closeAlert,
      escalateAlert,
      sendCopilotMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
