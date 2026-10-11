import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import {
  FileText,
  Clock,
  Mail,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Download,
  Send,
  Eye,
  X,
  ExternalLink,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export default function ReportsView() {
  const {
    reports,
    generateReport,
    selectedReportId,
    setSelectedReportId,
    selectedReport,
    jobs
  } = useRevive();

  const [activeReportModal, setActiveReportModal] = useState(null);

  const reportJob = jobs.find((j) => j.id === 'JOB-01') || {
    schedule: 'Every 12 hours (08:00, 20:00)',
    nextRun: 'Today at 20:00:00',
    status: 'Healthy'
  };

  const handleOpenReportDetails = (rep) => {
    setActiveReportModal(rep);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Executive Reports
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Scheduled 12-hour manager digests & on-demand analytical reports dispatched to your inbox.
          </p>
        </div>

        <button
          onClick={generateReport}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg shadow-sm transition-colors"
        >
          <PlusCircle size={15} />
          <span>Generate Report Now</span>
        </button>
      </div>

      {/* Scheduler Status Banner (PRD Section 9) */}
      <div className="bg-slate-50 border border-[#E2E8F0] rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center text-[#0F766E]">
            <Clock size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">Automated 12-Hour Schedule</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#15803D]">
                Active Worker
              </span>
            </div>
            <p className="text-[#64748B] mt-0.5">
              Next scheduled delivery: <strong className="text-[#0F172A]">{reportJob.nextRun}</strong> to <code>sarah.lin@reviveai.io</code>
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-[#64748B] border-t md:border-t-0 pt-2 md:pt-0">
          <span>Cadence: <strong>{reportJob.schedule}</strong></span>
          <span className="block italic text-[10px] text-slate-500">
            Distinguishes generated vs sent delivery states
          </span>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Historical Generated Reports</h3>
          <span className="text-xs text-[#64748B]">{reports.length} Reports Archived</span>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-sm text-[#0F172A]">{rep.id}</span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                    {rep.period}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      rep.deliveryStatus === 'sent'
                        ? 'bg-emerald-50 text-[#15803D] border-emerald-200'
                        : rep.deliveryStatus === 'queued'
                        ? 'bg-amber-50 text-[#D97706] border-amber-200'
                        : 'bg-red-50 text-[#DC2626] border-red-200'
                    }`}
                  >
                    Email Status: {rep.deliveryStatus.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-[#64748B]">{rep.summary}</p>

                {/* Key Metrics Chips */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <span className="text-[#0F172A]">
                    Evaluated: <strong>{rep.metrics.distinctEvaluated}</strong>
                  </span>
                  <span className="text-[#DC2626]">
                    High-Risk: <strong>{rep.metrics.highRiskCount}</strong>
                  </span>
                  <span className="text-[#D97706]">
                    Medium-Risk: <strong>{rep.metrics.mediumRiskCount}</strong>
                  </span>
                  <span className="text-[#15803D]">
                    Emails Delivered: <strong>{rep.metrics.emailsDelivered}</strong>
                  </span>
                  <span className="text-[#64748B] font-mono text-[11px]">
                    Generated: {rep.generationTimestamp}
                  </span>
                </div>
              </div>

              {/* View Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  onClick={() => handleOpenReportDetails(rep)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                >
                  <Eye size={13} />
                  <span>Inspect Summary</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Details Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#0F766E]" />
                <h3 className="text-base font-bold text-[#0F172A]">Report Detail: {activeReportModal.id}</h3>
              </div>
              <button
                onClick={() => setActiveReportModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Period:</span>
                  <span className="font-semibold text-[#0F172A]">{activeReportModal.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Timestamp:</span>
                  <span className="font-mono text-[#0F172A]">{activeReportModal.generationTimestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Target Recipient:</span>
                  <span className="font-mono text-[#0F172A]">{activeReportModal.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Delivery State:</span>
                  <span className="font-bold text-[#15803D] uppercase">{activeReportModal.deliveryStatus}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#0F172A] mb-2">Metrics Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[#64748B] block text-[10px] uppercase">Evaluated</span>
                    <span className="text-base font-bold text-[#0F172A]">{activeReportModal.metrics.distinctEvaluated}</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-[#DC2626] block text-[10px] uppercase">High Risk</span>
                    <span className="text-base font-bold text-[#DC2626]">{activeReportModal.metrics.highRiskCount}</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-[#D97706] block text-[10px] uppercase">Medium Risk</span>
                    <span className="text-base font-bold text-[#D97706]">{activeReportModal.metrics.mediumRiskCount}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-[#15803D] block text-[10px] uppercase">Emails Sent</span>
                    <span className="text-base font-bold text-[#15803D]">{activeReportModal.metrics.emailsDelivered}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#0F172A] mb-2">Location Summary</h4>
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-[#E2E8F0] text-[#64748B]">
                      <tr>
                        <th className="py-2 px-3">Location</th>
                        <th className="py-2 px-3 text-right">Customer Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {Object.entries(activeReportModal.locationSummary || {}).map(([loc, cnt]) => (
                        <tr key={loc}>
                          <td className="py-1.5 px-3 text-[#0F172A]">{loc}</td>
                          <td className="py-1.5 px-3 text-right font-mono font-bold text-[#0F172A]">{cnt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-[#E2E8F0] flex justify-end">
              <button
                onClick={() => setActiveReportModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
