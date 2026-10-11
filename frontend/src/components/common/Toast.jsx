import React from 'react';
import { useRevive } from '../../context/ReviveContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useRevive();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-modal bg-white transition-all animate-in slide-in-from-bottom-3 duration-200 ${
              isSuccess
                ? 'border-emerald-200 text-[#0F172A]'
                : isError
                ? 'border-red-200 text-[#0F172A]'
                : isWarning
                ? 'border-amber-200 text-[#0F172A]'
                : 'border-indigo-200 text-[#0F172A]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess ? (
                <CheckCircle2 size={18} className="text-[#15803D]" />
              ) : isError ? (
                <AlertCircle size={18} className="text-[#DC2626]" />
              ) : isWarning ? (
                <AlertTriangle size={18} className="text-[#D97706]" />
              ) : (
                <Info size={18} className="text-[#4F46E5]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-[#0F172A]">{toast.title}</h5>
              <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
