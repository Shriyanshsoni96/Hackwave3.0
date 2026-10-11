import React, { useState } from 'react';
import { 
  X, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  BarChart2, 
  Sparkles, 
  ArrowRight, 
  Database,
  Clock,
  Calendar,
  Mail,
  UserCheck,
  CheckCircle2,
  FileText,
  Video,
  ListTodo,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { useRevOps } from '../../context/RevOpsContext';

export default function CustomerDetailModal() {
  const { selectedCustomer, setSelectedCustomerId, setSelectedActionId, setActiveTab: setMainTab } = useRevOps();
  
  // Tab states: 'timeline' (Signature feature per PDF) | 'evidence' | 'trends' | 'workflow'
  const [activeTab, setActiveTab] = useState('timeline');

  if (!selectedCustomer) return null;
  const c = selectedCustomer;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/95 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                CUSTOMER 360° VIEW
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">{c.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {c.industry}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                c.dynamicHealthStatus === 'High Risk' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                c.dynamicHealthStatus === 'Needs Attention' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {c.dynamicHealthStatus} ({c.dynamicRiskScore}% Risk)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Account Owner: <strong className="text-slate-200">{c.accountOwner}</strong> • Contract ARR: <strong className="text-white">${c.arr.toLocaleString()}</strong> • Renewal: <strong className="text-amber-300 font-semibold">{c.daysToRenewal} days</strong> ({c.renewalDate})
            </p>
          </div>
          <button
            onClick={() => setSelectedCustomerId(null)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unified Signals Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-950/60 border-b border-slate-800 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Product Usage</span>
            <span className="text-sm font-bold text-white">{c.signals.activeUsers} / {c.signals.totalSeats} seats</span>
            <span className={`text-[11px] font-semibold flex items-center gap-1 ${c.signals.usageTrend < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {c.signals.usageTrend < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
              {c.signals.usageTrend}% in last 30d
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Meeting Cadence</span>
            <span className="text-sm font-bold text-white">{c.signals.lastMeetingDaysAgo} days ago</span>
            <span className="text-[11px] text-amber-400 block">No next step recorded</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Customer Responses</span>
            <span className={`text-sm font-bold ${c.signals.unansweredOutreachCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {c.signals.unansweredOutreachCount} Unanswered Emails
            </span>
            <span className="text-[11px] text-slate-400 block">Champion silent {c.signals.unansweredMessagesDaysAgo || 0}d</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">Support Activity</span>
            <span className="text-sm font-bold text-white">NPS {c.signals.npsScore}/10</span>
            <span className="text-[11px] text-slate-400 block">{c.signals.openTickets} tickets (avg {c.signals.avgResolutionHours}h)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 flex items-center gap-6 bg-slate-900/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'timeline' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            Signature: Evidence Timeline ({c.evidenceTimeline ? c.evidenceTimeline.length : 0})
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'evidence' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Explainable AI Records
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'trends' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            Product Usage Telemetry
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'workflow' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Autonomous Follow-up Workflow
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-950/40 text-xs">
          {/* TAB 1: SIGNATURE FEATURE — CUSTOMER 360° EVIDENCE TIMELINE (Section 4 of PDF) */}
          {activeTab === 'timeline' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Cross-System Customer Story & Signal Fusion
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    Connecting scattered signals across CRM, email calendar, and telemetry into a traceable narrative. Illustrative demo account: <strong>{c.name}</strong>.
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-800">
                  Signature Timeline
                </span>
              </div>

              {/* Exact Table from Page 2 Section 4 of PDF */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="py-3 px-4 w-32">When</th>
                      <th className="py-3 px-4">Signal / Event</th>
                      <th className="py-3 px-4">Why it matters</th>
                      <th className="py-3 px-4 text-right">Source System</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {c.evidenceTimeline ? (
                      c.evidenceTimeline.map((item, idx) => (
                        <tr 
                          key={idx} 
                          className={`hover:bg-slate-800/40 transition-colors ${
                            item.severity === 'CRITICAL' ? 'bg-rose-950/20' :
                            item.severity === 'HIGH' ? 'bg-amber-950/15' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-white whitespace-nowrap flex items-center gap-2">
                            <Clock className={`w-3.5 h-3.5 ${
                              item.severity === 'CRITICAL' ? 'text-rose-400' :
                              item.severity === 'HIGH' ? 'text-amber-400' : 'text-blue-400'
                            }`} />
                            <span>{item.when}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-200 font-medium">
                            {item.event}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            <span className={`px-2 py-0.5 rounded font-medium ${
                              item.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                              item.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300' :
                              item.severity === 'EXPANSION' ? 'bg-blue-500/20 text-blue-300' :
                              'text-slate-300'
                            }`}>
                              {item.whyItMatters}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                            {item.source}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-500">Timeline events being compiled from live connectors...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Recommended Response Callout (Directly from PDF Page 2 Section 4) */}
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-900/40 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Recommended Response Strategy:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Contact the customer champion (<strong>{c.primaryContact.name}</strong>), investigate the usage decline (-{Math.abs(c.signals.usageTrend)}%), and schedule a renewal review. Draft the email and task first; ask for approval before sending the email or changing CRM data.
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveTab('workflow')}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Prepared Action & Draft</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPLAINABLE AI RECORDS (Section 1 Core Features) */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-900/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Explainable AI Reasoning Summary
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {c.aiSummary}
                </p>
              </div>

              <div className="space-y-3">
                {c.evidence.map((ev) => (
                  <div 
                    key={ev.id}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      ev.isAssumption ? 'bg-amber-950/20 border-amber-900/40' : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                          ev.type === 'FACT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {ev.type === 'FACT' ? 'SUPPORTING RECORD' : 'INFERRED CONTEXT'}
                        </span>
                        <span className="font-semibold text-white text-sm">{ev.title}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{ev.timestamp}</span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-300 leading-relaxed text-xs">
                        <strong className="text-slate-400">What happened: </strong> {ev.whatHappened}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        <strong className="text-slate-500">Supporting Records: </strong> {ev.supportingRecords}
                      </p>
                    </div>

                    {ev.recommendedNextStep && (
                      <div className="p-2 rounded bg-slate-950 border border-slate-800/80 text-blue-300 text-[11px] flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 flex-shrink-0 text-blue-400" />
                        <span><strong>Recommended Next Step:</strong> {ev.recommendedNextStep}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Confidence Level: <strong className="text-white font-mono">{Math.round(ev.confidence * 100)}%</strong></span>
                      <span className="italic text-slate-500">Traceable to verified event logs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT USAGE TELEMETRY */}
          {activeTab === 'trends' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">6-Month Product Engagement Telemetry</h3>
                  <p className="text-xs text-slate-400">Monthly active users & weekly session frequency</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Active Users
                  </span>
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> API Calls (/10k)
                  </span>
                </div>
              </div>

              <div className="h-64 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={c.usageHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="activeUsers" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" name="Active Users" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 4: AUTONOMOUS FOLLOW-UP WORKFLOW (Section 1 Core Features) */}
          {activeTab === 'workflow' && c.recommendedAction && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      AUTONOMOUS FOLLOW-UP SUITE
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{c.recommendedAction.title}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {c.recommendedAction.urgency} Urgency
                  </span>
                </div>

                {/* 1. Follow-up Task */}
                {c.recommendedAction.followUpTask && (
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                      <ListTodo className="w-4 h-4 text-blue-400" />
                      <span>Prepared Follow-up Task:</span>
                    </div>
                    <p className="text-slate-200 font-medium pl-6">{c.recommendedAction.followUpTask.title}</p>
                    <div className="pl-6 text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Assignee: <strong className="text-white">{c.recommendedAction.followUpTask.assignee}</strong></span>
                      <span>•</span>
                      <span>Due: <strong className="text-amber-400">{c.recommendedAction.followUpTask.dueDate}</strong></span>
                    </div>
                  </div>
                )}

                {/* 2. Meeting Suggestion */}
                {c.recommendedAction.meetingSuggestion && (
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                      <Video className="w-4 h-4 text-emerald-400" />
                      <span>Meeting Suggestion:</span>
                      <span className="text-[10px] text-slate-400">({c.recommendedAction.meetingSuggestion.duration})</span>
                    </div>
                    <p className="text-slate-200 font-medium pl-6">{c.recommendedAction.meetingSuggestion.title}</p>
                    <div className="pl-6 text-[11px] text-slate-400 space-y-1">
                      <div>Proposed Times: <span className="text-slate-200">{c.recommendedAction.meetingSuggestion.proposedTimes.join(' OR ')}</span></div>
                      <div>Attendees: <span className="text-slate-300">{c.recommendedAction.meetingSuggestion.attendees.join(', ')}</span></div>
                    </div>
                  </div>
                )}

                {/* 3. Personalized Email Draft */}
                {c.recommendedAction.draft && (
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-slate-300 font-semibold text-xs">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <span>Personalized Email Draft</span>
                      </div>
                      <span className="text-[11px] text-blue-400">To: {c.recommendedAction.draft.to}</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                      {c.recommendedAction.draft.body}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedActionId(c.recommendedAction.actionId);
                      setMainTab('actions');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                  >
                    <span>Open Human Approval Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Champion Contact: <strong className="text-white">{c.primaryContact.name}</strong> • <span className="text-blue-400">{c.primaryContact.email}</span>
          </div>
          <button
            onClick={() => setSelectedCustomerId(null)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
