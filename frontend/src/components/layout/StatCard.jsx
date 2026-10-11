import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral', // 'positive' | 'negative' | 'neutral' | 'warning'
  icon: Icon,
  badge,
  badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  isEstimate = false,
  onClick
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'negative':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'warning':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-slate-700 hover:shadow-slate-900/50 hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
          {isEstimate && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              ESTIMATE
            </span>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 truncate max-w-[200px]">{subtitle}</span>
        {change && (
          <span className={`px-2 py-0.5 rounded-full font-medium border ${getChangeColor()}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
