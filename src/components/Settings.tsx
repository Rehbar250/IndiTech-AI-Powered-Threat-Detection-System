import React, { useState } from 'react';
import { 
  Settings, Key, Shield, Bell, Globe, Save, Plus, Trash2, 
  CheckCircle, Copy, AlertCircle, RefreshCw
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

export const SettingsPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ORG' | 'ROLES' | 'MFA' | 'API'>('ORG');

  // Org Profile State
  const [orgName, setOrgName] = useState('IndiTech Commercial Bank');
  const [cisoContact, setCisoContact] = useState('ciso-alert@inditech.bank');
  
  // Notification channels
  const [channels, setChannels] = useState({
    email: true,
    slack: false,
    sms: true,
    webhook: true
  });

  // Simulated API Keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 'key-1', name: 'Splunk SIEM Connector', key: 'it_live_9a8b7c6d5e4f3a2b1c0d', created: '2026-06-12' },
    { id: 'key-2', name: 'QRadar Security Ingest', key: 'it_live_0f9e8d7c6b5a4f3e2d1c', created: '2026-07-02' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  
  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHex = Array.from({length: 20}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `it_live_${randomHex}`,
      created: new Date().toISOString().split('T')[0]
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const handleSaveSettings = () => {
    alert('Security policy parameters updated and dispatched to Active Directory.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none font-sans text-left">
      
      {/* Settings Navigation subtabs */}
      <div className="lg:col-span-1 glass-panel rounded-xl border border-gray-800 p-4 space-y-2 h-fit">
        <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest px-2 mb-2">Policy Settings</h3>
        <div className="space-y-1">
          {[
            { id: 'ORG', label: 'Organization Profile', icon: Globe },
            { id: 'ROLES', label: 'Access Matrix', icon: Shield },
            { id: 'MFA', label: 'Security & MFA rules', icon: Bell },
            { id: 'API', label: 'SIEM API Keys', icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === tab.id
                    ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-cyber'
                    : 'bg-cyber-darkBlue/20 border-transparent text-gray-400 hover:text-white hover:border-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 text-cyber-cyan" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Detail Pane */}
      <div className="lg:col-span-3 glass-panel p-6 rounded-xl border border-gray-800 min-h-[400px]">
        
        {/* SUBTAB 1: ORG PROFILE */}
        {activeSubTab === 'ORG' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Organization Profile</h3>
              <p className="text-[10px] text-gray-500">Configure core institutional identifiers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold uppercase text-[9px] tracking-wider">Institution Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-cyan font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold uppercase text-[9px] tracking-wider">CISO Routing Mailbox</label>
                <input
                  type="email"
                  value={cisoContact}
                  onChange={(e) => setCisoContact(e.target.value)}
                  className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-cyan font-semibold font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800">
              <h4 className="text-xs font-extrabold text-white uppercase mb-3">Threat Alerts Routing channels</h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
                {[
                  { key: 'email', label: 'Dispatched Email Notifications' },
                  { key: 'slack', label: 'Slack Webhook Payload Dispatch' },
                  { key: 'sms', label: 'SMS Critical PagerAlerts' },
                  { key: 'webhook', label: 'Raw SIEM POST Webhook logs' }
                ].map((ch) => (
                  <label key={ch.key} className="flex items-center gap-3 p-2.5 rounded bg-cyber-darkBlue/20 border border-gray-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={(channels as any)[ch.key]}
                      onChange={(e) => setChannels(prev => ({ ...prev, [ch.key]: e.target.checked }))}
                      className="accent-cyber-cyan"
                    />
                    <span>{ch.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 transition-all hover:shadow-cyberGlow"
            >
              <Save className="w-3.5 h-3.5" />
              Commit Profiles
            </button>
          </div>
        )}

        {/* SUBTAB 2: ACCESS MATRIX */}
        {activeSubTab === 'ROLES' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Role Permission Access Matrix</h3>
              <p className="text-[10px] text-gray-500">Oversight of operational access controls per clearance tier</p>
            </div>

            {/* Matrix table representation */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="bg-cyber-darkBlue/80 text-gray-400 border-b border-gray-800 uppercase tracking-wider text-[9px] font-bold">
                    <th className="p-3">Module</th>
                    <th className="p-3 text-center">SOC Analyst</th>
                    <th className="p-3 text-center">Sec Admin</th>
                    <th className="p-3 text-center">Risk Mgr</th>
                    <th className="p-3 text-center">Auditor</th>
                    <th className="p-3 text-center">Sys Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/40 text-gray-300">
                  {[
                    { module: 'Alert Investigation', roles: [true, true, false, false, false] },
                    { module: 'Lock Account Action', roles: [true, false, false, false, false] },
                    { module: 'MFA Step-up Rule Change', roles: [true, true, false, false, false] },
                    { module: 'Firewall / Policy Modify', roles: [false, true, false, false, true] },
                    { module: 'Compliance Export', roles: [true, true, true, true, true] },
                    { module: 'Root Console Execution', roles: [false, false, false, false, true] }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-cyber-slate/5 transition-colors">
                      <td className="p-3 text-white font-sans font-semibold">{row.module}</td>
                      {row.roles.map((granted, rIdx) => (
                        <td key={rIdx} className="p-3 text-center font-bold">
                          {granted ? (
                            <span className="text-risk-safe text-sm">&#10003;</span>
                          ) : (
                            <span className="text-gray-700 font-sans">&#8212;</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 3: SECURITY & MFA RULES */}
        {activeSubTab === 'MFA' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Multi-Factor Authentication &amp; Sessions Policy</h3>
              <p className="text-[10px] text-gray-500">Configure global authentication policy and risk score actions</p>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="p-4 bg-cyber-darkBlue/20 border border-gray-800 rounded-lg space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-cyber-cyan" />
                  Privileged Authentication Policy
                </h4>
                <div className="space-y-2 text-left">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="accent-cyber-cyan" />
                    <span>Enforce Multi-Factor Authentication for 100% of Administrative logons</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="accent-cyber-cyan" />
                    <span>Force step-up authentication challenge for database export volumes exceed 500 MB</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="accent-cyber-cyan" />
                    <span>Block logins originating from Tor networks, known public proxies, or bulletproof subnets</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold uppercase text-[9px] tracking-wider">Session Timeout Interval</label>
                  <select className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none">
                    <option>15 Minutes (Recommended)</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>8 Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold uppercase text-[9px] tracking-wider">Risk Level Alerting Threshold</label>
                  <select className="w-full bg-cyber-darkBlue/70 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none">
                    <option>Low (Score &gt; 30)</option>
                    <option>Medium (Score &gt; 50)</option>
                    <option>High (Score &gt; 60 - Recommended)</option>
                    <option>Critical (Score &gt; 80)</option>
                  </select>
                </div>
              </div>

            </div>

            <button
              onClick={handleSaveSettings}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 transition-all hover:shadow-cyberGlow"
            >
              <Save className="w-3.5 h-3.5" />
              Save Policies
            </button>
          </div>
        )}

        {/* SUBTAB 4: SIEM API KEYS */}
        {activeSubTab === 'API' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">SIEM API Ingestion Keys</h3>
              <p className="text-[10px] text-gray-500">Tokens for Splunk, QRadar, and SIEM data ingestion pipelines</p>
            </div>

            {/* Create form */}
            <form onSubmit={handleGenerateKey} className="flex gap-2.5 max-w-md">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Key label (e.g., Datadog Monitor)..."
                className="flex-1 bg-cyber-darkBlue/70 border border-gray-800 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
              />
              <button
                type="submit"
                className="bg-cyber-cyan text-cyber-navy hover:shadow-cyberGlow font-bold px-3 rounded-lg text-xs uppercase flex items-center gap-1.5 transition-all shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-cyber-navy" />
                Generate
              </button>
            </form>

            {/* Keys list */}
            <div className="space-y-3 pt-3">
              {apiKeys.length === 0 ? (
                <div className="text-center text-gray-500 text-xs py-6">
                  No active SIEM tokens created.
                </div>
              ) : (
                apiKeys.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-lg bg-cyber-darkBlue/30 border border-gray-800/80 flex items-center justify-between gap-4 text-xs font-mono">
                    <div className="text-left space-y-1">
                      <h4 className="font-sans font-bold text-gray-200">{item.name}</h4>
                      <p className="text-[10px] text-cyber-cyan">{item.key}</p>
                      <span className="text-[9px] text-gray-600">Created: {item.created}</span>
                    </div>
                    <button
                      onClick={() => handleRevokeKey(item.id)}
                      className="p-1.5 rounded hover:bg-risk-critical/10 text-gray-500 hover:text-risk-critical transition-colors shrink-0"
                      title="Revoke Token"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
export default SettingsPanel;
