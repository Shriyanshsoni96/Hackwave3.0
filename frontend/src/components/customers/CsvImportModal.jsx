import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import { X, Upload, FileText, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';

export default function CsvImportModal() {
  const { isCsvModalOpen, setIsCsvModalOpen, showToast, logAudit } = useRevive();

  const [step, setStep] = useState(1); // 1: Upload, 2: Column Mapping & Validation, 3: Import Summary
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCsvModalOpen) return null;

  const mockParsedRows = [
    { id: 'CUST-8101', name: 'Apex Logistics Europe', location: 'Europe (Germany)', tier: 'Enterprise', mrr: '$12,000', status: 'Valid' },
    { id: 'CUST-8021', name: 'Apex Logistics Ltd', location: 'North America', tier: 'Enterprise', mrr: '$14,500', status: 'Duplicate ID Detected' },
    { id: 'CUST-8102', name: 'SkyHigh Cloud Services', location: 'APAC (Singapore)', tier: 'Pro', mrr: '$7,200', status: 'Valid' },
    { id: 'CUST-8103', name: 'Delta Retail Analytics', location: 'Unverified', tier: 'Starter', mrr: '$1,900', status: 'Valid (Location Unverified)' }
  ];

  const handleSimulateUpload = () => {
    setSelectedFile({ name: 'customers_batch_q4_2026.csv', size: '248 KB', records: 4 });
    setStep(2);
  };

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      logAudit('CSV Batch Imported', 'BATCH', 'Imported 3 new customers, skipped 1 duplicate ID.');
      showToast('success', 'CSV Import Complete', '3 customer records imported successfully into MongoDB Atlas.');
    }, 800);
  };

  const handleClose = () => {
    setIsCsvModalOpen(false);
    setStep(1);
    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-modal max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-[#0F766E]">
              <Upload size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Batch Customer CSV Ingestion</h3>
              <p className="text-[11px] text-[#64748B]">Schema-aware validation & duplicate detection</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-[#CBD5E1] hover:border-[#4F46E5] rounded-xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-indigo-50/30 transition-all"
              >
                <FileText size={36} className="mx-auto text-[#64748B] mb-2" />
                <p className="text-xs font-bold text-[#0F172A]">
                  Click to select CSV or user_monthly batch file
                </p>
                <p className="text-[11px] text-[#64748B] mt-1">
                  Supported formats: <code>.csv</code>, <code>.parquet</code>. Max file size: 50MB.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-[#E2E8F0] text-xs text-[#64748B]">
                <span className="font-bold text-[#0F172A]">Expected Schema Headers:</span>
                <div className="font-mono text-[11px] text-slate-700 mt-1">
                  customer_id, customer_name, location, subscription_tier, mrr, renewal_date
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A]">
                  File: {selectedFile?.name} ({selectedFile?.records} records)
                </span>
                <span className="text-[#0F766E] font-semibold">Schema Mapping: 100% Validated</span>
              </div>

              {/* Table preview */}
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-[#E2E8F0] text-[#64748B]">
                    <tr>
                      <th className="py-2 px-3">Customer ID</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Location</th>
                      <th className="py-2 px-3">Tier</th>
                      <th className="py-2 px-3">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {mockParsedRows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-bold text-[#0F172A]">{r.id}</td>
                        <td className="py-2 px-3">{r.name}</td>
                        <td className="py-2 px-3">{r.location}</td>
                        <td className="py-2 px-3">{r.tier}</td>
                        <td className="py-2 px-3">
                          {r.status.includes('Duplicate') ? (
                            <span className="text-[11px] font-semibold text-[#DC2626] flex items-center gap-1">
                              <AlertCircle size={12} />
                              {r.status}
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-[#15803D] flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              {r.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-[#B45309] flex items-center gap-2">
                <AlertTriangle size={15} className="shrink-0" />
                <span>1 duplicate record found (CUST-8021). Duplicate will be skipped automatically.</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-base font-bold text-[#0F172A]">Batch Ingestion Successful</h4>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                3 new distinct customer records committed to MongoDB Atlas. Baseline risk evaluations initialized.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
          {step === 1 && (
            <button
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
            >
              Cancel
            </button>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleExecuteImport}
                disabled={isProcessing}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm"
              >
                {isProcessing ? 'Ingesting to MongoDB...' : 'Confirm & Ingest 3 Rows'}
              </button>
            </>
          )}

          {step === 3 && (
            <button
              onClick={handleClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
