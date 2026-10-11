import React from 'react';

/**
 * KpiCard Component
 * Implements PRD Section 4 & 13:
 * Premium light-mode SaaS UI, data density over decorative effects,
 * semantic color pairing with icons and clear labels.
 */
export default function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'neutral', // 'danger' | 'warning' | 'success' | 'indigo' | 'teal' | 'neutral'
  onClick
}) {
  const badgeStyles = {
    danger: 'bg-red-50 text-[#DC2626] border-red-200',
    warning: 'bg-amber-50 text-[#D97706] border-amber-200',
    success: 'bg-emerald-50 text-[#15803D] border-emerald-200',
    indigo: 'bg-indigo-50 text-[#4F46E5] border-indigo-200',
    teal: 'bg-teal-50 text-[#0F766E] border-teal-200',
    neutral: 'bg-slate-100 text-[#64748B] border-slate-200'
  }[badgeType] || 'bg-slate-100 text-[#64748B] border-slate-200';

  const iconBgStyles = {
    danger: 'bg-red-50 text-[#DC2626]',
    warning: 'bg-amber-50 text-[#D97706]',
    success: 'bg-emerald-50 text-[#15803D]',
    indigo: 'bg-[#EEF2FF] text-[#4F46E5]',
    teal: 'bg-[#F0FDFA] text-[#0F766E]',
    neutral: 'bg-slate-100 text-[#64748B]'
  }[badgeType] || 'bg-slate-100 text-[#64748B]';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-card hover:shadow-card-hover transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-indigo-300' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#64748B]">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgStyles}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#0F172A]">
          {value}
        </span>
        {badgeText && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles}`}>
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-[#64748B] line-clamp-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
