import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import { X, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AddCustomerModal() {
  const { isAddCustomerOpen, setIsAddCustomerOpen, addCustomer } = useRevive();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    contactName: '',
    contactEmail: '',
    location: '',
    subscriptionTier: 'Pro',
    mrr: 5000,
    contractRenewalDate: '2026-12-31',
    contractTerm: '12 Months',
    supportPriority: 'P2',
    notes: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isAddCustomerOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.id.trim()) {
      setErrorMsg('Customer ID is required.');
      return;
    }

    const success = addCustomer(formData);
    if (!success) {
      setErrorMsg('Failed to add customer. Ensure Customer ID is unique.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Add Customer Account</h3>
              <p className="text-[11px] text-[#64748B]">Manual customer entry with schema validation</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddCustomerOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#DC2626] flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Customer ID <span className="text-[#DC2626]">* (Unique)</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CUST-9050"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Primary Contact Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="jane@company.com"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Location <span className="text-[10px] text-[#64748B]">(Optional; do not guess)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. North America (US-West)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Monthly Spend (MRR $)
              </label>
              <input
                type="number"
                value={formData.mrr}
                onChange={(e) => setFormData({ ...formData, mrr: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Contract Renewal
              </label>
              <input
                type="date"
                value={formData.contractRenewalDate}
                onChange={(e) => setFormData({ ...formData, contractRenewalDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
              />
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
                <option value="P1">P1 (Critical)</option>
                <option value="P2">P2 (Standard)</option>
                <option value="P3">P3 (Routine)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Internal Account Notes
            </label>
            <textarea
              rows={2}
              placeholder="Context or notes about this account..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#4F46E5] focus:outline-none"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddCustomerOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm"
            >
              Save to MongoDB Atlas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
