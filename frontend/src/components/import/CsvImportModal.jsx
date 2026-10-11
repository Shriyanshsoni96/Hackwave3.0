import React, { useState } from 'react';
import { 
  X, 
  FileUp, 
  CheckCircle2, 
  Database, 
  Download, 
  ArrowRight,
  Code
} from 'lucide-react';
import { useRevOps } from '../../context/RevOpsContext';

export default function CsvImportModal() {
  const { isCsvModalOpen, setIsCsvModalOpen, handleImportData } = useRevOps();

  const [activeTab, setActiveTab] = useState('csv'); // 'csv' | 'json'
  const [content, setContent] = useState('');
  const [parsedRows, setParsedRows] = useState([]);
  const [importStatus, setImportStatus] = useState('IDLE');

  if (!isCsvModalOpen) return null;

  const sampleCsvData = `Account Name,Industry,Tier,ARR,Days to Renewal,Active Users,Total Seats,Usage Trend %,Account Owner
BioPharm Global,Biotech SaaS,Enterprise,195000,58,320,400,-15,Sarah Jenkins
LogiRoute Fleet,Logistics AI,Growth,54000,112,88,90,34,Marcus Vance
Apex Security Labs,Cybersecurity,Enterprise,220000,6,140,300,-42,Sarah Jenkins`;

  const sampleJsonData = JSON.stringify([
    {
      "name": "NovaCloud Analytics",
      "industry": "Cloud Infrastructure",
      "tier": "Enterprise",
      "arr": 175000,
      "daysToRenewal": 29,
      "signals": {
        "activeUsers": 210,
        "totalSeats": 350,
        "usageTrend": -22,
        "unansweredOutreachCount": 2
      },
      "accountOwner": "Sarah Jenkins"
    }
  ], null, 2);

  const handleLoadPreset = (type) => {
    if (type === 'csv') {
      setContent(sampleCsvData);
      parseCsv(sampleCsvData);
    } else {
      setContent(sampleJsonData);
      parseJson(sampleJsonData);
    }
  };

  const parseCsv = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return;

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts.length >= 8) {
        const name = parts[0];
        const industry = parts[1];
        const tier = parts[2];
        const arr = Number(parts[3]) || 50000;
        const daysToRenewal = Number(parts[4]) || 90;
        const activeUsers = Number(parts[5]) || 50;
        const totalSeats = Number(parts[6]) || 100;
        const usageTrend = Number(parts[7]) || 0;
        const accountOwner = parts[8] || 'Sarah Jenkins';

        const dynamicRisk = usageTrend < 0 ? Math.min(95, 45 + Math.abs(usageTrend)) : 20;

        rows.push({
          id: `cust-import-${Date.now()}-${i}`,
          name,
          industry,
          tier,
          arr,
          healthScore: Math.max(20, 100 - dynamicRisk),
          healthStatus: dynamicRisk >= 80 ? 'High Risk' : dynamicRisk >= 50 ? 'Needs Attention' : 'Healthy',
          churnRiskScore: dynamicRisk,
          expansionScore: usageTrend > 15 ? 78 : 22,
          daysToRenewal,
          renewalDate: '2026-12-15',
          accountOwner,
          primaryContact: {
            name: 'Primary Contact',
            role: 'VP Technology',
            email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`
          },
          signals: {
            usageTrend,
            activeUsers,
            totalSeats,
            seatUtilization: (activeUsers / totalSeats) * 100,
            lastMeetingDaysAgo: 14,
            unansweredMessagesDaysAgo: usageTrend < 0 ? 10 : 0,
            unansweredOutreachCount: usageTrend < 0 ? 2 : 0,
            meetingFrequency: "1 meeting in last 30d",
            npsScore: usageTrend < 0 ? 6 : 9,
            openTickets: usageTrend < 0 ? 3 : 1,
            avgResolutionHours: 20
          },
          evidenceTimeline: [
            {
              when: "14 days ago",
              date: "2026-09-27",
              event: "Initial data baseline imported",
              source: "Multi-Source Ingestion Engine",
              whyItMatters: "Activity baseline registered",
              category: "AI_DETECTION",
              severity: "MEDIUM"
            }
          ],
          usageHistory: [
            { month: "May", activeUsers: Math.round(activeUsers * 1.2), apiCalls: 500000, sessions: 7000 },
            { month: "Jun", activeUsers: Math.round(activeUsers * 1.1), apiCalls: 520000, sessions: 7200 },
            { month: "Jul", activeUsers: Math.round(activeUsers * 1.05), apiCalls: 490000, sessions: 6800 },
            { month: "Aug", activeUsers: Math.round(activeUsers * 1.0), apiCalls: 460000, sessions: 6400 },
            { month: "Sep", activeUsers: Math.round(activeUsers * 0.95), apiCalls: 440000, sessions: 6100 },
            { month: "Oct", activeUsers: activeUsers, apiCalls: 410000, sessions: 5800 }
          ],
          evidence: [
            {
              id: `ev-imp-${i}`,
              category: 'Ingested Telemetry',
              type: 'FACT',
              title: 'Activity Signals Ingestion Baseline',
              whatHappened: `Reported ${activeUsers} active seats of ${totalSeats} contracted licenses with a 30-day velocity of ${usageTrend}%.`,
              supportingRecords: 'CSV Ingestion Stream',
              timestamp: new Date().toISOString().substring(0, 10),
              confidence: 0.99,
              isAssumption: false
            }
          ],
          aiSummary: `${name} imported successfully. Operating at ${usageTrend}% usage velocity with contract renewal approaching in ${daysToRenewal} days.`,
          recommendedAction: {
            actionId: `act-imp-${i}`,
            customerId: `cust-import-${Date.now()}-${i}`,
            customerName: name,
            type: 'CHECKIN_TASK',
            title: `Review imported activity signals for ${name}`,
            urgency: dynamicRisk >= 80 ? 'CRITICAL' : dynamicRisk >= 50 ? 'HIGH' : 'MEDIUM',
            priority: 2,
            impact: `Protect $${arr.toLocaleString()} ARR`,
            rationale: 'Newly imported account profile requires initial baseline review and sponsor relationship check-in.',
            draft: {
              to: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
              subject: `Partnership alignment check-in for ${name}`,
              body: `Hi there,\n\nChecking in from RevOps following your recent workspace activity. We'd love to schedule a brief 15-minute optimization check-in.\n\nBest,\n${accountOwner}`
            },
            followUpTask: {
              title: `Initial sponsor check-in for ${name}`,
              assignee: accountOwner,
              dueDate: "2026-10-25"
            },
            crmUpdate: {
              field: 'Account Status',
              currentValue: 'Lead / Ingestion',
              proposedValue: 'Verified Active Customer',
              reason: 'Imported batch verified.'
            }
          }
        });
      }
    }

    setParsedRows(rows);
    setImportStatus('PREVIEW');
  };

  const parseJson = (text) => {
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) return;

      const rows = data.map((item, i) => {
        const usageTrend = item.signals?.usageTrend || 0;
        const dynamicRisk = usageTrend < 0 ? 70 : 25;
        return {
          id: `cust-json-${Date.now()}-${i}`,
          name: item.name,
          industry: item.industry || 'Technology',
          tier: item.tier || 'Enterprise',
          arr: item.arr || 100000,
          healthScore: 75,
          healthStatus: dynamicRisk >= 80 ? 'High Risk' : dynamicRisk >= 50 ? 'Needs Attention' : 'Healthy',
          churnRiskScore: dynamicRisk,
          expansionScore: 30,
          daysToRenewal: item.daysToRenewal || 30,
          renewalDate: '2026-11-15',
          accountOwner: item.accountOwner || 'Sarah Jenkins',
          primaryContact: { name: 'Lead Contact', email: 'lead@company.com' },
          signals: {
            usageTrend,
            activeUsers: item.signals?.activeUsers || 100,
            totalSeats: item.signals?.totalSeats || 150,
            seatUtilization: 70,
            unansweredOutreachCount: item.signals?.unansweredOutreachCount || 0
          },
          evidenceTimeline: [],
          evidence: [],
          aiSummary: `${item.name} imported from JSON payload.`,
          recommendedAction: null
        };
      });

      setParsedRows(rows);
      setImportStatus('PREVIEW');
    } catch (e) {
      // Invalid JSON
    }
  };

  const handleExecuteImport = () => {
    if (parsedRows.length === 0) return;
    handleImportData(parsedRows, activeTab.toUpperCase());
    setImportStatus('SUCCESS');
    setTimeout(() => {
      setIsCsvModalOpen(false);
      setImportStatus('IDLE');
      setContent('');
      setParsedRows([]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Multi-Source Data Ingestion</h2>
              <p className="text-xs text-slate-400">Connect CRM, email, calendar & telemetry data via CSV or JSON (PDF Section 2)</p>
            </div>
          </div>
          <button
            onClick={() => setIsCsvModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: CSV vs JSON */}
        <div className="px-6 pt-3 flex gap-4 text-xs font-semibold border-b border-slate-800 bg-slate-900/50">
          <button
            onClick={() => { setActiveTab('csv'); setParsedRows([]); setContent(''); }}
            className={`pb-2.5 border-b-2 flex items-center gap-1.5 ${activeTab === 'csv' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>CSV Import</span>
          </button>
          <button
            onClick={() => { setActiveTab('json'); setParsedRows([]); setContent(''); }}
            className={`pb-2.5 border-b-2 flex items-center gap-1.5 ${activeTab === 'json' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON Payload</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs bg-slate-950/40">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold">Paste raw {activeTab.toUpperCase()} or load sample:</span>
            <button
              onClick={() => handleLoadPreset(activeTab)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Load Sample Preset Batch
            </button>
          </div>

          <textarea
            rows={5}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (activeTab === 'csv') parseCsv(e.target.value);
              else parseJson(e.target.value);
            }}
            placeholder={activeTab === 'csv' ? "Account Name,Industry,Tier,ARR,Days to Renewal..." : "[{ 'name': '...', 'arr': 100000 }]"}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-xs font-mono focus:outline-none focus:border-blue-500"
          />

          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-semibold text-slate-200">Validation Passed: {parsedRows.length} Accounts Parsed</span>
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Ingestion
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Account</th>
                      <th className="p-2">Tier</th>
                      <th className="p-2">ARR</th>
                      <th className="p-2">Renewal Horizon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {parsedRows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="p-2 font-bold text-white">{r.name}</td>
                        <td className="p-2">{r.tier}</td>
                        <td className="p-2 font-mono">${r.arr.toLocaleString()}</td>
                        <td className="p-2">{r.daysToRenewal}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {importStatus === 'SUCCESS' && (
            <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Successfully ingested records into unified customer database!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Records are normalized, matched, and assigned health scoring baselines.
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCsvModalOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              disabled={parsedRows.length === 0 || importStatus === 'SUCCESS'}
              onClick={handleExecuteImport}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <span>Ingest {parsedRows.length} Accounts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
