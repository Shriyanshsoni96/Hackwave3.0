import React, { useState, useMemo } from 'react';
import { useRevive } from '../../context/ReviveContext';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  RotateCcw,
  ShieldCheck,
  User,
  ChevronDown
} from 'lucide-react';

export default function ActivityLogsView() {
  const { activityLogs, setSelectedCustomerId } = useRevive();

  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = log.customerId.toLowerCase().includes(q);
        const matchDetails = log.details.toLowerCase().includes(q);
        const matchActor = log.actor.toLowerCase().includes(q);
        if (!matchId && !matchDetails && !matchActor) return false;
      }
      if (eventTypeFilter !== 'All' && !log.eventType.includes(eventTypeFilter)) {
        return false;
      }
      if (statusFilter !== 'All' && log.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [activityLogs, searchQuery, eventTypeFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Activity Logs & Audit Trail
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Append-only audit trail capturing customer mutations, risk evaluations, manager decisions, and email outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-[#15803D] border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            <span>Append-Only Integrity Guaranteed</span>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer ID, actor, or details..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Event Type Filter */}
          <div className="relative">
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              <option value="All">All Event Types</option>
              <option value="Assessment">Risk Assessments</option>
              <option value="Approved">Approvals</option>
              <option value="Rejected">Rejections</option>
              <option value="Customer">Customer Updates</option>
              <option value="Email">Email Outcomes</option>
              <option value="Report">Report Generation</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              <option value="All">All Statuses</option>
              <option value="success">Success</option>
              <option value="warning">Warning / Rejected</option>
              <option value="error">Failed</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {(searchQuery || eventTypeFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setEventTypeFilter('All');
                setStatusFilter('All');
              }}
              className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset Filters"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Log Feed Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 border-b border-[#E2E8F0] text-[#64748B] font-semibold">
              <tr>
                <th className="py-3 px-4">Log ID & Timestamp</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Target Identity</th>
                <th className="py-3 px-4">Details & Payload</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredLogs.map((log) => {
                const isSuccess = log.status === 'success';
                const isError = log.status === 'error';

                return (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-[#0F172A] block">{log.id}</span>
                      <span className="font-mono text-[11px] text-[#64748B]">{log.timestamp}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0F172A]">
                      {log.eventType}
                    </td>
                    <td className="py-3.5 px-4 text-[#64748B]">
                      {log.actor}
                    </td>
                    <td className="py-3.5 px-4">
                      {log.customerId !== 'SYSTEM' && log.customerId !== 'ALL' && log.customerId !== 'BATCH' ? (
                        <button
                          onClick={() => setSelectedCustomerId(log.customerId)}
                          className="font-mono font-bold text-[#4F46E5] hover:underline"
                        >
                          {log.customerId}
                        </button>
                      ) : (
                        <span className="font-mono text-[#64748B]">{log.customerId}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#0F172A] max-w-md">
                      {log.details}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isSuccess
                            ? 'bg-emerald-50 text-[#15803D] border-emerald-200'
                            : isError
                            ? 'bg-red-50 text-[#DC2626] border-red-200'
                            : 'bg-amber-50 text-[#D97706] border-amber-200'
                        }`}
                      >
                        {isSuccess ? (
                          <CheckCircle2 size={12} />
                        ) : isError ? (
                          <AlertCircle size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        <span>{log.status.toUpperCase()}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
