import React from 'react';
import { useRevive } from '../../context/ReviveContext';
import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  CheckSquare,
  FileText,
  History,
  Sliders,
  Database,
  Activity,
  Sparkles,
  ChevronRight
} from 'lucide-react';

/**
 * Sidebar Component
 * Implements PRD Section 3 & 13:
 * - Persistent left sidebar with Deep Navy (#14213D) background
 * - 7 Manager Navigation items matching PRD Section 3
 * - Active state in Indigo (#4F46E5) with subtle soft indigo (#EEF2FF)
 * - Badges for at-risk counts & pending approvals
 * - Atlas connection status & manager identity
 */
export default function Sidebar() {
  const { activeTab, setActiveTab, retentionActions, assessments } = useRevive();

  const pendingApprovalsCount = retentionActions.filter((a) => a.status === 'pending').length;
  const highRiskCount = Object.values(assessments).filter((a) => a.category === 'High').length;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Business health & metrics'
    },
    {
      id: 'risks',
      label: 'Risk Detection Center',
      icon: ShieldAlert,
      badge: highRiskCount > 0 ? `${highRiskCount}` : null,
      badgeColor: 'bg-red-500/20 text-red-300 border border-red-500/30',
      description: 'Find & prioritize at-risk customers'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      badge: '2.8k',
      badgeColor: 'bg-slate-700/50 text-slate-300 border border-slate-600/40',
      description: 'Search, add, edit, and investigate'
    },
    {
      id: 'approvals',
      label: 'Approval Center',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse',
      description: 'Review recommendations & drafts'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Scheduled & historical reports'
    },
    {
      id: 'audit',
      label: 'Activity Logs',
      icon: History,
      description: 'Auditable event logs & engine runs'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Sliders,
      description: 'Thresholds & safeguards'
    }
  ];

  return (
    <aside className="w-64 bg-[#14213D] text-slate-100 flex flex-col shrink-0 border-r border-[#1F325C] select-none h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1F325C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#0F766E] flex items-center justify-center shadow-lg shadow-indigo-950/40">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wider text-white">REVIVEAI</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Manager Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management & Intelligence
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-900/30 font-semibold'
                  : 'text-slate-300 hover:bg-[#1B2A4A] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={`transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="text-left">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Atlas & Engine Health Status */}
      <div className="p-3 mx-3 mb-3 bg-[#0C1426] rounded-xl border border-[#1F325C]/80 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center gap-1.5">
            <Database size={13} className="text-[#0F766E]" />
            MongoDB Atlas
          </span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected
          </span>
        </div>
        <div className="text-[10px] text-slate-400 flex items-center justify-between">
          <span>Monthly Records:</span>
          <span className="font-mono text-slate-200 font-semibold">79,817</span>
        </div>
        <div className="text-[10px] text-slate-400 flex items-center justify-between">
          <span>Engine Model:</span>
          <span className="text-indigo-300 font-medium">v2.4 Rules</span>
        </div>
      </div>

      {/* Current Manager User Card */}
      <div className="p-3.5 border-t border-[#1F325C] flex items-center gap-3 bg-[#0E172B]">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-indigo-700/40 border border-indigo-400/30 flex items-center justify-center font-bold text-white text-xs">
            SL
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#14213D]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">Sarah Lin</p>
          <p className="text-[11px] text-slate-400 truncate">Customer Success Lead</p>
        </div>
      </div>
    </aside>
  );
}
