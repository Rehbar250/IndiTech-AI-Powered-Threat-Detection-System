import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  ShieldAlert, Users, Radio, UserX, AlertTriangle, CheckCircle, Brain, Activity,
  Globe, AlertCircle, ArrowUpRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { users, alerts, activities, demoStep } = useApp();

  // 1. DYNAMIC CALCULATIONS FOR KPI CARDS
  const totalUsers = users.length;
  
  // Active Sessions
  const activeSessionsCount = demoStep === 1 || demoStep === 2 ? 5 : 4;
  
  // High Risk Users (> 60)
  const highRiskUsersCount = users.filter(u => u.riskScore > 60).length;

  // Blocked Accounts
  const blockedAccountsCount = users.filter(u => u.status === 'BLOCKED').length;

  // Threats Today
  const threatsToday = demoStep >= 2 ? 3 : 2;

  // Active Critical Alerts
  const criticalAlertsCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status === 'OPEN').length;

  // Average Risk Score
  const avgRiskScore = Math.round(users.reduce((acc, curr) => acc + curr.riskScore, 0) / totalUsers);

  // 2. CHART DATA PREPARATION
  
  // Risk Trend Data (last 7 days, spikes on Tuesday/today in step 2)
  const riskTrendData = [
    { day: 'Wed', Baseline: 12, Current: 12 },
    { day: 'Thu', Baseline: 14, Current: 14 },
    { day: 'Fri', Baseline: 15, Current: 15 },
    { day: 'Sat', Baseline: 10, Current: 10 },
    { day: 'Sun', Baseline: 9, Current: 9 },
    { day: 'Mon', Baseline: 15, Current: 15 },
    { day: 'Tue (Today)', Baseline: 16, Current: demoStep >= 2 ? 78 : 16 },
  ];

  // Threat Distribution Data
  const threatDistData = [
    { name: 'Privileged Access Misuse', value: demoStep >= 2 ? 40 : 20, color: '#bd93f9' },
    { name: 'Insider Threat', value: demoStep >= 2 ? 35 : 15, color: '#f59e0b' },
    { name: 'Suspicious Database Access', value: demoStep >= 2 ? 30 : 10, color: '#00f0ff' },
    { name: 'Baseline Anomalies', value: 35, color: '#10b981' }
  ];

  // Threats by Department
  const threatsByDeptData = [
    { dept: 'Security Ops', Alerts: 0 },
    { dept: 'Infrastructure', Alerts: 1 },
    { dept: 'Internal Audit', Alerts: 0 },
    { dept: 'IT Systems', Alerts: demoStep >= 2 ? 2 : 0 },
    { dept: 'Finance', Alerts: 1 },
  ];

  // Top Risk Users list (sorted by risk score)
  const topRiskUsers = [...users].sort((a, b) => b.riskScore - a.riskScore).slice(0, 4);

  // AI Security Recommendations
  const aiRecommendations = [
    ...(demoStep === 2 ? [{
      id: 'rec-1',
      severity: 'CRITICAL',
      title: 'Revoke David Miller AD Credentials',
      desc: 'Credential takeover suspected. Russia login concurrent with DROP TABLE commands.',
      action: 'Block User Account'
    }] : []),
    {
      id: 'rec-2',
      severity: 'HIGH',
      title: 'Enforce Step-Up MFA for Finance Portal',
      desc: 'Finance operations show elevated downloads. Require FIDO2 keys for exports.',
      action: 'Configure MFA Policy'
    },
    {
      id: 'rec-3',
      severity: 'MEDIUM',
      title: 'Resolve ISO 27001 Code Scan Gaps',
      desc: 'API endpoints for commercial banking lack SAST scanning coverage.',
      action: 'Run Pipeline Scan'
    }
  ];

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* KPI CARD 1: TOTAL USERS */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Total Monitored Users</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{totalUsers}</span>
            <span className="text-[10px] text-risk-safe mt-1 flex items-center gap-0.5 font-bold">
              <CheckCircle className="w-3 h-3" />
              100% PAM Enrolled
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyber-darkBlue text-cyber-cyan">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI CARD 2: ACTIVE SESSIONS */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex items-center justify-between shadow relative overflow-hidden group hover:border-cyber-cyan/30 transition-all">
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Active Web Sessions</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{activeSessionsCount}</span>
            <span className="text-[10px] text-cyber-cyan mt-1 flex items-center gap-0.5 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
              Live telemetry active
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyber-darkBlue text-cyber-cyan">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* KPI CARD 3: HIGH RISK / CRITICAL */}
        <div className={`glass-panel p-5 rounded-xl border flex items-center justify-between shadow relative overflow-hidden transition-all ${
          highRiskUsersCount > 0 
            ? 'border-risk-critical/30 bg-risk-critical/5 shadow-redGlow' 
            : 'border-gray-800 hover:border-cyber-cyan/30'
        }`}>
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">High Risk Profiles</span>
            <span className={`text-3xl font-extrabold mt-1 block ${highRiskUsersCount > 0 ? 'text-risk-critical' : 'text-white'}`}>
              {highRiskUsersCount}
            </span>
            <span className={`text-[10px] mt-1 flex items-center gap-0.5 font-bold ${
              highRiskUsersCount > 0 ? 'text-risk-critical animate-pulse' : 'text-risk-safe'
            }`}>
              {highRiskUsersCount > 0 ? (
                <>
                  <AlertCircle className="w-3 h-3" />
                  Immediate Action Required
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3" />
                  All within baseline
                </>
              )}
            </span>
          </div>
          <div className={`p-3.5 rounded-lg ${highRiskUsersCount > 0 ? 'bg-risk-critical/10 text-risk-critical' : 'bg-cyber-darkBlue text-gray-500'}`}>
            <UserX className="w-6 h-6" />
          </div>
        </div>

        {/* KPI CARD 4: AVG RISK SCORE */}
        <div className={`glass-panel p-5 rounded-xl border flex items-center justify-between shadow relative overflow-hidden transition-all ${
          demoStep === 2 
            ? 'border-risk-medium/30 bg-risk-medium/5 shadow-purpleGlow' 
            : 'border-gray-800 hover:border-cyber-cyan/30'
        }`}>
          <div>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Avg System Risk Index</span>
            <span className={`text-3xl font-extrabold mt-1 block ${
              demoStep === 2 ? 'text-risk-medium' : 'text-white'
            }`}>{avgRiskScore} <span className="text-xs text-gray-500 font-normal">/ 100</span></span>
            <span className={`text-[10px] mt-1 flex items-center gap-0.5 font-bold ${
              demoStep === 2 ? 'text-risk-medium' : 'text-risk-safe'
            }`}>
              {demoStep === 2 ? 'Elevated threat activity' : 'Optimum platform score'}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-cyber-darkBlue text-cyber-cyan">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2. CHARTS SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 1: RISK TREND (LINE/AREA) */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Dynamic Risk Index Trend</h3>
              <p className="text-[10px] text-gray-500">Compares daily security baseline against live event calculations</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-gray-600 inline-block"></span> Baseline</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-cyber-cyan inline-block"></span> Live Risk</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 42, 67, 0.1)" />
                <XAxis dataKey="day" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#102a43', borderColor: 'rgba(0, 240, 255, 0.2)', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="Current" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorLive)" />
                <Area type="monotone" dataKey="Baseline" stroke="#4b5563" strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: RISK GAUGE WIDGET */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Threat Distribution</h3>
            <p className="text-[10px] text-gray-500">Security anomalies classified by MITRE ATT&CK vectors</p>
          </div>
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {threatDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#102a43', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center aggregate percentage */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-2xl font-extrabold ${
                demoStep === 2 ? 'text-risk-critical' : 'text-cyber-cyan'
              }`}>
                {demoStep === 2 ? '95' : '25'}
              </span>
              <span className="text-[8px] text-gray-500 font-mono uppercase">Max Score</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-1.5">
            {threatDistData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between text-[10px] text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
                  <span>{entry.name}</span>
                </div>
                <span className="font-mono font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. WIDGETS & WORLD MAP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WORLD LOGIN MAP SVG */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyber-cyan" />
                Live Session Geolocations
              </h3>
              <p className="text-[10px] text-gray-500">Real-time authentication origins showing concurrency and geolocation leaps</p>
            </div>
            {demoStep === 1 || demoStep === 2 ? (
              <span className="px-2 py-0.5 rounded bg-risk-critical/20 border border-risk-critical/50 text-risk-critical text-[9px] font-bold uppercase animate-pulse">
                CONCURRENCY ANOMALY
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-risk-safe/20 border border-risk-safe/50 text-risk-safe text-[9px] font-bold uppercase">
                Geotrack Clean
              </span>
            )}
          </div>

          {/* Interactive World Map SVG Layout */}
          <div className="flex-1 bg-cyber-darkBlue/50 rounded-lg border border-gray-800/80 p-4 relative flex items-center justify-center min-h-[220px]">
            
            {/* Minimalist World Outline Representation using Grid Dots */}
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-30 text-cyber-slateLight">
              {/* Map grid placeholder drawing */}
              <rect width="800" height="400" fill="none" />
              {/* Simple continent vector shapes */}
              {/* Asia / India */}
              <path d="M 520 180 Q 560 140 600 150 Q 640 130 680 180 Q 720 220 700 280 Q 660 320 600 290 Q 560 300 520 260 Z" fill="currentColor" />
              {/* Russia / Europe */}
              <path d="M 440 100 Q 500 80 580 90 Q 660 70 700 120 Q 660 150 580 140 Q 500 130 440 120 Z" fill="currentColor" />
              {/* North America */}
              <path d="M 100 120 Q 180 80 260 110 Q 300 150 280 200 Q 240 220 200 240 Q 160 220 100 160 Z" fill="currentColor" />
              {/* Africa */}
              <path d="M 400 220 Q 450 220 480 260 Q 470 320 440 350 Q 400 320 380 280 Z" fill="currentColor" />
            </svg>

            {/* LIVE PULSING GEOTRACK LABELS */}
            {/* India Node (Safe - Baseline) */}
            <div className="absolute" style={{ top: '56%', left: '68%' }}>
              <div className="flex flex-col items-center">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-risk-safe opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-risk-safe"></span>
                </span>
                <span className="text-[8px] bg-cyber-navy/90 border border-gray-800 text-gray-300 px-1 py-0.5 rounded font-bold font-mono mt-1 whitespace-nowrap shadow">
                  MUMBAI (HQ)
                </span>
              </div>
            </div>

            {/* Bangalore Node (Safe) */}
            <div className="absolute" style={{ top: '63%', left: '69%' }}>
              <div className="flex flex-col items-center">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-risk-safe"></span>
                </span>
                <span className="text-[8px] bg-cyber-navy/90 border border-gray-800 text-gray-300 px-1 py-0.5 rounded font-mono mt-1 whitespace-nowrap shadow">
                  BLR_OFFICE
                </span>
              </div>
            </div>

            {/* Moscow, Russia Node (Threat Triggered!) */}
            {(demoStep === 1 || demoStep === 2) && (
              <div className="absolute" style={{ top: '35%', left: '64%' }}>
                <div className="flex flex-col items-center">
                  <span className="relative flex h-4.5 w-4.5 radar-dot">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-risk-critical opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-risk-critical"></span>
                  </span>
                  <span className="text-[9px] bg-risk-critical text-white border border-risk-critical px-1.5 py-0.5 rounded font-bold font-mono mt-1 whitespace-nowrap shadow-redGlow animate-pulse">
                    ⚠️ MOSCOW (SUSPICIOUS)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDE BAR CARDS: TOP RISK USERS */}
        <div className="space-y-6">
          
          {/* TOP RISK USERS WIDGET */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">Privileged Risk Scores</h3>
            <div className="space-y-3">
              {topRiskUsers.map((user) => {
                let colorClass = 'text-risk-safe bg-risk-safe/10 border-risk-safe/20';
                if (user.riskScore > 80) colorClass = 'text-risk-critical bg-risk-critical/10 border-risk-critical/30';
                else if (user.riskScore > 50) colorClass = 'text-risk-high bg-risk-high/10 border-risk-high/30';
                else if (user.riskScore > 30) colorClass = 'text-risk-medium bg-risk-medium/10 border-risk-medium/20';

                return (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-cyber-darkBlue/30 border border-gray-800/80">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded object-cover" />
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-gray-200">{user.name}</h4>
                        <span className="text-[9px] text-gray-500 font-mono">{user.role}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold font-mono ${colorClass}`}>
                      {user.riskScore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI SECURITY RECOMMENDATIONS */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-cyber-cyan" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Copilot Recommendations</h3>
            </div>
            <div className="space-y-3 text-left">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className={`p-3 rounded-lg border ${
                  rec.severity === 'CRITICAL' 
                    ? 'bg-risk-critical/5 border-risk-critical/30' 
                    : rec.severity === 'HIGH'
                      ? 'bg-risk-high/5 border-risk-high/20'
                      : 'bg-cyber-darkBlue/20 border-gray-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded ${
                      rec.severity === 'CRITICAL' ? 'bg-risk-critical text-white' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {rec.severity}
                    </span>
                    <span className="text-[9px] text-cyber-cyan flex items-center gap-0.5 cursor-pointer font-bold hover:underline">
                      Apply Action
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-200 mt-2">{rec.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-normal">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
