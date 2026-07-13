import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLog } from '../types';
import { 
  Activity, Search, Filter, Play, CheckCircle2, AlertTriangle, XOctagon, 
  Terminal, Monitor, Compass, MapPin
} from 'lucide-react';

export const LiveActivity: React.FC = () => {
  const { activities, users, demoStep } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState('ALL');

  // Local helper to simulate a custom banking activity on request
  const [localActivities, setLocalActivities] = useState<ActivityLog[]>([]);

  // Merge context activities and local simulated ones
  const allActivities = [...localActivities, ...activities];

  const handleSimulateRandom = () => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const scenarios = [
      { action: 'Payroll File Download (24 MB)', module: 'Finance Portal', risk: 38, status: 'FLAGGED' as const, ip: '10.120.55.19', location: 'Bangalore, India' },
      { action: 'PowerShell Console Execution - Get-Process', module: 'System Shell', risk: 42, status: 'FLAGGED' as const, ip: '10.120.10.45', location: 'Mumbai, India' },
      { action: 'Failed MFA authentication challenge', module: 'Authentication', risk: 25, status: 'FLAGGED' as const, ip: '10.120.45.8', location: 'Mumbai, India' },
      { action: 'USB Device Connected - Mass Storage Host', module: 'Endpoint', risk: 35, status: 'FLAGGED' as const, ip: '10.120.12.8', location: 'Delhi, India' },
      { action: 'Suspicious SQL SELECT query on database', module: 'Database', risk: 48, status: 'FLAGGED' as const, ip: '10.120.80.3', location: 'Mumbai, India' },
      { action: 'Firewall outbound rules updated', module: 'Network', risk: 15, status: 'ALLOWED' as const, ip: '10.120.45.2', location: 'Mumbai, India' }
    ];

    const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
    const newLog: ActivityLog = {
      id: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: randomUser.id,
      userName: randomUser.name,
      userRole: randomUser.role,
      department: randomUser.department,
      action: pick.action,
      module: pick.module,
      ip: pick.ip,
      device: `IN-${randomUser.department.substring(0, 3).toUpperCase()}-WS09`,
      browser: 'Chrome',
      os: 'Windows 11',
      location: pick.location,
      timestamp: new Date().toISOString(),
      riskScore: pick.risk,
      status: pick.status
    };

    setLocalActivities(prev => [newLog, ...prev]);
  };

  const filteredLogs = allActivities.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);

    const matchesDept = filterDept === 'ALL' || log.department === filterDept;
    
    let matchesRisk = true;
    if (filterRisk === 'LOW') matchesRisk = log.riskScore <= 30;
    else if (filterRisk === 'MEDIUM') matchesRisk = log.riskScore > 30 && log.riskScore <= 60;
    else if (filterRisk === 'HIGH') matchesRisk = log.riskScore > 60 && log.riskScore <= 80;
    else if (filterRisk === 'CRITICAL') matchesRisk = log.riskScore > 80;

    return matchesSearch && matchesDept && matchesRisk;
  });

  const departments = ['ALL', 'Security Operations', 'Infrastructure', 'IT Systems', 'Finance', 'Internal Audit'];

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Filters Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search & Select Controls */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan transition-colors"
              placeholder="Search by user, IP, or actions..."
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="bg-cyber-darkBlue/70 border border-gray-800 text-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-cyber-darkBlue/70 border border-gray-800 text-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Risk Scores</option>
              <option value="LOW">Low Risk (&le; 30)</option>
              <option value="MEDIUM">Medium Risk (31-60)</option>
              <option value="HIGH">High Risk (61-80)</option>
              <option value="CRITICAL">Critical Risk (&gt; 80)</option>
            </select>
          </div>

        </div>

        {/* Live Simulation Injector Trigger */}
        <button
          onClick={handleSimulateRandom}
          className="bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/40 hover:shadow-cyber text-cyber-cyan px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <Play className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
          Inject Banking Event
        </button>

      </div>

      {/* Activities Timeline stream */}
      <div className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-cyber-darkBlue/90 px-5 py-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span>telemetry_stream_monitor.sh</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 bg-risk-safe rounded-full animate-ping"></span>
              Live Feed Connected
            </span>
            <span className="text-gray-600">|</span>
            <span>Total Logs: {filteredLogs.length}</span>
          </div>
        </div>

        {/* Scrolling Grid Area */}
        <div className="max-h-[550px] overflow-y-auto divide-y divide-gray-800/60 font-mono">
          
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-semibold text-xs">
              No matching activity records detected in buffer.
            </div>
          ) : (
            filteredLogs.map((log) => {
              
              // Determine risk colors
              let riskColor = 'text-risk-safe bg-risk-safe/10 border-risk-safe/20';
              let badgeIcon = <CheckCircle2 className="w-3.5 h-3.5 text-risk-safe" />;
              
              if (log.riskScore > 80) {
                riskColor = 'text-risk-critical bg-risk-critical/10 border-risk-critical/30';
                badgeIcon = <XOctagon className="w-3.5 h-3.5 text-risk-critical" />;
              } else if (log.riskScore > 50) {
                riskColor = 'text-risk-high bg-risk-high/10 border-risk-high/30';
                badgeIcon = <AlertTriangle className="w-3.5 h-3.5 text-risk-high" />;
              } else if (log.riskScore > 30) {
                riskColor = 'text-risk-medium bg-risk-medium/10 border-risk-medium/20';
                badgeIcon = <AlertTriangle className="w-3.5 h-3.5 text-risk-medium" />;
              }

              return (
                <div key={log.id} className="p-4 bg-cyber-navy/20 hover:bg-cyber-slate/10 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs">
                  
                  {/* Left block: User & Action */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {badgeIcon}
                      <span className="font-bold text-gray-200">{log.userName}</span>
                      <span className="text-[10px] text-gray-500">({log.userRole} &bull; {log.department})</span>
                      <span className="text-[9px] text-cyber-purple font-semibold bg-cyber-purple/10 px-1.5 py-0.5 rounded border border-cyber-purple/20">
                        {log.module}
                      </span>
                    </div>

                    <h4 className="text-gray-300 font-bold text-sm tracking-wide bg-cyber-darkBlue/30 p-2 rounded border border-gray-800/80 inline-block md:max-w-xl">
                      {log.action}
                    </h4>

                    {/* Metadata specs */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-gray-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Monitor className="w-3.5 h-3.5 text-gray-500" />
                        Host: {log.device} ({log.os} / {log.browser})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        IP: {log.ip} &bull; {log.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-gray-500" />
                        Time: {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Right block: Risk Score Badge & Actions */}
                  <div className="flex md:flex-col items-end gap-2 shrink-0 justify-between md:justify-start">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Anomaly index</span>
                    <div className={`px-3 py-1 rounded border text-center font-bold text-sm min-w-[70px] ${riskColor}`}>
                      {log.riskScore}
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 font-mono">
                      ID: {log.id}
                    </span>
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
};
