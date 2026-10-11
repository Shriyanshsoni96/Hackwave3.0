import React from 'react';
import { 
  Search, 
  Sparkles, 
  Bell, 
  FileUp, 
  PlayCircle
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function Header() {
  const { 
    searchQuery, 
    setSearchQuery, 
    metrics, 
    setIsCopilotOpen, 
    setIsCsvModalOpen, 
    setActiveTab,
    setDemoStep
  } = useRevOps();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between gap-4 z-10 select-none">
      {/* Global Search across accounts & signals */}
      <div className="flex-1 max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search accounts, owners, renewal dates, signals..."
          className="w-full pl-9 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Header Controls & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* End-to-End Demo Flow Shortcut (PDF Section 7) */}
        <button
          onClick={() => {
            setDemoStep(1);
            setActiveTab('overview');
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors"
        >
          <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Demo Flow</span>
        </button>

        {/* Chat With Revenue Data (PDF Section 2) */}
        <button
          onClick={() => setActiveTab('copilot')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chat Revenue Data</span>
        </button>

        {/* CSV/JSON Import Shortcut */}
        <button
          onClick={() => setIsCsvModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
        >
          <FileUp className="w-3.5 h-3.5 text-blue-400" />
          <span>Import Signals</span>
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        {/* Notification Bell with Pending Counter */}
        <button
          onClick={() => setActiveTab('actions')}
          className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          title="Review Pending Actions"
        >
          <Bell className="w-4 h-4" />
          {metrics.pendingActionsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
              {metrics.pendingActionsCount}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-slate-800">
            SJ
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Sarah Jenkins</div>
            <div className="text-[10px] text-slate-400 leading-tight">Account Owner (AE)</div>
          </div>
        </div>
      </div>
    </header>
  );
}
