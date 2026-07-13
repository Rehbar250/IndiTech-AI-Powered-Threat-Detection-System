import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LiveActivity } from './components/LiveActivity';
import { UserProfile } from './components/UserProfile';
import { ThreatDetection } from './components/ThreatDetection';
import { RiskAnalytics } from './components/RiskAnalytics';
import { AlertsCenter } from './components/AlertsCenter';
import { AICopilot } from './components/AICopilot';
import { IncidentReports } from './components/IncidentReports';
import { AuditLogs } from './components/AuditLogs';
import { Compliance } from './components/Compliance';
import { SettingsPanel } from './components/Settings';

export const App: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('DASHBOARD');

  // Authenticate routing
  if (!isAuthenticated) {
    return <Login />;
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'LIVE_ACTIVITY':
        return <LiveActivity />;
      case 'USERS':
        return <UserProfile />;
      case 'THREAT_DETECTION':
        return <ThreatDetection />;
      case 'RISK_ANALYTICS':
        return <RiskAnalytics />;
      case 'ALERTS':
        return <AlertsCenter />;
      case 'INCIDENT_REPORTS':
        return <IncidentReports />;
      case 'AI_COPILOT':
        return <AICopilot />;
      case 'AUDIT_LOGS':
        return <AuditLogs />;
      case 'COMPLIANCE':
        return <Compliance />;
      case 'SETTINGS':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-radial-cyber text-gray-100">
      
      {/* Navigation Sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Console Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header Console */}
        <Header currentTab={currentTab} />

        {/* Dashboard Pages Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          
          {/* Subtle network lines background overlay */}
          <div className="absolute inset-0 bg-grid-cyber bg-[size:32px_32px] opacity-5 pointer-events-none"></div>

          {/* Render Active View */}
          <div className="relative z-10 max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>

        </main>

      </div>

    </div>
  );
};

export default App;
