import React, { useState } from 'react';
import { useRevive } from '../../context/ReviveContext';
import {
  Sliders,
  ShieldCheck,
  Database,
  Cpu,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function SettingsView() {
  const { thresholds, setThresholds, showToast, logAudit, jobs } = useRevive();

  const [formThresholds, setFormThresholds] = useState({
    lowMax: thresholds.lowMax,
    mediumMax: thresholds.mediumMax,
    highMin: thresholds.highMin,
    maxOutreach: thresholds.maxOutreach,
    cooldownDays: thresholds.cooldownDays
  });

  const [managerProfile, setManagerProfile] = useState({
    name: 'Sarah Lin',
    role: 'Customer Success Manager / RevOps Lead',
    email: 'sarah.lin@reviveai.io',
    phone: '+1 (555) 392-8190',
    reportDigestFrequency: '12 Hours'
  });

  const handleSaveThresholds = (e) => {
    e.preventDefault();
    setThresholds(formThresholds);
    logAudit(
      'Settings Updated',
      'SYSTEM',
      `Updated risk thresholds: Low (0-${formThresholds.lowMax}), Med (${formThresholds.lowMax + 1}-${formThresholds.mediumMax}), High (${formThresholds.highMin}-100), Max Emails: ${formThresholds.maxOutreach}.`
    );
    showToast('success', 'Configuration Saved', 'Risk thresholds and retention safeguards updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Platform Configuration & Settings
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Manager profile, configurable risk thresholds, outreach safeguards, and backend engine status.
        </p>
      </div>

      {/* SECTION 1: Manager Profile */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
            <UserCheck size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Manager Identity & Delivery Preferences</h3>
            <p className="text-[11px] text-[#64748B]">Authenticated profile used for retention decision signatures</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Manager Full Name</label>
            <input
              type="text"
              value={managerProfile.name}
              onChange={(e) => setManagerProfile({ ...managerProfile, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-50 text-[#0F172A]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Corporate Role</label>
            <input
              type="text"
              value={managerProfile.role}
              onChange={(e) => setManagerProfile({ ...managerProfile, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-50 text-[#0F172A]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Notification Email</label>
            <input
              type="email"
              value={managerProfile.email}
              onChange={(e) => setManagerProfile({ ...managerProfile, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-50 text-[#0F172A]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#0F172A] mb-1">Scheduled Report Cadence</label>
            <input
              type="text"
              readOnly
              value="Every 12 Hours (Configured in PRD v2.0)"
              className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-100 text-[#64748B] cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Configurable Risk Thresholds */}
      <form onSubmit={handleSaveThresholds} className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-[#0F766E]">
            <Sliders size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Configurable Risk Thresholds (Section 5)</h3>
            <p className="text-[11px] text-[#64748B]">Adjustable scoring boundaries for Low, Medium, and High bands</p>
          </div>
        </div>

        {/* PRD Disclaimer callout */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-[#92400E] flex items-start gap-2">
          <AlertCircle size={16} className="shrink-0 mt-0.5 text-[#D97706]" />
          <div>
            <strong>Calibration Notice:</strong> These are configurable starting thresholds, not validated probabilities. A score of 78/100 must not be described as a 78% churn probability unless the model has been properly calibrated.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
            <span className="font-bold text-[#15803D] block">Low Risk Band (Routine Monitoring)</span>
            <div className="flex items-center gap-2">
              <span className="text-[#64748B]">Range: 0 to</span>
              <input
                type="number"
                min="10"
                max="40"
                value={formThresholds.lowMax}
                onChange={(e) => setFormThresholds({ ...formThresholds, lowMax: Number(e.target.value) })}
                className="w-20 px-2 py-1 font-mono font-bold text-center border border-[#E2E8F0] rounded bg-white"
              />
            </div>
            <p className="text-[11px] text-[#64748B]">Default: 0–29</p>
          </div>

          <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
            <span className="font-bold text-[#D97706] block">Medium Risk Band (Consider Engagement)</span>
            <div className="flex items-center gap-2">
              <span className="text-[#64748B]">Max:</span>
              <input
                type="number"
                min="45"
                max="75"
                value={formThresholds.mediumMax}
                onChange={(e) => setFormThresholds({ ...formThresholds, mediumMax: Number(e.target.value) })}
                className="w-20 px-2 py-1 font-mono font-bold text-center border border-[#E2E8F0] rounded bg-white"
              />
            </div>
            <p className="text-[11px] text-[#64748B]">Default: 30–59</p>
          </div>

          <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-200 space-y-2">
            <span className="font-bold text-[#DC2626] block">High Risk Band (Prioritize Investigation)</span>
            <div className="flex items-center gap-2">
              <span className="text-[#64748B]">Min:</span>
              <input
                type="number"
                min="60"
                max="90"
                value={formThresholds.highMin}
                onChange={(e) => setFormThresholds({ ...formThresholds, highMin: Number(e.target.value) })}
                className="w-20 px-2 py-1 font-mono font-bold text-center border border-[#E2E8F0] rounded bg-white"
              />
            </div>
            <p className="text-[11px] text-[#64748B]">Default: 60–100</p>
          </div>
        </div>

        {/* SECTION 3: Retention Safeguards */}
        <div className="pt-4 border-t border-[#E2E8F0] space-y-4">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Retention Outreach Safeguards (PRD Section 8, 9, 15)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">
                Max Warning Emails Per Customer (Enforced: 3)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={formThresholds.maxOutreach}
                onChange={(e) => setFormThresholds({ ...formThresholds, maxOutreach: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white font-mono font-semibold"
              />
              <p className="text-[11px] text-[#64748B] mt-1">
                PRD Rule: Backend strictly blocks 4th warning email.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-[#0F172A] mb-1">
                Cooldown Window Between Outreach (Days)
              </label>
              <input
                type="number"
                min="7"
                max="30"
                value={formThresholds.cooldownDays}
                onChange={(e) => setFormThresholds({ ...formThresholds, cooldownDays: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white font-mono font-semibold"
              />
              <p className="text-[11px] text-[#64748B] mt-1">
                Enforces quiet period between manager interventions.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0] flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0F172A]">Manager Approval Requirement</span>
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-[#4F46E5] font-bold text-[11px]">
              STRICTLY ENFORCED (Cannot bypass)
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-sm"
          >
            <Save size={14} />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

      {/* SECTION 4: Architecture & DB State (Section 11) */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Database size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">MongoDB Atlas Architecture & Engine Health</h3>
            <p className="text-[11px] text-[#64748B]">Logical entity collections and scheduled worker status</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0]">
            <span className="text-[#64748B] block text-[10px]">Monthly Telemetry</span>
            <span className="font-mono font-bold text-sm text-[#0F172A]">79,817 records</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0]">
            <span className="text-[#64748B] block text-[10px]">Distinct Customers</span>
            <span className="font-mono font-bold text-sm text-[#0F172A]">2,840 distinct</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0]">
            <span className="text-[#64748B] block text-[10px]">Scoring Engine</span>
            <span className="font-semibold text-xs text-[#0F766E]">Rule Engine v2.4</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-[#E2E8F0]">
            <span className="text-[#64748B] block text-[10px]">Python ML Bridge</span>
            <span className="font-semibold text-xs text-[#4F46E5]">Contract Ready</span>
          </div>
        </div>

        <div className="text-[11px] text-[#64748B] pt-2">
          <strong>Database collections active:</strong> <code>customers</code>, <code>customer_monthly</code>, <code>riskAssessments</code>, <code>retentionActions</code>, <code>emailLogs</code>, <code>managerReports</code>, <code>scheduledJobs</code>, <code>users</code>.
        </div>
      </div>
    </div>
  );
}
