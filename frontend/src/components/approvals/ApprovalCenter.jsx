import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import RiskBadge from '../common/RiskBadge';
import ConfirmationDialog from '../common/ConfirmationDialog';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  Ban,
  AlertCircle,
  Mail,
  Send,
  Eye,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  User,
  Calendar
} from 'lucide-react';

export default function ApprovalCenter() {
  const {
    retentionActions,
    approveAction,
    rejectAction,
    retryEmail,
    setSelectedCustomerId,
    thresholds
  } = useRevive();

  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'failed' | 'completed'
  const [inspectEmailId, setInspectEmailId] = useState(null);

  // Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    actionId: null,
    type: null, // 'approve' | 'reject'
    action: null
  });
  const [rejectReason, setRejectReason] = useState('');

  const pendingCount = retentionActions.filter((a) => a.status === 'pending').length;
  const approvedCount = retentionActions.filter((a) => a.status === 'approved').length;
  const rejectedCount = retentionActions.filter((a) => a.status === 'rejected').length;
  const failedCount = retentionActions.filter((a) => a.status === 'failed').length;
  const completedCount = retentionActions.filter((a) => a.status === 'completed').length;

  const filteredActions = retentionActions.filter((a) => a.status === activeTab);

  const handleOpenConfirm = (action, type) => {
    setConfirmDialog({
      isOpen: true,
      actionId: action.id,
      type,
      action
    });
    setRejectReason('');
  };

  const handleExecuteDecision = () => {
    if (confirmDialog.type === 'approve') {
      approveAction(confirmDialog.actionId, 'Approved in Approval Center');
    } else if (confirmDialog.type === 'reject') {
      rejectAction(confirmDialog.actionId, rejectReason);
    }
    setConfirmDialog({ isOpen: false, actionId: null, type: null, action: null });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Approval Center
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manager governance & retention outreach validation. No unapproved automated outreach is permitted.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-[#4F46E5] border border-indigo-200">
            Enforced Rule: Max 3 Emails / 14-day Cooldown
          </span>
        </div>
      </div>

      {/* Safeguards Alert Banner (PRD Section 8) */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs text-[#92400E] flex items-start gap-3">
        <ShieldCheck size={20} className="text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#78350F]">Mandatory Manager Safeguards Enforced:</span>
          <p className="leading-relaxed">
            Rejected actions are never sent. Scheduled jobs cannot bypass manager authorization. Repeated requests cannot create duplicate sends. All decision transitions are permanently logged in the audit trail.
          </p>
        </div>
      </div>

      {/* PRD Section 8 Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] overflow-x-auto pb-px">
        {[
          { id: 'pending', label: 'Pending Review', count: pendingCount, color: 'text-amber-700 bg-amber-100' },
          { id: 'approved', label: 'Approved & Queued', count: approvedCount, color: 'text-blue-700 bg-blue-100' },
          { id: 'rejected', label: 'Rejected', count: rejectedCount, color: 'text-red-700 bg-red-100' },
          { id: 'failed', label: 'Delivery Failed', count: failedCount, color: 'text-rose-700 bg-rose-100' },
          { id: 'completed', label: 'Completed', count: completedCount, color: 'text-emerald-700 bg-emerald-100' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#4F46E5] text-[#4F46E5]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tab.color}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredActions.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center text-xs text-[#64748B]">
            <CheckCircle2 size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-sm text-[#0F172A]">No {activeTab} actions</p>
            <p className="mt-1">Everything in this queue has been addressed.</p>
          </div>
        ) : (
          filteredActions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card hover:shadow-card-hover transition-all space-y-4"
            >
              {/* Item Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-700">
                    {item.customerId.substring(5)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCustomerId(item.customerId)}
                        className="font-bold text-sm text-[#0F172A] hover:text-[#4F46E5] hover:underline"
                      >
                        {item.customerName}
                      </button>
                      <span className="font-mono text-xs text-[#64748B]">({item.customerId})</span>
                      <RiskBadge score={item.riskScore} category={item.riskCategory} size="sm" />
                    </div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Contact: <strong className="text-[#0F172A]">{item.contactName}</strong> ({item.contactEmail})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="text-[#64748B] block">Outreach Sent</span>
                    <span className="font-mono font-bold text-[#0F172A]">
                      {item.outreachCount} / {item.maxOutreach} emails
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCustomerId(item.customerId)}
                    className="p-2 text-[#64748B] hover:text-[#4F46E5] hover:bg-slate-100 rounded-lg transition-colors"
                    title="View Customer Intelligence Profile"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Proposed Action Box */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4F46E5]">Proposed Retention Action:</span>
                  <span className="font-mono text-[11px] text-[#64748B]">Created: {item.createdAt}</span>
                </div>
                <p className="font-semibold text-sm text-[#0F172A]">{item.proposedAction}</p>
                <p className="text-[#64748B] leading-relaxed">
                  <strong>Risk Diagnosis:</strong> {item.reasonsSummary}
                </p>
              </div>

              {/* Email Draft Preview Toggle */}
              {item.draftEmail && (
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setInspectEmailId(inspectEmailId === item.id ? null : item.id)}
                    className="w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F172A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={14} className="text-[#4F46E5]" />
                      Draft Outreach Email: "{item.draftEmail.subject}"
                    </span>
                    <span className="text-[11px] text-[#4F46E5]">
                      {inspectEmailId === item.id ? 'Hide Draft' : 'Preview Full Email Draft'}
                    </span>
                  </button>

                  {inspectEmailId === item.id && (
                    <div className="p-4 bg-white border-t border-[#E2E8F0] text-xs font-mono text-[#0F172A] whitespace-pre-line leading-relaxed">
                      {item.draftEmail.body}
                    </div>
                  )}
                </div>
              )}

              {/* Decision Outcome or Action Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
                <div className="text-xs text-[#64748B]">
                  {item.status === 'pending' ? (
                    <span className="text-amber-700 font-medium">
                      Status: {item.cooldownStatus}
                    </span>
                  ) : item.status === 'approved' ? (
                    <span className="text-blue-700 font-medium">
                      {item.decision} • {item.deliveryOutcome}
                    </span>
                  ) : item.status === 'rejected' ? (
                    <span className="text-red-700 font-medium">
                      {item.decision}: "{item.decisionNotes}"
                    </span>
                  ) : item.status === 'failed' ? (
                    <span className="text-rose-700 font-medium flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      {item.deliveryOutcome}
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium">
                      Completed: {item.deliveryOutcome}
                    </span>
                  )}
                </div>

                {/* Manager Decision Buttons for Pending */}
                {item.status === 'pending' && (
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenConfirm(item, 'reject')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                    >
                      <Ban size={13} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleOpenConfirm(item, 'approve')}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors"
                    >
                      <Send size={13} />
                      <span>Approve & Send</span>
                    </button>
                  </div>
                )}

                {/* Retry button for failed delivery */}
                {item.status === 'failed' && (
                  <button
                    onClick={() => retryEmail('EMAIL-8803')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg transition-colors"
                  >
                    <RotateCcw size={13} />
                    <span>Retry Dispatch</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.type === 'approve'
            ? `Approve Outreach for ${confirmDialog.action?.customerName}`
            : `Reject Retention Action ${confirmDialog.action?.id}`
        }
        description={
          confirmDialog.type === 'approve'
            ? `Are you sure you want to approve this retention action? The draft email will be authenticated and dispatched immediately via the email gateway.`
            : `Please provide a reason for rejecting this retention action. The outreach will be suppressed and this rejection recorded permanently in the activity log.`
        }
        confirmLabel={confirmDialog.type === 'approve' ? 'Approve & Dispatch' : 'Confirm Rejection'}
        confirmVariant={confirmDialog.type === 'approve' ? 'primary' : 'danger'}
        onConfirm={handleExecuteDecision}
        onCancel={() => setConfirmDialog({ isOpen: false, actionId: null, type: null, action: null })}
      >
        {confirmDialog.type === 'reject' && (
          <div className="mt-3">
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Rejection Rationale <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. In direct sales renegotiation, discount premature, incorrect diagnosis..."
              className="w-full p-2.5 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        )}
      </ConfirmationDialog>
    </div>
  );
}
