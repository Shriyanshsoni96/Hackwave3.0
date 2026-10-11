import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import { X, Edit3, AlertTriangle, RefreshCw } from 'lucide-react';

export default function EditCustomerModal() {
  const { editingCustomerId, setEditingCustomerId, customers, updateCustomer, recalculateRisk } = useRevive();

  const customer = customers.find((c) => c.id === editingCustomerId);

  const [formData, setFormData] = useState(() => {
    if (!customer) return {};
    return {
      name: customer.name || '',
      location: customer.location || '',
      subscriptionTier: customer.subscriptionTier || 'Enterprise',
      subscriptionStatus: customer.subscriptionStatus || 'Active',
      contractRenewalDate: customer.contractRenewalDate || '',
      supportPriority: customer.supportPriority || 'P2',
      notes: customer.notes || ''
    };
  });

  const [reassessImmediately, setReassessImmediately] = useState(true);

  if (!editingCustomerId || !customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomer(customer.id, {
      ...formData,
      isLocationVerified: !!(formData.location && formData.location !== 'Unverified')
    });

    if (reassessImmediately) {
      setTimeout(() => {
        recalculateRisk(customer.id);
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Edit Customer: {customer.id}</h3>
              <p className="text-[11px] text-[#64748B]">Update permitted fields • Editor: Sarah Lin</p>
            </div>
          </div>
          <button
            onClick={() => setEditingCustomerId(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* PRD Section 7 Notice */}
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-[#B45309] flex items-start gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#D97706]" />
            <div>
              <span className="font-bold">Stale Assessment Warning:</span> Modifying subscription, location, or priority will mark the existing risk assessment as STALE. Reassessment is recommended.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Verified Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Subscription Status
              </label>
              <select
                value={formData.subscriptionStatus}
                onChange={(e) => setFormData({ ...formData, subscriptionStatus: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none bg-white"
              >
                <option value="Active">Active</option>
                <option value="Grace Period">Grace Period (Billing failed)</option>
                <option value="At Risk">At Risk</option>
                <option value="Churned">Churned</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Subscription Tier
              </label>
              <select
                value={formData.subscriptionTier}
                onChange={(e) => setFormData({ ...formData, subscriptionTier: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none bg-white"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Growth">Growth</option>
                <option value="Starter">Starter</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Support Priority
              </label>
              <select
                value={formData.supportPriority}
                onChange={(e) => setFormData({ ...formData, supportPriority: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none bg-white"
              >
                <option value="P1">P1 (Critical SLA)</option>
                <option value="P2">P2 (Standard)</option>
                <option value="P3">P3 (Routine)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Contract Renewal Date
            </label>
            <input
              type="date"
              value={formData.contractRenewalDate}
              onChange={(e) => setFormData({ ...formData, contractRenewalDate: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Reassess Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={reassessImmediately}
                onChange={(e) => setReassessImmediately(e.target.checked)}
                className="rounded text-[#4F46E5] focus:ring-[#4F46E5]"
              />
              <span>Trigger instant deterministic risk reassessment upon save</span>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingCustomerId(null)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm"
            >
              Save Permitted Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
