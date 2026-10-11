import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Database, 
  Share2, 
  Mail, 
  Activity, 
  MessageSquare, 
  LifeBuoy, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Search,
  Filter
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function IntegrationsAndAudit() {
  const { 
    integrations, 
    auditLogs, 
    handleSyncIntegration 
  } = useRevOps();

  const [activeTab, setActiveTab] = useState('integrations'); // 'integrations' | 'audit' | 'rbac'
  const [auditFilter, setAuditFilter] = useState('ALL');
  const [auditSearch, setAuditSearch] = useState('');

  const getPlatformIcon = (iconName) => {
    switch (iconName) {
      case 'database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'share-2': return <Share2 className="w-5 h-5 text-amber-400" />;
      case 'mail': return <Mail className="w-5 h-5 text-rose-400" />;
      case 'activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'message-square': return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case 'life-buoy': return <LifeBuoy className="w-5 h-5 text-cyan-400" />;
      default: return <Database className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = auditFilter === 'ALL' || log.eventType === auditFilter || log.status === auditFilter;
    const matchesSearch = 
      log.actor.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Integrations, Security & System Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time synchronization health, OAuth 2.0 connected providers, and auditable decision history.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'integrations'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Connected Services ({integrations.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Log ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'rbac'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            RBAC & Security
          </button>
        </div>
      </div>

      {/* VIEW: INTEGRATIONS */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      {getPlatformIcon(item.icon)}
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === 'CONNECTED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        item.status === 'SYNCING' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse' :
                        'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-sm font-bold text-white mb-0.5">{item.name}</h2>
                  <span className="text-[11px] text-slate-400 font-medium block mb-2">{item.category}</span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Ingested Records:</span>
                    <strong className="text-white">{item.recordsCount}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Last Sync:</span>
                    <span className="text-slate-300 font-mono">{item.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Sync Health:</span>
                    <span className="text-emerald-400 font-semibold">{item.healthRate}</span>
                  </div>

                  <button
                    onClick={() => handleSyncIntegration(item.id)}
                    disabled={item.status === 'SYNCING'}
                    className="w-full mt-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${item.status === 'SYNCING' ? 'animate-spin text-blue-400' : ''}`} />
                    <span>{item.status === 'SYNCING' ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Filter Events:</span>
              {['ALL', 'HUMAN_APPROVAL', 'HUMAN_REJECTION', 'ACTION_RECOMMENDED', 'ACTION_EXECUTED', 'DATA_SYNC'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAuditFilter(type)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    auditFilter === type 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search audit trail..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Audit Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Event Summary</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap ${
                        log.eventType === 'HUMAN_APPROVAL' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        log.eventType === 'HUMAN_REJECTION' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                        log.eventType === 'ACTION_EXECUTED' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {log.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {log.actor}
                    </td>
                    <td className="py-3 px-4 text-white font-medium">
                      {log.target}
                    </td>
                    <td className="py-3 px-4 text-slate-300 leading-relaxed max-w-md">
                      {log.details}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-[10px] text-emerald-400 uppercase tracking-wider">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: RBAC & SECURITY */}
      {activeTab === 'rbac' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 text-xs">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              Role-Based Access Control (RBAC) & Responsible Automation Policies
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Enforced security policies ensure agent autonomy is bounded by strict human-in-the-loop governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm">Human Approval Guardrails</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                External communication dispatches (outbound emails) and CRM deal stage changes require signed human confirmation.
              </p>
              <div className="pt-2 text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Enforced by Default
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm">Data Minimization & OAuth 2.0</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Connectors operate on least-privilege OAuth scopes. Customer emails and meeting notes are analyzed only for sentiment and cadence markers.
              </p>
              <div className="pt-2 text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Least Privilege Active
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="font-bold text-white text-sm">Immutable Audit Logs</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every AI prompt, inferred risk score, human approval, and integration execution event is cryptographically timestamped.
              </p>
              <div className="pt-2 text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Full Audit Trail Active
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
