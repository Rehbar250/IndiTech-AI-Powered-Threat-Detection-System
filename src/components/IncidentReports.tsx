import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, Download, Share2, Mail, CheckCircle2, AlertTriangle, 
  Terminal, ShieldCheck, HelpCircle, HardDrive, Calendar
} from 'lucide-react';

export const IncidentReports: React.FC = () => {
  const { users, alerts, demoStep } = useApp();
  
  const [analystNotes, setAnalystNotes] = useState(
    'Initial triage indicates a high-probability credential takeover or malicious insider activity. Session initiated via unmanaged host from a geographical zone (Russia) incongruous with user profile. IP address resolved to non-corporate subnet. Immediate blocking action taken.'
  );

  const isMitigated = users.find(u => u.id === 'U104')?.status === 'BLOCKED';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    alert('Incident report dispatched to Security Admin (CISO) and Internal Compliance distribution group.');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Action buttons (non-printable in custom CSS) */}
      <div className="glass-panel p-4 rounded-xl border border-gray-800 flex items-center justify-between no-print select-none">
        <div>
          <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">Incident Archives</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Select and export high-fidelity executive reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Report
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:shadow-cyberGlow text-cyber-navy rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyber-navy" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Main Report Page (styled for clean window.print output) */}
      <div className="glass-panel p-8 rounded-2xl border border-gray-800 bg-cyber-darkBlue/10 max-w-4xl mx-auto space-y-8 text-left relative shadow-cyber">
        
        {/* Printable header indicator */}
        <div className="hidden print-only text-center text-xs text-gray-500 border-b border-gray-300 pb-2 mb-4 font-mono">
          CONFIDENTIAL - INDITECH SECURE SECURITY DOCUMENT
        </div>

        {/* Report Header Logo & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800/80 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-cyber-cyan font-mono font-bold uppercase tracking-widest">
              Security Operations Center (SOC) // Incident Record
            </span>
            <h1 className="text-2xl font-black text-white leading-none">INCIDENT REPORT: INC-2026-95</h1>
            <p className="text-xs text-gray-500 font-mono mt-1">Generated: {new Date().toLocaleDateString()} &bull; Class: Critical Threat</p>
          </div>
          <div className="flex items-center gap-3 bg-cyber-darkBlue/80 border border-gray-800 p-3 rounded-lg shrink-0">
            <div className="text-right">
              <span className="text-[9px] text-gray-500 font-mono uppercase block">Threat Score</span>
              <span className="text-2xl font-black text-risk-critical">95 <span className="text-xs text-gray-500">/ 100</span></span>
            </div>
            <div className="h-8 w-px bg-gray-800"></div>
            <div className="text-right">
              <span className="text-[9px] text-gray-500 font-mono uppercase block">Resolution Status</span>
              <span className={`text-xs font-bold uppercase block ${isMitigated ? 'text-risk-safe' : 'text-risk-critical animate-pulse'}`}>
                {isMitigated ? 'MITIGATED' : 'ACTIVE THREAT'}
              </span>
            </div>
          </div>
        </div>

        {/* User Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-[9px] text-gray-500 uppercase font-mono font-bold">Target Employee</span>
            <p className="text-sm font-bold text-white">David Miller</p>
            <p className="text-xs text-gray-400">System Administrator</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-gray-500 uppercase font-mono font-bold">Host System Node</span>
            <p className="text-sm font-mono text-white">LX-DEVEL-OS (Linux)</p>
            <p className="text-xs text-gray-400">IP: 91.210.107.5 (Moscow, Russia)</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-gray-500 uppercase font-mono font-bold">Incident Vectors</span>
            <p className="text-sm font-bold text-cyber-purple">Privileged Account Takeover</p>
            <p className="text-xs text-gray-400">Database deletion trigger</p>
          </div>
        </div>

        <hr className="border-gray-800/80" />

        {/* Incident Timeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-cyber-cyan" />
            Forensics Event Sequence Timeline
          </h3>

          <div className="relative border-l border-gray-800 ml-3 pl-6 space-y-6 text-xs">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-risk-medium border-2 border-cyber-navy flex items-center justify-center"></span>
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-500 font-mono">02:14:00 AM IST</span>
                <h4 className="font-bold text-gray-200">Suspicious Session Established</h4>
                <p className="text-gray-400 leading-normal">
                  Privileged admin authentication from Moscow, Russia (IP: 91.210.107.5). Geographically anomalous leap from typical corporate Mumbai proxy.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-risk-high border-2 border-cyber-navy flex items-center justify-center"></span>
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-500 font-mono">02:15:30 AM IST</span>
                <h4 className="font-bold text-gray-200">Bulk Database Extraction</h4>
                <p className="text-gray-400 leading-normal">
                  User executed export queries on finance payroll database schema. Exported `payroll_master_2026.xlsx` totaling 1.8 GB. Volume exfiltration limits breached.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-risk-critical border-2 border-cyber-navy flex items-center justify-center"></span>
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-500 font-mono">02:16:15 AM IST</span>
                <h4 className="font-bold text-gray-200">Database Sabotage Command Executed</h4>
                <p className="text-gray-400 leading-normal">
                  User executed destructive commands: `sh shred_audit_logs.sh && DROP TABLE client_records;`. Calculated risk score spiked to 95 (Critical Alert ALT-2026-95).
                </p>
              </div>
            </div>

            {/* Step 4 (Conditional on block status) */}
            {isMitigated && (
              <div className="relative">
                <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-risk-safe border-2 border-cyber-navy flex items-center justify-center"></span>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-gray-500 font-mono">02:22:15 AM IST</span>
                  <h4 className="font-bold text-risk-safe">Incident Resolved (Account Blocked)</h4>
                  <p className="text-gray-400 leading-normal">
                    SOC Analyst Alice Smith verified the threat indicator and initialized lockout script. Active Directory binding disabled, database sessions purged, token access revoked. Threat neutralized.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-800/80" />

        {/* AI Root Cause and Forensics */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-cyber-purple" />
            AI Root Cause Analysis &amp; Forensics
          </h3>
          <div className="p-4 bg-cyber-darkBlue/40 border border-gray-800 rounded-lg text-xs leading-relaxed text-gray-300 space-y-2">
            <p>
              <strong>Anomaly Vector:</strong> The AI model identified a concurrent login anomaly. Credentials for David Miller were authenticated from Moscow, Russia using a Firefox browser on Ubuntu Linux, while a valid desktop corporate VPN session was registered in Mumbai, India 45 minutes prior. Concurrency geovelocities exceeded limits.
            </p>
            <p>
              <strong>Sabotage Intent:</strong> The execution of a `DROP TABLE` command on `client_records` in conjunction with `shred_audit_logs.sh` indicates deliberate destructive intent, matching MITRE ATT&CK techniques T1565.001 (Data Manipulation) and T1070 (Indicator Removal on Host).
            </p>
          </div>
        </div>

        {/* Analyst notes (Editable by SOC Analyst in prototype) */}
        <div className="space-y-3 no-print">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Analyst Investigation Notes</h3>
          <textarea
            value={analystNotes}
            onChange={(e) => setAnalystNotes(e.target.value)}
            className="w-full bg-cyber-darkBlue/60 border border-gray-800 text-gray-300 p-3 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan h-24 font-sans leading-relaxed"
            placeholder="Input analyst comments here..."
          />
        </div>

        {/* Print only analyst notes footer */}
        <div className="hidden print-only space-y-1.5 text-xs text-gray-800 pt-4 border-t border-gray-300">
          <strong>Analyst Notes:</strong>
          <p className="italic">{analystNotes}</p>
        </div>

        {/* Report Sign-off */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-800/80 text-[10px] text-gray-500 font-mono">
          <div>
            <span>Document Signature Hash: </span>
            <span className="text-gray-400">SHA-256//9a8b7c6d5e4f3a2b1c</span>
          </div>
          <div>
            <span>Authorized by SOC Officer Alice Smith</span>
          </div>
        </div>

      </div>

    </div>
  );
};
