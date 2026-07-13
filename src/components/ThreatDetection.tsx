import React, { useState, useEffect } from 'react';
import { Shield, Brain, Sparkles, HelpCircle, Info } from 'lucide-react';

interface RiskFactor {
  id: string;
  name: string;
  weight: number;
  description: string;
  checked: boolean;
}

export const ThreatDetection: React.FC = () => {
  
  const [factors, setFactors] = useState<RiskFactor[]>([
    { id: 'dev', name: 'Unknown Device login', weight: 20, description: 'Authentication from an unmanaged, personal, or unregistered host', checked: false },
    { id: 'loc', name: 'New Country / Geographical Jump', weight: 30, description: 'Login from a geographical location atypical for the employee', checked: false },
    { id: 'time', name: 'Midnight / Off-hours Login', weight: 15, description: 'Privileged session established outside standard working hours', checked: false },
    { id: 'fail', name: 'Multiple Failed Logins', weight: 15, description: 'Multiple sequential auth attempts failing prior to session start', checked: false },
    { id: 'dl', name: 'Large File Download volume', weight: 25, description: 'Exfiltration threshold exceeded (downloads exceeding 500 MB)', checked: false },
    { id: 'esc', name: 'Privilege Escalation attempt', weight: 35, description: 'Execution of commands attempting to modify security groups', checked: false },
    { id: 'db', name: 'Sensitive Database Access', weight: 25, description: 'Querying core financial, payroll, or customer database schemas', checked: false },
    { id: 'cmd', name: 'Suspicious Terminal Commands', weight: 35, description: 'Console scripts containing DROP TABLE or log clearing parameters', checked: false }
  ]);

  const [totalScore, setTotalScore] = useState(0);

  // Recalculate score whenever checked state changes
  useEffect(() => {
    const rawSum = factors.reduce((sum, item) => sum + (item.checked ? item.weight : 0), 0);
    // Cap at 100
    setTotalScore(Math.min(100, rawSum));
  }, [factors]);

  const handleToggle = (id: string) => {
    setFactors(prev => prev.map(f => f.id === id ? { ...f, checked: !f.checked } : f));
  };

  const getRiskCategory = () => {
    if (totalScore >= 81) return { level: 'CRITICAL', color: 'text-risk-critical', bg: 'bg-risk-critical/10 border-risk-critical/30', glow: 'shadow-redGlow' };
    if (totalScore >= 61) return { level: 'HIGH', color: 'text-risk-high', bg: 'bg-risk-high/10 border-risk-high/30', glow: 'shadow-purpleGlow' };
    if (totalScore >= 31) return { level: 'MEDIUM', color: 'text-risk-medium', bg: 'bg-risk-medium/10 border-risk-medium/20', glow: 'shadow-cyber' };
    return { level: 'LOW', color: 'text-risk-safe', bg: 'bg-risk-safe/10 border-risk-safe/25', glow: 'shadow-cyber' };
  };

  const category = getRiskCategory();

  // AI Summary generator based on checked items
  const generateAIExplanation = () => {
    const active = factors.filter(f => f.checked);
    if (active.length === 0) {
      return "Risk engine is idle. Selected session profiles match standard employee baselines.";
    }

    let explanation = `AI Analysis detected ${active.length} anomalous indicators. `;
    
    if (factors.find(f => f.id === 'loc' && f.checked) && factors.find(f => f.id === 'time' && f.checked)) {
      explanation += "A geographical location jump combined with a midnight session suggests a high-probability credential takeover vector. ";
    }
    
    if (factors.find(f => f.id === 'cmd' && f.checked) || factors.find(f => f.id === 'esc' && f.checked)) {
      explanation += "Execution of administrative escalation scripts or database deletion commands represents active hostile penetration or malicious insider intent. ";
    }

    if (factors.find(f => f.id === 'dl' && f.checked)) {
      explanation += "Bulk database exfiltration volume exceeds safe daily banking tolerances. ";
    }

    if (totalScore >= 81) {
      explanation += "RECOMMENDED ACTION: Core PAM policies demand immediate account lockout, database session termination, and CISO notification.";
    } else if (totalScore >= 61) {
      explanation += "RECOMMENDED ACTION: Force a step-up MFA challenge and flag session for Tier-2 analyst review.";
    } else {
      explanation += "Action: Maintain standard auditing logging and flag in routine daily compliance report.";
    }

    return explanation;
  };

  // Helper to load standard hackathon demo configuration (David's anomalies)
  const loadDemoThreat = () => {
    setFactors(prev => prev.map(f => {
      // David Miller has Russia login (+30), midnight login (+15), large download (+25), db access (+25), suspicious commands (+35)
      // total = 130 -> capped at 100
      const isDavidAnomaly = ['loc', 'time', 'dl', 'db', 'cmd'].includes(f.id);
      return { ...f, checked: isDavidAnomaly };
    }));
  };

  const clearCalculator = () => {
    setFactors(prev => prev.map(f => ({ ...f, checked: false })));
  };

  // SVG Circular Gauge calculation
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none font-sans">
      
      {/* Column 1 & 2: Risk factors selector list */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-gray-800 space-y-6">
        
        {/* Title */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Dynamic Risk Score Calculator</h3>
            <p className="text-[10px] text-gray-500">Toggle indicators to simulate real-time AI behavioral analytics scoring</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={loadDemoThreat}
              className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/30 hover:bg-cyber-purple/20 text-cyber-purple text-[10px] rounded font-bold uppercase tracking-wider transition-all"
            >
              Load Incident Demo
            </button>
            <button 
              onClick={clearCalculator}
              className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 text-[10px] rounded font-bold uppercase tracking-wider transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Factors List */}
        <div className="space-y-2.5">
          {factors.map((factor) => (
            <div 
              key={factor.id} 
              onClick={() => handleToggle(factor.id)}
              className={`p-3 rounded-lg border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                factor.checked 
                  ? 'bg-cyber-darkBlue/80 border-cyber-cyan shadow-cyber' 
                  : 'bg-cyber-navy/20 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <input 
                  type="checkbox" 
                  checked={factor.checked}
                  onChange={() => {}} // handled by parent onClick for easier card clicks
                  className="accent-cyber-cyan bg-cyber-navy border-gray-800 rounded w-4 h-4 cursor-pointer"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-200">{factor.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">{factor.description}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded border font-mono font-bold text-xs shrink-0 ${
                factor.checked ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30' : 'bg-gray-800 text-gray-500 border-transparent'
              }`}>
                +{factor.weight}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Column 3: Gauge and AI explanations */}
      <div className="space-y-6">
        
        {/* Gauge Card */}
        <div className={`glass-panel p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-between text-center min-h-[300px] transition-all duration-300 ${category.glow}`}>
          <div>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Calculated Severity Dial</h3>
            <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">Aggregated Risk Factor Weights</span>
          </div>

          {/* SVG Radial progress */}
          <div className="relative h-36 w-36 flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
              <circle
                stroke="rgba(16, 42, 67, 0.2)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke={
                  totalScore >= 81 ? '#ef4444' : totalScore >= 61 ? '#f97316' : totalScore >= 31 ? '#f59e0b' : '#10b981'
                }
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{totalScore}</span>
              <span className="text-[9px] text-gray-500 font-mono">Capped @ 100</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Threat Level Classification</span>
            <h4 className={`text-xl font-black tracking-widest mt-1 uppercase ${category.color}`}>
              {category.level}
            </h4>
          </div>
        </div>

        {/* AI Explanation Summary */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyber-cyan" />
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">AI Calculation Explanations</h3>
          </div>
          <div className="text-xs text-left leading-relaxed text-gray-300 bg-cyber-darkBlue/30 p-3 rounded-lg border border-gray-800/80">
            <p>{generateAIExplanation()}</p>
          </div>
          <div className="p-3 bg-cyber-darkBlue/20 rounded border border-gray-800 flex items-start gap-2 text-[10px] text-gray-500 text-left">
            <Info className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
            <span>Score calculations map directly to SOC alerting protocols. Any score exceeding 60 triggers real-time alerts.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
