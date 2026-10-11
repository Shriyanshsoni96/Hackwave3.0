import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Eye, 
  FileUp,
  Sparkles,
  Calendar,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function CustomerIntelligence() {
  const { 
    customers, 
    searchQuery, 
    setSearchQuery, 
    setSelectedCustomerId, 
    setSelectedActionId, 
    setIsCsvModalOpen 
  } = useRevOps();

  // Strict 3 health states per PDF: "Healthy, Needs Attention, and High Risk"
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedHealth, setSelectedHealth] = useState('ALL'); // 'ALL' | 'Healthy' | 'Needs Attention' | 'High Risk'
  const [renewalHorizon, setRenewalHorizon] = useState('ALL'); // 'ALL' | '7' | '30' | '90'
  const [sortBy, setSortBy] = useState('risk');

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => {
        const matchesSearch = 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.accountOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.industry.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTier = selectedTier === 'ALL' || c.tier === selectedTier;
        const matchesHealth = selectedHealth === 'ALL' || c.dynamicHealthStatus === selectedHealth;

        let matchesRenewal = true;
        if (renewalHorizon === '7') matchesRenewal = c.daysToRenewal <= 7;
        else if (renewalHorizon === '30') matchesRenewal = c.daysToRenewal <= 30;
        else if (renewalHorizon === '90') matchesRenewal = c.daysToRenewal <= 90;

        return matchesSearch && matchesTier && matchesHealth && matchesRenewal;
      })
      .sort((a, b) => {
        if (sortBy === 'risk') return b.dynamicRiskScore - a.dynamicRiskScore;
        if (sortBy === 'arr') return b.arr - a.arr;
        if (sortBy === 'renewal') return a.daysToRenewal - b.daysToRenewal;
        if (sortBy === 'health') return a.healthScore - b.healthScore;
        return 0;
      });
  }, [customers, searchQuery, selectedTier, selectedHealth, renewalHorizon, sortBy]);

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Customer Intelligence & Customer 360°
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Single account view connecting customer story across CRM, email, calendar meetings, and product telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2"
          >
            <FileUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Import CSV / JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Controls (Strict PDF 3-Health States) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md backdrop-blur-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Health Filter Chips: Healthy, Needs Attention, High Risk */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Health State:
            </span>
            {[
              { id: 'ALL', label: 'All Accounts' },
              { id: 'Healthy', label: 'Healthy (0-49)' },
              { id: 'Needs Attention', label: 'Needs Attention (50-79)' },
              { id: 'High Risk', label: 'High Risk (80+)' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedHealth(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedHealth === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Renewal Horizon Dropdown (7, 30, 90 Days) */}
          <div className="flex items-center gap-2.5">
            <select
              value={renewalHorizon}
              onChange={(e) => setRenewalHorizon(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Renewal Windows</option>
              <option value="7">Renewals in 7 Days</option>
              <option value="30">Renewals in 30 Days</option>
              <option value="90">Renewals in 90 Days</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="risk">Sort by Churn Risk (High to Low)</option>
              <option value="renewal">Sort by Renewal (Soonest first)</option>
              <option value="arr">Sort by ARR (Highest first)</option>
              <option value="health">Sort by Health Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Account Profile & Contacts</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4">Portfolio ARR</th>
                <th className="py-3.5 px-4">Health State (0–100)</th>
                <th className="py-3.5 px-4">Usage & Activity Signals</th>
                <th className="py-3.5 px-4">Renewal Horizon</th>
                <th className="py-3.5 px-4 text-right">Customer 360°</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map((c) => (
                <tr 
                  key={c.id} 
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedCustomerId(c.id)}
                >
                  {/* Account */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        {c.name}
                        {c.dynamicRiskScore >= 80 && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="High Churn Risk Alert" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{c.industry}</span>
                        <span>•</span>
                        <span className="text-slate-300">{c.primaryContact.name} ({c.primaryContact.role})</span>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-3.5 px-4">
                    <span className="text-slate-200 font-medium">{c.accountOwner}</span>
                  </td>

                  {/* ARR */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white text-sm">
                      ${c.arr.toLocaleString()}
                    </span>
                  </td>

                  {/* Health State */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-bold ${
                          c.dynamicHealthStatus === 'High Risk' ? 'text-rose-400' :
                          c.dynamicHealthStatus === 'Needs Attention' ? 'text-amber-400' :
                          'text-emerald-400'
                        }`}>
                          {c.dynamicHealthStatus}
                        </span>
                        <span className="text-slate-400 font-mono">{c.dynamicRiskScore}% Risk</span>
                      </div>
                      <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            c.dynamicRiskScore >= 80 ? 'bg-rose-500' :
                            c.dynamicRiskScore >= 50 ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${c.dynamicRiskScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Usage & Activity */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className={`font-bold flex items-center gap-1 ${c.signals.usageTrend < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {c.signals.usageTrend < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                        {c.signals.usageTrend > 0 ? `+${c.signals.usageTrend}%` : `${c.signals.usageTrend}%`} (30d)
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {c.signals.unansweredOutreachCount > 0 ? `${c.signals.unansweredOutreachCount} unreplied msgs` : 'Active responses'}
                      </span>
                    </div>
                  </td>

                  {/* Renewal */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-3.5 h-3.5 ${c.daysToRenewal <= 7 ? 'text-rose-400 animate-pulse' : c.daysToRenewal <= 30 ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span className={`font-medium ${
                        c.daysToRenewal <= 7 ? 'text-rose-300 font-bold' :
                        c.daysToRenewal <= 30 ? 'text-amber-300 font-bold' :
                        'text-slate-300'
                      }`}>
                        {c.daysToRenewal} days
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">{c.renewalDate}</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedCustomerId(c.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span>Timeline & 360°</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredCustomers.length} unified customer profiles</span>
          <span className="italic text-slate-500">Customer 360° evidence links CRM, email, calendar meetings, and telemetry.</span>
        </div>
      </div>
    </div>
  );
}
