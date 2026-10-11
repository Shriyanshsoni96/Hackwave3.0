import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

/**
 * RiskBadge Component
 * Adheres to PRD v2.0 Section 5 & 13:
 * - 0–29: Low (Routine monitoring) -> #15803D
 * - 30–59: Medium (Review and consider engagement) -> #D97706
 * - 60–100: High (Prioritize investigation) -> #DC2626
 * - "pair every status color with a text label/icon; never rely on color alone."
 * - "A score of 78/100 must not be described as a 78% churn probability unless calibrated."
 */
export default function RiskBadge({ score, category, showScore = true, size = 'md' }) {
  let resolvedCategory = category;
  if (!resolvedCategory && typeof score === 'number') {
    if (score >= 60) resolvedCategory = 'High';
    else if (score >= 30) resolvedCategory = 'Medium';
    else resolvedCategory = 'Low';
  }

  const isHigh = resolvedCategory === 'High';
  const isMedium = resolvedCategory === 'Medium';
  const isLow = resolvedCategory === 'Low';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-semibold'
  }[size] || 'px-2.5 py-1 text-xs font-medium';

  const iconSize = size === 'lg' ? 16 : size === 'sm' ? 12 : 14;

  if (isHigh) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 ${sizeClasses}`}>
        <AlertTriangle size={iconSize} className="text-[#DC2626] shrink-0" />
        <span className="font-semibold text-[#DC2626]">High Risk</span>
        {showScore && typeof score === 'number' && (
          <span className="ml-1 px-1.5 py-0.5 rounded bg-red-100 text-[#DC2626] font-mono text-[11px] font-bold">
            {score}/100
          </span>
        )}
      </span>
    );
  }

  if (isMedium) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 ${sizeClasses}`}>
        <AlertCircle size={iconSize} className="text-[#D97706] shrink-0" />
        <span className="font-semibold text-[#D97706]">Medium Risk</span>
        {showScore && typeof score === 'number' && (
          <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-100 text-[#B45309] font-mono text-[11px] font-bold">
            {score}/100
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 ${sizeClasses}`}>
      <CheckCircle2 size={iconSize} className="text-[#15803D] shrink-0" />
      <span className="font-semibold text-[#15803D]">Low Risk</span>
      {showScore && typeof score === 'number' && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-100 text-[#15803D] font-mono text-[11px] font-bold">
          {score}/100
        </span>
      )}
    </span>
  );
}
