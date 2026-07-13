import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  Cpu, 
  LineChart, 
  Bell, 
  FileText, 
  Sparkles, 
  History, 
  FileCheck, 
  Settings, 
  LogOut,
  ShieldAlert,
  Server
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { logout, currentRole, alerts, demoStep } = useApp();

  // Highlight alerts count
  const openAlertsCount = alerts.filter(a => a.status === 'OPEN').length;

  const menuItems = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'LIVE_ACTIVITY', label: 'Live Activity', icon: Activity, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'USERS', label: 'Users', icon: Users, roles: ['SOC_ANALYST', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'THREAT_DETECTION', label: 'Threat Detection', icon: Cpu, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'RISK_MANAGER', 'SYSTEM_ADMIN'] },
    { id: 'RISK_ANALYTICS', label: 'Risk Analytics', icon: LineChart, roles: ['SOC_ANALYST', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'ALERTS', label: 'Alerts Center', icon: Bell, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'SYSTEM_ADMIN'], badge: openAlertsCount },
    { id: 'INCIDENT_REPORTS', label: 'Incident Reports', icon: FileText, roles: ['SOC_ANALYST', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'AI_COPILOT', label: 'AI Copilot', icon: Sparkles, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'RISK_MANAGER', 'SYSTEM_ADMIN'], badgeText: 'AI' },
    { id: 'AUDIT_LOGS', label: 'Audit Logs', icon: History, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'COMPLIANCE', label: 'Compliance', icon: FileCheck, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'RISK_MANAGER', 'AUDITOR', 'SYSTEM_ADMIN'] },
    { id: 'SETTINGS', label: 'Settings', icon: Settings, roles: ['SOC_ANALYST', 'SECURITY_ADMIN', 'SYSTEM_ADMIN'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole || ''));

  return (
    <aside className="w-64 glass-panel border-r border-gray-800 flex flex-col h-screen sticky top-0 no-print select-none">
      {/* Brand Logo & Header */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyber-cyan to-cyber-purple p-0.5 flex items-center justify-center shadow-cyber relative">
          <div className="absolute inset-0 bg-cyber-cyan/20 rounded-lg animate-ping opacity-25"></div>
          <ShieldAlert className="w-5 h-5 text-cyber-navy" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyber-cyan to-white bg-clip-text text-transparent m-0 leading-none">
            IndiTech
          </h2>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest block mt-1 font-semibold">
            Threat Detection Engine
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-cyber-cyan/10 text-cyber-cyan border-l-2 border-cyber-cyan font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-cyber-slate/30 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 transition-colors ${
                  isActive ? 'text-cyber-cyan' : 'text-gray-400 group-hover:text-cyber-cyan'
                }`} />
                <span>{item.label}</span>
              </div>
              
              {/* Badge markers */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  demoStep === 2 ? 'bg-risk-critical text-white animate-bounce' : 'bg-cyber-slateLight text-gray-300'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.badgeText && (
                <span className="px-1.5 py-0.5 rounded text-[8px] bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-navy font-extrabold uppercase tracking-wide">
                  {item.badgeText}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Widget */}
      <div className="p-4 border-t border-gray-800 space-y-4">
        <div className={`p-3.5 rounded-xl border ${
          demoStep === 2
            ? 'bg-risk-critical/10 border-risk-critical/30'
            : 'bg-cyber-darkBlue/40 border-gray-800'
        } transition-all duration-300`}>
          <div className="flex items-center gap-3">
            <div className="relative flex">
              <span className={`flex h-2.5 w-2.5 rounded-full ${
                demoStep === 2 ? 'bg-risk-critical' : 'bg-risk-safe'
              }`}></span>
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                demoStep === 2 ? 'bg-risk-critical' : 'bg-risk-safe'
              }`}></span>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Status</p>
              <h4 className="text-[11px] font-bold text-gray-200 mt-0.5">
                {demoStep === 2 ? 'Security Incident Active' : 'All Systems Operational'}
              </h4>
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-2 font-mono flex items-center gap-1">
            <Server className="w-3 h-3 text-cyber-cyan" />
            RBI-Core Endpoint Secured
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-400 hover:text-risk-critical hover:bg-risk-critical/10 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Security Session</span>
        </button>
      </div>
    </aside>
  );
};
