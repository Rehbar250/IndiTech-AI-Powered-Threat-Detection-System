import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Bell, 
  ChevronDown, 
  ShieldAlert, 
  Terminal, 
  RefreshCw, 
  ArrowRight,
  Eye
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTab }) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    demoStep, 
    setDemoToStep, 
    advanceDemo 
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'DASHBOARD': return 'Executive Security Overview';
      case 'LIVE_ACTIVITY': return 'Continuous Activity Stream';
      case 'USERS': return 'User Behavioral Profiles';
      case 'THREAT_DETECTION': return 'AI Risk Engine Calculator';
      case 'RISK_ANALYTICS': return 'Behavioral Risk Analytics';
      case 'ALERTS': return 'Alerts Operations Center';
      case 'INCIDENT_REPORTS': return 'Executive Incident Reports';
      case 'AI_COPILOT': return 'IndiTech AI Copilot';
      case 'AUDIT_LOGS': return 'System Activity Audit Trails';
      case 'COMPLIANCE': return 'Regulatory Compliance Dashboard';
      case 'SETTINGS': return 'Platform Configuration';
      default: return 'IndiTech Security Console';
    }
  };

  const rolesList: { value: UserRole; label: string }[] = [
    { value: 'SOC_ANALYST', label: 'SOC Analyst' },
    { value: 'SECURITY_ADMIN', label: 'Security Admin' },
    { value: 'RISK_MANAGER', label: 'Risk Manager' },
    { value: 'AUDITOR', label: 'Compliance Auditor' },
    { value: 'SYSTEM_ADMIN', label: 'System Admin' }
  ];

  return (
    <header className="h-20 glass-panel border-b border-gray-800 flex items-center justify-between px-8 relative z-30 no-print select-none">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-wide leading-none">
          {getTabTitle()}
        </h1>
        <p className="text-[10px] text-gray-500 font-mono mt-1">
          SESSION://INDITECH.SECURE_TUNNEL.0x3f2a
        </p>
      </div>

      {/* DEMO WORKFLOW CONTROLLER PANEL */}
      <div className="flex items-center gap-2 bg-cyber-darkBlue/80 border border-cyber-cyan/30 rounded-xl p-1.5 shadow-cyber max-w-lg">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-cyber-cyan/10 rounded-lg text-cyber-cyan font-bold text-[9px] uppercase tracking-wider font-mono">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          Demo Flow
        </div>

        {/* Timeline Steps Indicator */}
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          {[
            { step: 0, label: 'Baseline' },
            { step: 1, label: 'Login Anomaly' },
            { step: 2, label: 'Threat Spikes' },
            { step: 3, label: 'Resolved' }
          ].map((item) => {
            const isCompleted = demoStep >= item.step;
            const isCurrent = demoStep === item.step;
            return (
              <React.Fragment key={item.step}>
                {item.step > 0 && <ArrowRight className="w-2.5 h-2.5 text-gray-700" />}
                <button
                  onClick={() => setDemoToStep(item.step)}
                  className={`px-2 py-0.5 rounded transition-all font-semibold ${
                    isCurrent 
                      ? 'bg-cyber-cyan text-cyber-navy font-extrabold shadow-cyber'
                      : isCompleted 
                        ? 'text-cyber-cyan hover:bg-cyber-cyan/5' 
                        : 'text-gray-600 hover:text-gray-400'
                  }`}
                  title={`Jump to step: ${item.label}`}
                >
                  {item.step + 1}. {item.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Action Button */}
        {demoStep < 3 && (
          <button
            onClick={advanceDemo}
            className="ml-2 px-2.5 py-1 rounded-lg bg-cyber-cyan hover:bg-cyber-cyan/90 text-cyber-navy font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
          >
            Next Step
            <ArrowRight className="w-3 h-3" />
          </button>
        )}

        {demoStep === 3 && (
          <button
            onClick={() => setDemoToStep(0)}
            className="ml-2 px-2.5 py-1 rounded-lg bg-risk-safe hover:bg-risk-safe/90 text-cyber-navy font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all"
          >
            Reset Demo
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* User Context & Role Switcher */}
      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-slate/50 border border-gray-800 text-xs font-semibold text-gray-300 hover:border-cyber-cyan transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="text-gray-400">View as:</span>
            <span className="text-white font-bold">
              {rolesList.find(r => r.value === currentRole)?.label}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-cyber-slate border border-gray-800 shadow-glass z-40 p-1">
              <div className="px-2 py-1 text-[9px] text-gray-500 uppercase tracking-widest font-bold border-b border-gray-800">
                Authorize Profile
              </div>
              {rolesList.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    switchRole(item.value);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-2 py-2 rounded text-xs font-semibold mt-1 transition-all ${
                    currentRole === item.value
                      ? 'bg-cyber-cyan/10 text-cyber-cyan font-bold'
                      : 'text-gray-300 hover:bg-cyber-darkBlue/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon (Alerting if threat triggers) */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-gray-400 hover:text-cyber-cyan transition-colors" />
          {demoStep >= 2 && (
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-risk-critical animate-ping"></span>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-9 h-9 rounded-lg object-cover border border-gray-700 shadow"
          />
          <div className="text-left hidden md:block">
            <h4 className="text-xs font-bold text-gray-200 leading-none">
              {currentUser?.name}
            </h4>
            <span className="text-[9px] text-gray-500 font-mono mt-1 block">
              {currentUser?.department}
            </span>
          </div>
        </div>
      </div>

    </header>
  );
};
