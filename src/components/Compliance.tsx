import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertCircle, CheckCircle, FileCheck, HelpCircle } from 'lucide-react';

export const Compliance: React.FC = () => {
  const { complianceList } = useApp();

  // Metrics
  const overallSecurityScore = 88;
  const auditReadiness = 94;
  const mfaCoverage = 100;
  const privilegedAccountsCount = 5;

  return (
    <div className="space-y-6 select-none font-sans text-left">
      
      {/* Executive Gauges Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* KPI 1: Overall Compliance Score */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Core Compliance Score</span>
            <span className="text-3xl font-black text-white block">
              {overallSecurityScore}%
            </span>
            <span className="text-[10px] text-risk-safe font-bold flex items-center gap-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-risk-safe" />
              Above Banking Average
            </span>
          </div>
          {/* Visual Mini Progress circle */}
          <div className="relative h-14 w-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle stroke="rgba(16, 42, 67, 0.2)" fill="transparent" strokeWidth="4" r="22" cx="28" cy="28" />
              <circle stroke="#00f0ff" fill="transparent" strokeWidth="4" strokeDasharray="138" strokeDashoffset={138 - (138 * overallSecurityScore) / 100} r="22" cx="28" cy="28" />
            </svg>
            <span className="absolute text-[10px] font-bold text-gray-300 font-mono">{overallSecurityScore}%</span>
          </div>
        </div>

        {/* KPI 2: Audit Readiness */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Audit Readiness</span>
            <span className="text-3xl font-black text-white block">
              {auditReadiness}%
            </span>
            <span className="text-[10px] text-risk-safe font-bold flex items-center gap-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-risk-safe" />
              SIEM logs synced
            </span>
          </div>
          {/* Visual Mini Progress circle */}
          <div className="relative h-14 w-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle stroke="rgba(16, 42, 67, 0.2)" fill="transparent" strokeWidth="4" r="22" cx="28" cy="28" />
              <circle stroke="#bd93f9" fill="transparent" strokeWidth="4" strokeDasharray="138" strokeDashoffset={138 - (138 * auditReadiness) / 100} r="22" cx="28" cy="28" />
            </svg>
            <span className="absolute text-[10px] font-bold text-gray-300 font-mono">{auditReadiness}%</span>
          </div>
        </div>

        {/* KPI 3: MFA Coverage */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">MFA Coverage</span>
            <span className="text-3xl font-black text-white mt-1 block">{mfaCoverage}%</span>
            <span className="text-[10px] text-risk-safe font-bold mt-1 flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              FIDO2 tokens enforced
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyber-darkBlue text-cyber-cyan shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Privileged Accounts */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Privileged Accounts</span>
            <span className="text-3xl font-black text-white mt-1 block">{privilegedAccountsCount}</span>
            <span className="text-[10px] text-cyber-purple font-bold mt-1 flex items-center gap-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Requires continuous monitoring
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyber-darkBlue text-cyber-cyan shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Compliance Checklist Database */}
      <div className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
        
        <div className="bg-cyber-darkBlue/80 px-5 py-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Regulatory Compliance Control Set</h3>
            <p className="text-[10px] text-gray-500">RBI Cybersecurity Framework for Banks &amp; ISO 27001 mappings</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-[10px] font-bold font-mono">
            Standard: RBI_CS_2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-cyber-darkBlue/30 text-gray-400 font-mono border-b border-gray-800 uppercase tracking-wider text-[9px] font-bold">
                <th className="p-4">Standard</th>
                <th className="p-4">Control Objective</th>
                <th className="p-4">Compliance Status</th>
                <th className="p-4">Audited Evidence Log</th>
                <th className="p-4">Last Inspected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-300">
              {complianceList.map((item) => {
                let statusBadge = 'bg-risk-safe/10 text-risk-safe border-risk-safe/25';
                if (item.status === 'NON-COMPLIANT') statusBadge = 'bg-risk-critical/10 text-risk-critical border-risk-critical/30';
                if (item.status === 'UNDER_REVIEW') statusBadge = 'bg-risk-medium/10 text-risk-medium border-risk-medium/20';

                return (
                  <tr key={item.id} className="hover:bg-cyber-slate/5 transition-colors">
                    <td className="p-4 font-bold text-white font-mono">{item.standard}</td>
                    <td className="p-4 font-sans max-w-xs">{item.control}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${statusBadge}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 font-mono text-[10px] max-w-sm truncate" title={item.evidence}>
                      {item.evidence}
                    </td>
                    <td className="p-4 font-mono text-gray-500 text-[10px]">
                      {new Date(item.lastAudited).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
