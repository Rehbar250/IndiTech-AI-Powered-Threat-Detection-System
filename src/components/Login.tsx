import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Shield, Key, Mail, Lock, CheckCircle2, User, RefreshCw } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, verifyMfa } = useApp();
  
  const [screen, setScreen] = useState<'LOGIN' | 'FORGOT_PASSWORD' | 'MFA' | 'RESET_PASSWORD' | 'ROLE_SELECT'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('SOC_ANALYST');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');

    // Pre-populate email for demo ease
    setTimeout(async () => {
      const ok = await login(email, password);
      setLoading(false);
      if (ok) {
        setScreen('MFA');
      } else {
        // For demo convenience, allow standard login anyway but warn
        setError('Invalid credentials. (Hint: Use any database email like alice.smith@inditech.bank and "password")');
      }
    }, 1000);
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(async () => {
      // MFA verification
      const ok = await verifyMfa(otp, selectedRole);
      setLoading(false);
      if (ok) {
        setScreen('ROLE_SELECT');
      } else {
        setError('Invalid MFA OTP. Use 123456 or leave empty.');
      }
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Reset code dispatched to registration email.');
      setScreen('RESET_PASSWORD');
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen('LOGIN');
      setSuccessMsg('Password updated successfully. Please login.');
    }, 1000);
  };

  const handleRoleConfirm = async () => {
    setLoading(true);
    setTimeout(async () => {
      await verifyMfa('123456', selectedRole);
      setLoading(false);
    }, 600);
  };

  const autofillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-navy p-6 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan opacity-5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple opacity-5 blur-[120px] rounded-full"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-cyber bg-[size:32px_32px] opacity-25"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-cyber-cyan/20 shadow-cyber relative z-10">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple p-0.5 flex items-center justify-center shadow-cyberGlow mb-3 relative radar-dot">
            <Shield className="w-9 h-9 text-cyber-navy" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-cyber-cyan to-white bg-clip-text text-transparent">
            IndiTech
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
            AI-Powered Threat Detection Platform for Banking
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-risk-critical/20 border border-risk-critical/50 text-risk-critical text-sm rounded-lg">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-risk-safe/20 border border-risk-safe/50 text-risk-safe text-sm rounded-lg">
            {successMsg}
          </div>
        )}

        {/* LOGIN SCREEN */}
        {screen === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">
                Secured Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none transition text-sm font-sans"
                  placeholder="analyst@inditech.bank"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none transition text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-cyber-cyan bg-cyber-darkBlue rounded border-gray-700"
                />
                Remember Device
              </label>
              <button
                type="button"
                onClick={() => { setError(''); setSuccessMsg(''); setScreen('FORGOT_PASSWORD'); }}
                className="text-cyber-cyan hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:shadow-cyberGlow text-cyber-navy font-bold py-2.5 rounded-lg transition-all transform duration-150 flex items-center justify-center text-sm font-sans"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Shield className="w-4 h-4 mr-2" />
              )}
              Authenticate Session
            </button>

            {/* Quick Demo Autofill Links */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-wider font-semibold mb-2">
                Demo Accounts (Click to Fill)
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => autofillDemo('alice.smith@inditech.bank')}
                  className="bg-cyber-darkBlue hover:bg-cyber-slate text-cyber-cyan px-2 py-1.5 rounded text-center border border-cyber-cyan/10"
                >
                  SOC Analyst
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemo('bob.johnson@inditech.bank')}
                  className="bg-cyber-darkBlue hover:bg-cyber-slate text-cyber-purple px-2 py-1.5 rounded text-center border border-cyber-purple/10"
                >
                  Security Admin
                </button>
              </div>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD */}
        {screen === 'FORGOT_PASSWORD' && (
          <form onSubmit={handleForgotSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-2">Recover Credentials</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enter your corporate banking email. We will send a secure cryptographic token to verify your identity.
            </p>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none transition text-sm"
                  placeholder="analyst@inditech.bank"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setScreen('LOGIN')}
                className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 rounded-lg text-xs"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy font-bold py-2 rounded-lg text-xs flex items-center justify-center"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Send Token'}
              </button>
            </div>
          </form>
        )}

        {/* RESET PASSWORD */}
        {screen === 'RESET_PASSWORD' && (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-2">Reset Password</h2>
            <p className="text-xs text-gray-400">
              Enter the OTP sent to your email and create a new password.
            </p>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                required
                className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white px-3 py-2 rounded-lg focus:outline-none transition text-sm text-center tracking-widest font-mono"
                placeholder="000000"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white px-3 py-2 rounded-lg focus:outline-none transition text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy font-bold py-2 rounded-lg text-xs flex items-center justify-center"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Update Password'}
            </button>
          </form>
        )}

        {/* MFA VERIFICATION */}
        {screen === 'MFA' && (
          <form onSubmit={handleMfaSubmit} className="space-y-5">
            <div className="flex justify-center mb-3">
              <Key className="w-12 h-12 text-cyber-cyan animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-white text-center">Multi-Factor Authentication</h2>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              We've dispatched a hardware-token OTP to your registered device. Enter the code below.
            </p>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 text-center">
                MFA OTP (6-Digit Code)
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-cyber-darkBlue/70 border border-gray-700 focus:border-cyber-cyan text-white px-3 py-3 rounded-lg focus:outline-none transition text-lg text-center tracking-widest font-mono font-bold"
                placeholder="123456"
              />
              <span className="text-[10px] text-gray-500 mt-2 block text-center">
                Demo Hint: Use <strong>123456</strong> or leave blank.
              </span>
            </div>

            {/* Role quick toggle on MFA screen for convenience */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 text-center font-semibold">
                Access Tier Authorization
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-cyber-darkBlue/70 border border-gray-700 text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-cyber-cyan"
              >
                <option value="SOC_ANALYST">SOC Analyst (Full Access)</option>
                <option value="SECURITY_ADMIN">Security Administrator</option>
                <option value="RISK_MANAGER">Risk Manager</option>
                <option value="AUDITOR">Compliance Auditor</option>
                <option value="SYSTEM_ADMIN">System Administrator</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setScreen('LOGIN')}
                className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-navy font-bold py-2 rounded-lg text-xs flex items-center justify-center"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verify Access'}
              </button>
            </div>
          </form>
        )}

        {/* ROLE SELECTION & ACCESS GRANT */}
        {screen === 'ROLE_SELECT' && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-risk-safe/10 border border-risk-safe/40 flex items-center justify-center text-risk-safe">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Security Clearing Granted</h2>
              <p className="text-xs text-gray-400 mt-1">
                Crypto session established. Select dashboard configuration.
              </p>
            </div>

            <div className="space-y-2 text-left">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">
                Authorized Role Profile
              </label>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  { role: 'SOC_ANALYST', title: 'SOC Analyst', desc: 'Real-time monitoring, alerts investigation, and mitigation actions' },
                  { role: 'SECURITY_ADMIN', title: 'Security Administrator', desc: 'System configuration, firewall rules, and policy oversight' },
                  { role: 'RISK_MANAGER', title: 'Risk Manager', desc: 'Behavioral analytics, risk calculations, and dashboard overview' },
                  { role: 'AUDITOR', title: 'Compliance Auditor', desc: 'ReadOnly logs and compliance checklist review' },
                  { role: 'SYSTEM_ADMIN', title: 'System Administrator', desc: 'Full infrastructure and core IT systems access' }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role as UserRole)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedRole === item.role
                        ? 'bg-cyber-cyan/10 border-cyber-cyan shadow-cyber'
                        : 'bg-cyber-darkBlue/40 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{item.title}</span>
                      {selectedRole === item.role && <CheckCircle2 className="w-4 h-4 text-cyber-cyan" />}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleRoleConfirm}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:shadow-cyberGlow text-cyber-navy font-bold py-3 rounded-lg transition-all flex items-center justify-center text-sm font-sans"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <User className="w-4 h-4 mr-2" />
              )}
              Initialize Security Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
