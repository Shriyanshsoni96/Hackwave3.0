import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp, 
  Database,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';
import { sampleCopilotPrompts } from '../../data/mockData';

export default function RevOpsCopilotModal() {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    customers, 
    actions, 
    setSelectedCustomerId, 
    setSelectedActionId 
  } = useRevOps();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hello Sarah! I'm your Autonomous RevOps Copilot. I analyze live telemetry, CRM pipeline milestones, and communication cadence across all connected customer systems.\n\nAsk me anything about account risk, expansion signals, or pending actions.",
      citations: [],
      relatedAction: null,
      relatedCustomer: null
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isCopilotOpen) return null;

  const handleSendQuery = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      let citations = [];
      let relatedCustomer = null;
      let relatedAction = null;

      const lowerQ = q.toLowerCase();

      if (lowerQ.includes('high risk') || lowerQ.includes('churn') || lowerQ.includes('risk')) {
        const atRisk = customers.filter(c => c.dynamicRiskScore >= 60);
        botResponse = `Based on current multi-signal synthesis, ${atRisk.length} accounts are currently operating at elevated churn risk:\n\n` +
          atRisk.map(c => `• **${c.name}** (Risk Score: ${c.dynamicRiskScore}%) — Renewal in ${c.daysToRenewal} days, 30d usage trend is ${c.signals.usageTrend}%, ${c.signals.unansweredOutreachCount} unanswered contacts. ARR exposed: $${c.arr.toLocaleString()}`).join('\n') +
          `\n\nI recommend prioritizing Acme Technologies and CloudScale Systems as both are within 45 days of contract expiration.`;
        
        citations = [
          { source: 'Mixpanel Telemetry', label: 'Telemetry Decay Feed' },
          { source: 'Salesforce CRM', label: 'Contract Dates & ARR' }
        ];
        relatedCustomer = atRisk[0] || null;
      } else if (lowerQ.includes('expansion') || lowerQ.includes('upsell') || lowerQ.includes('growth')) {
        const expanding = customers.filter(c => c.expansionScore >= 60);
        botResponse = `Identified ${expanding.length} qualified revenue expansion candidates with strong usage momentum:\n\n` +
          expanding.map(c => `• **${c.name}** (Expansion Score: ${c.expansionScore}%) — Seat capacity is at ${c.signals.seatUtilization.toFixed(0)}% (${c.signals.activeUsers}/${c.signals.totalSeats} seats). Usage is trending up +${c.signals.usageTrend}% MoM.`).join('\n') +
          `\n\nFinEdge Global has explicitly requested APAC capacity in Slack, offering an estimated +$85,000 ARR expansion opportunity.`;
        
        citations = [
          { source: 'Slack Connect API', label: 'Direct customer message' },
          { source: 'Segment Usage Telemetry', label: 'Seat capacity > 95%' }
        ];
        relatedCustomer = expanding[0] || null;
      } else if (lowerQ.includes('acme') || lowerQ.includes('acme technologies')) {
        const acme = customers.find(c => c.id === 'cust-001');
        botResponse = `**Acme Technologies Risk Assessment Breakdown:**\n\n` +
          `1. **Impending Renewal:** Contract expires in 43 days (Nov 22, 2026). Opt-out clause requires 30-day notice.\n` +
          `2. **Usage Decay:** 38% drop in active seats over the past 30 days (142 of 250 active licenses).\n` +
          `3. **Communication Gap:** 3 unanswered outbound emails from AE Sarah Jenkins with no rescheduled quarterly meeting.\n` +
          `4. **Champion Shift:** Inferred LinkedIn job change for former champion VP David Reynolds.\n\n` +
          `A personalized executive check-in email and value recap is prepared and awaiting your review.`;

        citations = [
          { source: 'Mixpanel & Telemetry', label: 'Oct 08 -38% active seats' },
          { source: 'Google Workspace', label: 'Oct 06 Unanswered outreach' },
          { source: 'Salesforce CRM', label: 'Contract #SF-89211 ($145k ARR)' }
        ];
        relatedCustomer = acme;
        relatedAction = actions.find(a => a.customerId === 'cust-001') || null;
      } else if (lowerQ.includes('pending') || lowerQ.includes('action') || lowerQ.includes('approval')) {
        const pending = actions.filter(a => a.status === 'PENDING');
        botResponse = `You currently have ${pending.length} actions pending human authorization:\n\n` +
          pending.map(a => `• **${a.title}** (${a.customerName}) — Urgency: ${a.urgency}. Impact: ${a.impact}.`).join('\n') +
          `\n\nReviewing these promptly prevents renewal drop-off and unblocks expansion contract delivery.`;
        
        citations = [
          { source: 'RevOps Orchestrator', label: 'Pending Approvals Queue' }
        ];
        relatedAction = pending[0] || null;
      } else {
        botResponse = `Analyzed portfolio against your query. Currently monitoring ${customers.length} total accounts representing $${(customers.reduce((a,c) => a + c.arr, 0)/1000).toFixed(0)}k in contract ARR. Highest priority warning is Acme Technologies (43 days to renewal, -38% telemetry drop).`;
        citations = [
          { source: 'Unified RevOps DB', label: '6 Connected Systems' }
        ];
      }

      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: botResponse,
        citations,
        relatedCustomer,
        relatedAction
      }]);
      setIsThinking(false);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-end">
      <div 
        className="bg-slate-900 border-l border-slate-800 w-full max-w-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base">RevOps AI Copilot</h2>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Evidence-Grounded
                </span>
              </div>
              <p className="text-xs text-slate-400">Natural-Language Customer Intelligence & Citations</p>
            </div>
          </div>
          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Queries Chips */}
        <div className="p-3 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px] font-semibold whitespace-nowrap">Suggested:</span>
          {sampleCopilotPrompts.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendQuery(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors text-[11px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-950/40 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed text-xs">
                  {m.text}
                </div>

                {/* Evidence Citations */}
                {m.citations && m.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Evidence Grounding Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.citations.map((c, ci) => (
                        <span key={ci} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1 font-mono">
                          <Database className="w-2.5 h-2.5 text-blue-400" />
                          {c.source}: {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons */}
                {(m.relatedCustomer || m.relatedAction) && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {m.relatedCustomer && (
                      <button
                        onClick={() => {
                          setSelectedCustomerId(m.relatedCustomer.id);
                          setIsCopilotOpen(false);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span>View {m.relatedCustomer.name} Profile</span>
                        <ArrowRight className="w-3 h-3 text-blue-400" />
                      </button>
                    )}
                    {m.relatedAction && (
                      <button
                        onClick={() => {
                          setSelectedActionId(m.relatedAction.id);
                          setIsCopilotOpen(false);
                        }}
                        className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1"
                      >
                        <span>Review Action Proposal</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-slate-400 text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Synthesizing cross-system evidence & citing sources...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about account churn signals, renewals, or next actions..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            All AI answers cite authorized customer records. Consequential operations require human review.
          </p>
        </div>
      </div>
    </div>
  );
}
