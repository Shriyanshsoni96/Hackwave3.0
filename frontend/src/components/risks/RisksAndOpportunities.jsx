import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  ShieldAlert, 
  Zap, 
  MessageSquare,
  Users,
  Activity
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function RisksAndOpportunities() {
  const { 
    customers, 
    riskRules, 
    setRiskRules, 
    setSelectedCustomerId, 
    setSelectedActionId,
    setActiveTab 
  } = useRevOps();

  const [activeSubTab, setActiveSubTab] = useState('churn'); // 'churn' | 'expansion' | 'rules'

  // Churn-risk accounts ranked by dynamic risk score
  const rankedChurnRisks = [...customers]
    .sort((a, b) => b.dynamicRiskScore - a.dynamicRiskScore);

  // Expansion opportunities ranked by expansion score
  const rankedExpansions = [...customers]
    .filter(c => c.expansionScore >= 50)
    .sort((a, b) => b.expansionScore - a.expansionScore);

  return (
    <div className="space-y-6">
      {/* Header & Sub-tab navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Risks & Growth Opportunities Detection
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Combining declining usage, unanswered messages, and upcoming renewals with traceable evidence.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveSubTab('churn')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'churn' 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Churn Prediction & Early Warning ({rankedChurnRisks.filter(c => c.dynamicRiskScore >= 50).length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('expansion')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'expansion' 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Expansion & Upsell Detection ({rankedExpansions.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('rules')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'rules' 
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Transparent Health Rules</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CHURN PREDICTION & EARLY WARNING (PDF Section 1) */}
      {activeSubTab === 'churn' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {rankedChurnRisks.map((c, index) => (
              <div
                key={c.id}
                className={`bg-slate-900/90 border rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700 ${
                  c.dynamicRiskScore >= 80 ? 'border-rose-900/40' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Account & Scores */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                      <h2 
                        className="text-base font-bold text-white hover:text-blue-400 cursor-pointer transition-colors"
                        onClick={() => setSelectedCustomerId(c.id)}
                      >
                        {c.name}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {c.tier}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        c.dynamicHealthStatus === 'High Risk' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                        c.dynamicHealthStatus === 'Needs Attention' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {c.dynamicHealthStatus} ({c.dynamicRiskScore}% Risk)
                      </span>
                    </div>

                    {/* Combined Signal Badges from PDF: Declining usage, Unanswered messages, Approaching renewal */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {c.signals.usageTrend < 0 && (
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60 flex items-center gap-1">
                          <Activity className="w-3 h-3 text-rose-400" />
                          Declining Usage ({c.signals.usageTrend}%)
                        </span>
                      )}
                      {c.signals.unansweredOutreachCount > 0 && (
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-amber-400" />
                          Unanswered Messages ({c.signals.unansweredOutreachCount})
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded border flex items-center gap-1 ${
                        c.daysToRenewal <= 30 ? 'bg-rose-950 text-rose-300 border-rose-800/60' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        <Clock className="w-3 h-3" />
                        Approaching Renewal ({c.daysToRenewal}d)
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span>Owner: <strong className="text-slate-200">{c.accountOwner}</strong></span>
                      <span>•</span>
                      <span>Portfolio ARR: <strong className="text-white">${c.arr.toLocaleString()}</strong></span>
                      <span>•</span>
                      <span>Renewal: <strong className="text-white">{c.renewalDate}</strong></span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed mt-2">
                      <strong className="text-slate-400 block mb-0.5">Evidence-Backed Explanation:</strong>
                      {c.aiSummary}
                    </p>
                  </div>

                  {/* Right Column: Signals breakdown & Recommended Next Action */}
                  <div className="lg:w-80 flex flex-col justify-between bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Core Signal Metrics</span>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Meeting Frequency:</span>
                        <span className="font-semibold text-slate-200">{c.signals.meetingFrequency}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Support / NPS:</span>
                        <span className="font-semibold text-white">NPS {c.signals.npsScore}/10 ({c.signals.openTickets} tickets)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Seat Utilization:</span>
                        <span className="font-semibold text-white">
                          {c.signals.activeUsers}/{c.signals.totalSeats} ({c.signals.seatUtilization.toFixed(0)}%)
                        </span>
                      </div>
                    </div>

                    {c.recommendedAction && (
                      <div className="pt-2 border-t border-slate-800 space-y-2">
                        <div className="text-[11px] text-blue-400 font-semibold truncate">
                          Next Action: {c.recommendedAction.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCustomerId(c.id)}
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-center font-medium transition-colors"
                          >
                            Customer 360°
                          </button>
                          <button
                            onClick={() => setSelectedActionId(c.recommendedAction.actionId)}
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-center font-semibold transition-colors"
                          >
                            Review Action
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: EXPANSION & UPSELL DETECTION (PDF Section 1) */}
      {activeSubTab === 'expansion' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {rankedExpansions.map((c, index) => (
              <div
                key={c.id}
                className="bg-slate-900/90 border border-blue-900/40 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all hover:border-blue-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-slate-500">#{index + 1}</span>
                      <h2 
                        className="text-base font-bold text-white hover:text-blue-400 cursor-pointer transition-colors"
                        onClick={() => setSelectedCustomerId(c.id)}
                      >
                        {c.name}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {c.tier}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Expansion Score: {c.expansionScore}/100
                      </span>
                    </div>

                    {/* Growth Signals Badges from PDF: Rising usage, Approaching plan limits, Growing teams, Positive feedback */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        Rising Usage (+{c.signals.usageTrend}%)
                      </span>
                      {c.signals.seatUtilization >= 90 && (
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60 flex items-center gap-1">
                          <Activity className="w-3 h-3 text-blue-400" />
                          Approaching Plan Limits ({c.signals.seatUtilization.toFixed(0)}% capacity)
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        Growing Teams ({c.signals.activeUsers} active)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Positive Feedback (NPS {c.signals.npsScore}/10)
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>Owner: <strong className="text-slate-200">{c.accountOwner}</strong></span>
                      <span>•</span>
                      <span>Current ARR: <strong className="text-white">${c.arr.toLocaleString()}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">
                        Expansion Velocity: +{c.signals.usageTrend}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed mt-2">
                      <strong className="text-slate-400 block mb-0.5">Expansion Evidence & Rationale:</strong>
                      {c.aiSummary}
                    </p>
                  </div>

                  {/* Expansion Action Block */}
                  <div className="lg:w-80 bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Growth Signals</span>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Seat Capacity:</span>
                        <span className="font-semibold text-emerald-400">
                          {c.signals.activeUsers} / {c.signals.totalSeats} ({c.signals.seatUtilization.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/60">
                        <span className="text-slate-400">Feedback Rating:</span>
                        <span className="font-semibold text-white">NPS {c.signals.npsScore}/10 (Promoter)</span>
                      </div>
                    </div>

                    {c.recommendedAction && (
                      <div className="pt-2 border-t border-slate-800 space-y-2">
                        <div className="text-[11px] text-emerald-400 font-semibold truncate">
                          Impact: {c.recommendedAction.impact}
                        </div>
                        <button
                          onClick={() => setSelectedActionId(c.recommendedAction.actionId)}
                          className="w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center transition-colors"
                        >
                          Review Expansion Proposal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: TRANSPARENT HEALTH RULES ENGINE (PDF Section 1) */}
      {activeSubTab === 'rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Transparent AI Customer Health Scoring Rules
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Assigning 0–100 score transparently using product usage, meeting frequency, customer responses, support activity, and renewal status.
              </p>
            </div>
            <button
              onClick={() => setRiskRules({
                usageDropWeight: 35,
                unansweredOutreachPenalty: 20,
                renewalDaysThreshold: 60,
                minSeatUtilization: 60,
              })}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Product Usage Decline Weight</span>
                <span className="font-mono text-blue-400 font-bold">{riskRules.usageDropWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={riskRules.usageDropWeight}
                onChange={(e) => setRiskRules(prev => ({ ...prev, usageDropWeight: Number(e.target.value) }))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Calculates risk penalty when monthly active seats and API calls trend downward against baseline.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Unanswered Customer Messages Penalty</span>
                <span className="font-mono text-amber-400 font-bold">+{riskRules.unansweredOutreachPenalty} pts / message</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={riskRules.unansweredOutreachPenalty}
                onChange={(e) => setRiskRules(prev => ({ ...prev, unansweredOutreachPenalty: Number(e.target.value) }))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Adds cumulative penalty points for every unanswered check-in email or calendar invite.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Approaching Renewal Horizon</span>
                <span className="font-mono text-rose-400 font-bold">{riskRules.renewalDaysThreshold} days</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="10"
                value={riskRules.renewalDaysThreshold}
                onChange={(e) => setRiskRules(prev => ({ ...prev, renewalDaysThreshold: Number(e.target.value) }))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Accounts expiring within this window receive prioritized risk urgency multiplier.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Plan Limit / Minimum Seat Threshold</span>
                <span className="font-mono text-emerald-400 font-bold">{riskRules.minSeatUtilization}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="80"
                step="5"
                value={riskRules.minSeatUtilization}
                onChange={(e) => setRiskRules(prev => ({ ...prev, minSeatUtilization: Number(e.target.value) }))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Detects under-utilization below threshold or plan saturation above 90% for expansion.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
