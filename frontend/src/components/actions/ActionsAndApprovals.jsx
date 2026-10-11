import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Mail, 
  Database, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  ListTodo, 
  Video 
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function ActionsAndApprovals() {
  const { 
    actions, 
    setSelectedActionId, 
    setSelectedCustomerId 
  } = useRevOps();

  const [activeTab, setActiveTab] = useState('PENDING');

  const filteredActions = actions.filter(a => {
    if (activeTab === 'ALL') return true;
    return a.status === activeTab;
  });

  const pendingCount = actions.filter(a => a.status === 'PENDING').length;
  const approvedCount = actions.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = actions.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-400" />
            Actions & Human Approvals Workflow
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Follow-up tasks, personalized email drafts, meeting suggestions, and proposed CRM updates awaiting owner review.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'PENDING'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Pending Approvals</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/30 font-bold">{pendingCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('APPROVED')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'APPROVED'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Approved</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/30 font-bold">{approvedCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('REJECTED')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'REJECTED'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Rejected</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/30 font-bold">{rejectedCount}</span>
          </button>
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Actions ({actions.length})
          </button>
        </div>
      </div>

      {/* Action Cards List */}
      <div className="space-y-4">
        {filteredActions.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-xl">
            <CheckCircle2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-300">No actions in this queue</h3>
            <p className="text-xs text-slate-500 mt-1">All recommendations have been evaluated or executed.</p>
          </div>
        ) : (
          filteredActions.map((action) => (
            <div
              key={action.id}
              className={`bg-slate-900/90 border rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all ${
                action.status === 'PENDING' ? 'border-slate-800 hover:border-slate-700' :
                action.status === 'APPROVED' ? 'border-emerald-900/40 bg-emerald-950/10' :
                'border-rose-900/30 bg-rose-950/10'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Main Content */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      action.urgency === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                      action.urgency === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    }`}>
                      {action.urgency} URGENCY
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      action.status === 'PENDING' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                      action.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                      'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {action.status}
                    </span>

                    <h2 className="text-base font-bold text-white tracking-tight">
                      {action.title}
                    </h2>
                  </div>

                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                    <span>Account: <strong className="text-white hover:text-blue-400 cursor-pointer" onClick={() => setSelectedCustomerId(action.customerId)}>{action.customerName}</strong></span>
                    <span>•</span>
                    <span>Owner: <strong className="text-slate-300">{action.accountOwner}</strong></span>
                    <span>•</span>
                    <span>Revenue Impact: <strong className="text-emerald-400 font-semibold">{action.impact}</strong></span>
                    <span>•</span>
                    <span className="text-slate-500 font-mono text-[11px]">{action.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <strong className="text-slate-400 block mb-0.5">Rationale:</strong>
                    {action.rationale}
                  </p>

                  {/* Prepared Deliverables Grid (PDF Section 1) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    {/* 1. Follow-up task */}
                    {action.followUpTask && (
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                        <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px] mb-1">
                          <ListTodo className="w-3.5 h-3.5" />
                          <span>Follow-up Task</span>
                        </div>
                        <p className="text-slate-200 line-clamp-1">{action.followUpTask.title}</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Due: {action.followUpTask.dueDate}</span>
                      </div>
                    )}

                    {/* 2. Meeting Suggestion */}
                    {action.meetingSuggestion && (
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] mb-1">
                          <Video className="w-3.5 h-3.5" />
                          <span>Meeting Suggestion</span>
                        </div>
                        <p className="text-slate-200 line-clamp-1">{action.meetingSuggestion.title}</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{action.meetingSuggestion.duration}</span>
                      </div>
                    )}

                    {/* 3. Email Draft */}
                    {action.draft && (
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                        <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-[11px] mb-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span>Outreach Draft</span>
                        </div>
                        <p className="text-slate-200 line-clamp-1">"{action.draft.subject}"</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">To: {action.draft.to}</span>
                      </div>
                    )}
                  </div>

                  {/* Decision Audit Record if already decided */}
                  {action.executionResult && (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-2 text-slate-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Audit Record:</span>
                        <span className="text-slate-400 text-[11px]">Decided by {action.decidedBy} at {action.decidedAt}</span>
                      </div>
                      <p className="text-emerald-300 font-mono text-[11px]">
                        {action.executionResult}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Actions */}
                <div className="lg:w-48 flex flex-col justify-center gap-2 self-center lg:self-start pt-2 lg:pt-0">
                  {action.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => setSelectedActionId(action.id)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                      >
                        <span>Review & Approve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedCustomerId(action.customerId)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                      >
                        Customer 360° View
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedActionId(action.id)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      View Details & Audit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
