import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Send, BrainCircuit, Bot, User, RefreshCw, Terminal, 
  HelpCircle, ChevronRight, Lock
} from 'lucide-react';

export const AICopilot: React.FC = () => {
  const { chatMessages, sendCopilotMessage, demoStep } = useApp();

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pre-configured questions for the SOC Analyst to ask
  const promptChips = [
    { text: 'Why was David flagged?', key: 'david' },
    { text: 'Recommend next action.', key: 'recommend' },
    { text: "Show today's critical threats.", key: 'critical' },
    { text: 'Explain this risk score.', key: 'score' },
    { text: 'Generate executive report.', key: 'report' }
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || isThinking) return;

    sendCopilotMessage(textToSend);
    setInput('');
    setIsThinking(true);

    // Turn off thinking indicator once the mock response arrives (AppContext delay is 800ms)
    setTimeout(() => {
      setIsThinking(false);
    }, 950);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none font-sans h-[600px]">
      
      {/* Left 3 Columns: Chat Portal */}
      <div className="lg:col-span-3 glass-panel rounded-xl border border-gray-800 flex flex-col h-full overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-cyber-darkBlue/35 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyber-cyan to-cyber-purple rounded-lg text-cyber-navy">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                IndiTech AI Copilot
                <Sparkles className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
              </h3>
              <span className="text-[9px] text-gray-500 font-mono">MODEL://INDITECH_LLM_V2.1.SECURE</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-risk-safe animate-ping"></span>
            <span className="text-[10px] text-gray-400 font-mono">Model synced</span>
          </div>
        </div>

        {/* Messages list */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-cyber-navy/10">
          {chatMessages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div key={msg.id} className={`flex items-start gap-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}>
                
                {/* AI Icon marker */}
                {isAI && (
                  <div className="w-8 h-8 rounded-lg bg-cyber-darkBlue/80 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* Bubble content */}
                <div className={`p-4 rounded-xl border max-w-xl text-xs text-left leading-relaxed ${
                  isAI 
                    ? 'bg-cyber-darkBlue/40 border-gray-800 text-gray-200' 
                    : 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-cyber'
                }`}>
                  <p className="whitespace-pre-line font-sans">{msg.text}</p>
                  <span className="text-[8px] text-gray-500 font-mono block mt-2 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {/* User avatar/icon */}
                {!isAI && (
                  <div className="w-8 h-8 rounded-lg bg-cyber-cyan/20 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shrink-0">
                    <User className="w-4 h-4 text-cyber-cyan" />
                  </div>
                )}

              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-start gap-3.5 justify-start">
              <div className="w-8 h-8 rounded-lg bg-cyber-darkBlue/80 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-cyber-cyan" />
              </div>
              <div className="p-4 rounded-xl border border-gray-800 bg-cyber-darkBlue/20 text-xs text-gray-400 font-mono flex items-center gap-2">
                <span>AI Agent is parsing audit logs &amp; calculating risk scores</span>
                <span className="flex gap-1.5"><span className="animate-bounce">.</span><span className="animate-bounce delay-150">.</span><span className="animate-bounce delay-300">.</span></span>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-gray-800 bg-cyber-darkBlue/15 space-y-3">
          
          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 text-left">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.text)}
                disabled={isThinking}
                className="px-2.5 py-1 text-[10px] bg-cyber-darkBlue hover:bg-cyber-slate border border-gray-800 text-gray-300 hover:text-cyber-cyan rounded-lg transition-all font-semibold"
              >
                {chip.text}
              </button>
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isThinking}
              className="flex-1 bg-cyber-darkBlue/75 border border-gray-800 focus:border-cyber-cyan text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-cyber-cyan/30"
              placeholder="Ask Copilot a question (e.g., 'Why was David flagged?' or 'Recommend next action')..."
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:shadow-cyberGlow text-cyber-navy font-bold text-xs uppercase flex items-center gap-1.5 transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              Ask
            </button>
          </form>
        </div>

      </div>

      {/* Right 1 Column: Core AI System Info */}
      <div className="space-y-6">
        
        {/* AI Capabilities Card */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 text-left space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            AI Capabilities
          </h3>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            IndiTech AI utilizes an LLM optimized on financial cybersecurity telemetry. It maps logs to anomalies and drafts incident responses.
          </p>
          <div className="space-y-2 text-[10px] font-mono text-gray-500">
            <div className="flex items-center gap-2 p-1.5 rounded bg-cyber-darkBlue/20 border border-gray-800">
              <ChevronRight className="w-3 h-3 text-cyber-cyan" />
              <span>Entity Behavior Anomaly (UEBA)</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded bg-cyber-darkBlue/20 border border-gray-800">
              <ChevronRight className="w-3 h-3 text-cyber-cyan" />
              <span>MITRE ATT&CK Mapping</span>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded bg-cyber-darkBlue/20 border border-gray-800">
              <ChevronRight className="w-3 h-3 text-cyber-cyan" />
              <span>Incident Response Playbooks</span>
            </div>
          </div>
        </div>

        {/* Security parameters */}
        <div className="glass-panel p-5 rounded-xl border border-gray-800 text-left space-y-3">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-cyber-purple" />
            Model Compliance
          </h3>
          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-gray-500 font-mono text-[9px] uppercase">Data Boundary</span>
              <p className="text-gray-300 font-bold mt-0.5">RBI Data Localization Met</p>
            </div>
            <div>
              <span className="text-gray-500 font-mono text-[9px] uppercase">Context isolation</span>
              <p className="text-gray-300 font-bold mt-0.5">Zero external model leak</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
