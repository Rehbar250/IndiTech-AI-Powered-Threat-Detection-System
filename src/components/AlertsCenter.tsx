import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertRecord } from '../types';
import { 
  Bell, Search, Filter, AlertTriangle, AlertCircle, ShieldCheck, Play, 
  UserMinus, UserCheck, ShieldAlert, CheckCircle, RefreshCw, HardDrive, FileTerminal, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AlertsCenter: React.FC = () => {
  const { 
    alerts, 
    blockUser, 
    forceMfa, 
    closeAlert, 
    escalateAlert, 
    demoStep,
    setDemoToStep
  } = useApp();

  const [selectedAlertId, setSelectedAlertId] = useState<string>(
    alerts.find(a => a.status === 'OPEN')?.id || alerts[0]?.id || ''
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const filteredAlerts = alerts.filter(alt => {
    const matchesSearch = 
      alt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alt.id.includes(searchTerm);

    const matchesSeverity = filterSeverity === 'ALL' || alt.severity === filterSeverity;
    const matchesStatus = filterStatus === 'ALL' || alt.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Action wrappers with visual feedback
  const handleBlockUser = (userId: string) => {
    blockUser(userId);
    // Trigger success confetti when mitigating the critical demo threat!
    if (userId === 'U104') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Automatically advance demo step to Step 3 (Resolved)
      setDemoToStep(3);
    }
  };

  const handleForceMfa = (userId: string) => {
    forceMfa(userId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none font-sans h-[650px]">
      
      {/* Left 1 Column: Alerts List Box */}
      <div className="lg:col-span-1 glass-panel rounded-xl border border-gray-800 flex flex-col h-full overflow-hidden">
        
        {/* Toolbar filters */}
        <div className="p-4 border-b border-gray-800 space-y-3 bg-cyber-darkBlue/20">
          
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
              placeholder="Search ID, User, or Description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-cyber-darkBlue/70 border border-gray-800 text-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-cyber-darkBlue/70 border border-gray-800 text-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="MITIGATED">Mitigated</option>
              <option value="CLOSED">Closed</option>
              <option value="ESCALATED">Escalated</option>
            </select>
          </div>

        </div>

        {/* Scrolling Alerts list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-semibold text-xs">
              No matching alert records in inbox.
            </div>
          ) : (
            filteredAlerts.map((alt) => {
              const isSelected = selectedAlert?.id === alt.id;
              
              // Colors based on severity
              let indicatorColor = 'bg-risk-safe';
              if (alt.severity === 'CRITICAL') indicatorColor = 'bg-risk-critical animate-pulse';
              else if (alt.severity === 'HIGH') indicatorColor = 'bg-risk-high';
              else if (alt.severity === 'MEDIUM') indicatorColor = 'bg-risk-medium';

              return (
                <button
                  key={alt.id}
                  onClick={() => setSelectedAlertId(alt.id)}
                  className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                    isSelected 
                      ? 'bg-cyber-cyan/15 hover:bg-cyber-cyan/20 border-l-2 border-cyber-cyan' 
                      : 'bg-cyber-navy/10 hover:bg-cyber-slate/10 border-l-2 border-transparent'
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 ${indicatorColor}`}></span>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-gray-300">{alt.id}</span>
                      <span className="text-[9px] text-gray-500">{new Date(alt.timestamp).toLocaleTimeString()}</span>
                    </div>
                    
                    <h4 className="text-xs font-bold text-gray-200 truncate">{alt.description}</h4>
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>User: {alt.userName}</span>
                      <span className="font-mono font-bold bg-cyber-darkBlue px-1.5 py-0.5 rounded text-[9px] text-cyber-cyan">
                        Score: {alt.riskScore}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

      </div>

      {/* Right 2 Columns: Selected Alert Details */}
      <div className="lg:col-span-2 glass-panel rounded-xl border border-gray-800 flex flex-col h-full overflow-hidden text-left">
        {selectedAlert ? (
          <div className="flex flex-col h-full">
            
            {/* Header info */}
            <div className="p-6 border-b border-gray-800 bg-cyber-darkBlue/25 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* ID badge and status indicator */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-gray-400">{selectedAlert.id}</span>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                    selectedAlert.status === 'OPEN'
                      ? 'bg-risk-critical/10 border-risk-critical/30 text-risk-critical animate-pulse'
                      : selectedAlert.status === 'MITIGATED' || selectedAlert.status === 'CLOSED'
                        ? 'bg-risk-safe/10 border-risk-safe/30 text-risk-safe'
                        : 'bg-risk-medium/10 border-risk-medium/20 text-risk-medium'
                  }`}>
                    {selectedAlert.status}
                  </span>
                </div>

                {/* Risk and AI indicators */}
                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 font-bold uppercase text-[9px]">AI Confidence:</span>
                    <span className="text-cyber-cyan font-bold bg-cyber-cyan/10 px-1.5 py-0.5 rounded">
                      {selectedAlert.aiConfidence}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 font-bold uppercase text-[9px]">Calculated Risk:</span>
                    <span className="text-risk-critical font-bold bg-risk-critical/10 px-1.5 py-0.5 rounded">
                      {selectedAlert.riskScore}/100
                    </span>
                  </div>
                </div>

              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-snug">{selectedAlert.description}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Targeted Employee: <strong className="text-gray-200">{selectedAlert.userName}</strong> ({selectedAlert.department}) &bull; Assigned: {selectedAlert.assignedAnalyst}
                </p>
              </div>
            </div>

            {/* Content scrolling panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* AI Reasoning Panel */}
              <div className="p-4 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 space-y-2">
                <h4 className="text-xs font-extrabold text-cyber-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyber-cyan" />
                  AI Security Interpretation
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedAlert.explanation}</p>
              </div>

              {/* Forensic Evidence Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileTerminal className="w-4 h-4 text-cyber-purple" />
                  Telemetry Log Evidence ({selectedAlert.evidence.length})
                </h4>
                <div className="space-y-2">
                  {selectedAlert.evidence.map((line, index) => (
                    <div key={index} className="p-3 bg-cyber-navy/20 border border-gray-800/80 rounded-lg flex items-start gap-2.5 font-mono text-[11px] text-gray-400">
                      <HardDrive className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                      <span className="text-gray-300 leading-normal">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mitigation control footer */}
            <div className="p-4 border-t border-gray-800 bg-cyber-darkBlue/45 flex flex-wrap gap-2.5 justify-end">
              
              {/* Mitigation Options */}
              {selectedAlert.status !== 'CLOSED' && selectedAlert.status !== 'MITIGATED' && (
                <>
                  <button
                    onClick={() => handleForceMfa(selectedAlert.userId)}
                    className="px-3.5 py-2 border border-cyber-cyan/30 bg-cyber-cyan/5 hover:bg-cyber-cyan/10 text-cyber-cyan rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-cyber-cyan" />
                    Force MFA Reset
                  </button>

                  <button
                    onClick={() => handleBlockUser(selectedAlert.userId)}
                    className="px-3.5 py-2 border border-risk-critical/40 bg-risk-critical/10 hover:bg-risk-critical/20 text-risk-critical rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all hover:shadow-redGlow"
                  >
                    <UserMinus className="w-3.5 h-3.5 text-risk-critical" />
                    Block User Account
                  </button>
                </>
              )}

              {/* Status Update Options */}
              {selectedAlert.status === 'OPEN' && (
                <button
                  onClick={() => escalateAlert(selectedAlert.id)}
                  className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                  Escalate
                </button>
              )}

              <button
                onClick={() => closeAlert(selectedAlert.id)}
                className="px-3.5 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5 text-cyber-navy" />
                Close Alert
              </button>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 font-semibold text-xs h-full flex items-center justify-center">
            No alert details available.
          </div>
        )}
      </div>

    </div>
  );
};
