import React, { useState, useMemo } from 'react';
import { useRevive } from '../../context/ReviveContext';
import DataTable from '../common/DataTable';
import FilterToolbar from '../common/FilterToolbar';
import RiskBadge from '../common/RiskBadge';
import {
  Users,
  UserPlus,
  Upload,
  Edit,
  ExternalLink,
  RefreshCw,
  Search,
  MapPin,
  Calendar,
  AlertTriangle,
  Database
} from 'lucide-react';

export default function CustomerDirectory() {
  const {
    customers,
    assessments,
    setSelectedCustomerId,
    setEditingCustomerId,
    setIsAddCustomerOpen,
    setIsCsvModalOpen,
    recalculateRisk,
    globalSearch,
    setGlobalSearch,
    subscriptionFilter,
    setSubscriptionFilter,
    locationFilter,
    setLocationFilter
  } = useRevive();

  const locationsList = useMemo(() => {
    const locSet = new Set();
    customers.forEach((c) => {
      if (c.location) locSet.add(c.location);
    });
    return Array.from(locSet);
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        const matchId = c.id.toLowerCase().includes(q);
        const matchName = c.name.toLowerCase().includes(q);
        const matchEmail = (c.contactEmail || '').toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail) return false;
      }
      if (subscriptionFilter !== 'All' && c.subscriptionTier !== subscriptionFilter) {
        return false;
      }
      if (locationFilter !== 'All' && c.location !== locationFilter) {
        return false;
      }
      return true;
    });
  }, [customers, globalSearch, subscriptionFilter, locationFilter]);

  const columns = [
    {
      key: 'id',
      header: 'Customer ID',
      sortable: true,
      render: (row) => (
        <div>
          <button
            onClick={() => setSelectedCustomerId(row.id)}
            className="font-bold text-[#4F46E5] hover:underline"
          >
            {row.id}
          </button>
          <div className="text-[11px] text-[#64748B]">{row.name}</div>
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
      key: 'subscriptionTier',
      header: 'Plan Tier',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-[#0F172A] border border-[#E2E8F0]">
          {row.subscriptionTier}
        </span>
      )
    },
    {
      key: 'mrr',
      header: 'Monthly MRR',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-xs text-[#0F172A]">
          ${row.mrr?.toLocaleString()}
        </span>
      )
    },
    {
      key: 'contractRenewalDate',
      header: 'Renewal Date',
      sortable: true,
      render: (row) => (
        <span className="text-xs font-mono text-[#64748B] whitespace-nowrap">
          {row.contractRenewalDate}
        </span>
      )
    },
    {
      key: 'riskScore',
      header: 'Latest Risk',
      render: (row) => {
        const assess = assessments[row.id];
        return (
          <RiskBadge
            score={assess?.score}
            category={assess?.category}
            size="sm"
          />
        );
      }
    },
    {
      key: 'supportPriority',
      header: 'SLA Priority',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            row.supportPriority === 'P1'
              ? 'bg-red-50 text-[#DC2626] border border-red-200'
              : 'bg-slate-100 text-[#64748B]'
          }`}
        >
          {row.supportPriority}
        </span>
      )
    },
    {
      key: 'outreachCount',
      header: 'Outreach Sent',
      render: (row) => (
        <span className="text-xs text-[#64748B] font-mono">
          {row.outreachCount} / 3 emails
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedCustomerId(row.id)}
            title="Inspect Intelligence Profile"
            className="p-1.5 text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => setEditingCustomerId(row.id)}
            title="Edit Permitted Customer Fields"
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => recalculateRisk(row.id)}
            title="Recalculate Risk Engine"
            className="p-1.5 text-[#0F766E] hover:bg-teal-50 rounded-lg transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Customer Management
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Search, add, edit, and investigate distinct customer accounts from MongoDB Atlas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors shadow-sm"
          >
            <Upload size={14} />
            <span>CSV Batch Import</span>
          </button>

          <button
            onClick={() => setIsAddCustomerOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm transition-colors"
          >
            <UserPlus size={14} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <FilterToolbar
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        subscriptionFilter={subscriptionFilter}
        onSubscriptionChange={setSubscriptionFilter}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        locationsList={locationsList}
        onResetFilters={() => {
          setGlobalSearch('');
          setSubscriptionFilter('All');
          setLocationFilter('All');
        }}
      />

      {/* Directory Table */}
      <DataTable
        columns={columns}
        data={filteredCustomers}
        keyField="id"
        pageSize={10}
        totalCount={2840}
        emptyMessage="No customer records match your search criteria."
      />
    </div>
  );
}
