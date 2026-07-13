import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { TrendingUp, ShieldAlert, Cpu, Heart, CheckCircle2 } from 'lucide-react';

export const RiskAnalytics: React.FC = () => {
  const { users, activities } = useApp();

  // Compute departmental risk ratings
  const deptRiskData = [
    { name: 'Finance', avgRisk: 25, activeAnomalies: 0 },
    { name: 'Systems IT', avgRisk: 42, activeAnomalies: 1 },
    { name: 'Infra', avgRisk: 18, activeAnomalies: 0 },
    { name: 'Security', avgRisk: 12, activeAnomalies: 0 },
    { name: 'Audit', avgRisk: 22, activeAnomalies: 0 },
  ];

  // Radar analytics data of the bank's aggregate posture
  const postureData = [
    { subject: 'MFA Coverage', A: 100, B: 90, fullMark: 100 },
    { subject: 'Privileged Logins', A: 85, B: 95, fullMark: 100 },
    { subject: 'Endpoint Safety', A: 92, B: 85, fullMark: 100 },
    { subject: 'Data Retention', A: 99, B: 90, fullMark: 100 },
    { subject: 'API Integrity', A: 65, B: 80, fullMark: 100 },
  ];

  // Login failure timeline for last 12 hours
  const loginTimelineData = [
    { hour: '00:00', Failures: 1, Successes: 2 },
    { hour: '02:00', Failures: 4, Successes: 1 }, // Russia failure peak
    { hour: '04:00', Failures: 0, Successes: 0 },
    { hour: '06:00', Failures: 0, Successes: 1 },
    { hour: '08:00', Failures: 2, Successes: 12 },
    { hour: '10:00', Failures: 3, Successes: 24 },
  ];

  return (
    <div className="space-y-6 select-none font-sans text-left">
      
      {/* Risk Metrics header */}
      <div className="glass-panel p-5 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyber-cyan" />
            Security Behavioral Posture
          </h3>
          <p className="text-[10px] text-gray-500">Evaluates privilege boundaries, anomalous hours, and network hops</p>
        </div>
        <div className="flex gap-4 text-xs font-mono text-gray-300">
          <div className="bg-cyber-darkBlue/80 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-gray-500 block text-[9px]">Anomalous Locations Today</span>
            <span className="font-bold text-cyber-cyan text-sm">1 (Moscow)</span>
          </div>
          <div className="bg-cyber-darkBlue/80 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-gray-500 block text-[9px]">Privilege Escalate Alerts</span>
            <span className="font-bold text-cyber-purple text-sm">1 Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Posture Radar Chart */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Security Defense Coverage Matrix</h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={postureData}>
                <PolarGrid stroke="#1b3c5e" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" fontSize={8} />
                <Radar name="Active Defense" dataKey="A" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.2} />
                <Radar name="Target Posture" dataKey="B" stroke="#bd93f9" fill="#bd93f9" fillOpacity={0.1} />
                <Tooltip contentStyle={{ backgroundColor: '#102a43', borderColor: '#00f0ff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Login Timeline Failure analytics */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Authentication Activity (Last 12h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loginTimelineData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 42, 67, 0.1)" />
                <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} />
                <YAxis stroke="#4b5563" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#102a43', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Bar dataKey="Successes" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Failures" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk rating by department */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 lg:col-span-2">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Departmental Threat Index</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptRiskData} layout="vertical" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 42, 67, 0.1)" />
                <XAxis type="number" domain={[0, 100]} stroke="#4b5563" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#4b5563" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#102a43', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Bar dataKey="avgRisk" fill="#bd93f9" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
