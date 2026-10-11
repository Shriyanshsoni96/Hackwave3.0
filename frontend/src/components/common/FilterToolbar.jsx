import React from 'react';
import { Search, Filter, RotateCcw, ChevronDown } from 'lucide-react';

export default function FilterToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  locationFilter,
  onLocationChange,
  subscriptionFilter,
  onSubscriptionChange,
  actionStatusFilter,
  onActionStatusChange,
  minScore,
  maxScore,
  onScoreChange,
  onResetFilters,
  locationsList = [],
  extraActions
}) {
  const hasActiveFilters =
    searchQuery ||
    (categoryFilter && categoryFilter !== 'All') ||
    (locationFilter && locationFilter !== 'All') ||
    (subscriptionFilter && subscriptionFilter !== 'All') ||
    (actionStatusFilter && actionStatusFilter !== 'All') ||
    minScore > 0 ||
    maxScore < 100;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-card mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Customer ID, name, or keywords..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Risk Category */}
          {onCategoryChange && (
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] cursor-pointer transition-all"
              >
                <option value="All">All Risk Bands</option>
                <option value="High">High Risk (60–100)</option>
                <option value="Medium">Medium Risk (30–59)</option>
                <option value="Low">Low Risk (0–29)</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          )}

          {/* Location Filter */}
          {onLocationChange && (
            <div className="relative">
              <select
                value={locationFilter}
                onChange={(e) => onLocationChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] cursor-pointer transition-all"
              >
                <option value="All">All Locations</option>
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          )}

          {/* Subscription Tier */}
          {onSubscriptionChange && (
            <div className="relative">
              <select
                value={subscriptionFilter}
                onChange={(e) => onSubscriptionChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] cursor-pointer transition-all"
              >
                <option value="All">All Tiers</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Growth">Growth</option>
                <option value="Starter">Starter</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          )}

          {/* Action Status Filter */}
          {onActionStatusChange && (
            <div className="relative">
              <select
                value={actionStatusFilter}
                onChange={(e) => onActionStatusChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] cursor-pointer transition-all"
              >
                <option value="All">All Action States</option>
                <option value="Action Pending">Action Pending</option>
                <option value="Monitoring">Monitoring</option>
                <option value="In Review">In Review</option>
                <option value="Healthy">Healthy</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
            </div>
          )}

          {/* Reset Filters */}
          {hasActiveFilters && onResetFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}

          {extraActions}
        </div>
      </div>
    </div>
  );
}
