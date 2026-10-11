import React, { useState, useMemo } from 'react';
import { useRevive } from '../../context/ReviveContext';
import DataTable from '../common/DataTable';
import RiskBadge from '../common/RiskBadge';
import FilterToolbar from '../common/FilterToolbar';
import {
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  PlayCircle,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function RiskDetectionCenter() {
  const {
    customers,
    assessments,
    setSelectedCustomerId,
    runBatchAssessment,
    globalSearch,
    setGlobalSearch,
    riskCategoryFilter,
    setRiskCategoryFilter,
    locationFilter,
    setLocationFilter,
    subscriptionFilter,
    setSubscriptionFilter,
    actionStatusFilter,
    setActionStatusFilter,
    minScore,
    maxScore,
    setMinScore,
    setMaxScore
  } = useRevive();

  const [isRunning, setIsRunning] = useState(false);

  // Distinct locations for filter
  const locationsList = useMemo(() => {
    const locSet = new Set();
    customers.forEach((c) => {
      if (c.location) locSet.add(c.location);
    });
    return Array.from(locSet);
  }, [customers]);

  // Handle batch assessment run
  const handleTriggerRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      runBatchAssessment();
      setIsRunning(false);
    }, 800);
  };

  // Filtered distinct customers (PRD Section 5: one row per distinct customer using latest valid assessment)
  const filteredRows = useMemo(() => {
    return customers
      .map((c) => {
        const assess = assessments[c.id] || {
          score: 20,
          category: 'Low',
          primaryReason: 'Baseline assessment',
          suggestedAction: 'Routine Monitoring',
          status: 'Healthy',
          assessmentDate: '2026-10-10 12:00:00'
        };

        return {
          id: c.id,
          name: c.name,
          location: c.isLocationVerified ? c.location : 'Unverified',
          isLocationVerified: c.isLocationVerified,
          riskScore: assess.score,
          riskCategory: assess.category,
          primaryReason: assess.primaryReason,
          lastActivity: c.lastActivityDate,
          suggestedAction: assess.suggestedAction,
          assessmentDate: assess.assessmentDate,
          status: assess.status,
          subscriptionTier: c.subscriptionTier,
          subscriptionStatus: c.subscriptionStatus,
          isStale: assess.isStale
        };
      })
      .filter((row) => {
        // Search query
        if (globalSearch) {
          const q = globalSearch.toLowerCase();
          const matchId = row.id.toLowerCase().includes(q);
          const matchName = row.name.toLowerCase().includes(q);
          const matchReason = row.primaryReason.toLowerCase().includes(q);
          if (!matchId && !matchName && !matchReason) return false;
        }

        // Risk Category filter
        if (riskCategoryFilter !== 'All' && row.riskCategory !== riskCategoryFilter) {
          return false;
        }

        // Location filter
        if (locationFilter !== 'All' && row.location !== locationFilter) {
          return false;
        }

        // Subscription filter
        if (subscriptionFilter !== 'All' && row.subscriptionTier !== subscriptionFilter) {
          return false;
        }

        // Action Status filter
        if (actionStatusFilter !== 'All' && row.status !== actionStatusFilter) {
          return false;
        }

        // Score range
        if (row.riskScore < minScore || row.riskScore > maxScore) {
          return false;
        }

        return true;
      });
  }, [
    customers,
    assessments,
    globalSearch,
    riskCategoryFilter,
    locationFilter,
    subscriptionFilter,
    actionStatusFilter,
    minScore,
    maxScore
  ]);

  // Reset filters
  const handleResetFilters = () => {
    setGlobalSearch('');
    setRiskCategoryFilter('All');
    setLocationFilter('All');
    setSubscriptionFilter('All');
    setActionStatusFilter('All');
    setMinScore(0);
    setMaxScore(100);
  };

  // Table Columns matching PRD Section 5
  const columns = [
    {
      key: 'id',
      header: 'Customer ID',
      sortable: true,
      render: (row) => (
        <div>
          <button
            onClick={() => setSelectedCustomerId(row.id)}
            className="font-bold text-[#4F46E5] hover:text-[#4338CA] hover:underline"
          >
            {row.id}
          </button>
          <div className="text-[11px] text-[#64748B] truncate max-w-[140px]">{row.name}</div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (row) => (
        <span className={`text-xs ${row.isLocationVerified ? 'text-[#0F172A]' : 'text-[#64748B] italic'}`}>
          {row.location}
        </span>
      )
    },
    {
      key: 'riskScore',
      header: 'Risk Score',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-[#0F172A]">{row.riskScore}</span>
          <span className="text-[10px] text-[#64748B]">/100</span>
        </div>
      )
    },
    {
      key: 'riskCategory',
      header: 'Risk Category',
      sortable: true,
      render: (row) => (
        <RiskBadge score={row.riskScore} category={row.riskCategory} showScore={false} />
      )
    },
    {
      key: 'primaryReason',
      header: 'Primary Evidence Reason',
      render: (row) => (
        <div className="max-w-xs text-xs text-[#0F172A] line-clamp-2" title={row.primaryReason}>
          {row.primaryReason}
        </div>
      )
    },
    {
      key: 'lastActivity',
      header: 'Last Activity',
      sortable: true,
      render: (row) => (
        <span className="text-xs text-[#64748B] font-mono whitespace-nowrap">
          {row.lastActivity}
        </span>
      )
    },
    {
      key: 'suggestedAction',
      header: 'Suggested Action',
      render: (row) => (
        <span className="text-xs font-medium text-[#4F46E5] line-clamp-1">
          {row.suggestedAction}
        </span>
      )
    },
    {
      key: 'assessmentDate',
      header: 'Assessment Date',
      sortable: true,
      render: (row) => (
        <div className="text-xs font-mono text-[#64748B] whitespace-nowrap">
          {row.assessmentDate.substring(0, 16)}
          {row.isStale && (
            <span className="ml-1 text-[10px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
              Stale
            </span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => {
        const isPending = row.status === 'Action Pending';
        const isHealthy = row.status === 'Healthy';
        return (
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
              isPending
                ? 'bg-red-50 text-[#DC2626] border-red-200'
                : isHealthy
                ? 'bg-emerald-50 text-[#15803D] border-emerald-200'
                : 'bg-amber-50 text-[#D97706] border-amber-200'
            }`}
          >
            {row.status}
          </span>
        );
      }
    },
    {
      key: 'action',
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => setSelectedCustomerId(row.id)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200 whitespace-nowrap"
        >
          <span>Open Profile</span>
          <ExternalLink size={12} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Risk Detection Center
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Distinct customer risk intelligence evaluated from 79,817 monthly telemetry records.
          </p>
        </div>

        <button
          onClick={handleTriggerRun}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <PlayCircle size={15} className={isRunning ? 'animate-spin' : ''} />
          <span>{isRunning ? 'Running Assessment Engine...' : 'Trigger Assessment Run'}</span>
        </button>
      </div>

      {/* PRD Section 5: Configurable Starting Thresholds & Strict Calibration Callout */}
      <div className="bg-slate-50 rounded-xl border border-[#E2E8F0] p-4 text-xs space-y-3">
        <div className="flex items-center gap-2 text-[#0F172A] font-bold">
          <Info size={16} className="text-[#4F46E5]" />
          <span>Configurable Starting Score Bands & Handling Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-lg border border-emerald-200 flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] mt-1 shrink-0" />
            <div>
              <div className="font-bold text-[#15803D]">0–29: Low Risk</div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Default handling: <strong>Routine monitoring</strong>. Baseline usage signals healthy.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-200 flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] mt-1 shrink-0" />
            <div>
              <div className="font-bold text-[#D97706]">30–59: Medium Risk</div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Default handling: <strong>Review and consider engagement</strong>. Feature dip or ticket spike.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-red-200 flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] mt-1 shrink-0" />
            <div>
              <div className="font-bold text-[#DC2626]">60–100: High Risk</div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Default handling: <strong>Prioritize investigation</strong>. Imminent renewal or severe drop.
              </p>
            </div>
          </div>
        </div>

        {/* PRD Explicit Disclaimer */}
        <p className="text-[11px] text-[#64748B] border-t border-[#E2E8F0] pt-2 italic">
          <strong>Notice:</strong> These are configurable starting thresholds, not validated probabilities. A score of 78/100 must not be described as a 78% churn probability unless the model has been properly calibrated.
        </p>
      </div>

      {/* Filter Toolbar */}
      <FilterToolbar
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        categoryFilter={riskCategoryFilter}
        onCategoryChange={setRiskCategoryFilter}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        subscriptionFilter={subscriptionFilter}
        onSubscriptionChange={setSubscriptionFilter}
        actionStatusFilter={actionStatusFilter}
        onActionStatusChange={setActionStatusFilter}
        minScore={minScore}
        maxScore={maxScore}
        onScoreChange={(min, max) => {
          setMinScore(min);
          setMaxScore(max);
        }}
        onResetFilters={handleResetFilters}
        locationsList={locationsList}
      />

      {/* Main Distinct Customer Table */}
      <DataTable
        columns={columns}
        data={filteredRows}
        keyField="id"
        pageSize={10}
        totalCount={2840} // Scaled PRD context
        emptyMessage="No distinct customer records match the specified filters."
      />
    </div>
  );
}
