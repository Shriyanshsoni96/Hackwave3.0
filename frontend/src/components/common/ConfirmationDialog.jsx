import React from 'react';
import { AlertTriangle, CheckCircle, X, ShieldAlert } from 'lucide-react';

export default function ConfirmationDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary', // 'primary' | 'danger' | 'success'
  onConfirm,
  onCancel,
  children
}) {
  if (!isOpen) return null;

  const confirmColors = {
    primary: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
    success: 'bg-[#15803D] hover:bg-[#166534] text-white'
  }[confirmVariant] || 'bg-[#4F46E5] hover:bg-[#4338CA] text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            {confirmVariant === 'danger' ? (
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-[#DC2626]">
                <ShieldAlert size={20} />
              </div>
            ) : confirmVariant === 'success' ? (
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-[#15803D]">
                <CheckCircle size={20} />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
                <AlertTriangle size={20} />
              </div>
            )}
            <h3 className="text-base font-bold text-[#0F172A]">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {description && (
            <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-slate-100 rounded-lg transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors ${confirmColors}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
