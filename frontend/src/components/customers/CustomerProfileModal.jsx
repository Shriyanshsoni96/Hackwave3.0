import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import RiskBadge from '../common/RiskBadge';
import {
  X,
  Building,
  MapPin,
  Calendar,
  CreditCard,
  Edit,
  RefreshCw,
  History,
  AlertTriangle,
  Mail,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Ban,
  ArrowRight,
  TrendingDown,
  UserCheck
} from 'lucide-react';

export default function CustomerProfileModal() {
  const {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    selectedCustomerAssessment,
    assessmentHistory,
    monthlyActivity,
    retentionActions,
    recalculateRisk,
    setEditingCustomerId,
    setSelectedActionId,
    setActionDecisionType,
    approveAction,
    rejectAction,
    thresholds
  } = useRevive();

  const [activeSubTab, setActiveSubTab] = useState('reasons'); // 'reasons' | 'monthly' | 'history' | 'action'
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [rejectReasonInput, setRejectReasonInput] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!selectedCustomerId || !selectedCustomer) return null;

  const assess = selectedCustomerAssessment || {
    score: 25,
    category: 'Low',
    status: 'Healthy',
    freshness: 'Recent',
    assessmentDate: '2026-10-10 12:00:00',
    primaryReason: 'Standard account telemetry',
    reasons: [],
    suggestedAction: 'Routine Monitoring'
  };

  const customerHistory = assessmentHistory[selectedCustomerId] || [];
  const customerMonthly = monthlyActivity[selectedCustomerId] || [];
  const pendingAction = retentionActions.find(
    (a) => a.customerId === selectedCustomerId && a.status === 'pending'
  );
  const completedActions = retentionActions.filter(
    (a) => a.customerId === selectedCustomerId && a.status !== 'pending'
  );

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      recalculateRisk(selectedCustomerId);
      setIsRecalculating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Profile Header (PRD Section 6) */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] bg-slate-50/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#14213D] to-[#4F46E5] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
              {selectedCustomer.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold text-[#0F172A]">{selectedCustomer.name}</h2>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                  {selectedCustomer.id}
                </span>
                <RiskBadge score={assess.score} category={assess.category} />
                {assess.isStale && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#B45309] border border-amber-300">
                    Stale Assessment
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className={selectedCustomer.isLocationVerified ? 'text-[#0F766E]' : 'text-slate-400'} />
                  {selectedCustomer.location}
                  {!selectedCustomer.isLocationVerified && ' (Unverified)'}
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard size={13} />
                  Tier: <strong className="text-[#0F172A]">{selectedCustomer.subscriptionTier}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  Renewal: <strong className="text-[#0F172A]">{selectedCustomer.contractRenewalDate}</strong>
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  Freshness: {assess.freshness}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons (Section 6) */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={() => setEditingCustomerId(selectedCustomer.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors"
            >
              <Edit size={13} />
              <span>Edit Customer</span>
            </button>
            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw size={13} className={isRecalculating ? 'animate-spin' : ''} />
              <span>{isRecalculating ? 'Recalculating...' : 'Recalculate Risk'}</span>
            </button>
            <button
              onClick={() => setSelectedCustomerId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 5 Core Questions Bar */}
        <div className="bg-[#14213D] text-white px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-indigo-300 font-bold">Investigation Lens:</span>
            <span className="text-slate-300">
              Answering Who, Why at risk, Activity over time, Actions taken, and What to do next.
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Outreach: <strong className="text-amber-300">{selectedCustomer.outreachCount} / {thresholds.maxOutreach} emails</strong></span>
            <span>Cooldown: <strong className={selectedCustomer.cooldownUntil ? 'text-amber-300' : 'text-emerald-400'}>
              {selectedCustomer.cooldownUntil ? `Until ${selectedCustomer.cooldownUntil}` : 'Eligible'}
            </strong></span>
          </div>
        </div>

        {/* Navigation Tabs inside Profile */}
        <div className="px-6 border-b border-[#E2E8F0] bg-white flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('reasons')}
            className={`py-3 border-b-2 transition-all ${
              activeSubTab === 'reasons'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Reasons Behind the Risk ({assess.reasons?.length || 0})
          </button>
          <button
            onClick={() => setActiveSubTab('monthly')}
            className={`py-3 border-b-2 transition-all ${
              activeSubTab === 'monthly'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Activity & Monthly History ({customerMonthly.length})
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-3 border-b-2 transition-all ${
              activeSubTab === 'history'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Assessment & Retention History ({customerHistory.length})
          </button>
          <button
            onClick={() => setActiveSubTab('action')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'action'
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span>Recommended Action Panel</span>
            {pendingAction && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: REASONS BEHIND THE RISK */}
          {activeSubTab === 'reasons' && (
            <div className="space-y-6">
              <div className="bg-[#EEF2FF] rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    Primary Risk Diagnosis
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">
                    Engine: {assess.engineVersion}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#0F172A] font-semibold leading-relaxed">
                  {assess.primaryReason}
                </p>
              </div>

              {/* Explainable Evidence Breakdown (PRD Section 6 & 10) */}
              <div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-3">
                  Evidence Breakdown & Feature Contribution
                </h4>
                <div className="space-y-3">
                  {assess.reasons && assess.reasons.length > 0 ? (
                    assess.reasons.map((r, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#0F172A]">{r.title}</span>
                            <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-[#E2E8F0] text-[#64748B]">
                              Period: {r.period}
                            </span>
                          </div>
                          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                            {r.description}
                          </p>
                          {r.metric && (
                            <span className="inline-block mt-2 text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              Observed Metric: {r.metric}
                            </span>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold font-mono text-[#DC2626]">
                            {r.impact}
                          </span>
                          <span className="block text-[10px] text-[#64748B]">Feature Contribution</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-[#64748B] bg-slate-50 rounded-xl border border-[#E2E8F0]">
                      No adverse risk signals detected in current evaluation.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY AND MONTHLY HISTORY */}
          {activeSubTab === 'monthly' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Chronological Monthly Telemetry</h4>
                  <p className="text-xs text-[#64748B]">
                    Extracted from <code>user_monthly</code> table in MongoDB Atlas. Showing recent periods first.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[#64748B] font-semibold">
                      <th className="py-2.5 px-3">Period</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Purchases / Vol</th>
                      <th className="py-2.5 px-3">Spend</th>
                      <th className="py-2.5 px-3">Days Since Purchase</th>
                      <th className="py-2.5 px-3">Active Users</th>
                      <th className="py-2.5 px-3">Tickets</th>
                      <th className="py-2.5 px-3">Events / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {customerMonthly.length > 0 ? (
                      customerMonthly.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 font-semibold text-[#0F172A]">{m.period}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                              {m.subscriptionStatus}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">{m.purchaseCount}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#0F172A]">{m.purchaseAmount}</td>
                          <td className="py-2.5 px-3">
                            <span className={`font-mono ${m.daysSinceLastPurchase > 30 ? 'text-[#DC2626] font-bold' : 'text-[#64748B]'}`}>
                              {m.daysSinceLastPurchase} days
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono">{m.activeUsers}</td>
                          <td className="py-2.5 px-3 font-mono text-[#D97706]">{m.supportTickets}</td>
                          <td className="py-2.5 px-3 text-[#64748B] max-w-xs truncate" title={m.events}>
                            {m.events}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-[#64748B]">
                          No historical monthly records available for this customer.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ASSESSMENT & RETENTION HISTORY */}
          {activeSubTab === 'history' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-3">Historical Risk Assessments</h4>
                <div className="space-y-2 border border-[#E2E8F0] rounded-xl overflow-hidden">
                  {customerHistory.map((h, i) => (
                    <div key={i} className="p-3.5 bg-white border-b border-[#E2E8F0] last:border-b-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <RiskBadge score={h.score} category={h.category} size="sm" />
                        <div>
                          <div className="font-semibold text-[#0F172A]">{h.reasonsSummary}</div>
                          <div className="text-[11px] text-[#64748B] mt-0.5">Engine: {h.engineVersion}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[11px] text-[#64748B]">
                        {h.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-3">Retention Workflow & Outreach History</h4>
                {completedActions.length > 0 ? (
                  <div className="space-y-3">
                    {completedActions.map((act) => (
                      <div key={act.id} className="p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F172A]">{act.proposedAction}</span>
                          <span className="px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] bg-slate-200 text-[#0F172A]">
                            {act.status}
                          </span>
                        </div>
                        <p className="text-[#64748B]">{act.deliveryOutcome || act.decisionNotes}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px] text-[#94A3B8]">
                          <span>Action ID: {act.id}</span>
                          <span>{act.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#64748B] italic">No previous retention actions executed.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RECOMMENDED ACTION PANEL */}
          {activeSubTab === 'action' && (
            <div className="space-y-6">
              {pendingAction ? (
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-card space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                        Pending Retention Recommendation
                      </span>
                      <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                        {pendingAction.proposedAction}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200">
                      Awaiting Manager Approval
                    </span>
                  </div>

                  {/* Outreach Limit & Safeguards Banner */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-[#E2E8F0] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#0F766E]" />
                      <span>
                        Outreach Status: <strong>{pendingAction.outreachCount} of {pendingAction.maxOutreach} warning emails sent</strong>
                      </span>
                    </div>
                    <span className="font-semibold text-[#0F766E]">{pendingAction.cooldownStatus}</span>
                  </div>

                  {/* Email Draft Preview (PRD Section 6 & 8) */}
                  {pendingAction.draftEmail && (
                    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-slate-50/50">
                      <div className="bg-slate-100/80 px-4 py-2.5 border-b border-[#E2E8F0] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[#64748B]">To:</span>
                          <span className="font-mono text-[#0F172A] font-semibold">{pendingAction.draftEmail.recipient}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#64748B]">From:</span>
                          <span className="font-mono text-[#0F172A]">{pendingAction.draftEmail.sender}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#64748B]">Subject:</span>
                          <span className="font-semibold text-[#0F172A]">{pendingAction.draftEmail.subject}</span>
                        </div>
                      </div>
                      <div className="p-4 text-xs font-mono text-[#0F172A] whitespace-pre-line leading-relaxed bg-white">
                        {pendingAction.draftEmail.body}
                      </div>
                    </div>
                  )}

                  {/* Approve / Reject Controls */}
                  <div className="pt-3 border-t border-[#E2E8F0]">
                    {!showRejectForm ? (
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setShowRejectForm(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                        >
                          <Ban size={14} />
                          <span>Reject Recommendation</span>
                        </button>
                        <button
                          onClick={() => approveAction(pendingAction.id, 'Approved via Customer Profile')}
                          className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors"
                        >
                          <Send size={14} />
                          <span>Approve & Send Outreach</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-red-50/50 p-4 rounded-xl border border-red-200">
                        <label className="block text-xs font-bold text-[#DC2626]">
                          Manager Rejection Reason (Required for Audit Log)
                        </label>
                        <textarea
                          value={rejectReasonInput}
                          onChange={(e) => setRejectReasonInput(e.target.value)}
                          placeholder="State why this outreach is rejected (e.g. active executive renegotiation, inaccurate latency premise)..."
                          className="w-full text-xs p-2.5 rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-red-500 bg-white"
                          rows={2}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowRejectForm(false)}
                            className="px-3 py-1.5 text-xs text-[#64748B] hover:bg-slate-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              rejectAction(pendingAction.id, rejectReasonInput);
                              setShowRejectForm(false);
                            }}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg"
                          >
                            Confirm Rejection (Suppress Email)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs text-[#64748B]">
                  <CheckCircle2 size={32} className="mx-auto text-[#15803D] mb-2" />
                  <p className="font-semibold text-[#0F172A]">No Pending Retention Actions</p>
                  <p className="mt-1">
                    Customer is either currently stable or recent outreach is in cooldown period.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
