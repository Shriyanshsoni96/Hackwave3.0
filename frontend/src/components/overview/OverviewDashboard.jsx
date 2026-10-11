import React from 'react';
import { useRevive } from '../../context/ReviveContext';
import KpiCard from '../common/KpiCard';
import RiskBadge from '../common/RiskBadge';
import {
  Users,
  AlertTriangle,
  AlertCircle,
  CheckSquare,
  CheckCircle2,
  TrendingDown,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function OverviewDashboard() {
  const {
    dashboardSummary,
    riskDistribution,
    locationSummary,
    customers,
    assessments,
    retentionActions,
    activityLogs,
    setSelectedCustomerId,
    setSelectedActionId,
    setActionDecisionType,
    setActiveTab,
    runBatchAssessment
  } = useRevive();

  // High priority attention queue: High risk customers needing action
  const priorityQueue = customers
    .filter((c) => {
      const a = assessments[c.id];
      return a && a.category === 'High';
    })
    .slice(0, 5);

  // Risk Trend Data (Section 4: Historical assessments over months)
  const riskTrendData = [
    { month: 'Jul 2026', highRisk: 285, mediumRisk: 480, lowRisk: 2075 },
    { month: 'Aug 2026', highRisk: 302, mediumRisk: 495, lowRisk: 2043 },
    { month: 'Sep 2026', highRisk: 326, mediumRisk: 510, lowRisk: 2004 },
    { month: 'Oct 2026 (Current)', highRisk: 342, mediumRisk: 518, lowRisk: 1980 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Executive Overview
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time customer intelligence, risk distribution, and manager retention queue from MongoDB Atlas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono bg-slate-100 text-[#64748B] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
            79,817 monthly records indexed
          </span>
          <button
            onClick={runBatchAssessment}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
          >
            <RefreshCw size={13} />
            Refresh Metrics
          </button>
        </div>
      </div>

      {/* PRD Section 4: 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Customers"
          value={dashboardSummary.totalCustomers.toLocaleString()}
          subtitle="Distinct active accounts"
          icon={Users}
          badgeText="Verified"
          badgeType="indigo"
          onClick={() => setActiveTab('customers')}
        />
        <KpiCard
          title="High-Risk Customers"
          value={dashboardSummary.highRiskCustomers}
          subtitle="Score 60–100 (Urgent)"
          icon={AlertTriangle}
          badgeText="+16 MoM"
          badgeType="danger"
          onClick={() => setActiveTab('risks')}
        />
        <KpiCard
          title="Requiring Attention"
          value={dashboardSummary.requiringAttention}
          subtitle="Score 30–59 (Review)"
          icon={AlertCircle}
          badgeText="Medium"
          badgeType="warning"
          onClick={() => setActiveTab('risks')}
        />
        <KpiCard
          title="Pending Approvals"
          value={dashboardSummary.pendingApprovals}
          subtitle="Awaiting manager sign-off"
          icon={CheckSquare}
          badgeText="Action Needed"
          badgeType="warning"
          onClick={() => setActiveTab('approvals')}
        />
        <KpiCard
          title="Actions Completed"
          value={dashboardSummary.actionsCompleted}
          subtitle="Approved & executed"
          icon={CheckCircle2}
          badgeText="100% Audited"
          badgeType="success"
          onClick={() => setActiveTab('audit')}
        />
      </div>

      {/* Charts Grid: Risk Distribution & Location Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Risk Distribution Chart (PRD Section 4) */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Customer Risk Distribution</h3>
              <p className="text-[11px] text-[#64748B]">Distinct customers categorized by score bands</p>
            </div>
            <span className="text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              2,840 Total
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  formatter={(value, name, item) => [`${value} customers (${item.payload.pct}%)`, item.payload.band]}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Color Legend with exact tokens */}
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="block text-xs font-bold text-[#15803D]">1,980 (69.7%)</span>
              <span className="text-[10px] text-[#64748B]">Low (0–29)</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#D97706]">518 (18.2%)</span>
              <span className="text-[10px] text-[#64748B]">Medium (30–59)</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-[#DC2626]">342 (12.1%)</span>
              <span className="text-[10px] text-[#64748B]">High (60–100)</span>
            </div>
          </div>
        </div>

        {/* Location-Wise Risk (PRD Section 4: Verified locations only) */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Location-Wise Distribution</h3>
              <p className="text-[11px] text-[#64748B]">Verified customer accounts (Unverified explicit)</p>
            </div>
            <MapPin size={16} className="text-[#0F766E]" />
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {locationSummary.map((loc) => (
              <div key={loc.location} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      loc.verified ? 'bg-[#0F766E]' : 'bg-slate-400'
                    }`}
                  />
                  <span className={`font-medium ${loc.verified ? 'text-[#0F172A]' : 'text-[#64748B] italic'}`}>
                    {loc.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0F172A]">{loc.count}</span>
                  <span className="text-[10px] text-[#64748B]">({loc.pct}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
            <span>Verified coverage: 97.9%</span>
            <span className="italic text-[10px]">Strict: No inferred locations</span>
          </div>
        </div>

        {/* Risk Trend (Historical assessments) */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Risk Trend Over Time</h3>
              <p className="text-[11px] text-[#64748B]">Monthly historical assessments</p>
            </div>
            <TrendingDown size={16} className="text-[#4F46E5]" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="highRisk" name="High Risk" fill="#DC2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mediumRisk" name="Medium Risk" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
            <span>Model Calibration: Baseline rules</span>
            <span className="font-semibold text-[#DC2626]">+57 High-Risk since Jul</span>
          </div>
        </div>
      </div>

      {/* Priority Attention Queue (PRD Section 4) */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Priority Attention Queue</h3>
            <p className="text-[11px] text-[#64748B]">
              Top high-risk accounts requiring urgent manager investigation and retention outreach.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('risks')}
            className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1"
          >
            <span>View All ({priorityQueue.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-y border-[#E2E8F0] text-[#64748B] font-semibold">
                <th className="py-2.5 px-3">Customer ID & Name</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
                <th className="py-2.5 px-3">Primary Evidence Reason</th>
                <th className="py-2.5 px-3">Suggested Retention Action</th>
                <th className="py-2.5 px-3">Freshness</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {priorityQueue.map((cust) => {
                const assess = assessments[cust.id];
                return (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#0F172A]">{cust.id}</div>
                      <div className="text-[11px] text-[#64748B]">{cust.name}</div>
                    </td>
                    <td className="py-3 px-3 text-[#64748B]">{cust.location}</td>
                    <td className="py-3 px-3">
                      <RiskBadge score={assess?.score} category={assess?.category} />
                    </td>
                    <td className="py-3 px-3 text-[#0F172A] max-w-xs truncate" title={assess?.primaryReason}>
                      {assess?.primaryReason}
                    </td>
                    <td className="py-3 px-3 text-[#4F46E5] font-medium max-w-xs truncate">
                      {assess?.suggestedAction}
                    </td>
                    <td className="py-3 px-3 text-[#64748B] font-mono text-[11px]">
                      {assess?.freshness || 'Recent'}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedCustomerId(cust.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                      >
                        <span>View Profile</span>
                        <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Feed (PRD Section 4) */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity & Audit Stream</h3>
            <p className="text-[11px] text-[#64748B]">
              Assessments, approvals, email outcomes, and job execution logs with timestamps.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('audit')}
            className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1"
          >
            <span>Full Audit Log</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {activityLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between gap-3 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0] text-xs"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    log.status === 'success'
                      ? 'bg-emerald-100 text-[#15803D]'
                      : log.status === 'error'
                      ? 'bg-red-100 text-[#DC2626]'
                      : 'bg-amber-100 text-[#D97706]'
                  }`}
                >
                  <Clock size={13} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0F172A]">{log.eventType}</span>
                    <span className="text-[10px] text-[#64748B] font-mono px-1.5 py-0.5 bg-slate-200 rounded">
                      {log.customerId}
                    </span>
                  </div>
                  <p className="text-[#64748B] mt-0.5">{log.details}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-[#94A3B8] block">{log.timestamp}</span>
                <span className="text-[10px] text-[#64748B]">{log.actor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
