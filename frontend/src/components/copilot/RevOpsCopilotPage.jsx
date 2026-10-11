import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Database, 
  Clock, 
  ShieldAlert, 
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';
import { sampleCopilotPrompts } from '../../data/mockData';

export default function RevOpsCopilotPage() {
  const { 
    customers, 
    actions, 
    forecasting, 
    setSelectedCustomerId, 
    setSelectedActionId, 
    setActiveTab 
  } = useRevOps();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Welcome to RevOps Copilot — Chat With Revenue Data.\n\nI answer queries grounded directly in your unified customer records, contract renewal dates, email response history, and telemetry.\n\nTry asking: 'Which accounts are most likely to churn this month?' or 'Show renewals due in 7, 30, and 90 days'.",
      citations: [
        { source: 'Salesforce CRM', label: '1,248 Accounts & Contracts' },
        { source: 'Mixpanel / Telemetry', label: 'Live Active Seat Streams' }
      ]
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (text) => {
    const q = text || inputQuery;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      let citations = [];
      let relatedCustomer = null;
      let relatedAction = null;

      const lowerQ = q.toLowerCase();

      // Question 1: "Which accounts are most likely to churn this month?" (Direct question from PDF Page 1)
      if (lowerQ.includes('churn') || lowerQ.includes('most likely to churn') || lowerQ.includes('this month') || lowerQ.includes('risk')) {
        const churnCandidates = customers.filter(c => c.dynamicRiskScore >= 60 || c.daysToRenewal <= 30);
        botResponse = `Based on multi-signal evidence, here are the accounts most likely to churn this month:\n\n` +
          `1. **CloudScale Systems** (Risk Score: 92/100, High Risk)\n` +
          `   • Contract renewal in **6 days** ($68,000 ARR at risk)\n` +
          `   • Product activity declined -52%; admin has zero logins in 14 days\n` +
          `   • 7 unresolved support tickets; NPS 4\n` +
          `   • Recommended: VP-to-VP Emergency Escalation Call\n\n` +
          `2. **OmniRetail Direct** (Risk Score: 68/100, Needs Attention)\n` +
          `   • Contract renewal in **28 days** ($180,000 ARR)\n` +
          `   • Gradual seat decay (-18%) over 5 months\n` +
          `   • Customer delayed renewal check-in; right-sizing recommended\n\n` +
          `3. **Acme Technologies** (Risk Score: 84/100, Needs Attention)\n` +
          `   • Contract renewal in **43 days** ($145,000 ARR)\n` +
          `   • Telemetry declined -38%; champion unanswered in 14 days`;

        citations = [
          { source: 'Salesforce CRM', label: 'October Renewal Contracts' },
          { source: 'Zendesk Incident Log', label: 'Chronic SLA Breaches' },
          { source: 'Mixpanel Telemetry', label: '30-Day Activity Decay' }
        ];
        relatedCustomer = churnCandidates[0];
      }
      // Question 2: Renewals in 7, 30, and 90 days (From PDF Page 1)
      else if (lowerQ.includes('7') || lowerQ.includes('30') || lowerQ.includes('90') || lowerQ.includes('renewal')) {
        botResponse = `**Renewal & Revenue Forecast Breakdown:**\n\n` +
          `• **Due in 7 Days:** ${forecasting.dueIn7Count} account ($${(forecasting.arrDueIn7 / 1000).toFixed(0)}k ARR) — CloudScale Systems (6d)\n` +
          `• **Due in 30 Days:** ${forecasting.dueIn30Count} accounts ($${(forecasting.arrDueIn30 / 1000).toFixed(0)}k ARR) — CloudScale (6d), OmniRetail Direct (28d)\n` +
          `• **Due in 90 Days:** ${forecasting.dueIn90Count} accounts ($${(forecasting.arrDueIn90 / 1000).toFixed(0)}k ARR) — Acme Technologies (43d), Dataview AI (88d)\n\n` +
          `**Revenue at Risk:** $${(forecasting.revenueAtRisk / 1000).toFixed(0)}k ARR (clearly labeled estimate based on rule weights).`;

        citations = [
          { source: 'Salesforce Contracts', label: 'Renewal Schedules' },
          { source: 'Autonomous RevOps Engine', label: 'Forecasting Model' }
        ];
      }
      // Question 3: Acme Technologies Signature Analysis
      else if (lowerQ.includes('acme')) {
        const acme = customers.find(c => c.id === 'cust-001');
        botResponse = `**Customer 360° Evidence Narrative for Acme Technologies:**\n\n` +
          `• **21 days ago:** Last recorded meeting; no next step recorded (Possible follow-up gap).\n` +
          `• **14 days ago:** Customer champion Mark Davis did not reply (Engagement weakening).\n` +
          `• **7 days ago:** Product activity declined -38% (Potential adoption issue).\n` +
          `• **Today:** Renewal is in 43 days ($145,000 ARR). Autonomous agent combines signals to flag elevated renewal risk.\n\n` +
          `**Recommended Response:** Contact champion, investigate usage decline, and schedule renewal review. Email draft & task prepared for approval.`;

        citations = [
          { source: 'Gong & Calendar', label: '21d Meeting Gap' },
          { source: 'Google Workspace', label: '14d Silent Champion' },
          { source: 'Segment Telemetry', label: '7d -38% Activity Drop' }
        ];
        relatedCustomer = acme;
        relatedAction = actions.find(a => a.customerId === 'cust-001');
      }
      // Question 4: Expansion & Upsell
      else if (lowerQ.includes('expansion') || lowerQ.includes('upsell') || lowerQ.includes('growth')) {
        botResponse = `**Expansion & Upsell Detection:**\n\n` +
          `• **FinEdge Global** (Expansion Score: 94/100)\n` +
          `  - Seat capacity at 96% (480/500 licenses)\n` +
          `  - Usage surging +54% MoM; direct inquiry for APAC expansion\n` +
          `  - Estimated Impact: +$85,000 ARR\n\n` +
          `• **Dataview AI** (Expansion Score: 72/100)\n` +
          `  - License cap saturation at 94.4% (85/90 seats)\n` +
          `  - Renewal in 88 days; 50-seat growth top-up proposed (+$22.5k ARR)`;

        citations = [
          { source: 'Slack Connect', label: 'APAC Inquiry Verified' },
          { source: 'Mixpanel Telemetry', label: 'Capacity Saturation > 90%' }
        ];
      }
      else {
        botResponse = `Grounded query result: Portfolio contains ${customers.length} monitored accounts totaling $${(forecasting.totalArr / 1000).toFixed(0)}k ARR. Currently, $${(forecasting.revenueAtRisk / 1000).toFixed(0)}k ARR is flagged across accounts needing attention.`;
        citations = [
          { source: 'Unified RevOps DB', label: 'Cross-System Records' }
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
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            RevOps Copilot — Chat With Revenue Data
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Natural-language queries grounded in unified CRM records, telemetry streams, and communications cadence.
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
          RAG Citing Evidence
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-[650px]">
        {/* Suggested Prompt Chips */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] font-semibold whitespace-nowrap">Suggested Questions:</span>
          {sampleCopilotPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors text-xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-slate-950/40 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
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
                      Grounded Supporting Sources:
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
                        onClick={() => setSelectedCustomerId(m.relatedCustomer.id)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>View Customer 360° Timeline</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                    )}
                    {m.relatedAction && (
                      <button
                        onClick={() => setSelectedActionId(m.relatedAction.id)}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>Review Prepared Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-bl-none text-slate-400 text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Grounding response in available customer records & citing evidence...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask: 'Which accounts are most likely to churn this month?' or 'Show renewals in 7, 30, 90 days'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
