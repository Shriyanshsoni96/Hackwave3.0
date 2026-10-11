import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Filter,
  CheckCircle,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import StatCard from '../layout/StatCard';
import { useRevOps } from '../../context/RevOpsContext';

export default function ExecutiveOverview() {
  const { 
    metrics, 
    forecasting, 
    customers, 
    actions, 
    setActiveTab, 
    setSelectedCustomerId, 
    setSelectedActionId,
    demoStep,
    setDemoStep,
    setIsCsvModalOpen 
  } = useRevOps();

  // Strict 3 health states per PDF: "Healthy, Needs Attention, and High Risk"
  const healthDistribution = [
    { 
      name: 'Healthy', 
      count: customers.filter(c => c.dynamicHealthStatus === 'Healthy').length, 
      color: '#10b981' 
    },
    { 
      name: 'Needs Attention', 
      count: customers.filter(c => c.dynamicHealthStatus === 'Needs Attention').length, 
      color: '#f59e0b' 
    },
    { 
      name: 'High Risk', 
      count: customers.filter(c => c.dynamicHealthStatus === 'High Risk').length, 
      color: '#ef4444' 
    },
  ].filter(d => d.count > 0);

  // Renewal & Revenue Forecasting data (Renewals in 7, 30, and 90 days per PDF)
  const renewalForecastData = [
    {
      horizon: 'Due in 7 Days',
      accounts: forecasting.dueIn7Count,
      revenue: forecasting.arrDueIn7 / 1000,
      fill: '#ef4444' // Urgent red
    },
    {
      horizon: 'Due in 30 Days',
      accounts: forecasting.dueIn30Count,
      revenue: forecasting.arrDueIn30 / 1000,
      fill: '#f59e0b' // Warning amber
    },
    {
      horizon: 'Due in 90 Days',
      accounts: forecasting.dueIn90Count,
      revenue: forecasting.arrDueIn90 / 1000,
      fill: '#3b82f6' // Blue
    }
  ];

  // Smart Notifications & Prioritization:
  // "Rank alerts by risk severity, revenue impact, and time until renewal. Notify owners about urgent cases without creating alert overload."
  const rankedAlerts = [...customers]
    .filter(c => c.dynamicRiskScore >= 50 || c.daysToRenewal <= 45)
    .sort((a, b) => {
      // Composite priority score = Risk Score * Revenue Weight / (Days to Renewal + 1)
      const scoreA = (a.dynamicRiskScore * (a.arr / 10000)) / (a.daysToRenewal + 5);
      const scoreB = (b.dynamicRiskScore * (b.arr / 10000)) / (b.daysToRenewal + 5);
      return scoreB - scoreA;
    });

  // Demo walkthrough steps handler (Section 7 of PDF)
  const advanceDemo = (step) => {
    setDemoStep(step);
    if (step === 1) setIsCsvModalOpen(true);
    else if (step === 2) setActiveTab('risks');
    else if (step === 3) {
      setSelectedCustomerId('cust-001'); // Acme Tech
      setActiveTab('intelligence');
    }
    else if (step === 4 || step === 5) {
      setSelectedActionId('act-acme-01');
      setActiveTab('actions');
    }
    else if (step === 6) {
      setActiveTab('integrations');
    }
  };

  return (
    <div className="space-y-6">
      {/* End-to-End Demo Flow Guide (Page 3 Section 7 of PDF) */}
      {demoStep && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <PlayCircle className="w-3 h-3 text-emerald-400" />
                  Hackathon End-to-End Demo Mode
                </span>
                <span className="text-xs text-slate-400 font-mono">Step {demoStep} of 6</span>
              </div>
              <h2 className="text-base font-bold text-white">
                {demoStep === 1 && "Step 1: Import Customer Records & Activity Signals"}
                {demoStep === 2 && "Step 2: Detect Accounts with Declining Usage, Low Engagement & Approaching Renewal"}
                {demoStep === 3 && "Step 3: Show Customer 360° Evidence & Explain Why Account is at Risk"}
                {demoStep === 4 && "Step 4: Recommend Next Action, Email Draft, Follow-up Task & Meeting Suggestion"}
                {demoStep === 5 && "Step 5: Account Owner Reviews, Edits, and Approves Action"}
                {demoStep === 6 && "Step 6: Record Decision & Execution Outcome in Immutable Audit Log"}
              </h2>
              <p className="text-xs text-slate-300">
                {demoStep === 1 && "Import multi-source CSV or JSON signals to populate unified profiles."}
                {demoStep === 2 && "Autonomous Agent flags Acme Technologies (43d renewal, -38% usage drop, 14d unanswered outreach)."}
                {demoStep === 3 && "Inspect the 4-stage Customer 360° evidence timeline (21d, 14d, 7d, Today)."}
                {demoStep === 4 && "Review prepared personalized executive check-in email and proposed CRM stage update."}
                {demoStep === 5 && "Human approval safeguard ensures no email or CRM write occurs without authorization."}
                {demoStep === 6 && "View cryptographically verified audit records with actor, timestamp, and result."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => advanceDemo(demoStep < 6 ? demoStep + 1 : 1)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
              >
                <span>{demoStep < 6 ? `Next: Step ${demoStep + 1}` : "Restart Walkthrough"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDemoStep(null)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Exit Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner / Callout */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 border border-blue-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Autonomous Engine Active
              </span>
              <span className="text-xs text-slate-400">| Signal Synthesis: Multi-Source Connected</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Executive Revenue Operations Overview
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing CRM records, communications cadence, calendar events, and product-usage telemetry to protect contract renewals and capture expansion opportunities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('copilot')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Chat With Revenue Data
            </button>
            <button
              onClick={() => advanceDemo(1)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/40 transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              6-Step Demo Flow
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards (Matching PDF Core & Advanced Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Portfolio Recurring ARR"
          value={`$${(forecasting.totalArr / 1000).toFixed(0)}k`}
          subtitle={`${metrics.totalCustomers} Active Accounts`}
          change="+18.4% YoY"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Revenue at Risk"
          value={`$${(forecasting.revenueAtRisk / 1000).toFixed(0)}k`}
          subtitle={`${forecasting.atRiskCount} accounts flagged`}
          isEstimate={true}
          change="Clearly Labeled Estimate"
          changeType="warning"
          icon={AlertTriangle}
          badge={`${forecasting.atRiskCount} Needs Attention`}
          badgeColor="bg-amber-500/20 text-amber-300 border-amber-500/30"
          onClick={() => setActiveTab('risks')}
        />
        <StatCard
          title="Renewals Due (30 Days)"
          value={forecasting.dueIn30Count}
          subtitle={`$${(forecasting.arrDueIn30 / 1000).toFixed(0)}k ARR in 30d window`}
          change="Critical Window"
          changeType="warning"
          icon={Calendar}
          onClick={() => setActiveTab('intelligence')}
        />
        <StatCard
          title="Potential Expansion"
          value={`+$${(forecasting.potentialExpansionRevenue / 1000).toFixed(0)}k`}
          subtitle={`${forecasting.expansionCount} accounts with rising usage`}
          isEstimate={true}
          change="Plan Limit Saturation"
          changeType="positive"
          icon={TrendingUp}
          onClick={() => setActiveTab('risks')}
        />
      </div>

      {/* Middle Section: Renewal & Revenue Forecasting (7, 30, 90 Days) + Health Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PDF Requirement: Customer Health Score Distribution (Healthy, Needs Attention, High Risk) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Customer Health Score</h2>
              <p className="text-xs text-slate-400">0–100 multi-variable signal scoring</p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Avg: <strong className="text-white">{metrics.avgHealthScore}/100</strong>
            </span>
          </div>

          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend verticalAlign="bottom" height={36} iconSize={10} formatter={(val) => <span className="text-xs text-slate-300">{val}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Healthy (0-49 Risk)
              </span>
              <span className="font-bold text-white">{customers.filter(c => c.dynamicHealthStatus === 'Healthy').length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Needs Attention (50-79 Risk)
              </span>
              <span className="font-bold text-amber-300">{customers.filter(c => c.dynamicHealthStatus === 'Needs Attention').length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Risk (80+ Risk)
              </span>
              <span className="font-bold text-rose-300">{customers.filter(c => c.dynamicHealthStatus === 'High Risk').length}</span>
            </div>
          </div>
        </div>

        {/* PDF Requirement: Renewal & Revenue Forecasting (Renewals in 7, 30, and 90 Days) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Renewal & Revenue Forecasting</h2>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  7, 30, 90 DAY HORIZONS
                </span>
              </div>
              <p className="text-xs text-slate-400">Estimated recurring revenue expiring across time horizons (labeled estimates)</p>
            </div>
            <button
              onClick={() => setActiveTab('intelligence')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              Customer 360° View <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={renewalForecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="horizon" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(val) => `$${val}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val, name, props) => [`$${val}k ARR (${props.payload.accounts} accounts)`, 'Renewals']}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={46}>
                  {renewalForecastData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 mt-1 border-t border-slate-800 text-xs">
            <div className="p-2 bg-slate-950/60 rounded-lg border border-rose-900/40">
              <span className="text-slate-400 block text-[11px]">Due in 7 Days:</span>
              <span className="font-bold text-rose-400 text-sm">${(forecasting.arrDueIn7 / 1000).toFixed(0)}k</span>
              <span className="text-[10px] text-slate-400 block">CloudScale Systems (6d)</span>
            </div>
            <div className="p-2 bg-slate-950/60 rounded-lg border border-amber-900/40">
              <span className="text-slate-400 block text-[11px]">Due in 30 Days:</span>
              <span className="font-bold text-amber-400 text-sm">${(forecasting.arrDueIn30 / 1000).toFixed(0)}k</span>
              <span className="text-[10px] text-slate-400 block">OmniRetail Direct (28d)</span>
            </div>
            <div className="p-2 bg-slate-950/60 rounded-lg border border-blue-900/40">
              <span className="text-slate-400 block text-[11px]">Due in 90 Days:</span>
              <span className="font-bold text-blue-400 text-sm">${(forecasting.arrDueIn90 / 1000).toFixed(0)}k</span>
              <span className="text-[10px] text-slate-400 block">Acme (43d), Dataview (88d)</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Requirement: Smart Notifications & Prioritization */}
      {/* "Rank alerts by risk severity, revenue impact, and time until renewal. Notify owners about urgent cases without creating alert overload." */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Smart Notifications & Alert Prioritization
              </h2>
              <span className="text-[11px] text-slate-400">
                Ranked by risk severity, revenue impact ($ ARR), and time until renewal (Alert Overload Filter: Active)
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('risks')}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
          >
            All Risk Rankings <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankedAlerts.slice(0, 4).map((c, index) => (
            <div
              key={c.id}
              className={`bg-slate-950/60 border rounded-xl p-4 transition-all flex flex-col justify-between ${
                c.dynamicRiskScore >= 80 ? 'border-rose-900/50' : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm hover:text-blue-400 cursor-pointer" onClick={() => setSelectedCustomerId(c.id)}>
                        {c.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {c.tier}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        c.dynamicHealthStatus === 'High Risk' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {c.dynamicHealthStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Owner: {c.accountOwner} • ARR: <span className="text-white font-medium">${c.arr.toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Score: {c.dynamicRiskScore}/100
                    </span>
                    <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 justify-end font-medium">
                      <Clock className="w-3 h-3" />
                      Renews in {c.daysToRenewal}d
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed my-2 line-clamp-2">
                  {c.aiSummary}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 mt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Usage:</span>
                  <span className={`font-semibold ${c.signals.usageTrend < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {c.signals.usageTrend}%
                  </span>
                  <span>•</span>
                  <span>Unanswered: <strong className="text-amber-400">{c.signals.unansweredOutreachCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCustomerId(c.id);
                      setActiveTab('intelligence');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    Customer 360°
                  </button>
                  <button
                    onClick={() => {
                      setSelectedActionId(c.recommendedAction?.actionId);
                      setActiveTab('actions');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                  >
                    Review Action
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
