import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import {
  Search,
  Bell,
  PlayCircle,
  FilePlus,
  CheckCircle2,
  AlertTriangle,
  User,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Topbar() {
  const {
    globalSearch,
    setGlobalSearch,
    runBatchAssessment,
    generateReport,
    retentionActions,
    setSelectedActionId,
    setActionDecisionType,
    setActiveTab,
    setSelectedCustomerId,
    customers
  } = useRevive();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRunningAssessment, setIsRunningAssessment] = useState(false);

  const pendingActions = retentionActions.filter((a) => a.status === 'pending');

  const handleRunAssessment = () => {
    setIsRunningAssessment(true);
    setTimeout(() => {
      runBatchAssessment();
      setIsRunningAssessment(false);
    }, 900);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between shrink-0 shadow-sm z-20">
      {/* Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search customers by ID, name, region..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Action Controls & Notifications */}
      <div className="flex items-center gap-3">
        {/* Quick Trigger: Batch Assessment */}
        <button
          onClick={handleRunAssessment}
          disabled={isRunningAssessment}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-[#E2E8F0] rounded-lg transition-colors disabled:opacity-50"
          title="Run explainable deterministic risk evaluation"
        >
          <PlayCircle size={14} className={isRunningAssessment ? 'animate-spin text-[#4F46E5]' : 'text-[#4F46E5]'} />
          <span>{isRunningAssessment ? 'Evaluating Atlas...' : 'Run Risk Engine'}</span>
        </button>

        {/* Quick Trigger: Generate Report */}
        <button
          onClick={generateReport}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg shadow-sm transition-colors"
          title="Generate 12-hour executive digest"
        >
          <FilePlus size={14} />
          <span>Generate 12h Report</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <Bell size={18} />
            {pendingActions.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-modal z-50 p-3 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E8F0]">
                <span className="text-xs font-bold text-[#0F172A]">
                  Manager Approvals ({pendingActions.length})
                </span>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    setActiveTab('approvals');
                  }}
                  className="text-[11px] font-semibold text-[#4F46E5] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pendingActions.length === 0 ? (
                  <p className="text-xs text-[#64748B] py-3 text-center">No pending approval actions</p>
                ) : (
                  pendingActions.slice(0, 3).map((act) => (
                    <div
                      key={act.id}
                      onClick={() => {
                        setSelectedActionId(act.id);
                        setActionDecisionType('approve');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-2.5 rounded-lg border border-[#E2E8F0] hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#0F172A]">{act.customerName}</span>
                        <span className="px-1.5 py-0.5 rounded bg-red-100 text-[#DC2626] font-mono text-[10px] font-bold">
                          {act.riskScore}/100
                        </span>
                      </div>
                      <p className="text-[#64748B] text-[11px] mt-1 line-clamp-1">{act.proposedAction}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Manager Profile Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] border border-indigo-200 text-[#4F46E5] flex items-center justify-center font-bold text-xs">
            SL
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-[#0F172A] leading-none">Sarah Lin</p>
            <p className="text-[10px] text-[#64748B] mt-1 leading-none">CS Manager (ReviveAI)</p>
          </div>
        </div>
      </div>
    </header>
  );
}
