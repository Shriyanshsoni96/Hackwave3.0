import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  XCircle, 
  Edit3, 
  Mail, 
  Database, 
  Send, 
  ShieldAlert, 
  ListTodo, 
  Video, 
  Clock, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function ActionApprovalModal() {
  const { 
    selectedAction, 
    setSelectedActionId, 
    handleApproveAction, 
    handleRejectAction,
    handleUpdateActionDraft 
  } = useRevOps();

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedTo, setEditedTo] = useState('');
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');

  // Task & Meeting fields
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    if (selectedAction) {
      if (selectedAction.draft) {
        setEditedTo(selectedAction.draft.to || '');
        setEditedSubject(selectedAction.draft.subject || '');
        setEditedBody(selectedAction.draft.body || '');
      }
      if (selectedAction.followUpTask) {
        setTaskTitle(selectedAction.followUpTask.title || '');
        setTaskDueDate(selectedAction.followUpTask.dueDate || '');
      }
      setIsEditingEmail(false);
      setShowRejectInput(false);
    }
  }, [selectedAction]);

  if (!selectedAction) return null;
  const a = selectedAction;

  const onSaveEmailEdits = () => {
    handleUpdateActionDraft(a.id, {
      to: editedTo,
      subject: editedSubject,
      body: editedBody
    });
    setIsEditingEmail(false);
  };

  const onConfirmApproval = () => {
    handleApproveAction(a.id, approvalNotes);
  };

  const onConfirmRejection = () => {
    handleRejectAction(a.id, rejectionReason);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/95 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                HUMAN APPROVAL GATEWAY
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                a.urgency === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                a.urgency === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {a.urgency} URGENCY
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{a.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Customer: <strong className="text-slate-200">{a.customerName}</strong> • Owner: <strong className="text-slate-300">{a.accountOwner}</strong> • Revenue Impact: <strong className="text-emerald-400">{a.impact}</strong>
            </p>
          </div>
          <button
            onClick={() => setSelectedActionId(null)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-slate-950/40 text-xs">
          {/* AI Rationale Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-slate-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Evidence-Backed Rationale:</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs">
              {a.rationale}
            </p>
          </div>

          {/* 1. Follow-up Task Section (PDF Section 1) */}
          {a.followUpTask && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider">
                <ListTodo className="w-4 h-4 text-blue-400" />
                <span>1. Prepared Follow-up Task</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 font-medium text-xs focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Assignee: <strong className="text-slate-200">{a.followUpTask.assignee}</strong></span>
                  <span>Due Date: <strong className="text-amber-400">{taskDueDate}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Meeting Suggestion Section (PDF Section 1) */}
          {a.meetingSuggestion && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider">
                <Video className="w-4 h-4 text-emerald-400" />
                <span>2. Meeting Suggestion ({a.meetingSuggestion.duration})</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 text-slate-300">
                <div className="font-semibold text-white">{a.meetingSuggestion.title}</div>
                <div className="text-[11px] text-slate-400">Proposed: <span className="text-slate-200">{a.meetingSuggestion.proposedTimes?.join(' OR ')}</span></div>
                <div className="text-[11px] text-slate-400">Attendees: <span className="text-slate-300">{a.meetingSuggestion.attendees?.join(', ')}</span></div>
              </div>
            </div>
          )}

          {/* 3. Personalized Email Draft (PDF Section 1) */}
          {a.draft && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>3. Personalized Email Draft</span>
                </div>
                {!isEditingEmail ? (
                  <button
                    onClick={() => setIsEditingEmail(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Edit Draft</span>
                  </button>
                ) : (
                  <button
                    onClick={onSaveEmailEdits}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Edits</span>
                  </button>
                )}
              </div>

              {!isEditingEmail ? (
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-slate-400">
                    To: <strong className="text-slate-200">{a.draft.to}</strong> {a.draft.cc && <span>• CC: <span className="text-slate-400">{a.draft.cc}</span></span>}
                  </div>
                  <div className="text-slate-400">
                    Subject: <strong className="text-white">{a.draft.subject}</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed font-sans bg-slate-900/50 p-3 rounded">
                    {a.draft.body}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-950 p-3.5 rounded-lg border border-blue-500/40">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">To Recipient:</label>
                    <input
                      type="text"
                      value={editedTo}
                      onChange={(e) => setEditedTo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Subject:</label>
                    <input
                      type="text"
                      value={editedSubject}
                      onChange={(e) => setEditedSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Body:</label>
                    <textarea
                      rows={6}
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Proposed CRM Update (PDF Section 1) */}
          {a.crmUpdate && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider">
                <Database className="w-4 h-4 text-amber-400" />
                <span>4. Proposed CRM Update</span>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">Current CRM State:</span>
                  <span className="text-slate-300 font-medium">{a.crmUpdate.currentValue}</span>
                </div>
                <div>
                  <span className="text-[11px] text-emerald-400 block mb-0.5">Proposed Modification:</span>
                  <span className="text-emerald-300 font-bold">{a.crmUpdate.proposedValue}</span>
                </div>
              </div>
            </div>
          )}

          {/* Approval Notes Input (PDF: Record Actor, Reason, Action) */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <label className="block text-slate-300 font-semibold text-xs">
              Approval Notes / Instructions (Logged to Audit Trail):
            </label>
            <input
              type="text"
              placeholder="e.g. Approved. Will follow up directly if champion does not reply by Friday."
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Rejection input box if triggered */}
          {showRejectInput && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-2 animate-in fade-in">
              <label className="block text-xs font-semibold text-rose-300">
                Reason for Rejecting Action (Required for Audit Trail):
              </label>
              <input
                type="text"
                placeholder="e.g. Champion contacted via phone directly; email not needed."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-slate-900 border border-rose-800/60 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowRejectInput(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmRejection}
                  className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold"
                >
                  Confirm Rejection & Log
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Human authorization required before any external dispatch.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowRejectInput(true)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border border-slate-700/60 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Reject Action</span>
            </button>
            <button
              onClick={onConfirmApproval}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Approve & Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
