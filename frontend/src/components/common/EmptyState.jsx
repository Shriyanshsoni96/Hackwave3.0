import React from 'react';
import { Inbox, RefreshCw } from 'lucide-react';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'Try adjusting your filters, search criteria, or date range.',
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-[#E2E8F0] shadow-card">
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[#64748B] mb-4">
        <Icon size={28} />
      </div>
      <h4 className="text-base font-semibold text-[#0F172A] mb-1">{title}</h4>
      <p className="text-sm text-[#64748B] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg transition-colors"
        >
          <RefreshCw size={14} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function Skeleton({ className = 'h-4 w-full' }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
  );
}

export default EmptyState;
