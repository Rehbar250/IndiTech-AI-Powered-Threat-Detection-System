import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRecord } from '../types';
import { 
  User, Shield, ShieldAlert, ShieldX, Key, MapPin, Monitor, History, 
  CheckCircle, Database, AlertCircle, BarChart3, HelpCircle
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { users, activities, demoStep } = useApp();
  
  // Default to David Miller (U104) if possible, else the first user
  const initialUser = users.find(u => u.id === 'U104') || users[0];
  const [selectedUserId, setSelectedUserId] = useState<string>(initialUser.id);
  
  const selectedUser = users.find(u => u.id === selectedUserId) || initialUser;

  // Filter activities corresponding to the selected user
  const userActivities = activities.filter(a => a.userId === selectedUser.id);

  // Compute risk level representation
  let riskLevel = 'LOW';
  let riskBg = 'bg-risk-safe/10 border-risk-safe/30 text-risk-safe';
  if (selectedUser.riskScore > 80) {
    riskLevel = 'CRITICAL';
    riskBg = 'bg-risk-critical/15 border-risk-critical/40 text-risk-critical shadow-redGlow animate-pulse';
  } else if (selectedUser.riskScore > 50) {
    riskLevel = 'HIGH';
    riskBg = 'bg-risk-high/15 border-risk-high/40 text-risk-high';
  } else if (selectedUser.riskScore > 30) {
    riskLevel = 'MEDIUM';
    riskBg = 'bg-risk-medium/15 border-risk-medium/30 text-risk-medium';
  }

  // Pre-configured behavioral baseline anomalies for the target demo (David Miller)
  const isDavid = selectedUser.id === 'U104';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none font-sans">
      
      {/* Left Column: User Master List */}
      <div className="lg:col-span-1 glass-panel rounded-xl border border-gray-800 p-4 space-y-3 h-full">
        <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest px-2 mb-2">Monitored Profiles</h3>
        <div className="space-y-1.5">
          {users.map((user) => {
            const isSelected = user.id === selectedUser.id;
            const hasAnomaly = user.riskScore > 60;
            return (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-cyber'
                    : 'bg-cyber-darkBlue/25 border-gray-800/80 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="leading-tight">
                    <h4 className="text-xs font-bold text-gray-200">{user.name}</h4>
                    <span className="text-[9px] text-gray-500 font-mono block">{user.department}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                  hasAnomaly 
                    ? 'bg-risk-critical/20 text-risk-critical animate-pulse' 
                    : 'bg-cyber-slateLight text-gray-400'
                }`}>
                  {user.riskScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right 3 Columns: Detail Behavioral Analytics View */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* User Card Header */}
        <div className="glass-panel p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Neon background light */}
          {selectedUser.riskScore > 60 && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-risk-critical opacity-[0.03] blur-3xl rounded-full"></div>
          )}

          {/* User Bio info */}
          <div className="flex items-center gap-4">
            <img 
              src={selectedUser.avatar} 
              alt={selectedUser.name} 
              className="w-16 h-16 rounded-xl object-cover border border-gray-700 shadow" 
            />
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">{selectedUser.name}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                  selectedUser.status === 'ACTIVE'
                    ? 'bg-risk-safe/10 border-risk-safe/30 text-risk-safe'
                    : 'bg-risk-critical/10 border-risk-critical/30 text-risk-critical'
                }`}>
                  {selectedUser.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">{selectedUser.role} &bull; {selectedUser.department}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Base Location: {selectedUser.location}</span>
                <span>&bull;</span>
                <span>Last Access: {new Date(selectedUser.lastLogin).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* User Risk Level Display */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 justify-between border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold block">Current Risk Score</span>
              <span className={`text-4xl font-black mt-0.5 block ${
                selectedUser.riskScore > 60 ? 'text-risk-critical glow-text-cyan' : 'text-white'
              }`}>
                {selectedUser.riskScore}<span className="text-xs text-gray-500 font-normal"> / 100</span>
              </span>
            </div>
            <span className={`px-2.5 py-1 rounded border text-[10px] font-bold tracking-wider ${riskBg}`}>
              {riskLevel} RISK INDEX
            </span>
          </div>

        </div>

        {/* Behavioral Analytics vs Baseline Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BLOCK 1: BEHAVIORAL ANALYTICS BASELINE */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-cyber-cyan" />
              Behavioral Baselines
            </h3>
            
            <div className="space-y-3.5 text-xs text-left">
              <div>
                <span className="text-gray-500 block text-[9px] uppercase font-mono font-bold">Standard Login Window</span>
                <span className="text-gray-300 font-bold mt-0.5 block">09:00 AM - 06:00 PM IST</span>
                {isDavid && (demoStep === 1 || demoStep === 2) && (
                  <span className="text-[9px] text-risk-critical mt-1 flex items-center gap-0.5 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Off-hours login: 02:14 AM IST (+15)
                  </span>
                )}
              </div>
              <hr className="border-gray-800/60" />
              <div>
                <span className="text-gray-500 block text-[9px] uppercase font-mono font-bold">Usual IP / Locations</span>
                <span className="text-gray-300 font-bold mt-0.5 block">Mumbai &amp; Bangalore (Corporate VPN)</span>
                {isDavid && (demoStep === 1 || demoStep === 2) && (
                  <span className="text-[9px] text-risk-critical mt-1 flex items-center gap-0.5 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    New Country login: Russia (+30)
                  </span>
                )}
              </div>
              <hr className="border-gray-800/60" />
              <div>
                <span className="text-gray-500 block text-[9px] uppercase font-mono font-bold">Average Data Volume</span>
                <span className="text-gray-300 font-bold mt-0.5 block">45 MB / day average</span>
                {isDavid && demoStep >= 2 && (
                  <span className="text-[9px] text-risk-critical mt-1 flex items-center gap-0.5 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Exfiltration peak: 1.8 GB (+25)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BLOCK 2: SYSTEM PRIVILEGES */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-4 h-4 text-cyber-cyan" />
              Active System Privileges
            </h3>
            
            <div className="space-y-2 text-[10px] text-left">
              {selectedUser.privileges.map((priv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1.5 rounded bg-cyber-darkBlue/25 border border-gray-800">
                  <Database className="w-3.5 h-3.5 text-cyber-purple" />
                  <span className="font-mono text-gray-300">{priv}</span>
                </div>
              ))}
              <div className="pt-2">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Security Profile Clearance</span>
                <span className="text-[11px] text-cyber-cyan font-bold mt-0.5 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
                  Tier-1 Admin Override Enabled
                </span>
              </div>
            </div>
          </div>

          {/* BLOCK 3: ASSIGNED DEVICES */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-cyber-cyan" />
              Registered Devices
            </h3>
            
            <div className="space-y-3 text-xs text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-risk-safe/10 text-risk-safe border border-risk-safe/20 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-300 text-xs">IN-SYS-L04 (Standard Laptop)</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Windows 11 &bull; Active Mumbai VPN</p>
                </div>
              </div>

              {isDavid && (demoStep === 1 || demoStep === 2) && (
                <div className="flex items-start gap-2.5 p-2 rounded bg-risk-critical/10 border border-risk-critical/20">
                  <div className="p-1 rounded bg-risk-critical/20 text-risk-critical border border-risk-critical/30 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-risk-critical text-xs">LX-DEVEL-OS (Unknown Host)</h4>
                    <p className="text-[10px] text-risk-critical mt-0.5">Linux (Ubuntu) &bull; Moscow IP</p>
                    <span className="text-[8px] bg-risk-critical text-white px-1.5 py-0.5 rounded font-extrabold uppercase mt-1 inline-block">
                      Unregistered Host (+20)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* User Activity & Risk Timeline */}
        <div className="glass-panel p-6 rounded-xl border border-gray-800">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <History className="w-4 h-4 text-cyber-cyan" />
            Active Session Security Logs
          </h3>

          <div className="space-y-4 font-mono text-left text-xs">
            {userActivities.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No recent activity logs recorded for this user.
              </div>
            ) : (
              userActivities.map((act) => {
                let statusColor = 'text-risk-safe bg-risk-safe/10 border-risk-safe/25';
                if (act.riskScore > 80) statusColor = 'text-risk-critical bg-risk-critical/10 border-risk-critical/25';
                else if (act.riskScore > 30) statusColor = 'text-risk-medium bg-risk-medium/10 border-risk-medium/25';

                return (
                  <div key={act.id} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-cyber-darkBlue/20 border border-gray-800/80">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-gray-500">[{new Date(act.timestamp).toLocaleTimeString()}]</span>
                        <span className="font-bold text-gray-200">{act.action}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">
                        IP: {act.ip} &bull; Device: {act.device} ({act.os}) &bull; Location: {act.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Risk</span>
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${statusColor}`}>
                        {act.riskScore}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
