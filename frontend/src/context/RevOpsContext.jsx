import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialCustomers, initialActions, initialIntegrations, initialAuditLogs } from '../data/mockData';

const RevOpsContext = createContext(null);

export function RevOpsProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [actions, setActions] = useState(initialActions);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  
  // Navigation tabs matching Section 3: Recommended Dashboard Structure
  // 'overview' | 'intelligence' | 'risks' | 'actions' | 'copilot' | 'integrations'
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive 6-step End-to-End Demo Flow (Section 7 of PDF)
  const [demoStep, setDemoStep] = useState(null); // null or 1..6

  // Configurable Risk Rules Engine
  const [riskRules, setRiskRules] = useState({
    usageDropWeight: 35,
    unansweredOutreachPenalty: 20,
    renewalDaysThreshold: 60,
    minSeatUtilization: 60,
  });

  // Calculate live dynamic health & risk metrics according to PDF:
  // "Assign a 0–100 score using product usage, meeting frequency, customer responses, support activity, and renewal status."
  // States: "Healthy, Needs Attention, and High Risk"
  const calculatedCustomers = useMemo(() => {
    return customers.map(c => {
      let calculatedRisk = 0;
      
      // 1. Product Usage
      if (c.signals.usageTrend < 0) {
        calculatedRisk += Math.min(45, Math.abs(c.signals.usageTrend) * (riskRules.usageDropWeight / 30));
      }
      // 2. Customer Responses (Unanswered outreach)
      if (c.signals.unansweredOutreachCount > 0) {
        calculatedRisk += c.signals.unansweredOutreachCount * (riskRules.unansweredOutreachPenalty / 2);
      }
      // 3. Renewal Status
      if (c.daysToRenewal <= riskRules.renewalDaysThreshold) {
        const urgencyBoost = ((riskRules.renewalDaysThreshold - c.daysToRenewal) / riskRules.renewalDaysThreshold) * 30;
        calculatedRisk += urgencyBoost;
      }
      // 4. Seat Utilization
      if (c.signals.seatUtilization < riskRules.minSeatUtilization) {
        calculatedRisk += 15;
      }
      // 5. Support Activity (ticket SLA & low NPS)
      if (c.signals.npsScore && c.signals.npsScore <= 6) {
        calculatedRisk += 10;
      }

      const dynamicRisk = Math.min(99, Math.max(5, Math.round(calculatedRisk)));
      
      // Strict PDF Health States: "Healthy", "Needs Attention", "High Risk"
      let healthStatus = 'Healthy';
      if (dynamicRisk >= 80) healthStatus = 'High Risk';
      else if (dynamicRisk >= 50) healthStatus = 'Needs Attention';
      else healthStatus = 'Healthy';

      return {
        ...c,
        dynamicRiskScore: dynamicRisk,
        dynamicHealthStatus: healthStatus
      };
    });
  }, [customers, riskRules]);

  // Selected customer object (Customer 360 view)
  const selectedCustomer = useMemo(() => {
    if (!selectedCustomerId) return null;
    return calculatedCustomers.find(c => c.id === selectedCustomerId) || null;
  }, [calculatedCustomers, selectedCustomerId]);

  // Selected action object for approval modal
  const selectedAction = useMemo(() => {
    if (!selectedActionId) return null;
    return actions.find(a => a.id === selectedActionId) || null;
  }, [actions, selectedActionId]);

  // Renewal & Revenue Forecasting (Section 2 & 3 of PDF)
  // "Show renewals due in 7, 30, and 90 days, estimated recurring revenue, revenue at risk, and potential expansion. Label estimates clearly."
  const forecasting = useMemo(() => {
    const totalArr = calculatedCustomers.reduce((acc, c) => acc + c.arr, 0);

    // Renewals due in 7 days
    const dueIn7 = calculatedCustomers.filter(c => c.daysToRenewal <= 7);
    const arrDueIn7 = dueIn7.reduce((acc, c) => acc + c.arr, 0);

    // Renewals due in 30 days
    const dueIn30 = calculatedCustomers.filter(c => c.daysToRenewal <= 30);
    const arrDueIn30 = dueIn30.reduce((acc, c) => acc + c.arr, 0);

    // Renewals due in 90 days
    const dueIn90 = calculatedCustomers.filter(c => c.daysToRenewal <= 90);
    const arrDueIn90 = dueIn90.reduce((acc, c) => acc + c.arr, 0);

    // Revenue at Risk (accounts with Needs Attention or High Risk)
    const atRiskAccounts = calculatedCustomers.filter(c => c.dynamicRiskScore >= 50);
    const revenueAtRisk = atRiskAccounts.reduce((acc, c) => acc + c.arr, 0);

    // Potential Expansion
    const expansionAccounts = calculatedCustomers.filter(c => c.expansionScore >= 65);
    const potentialExpansionRevenue = expansionAccounts.reduce((acc, c) => {
      // Estimate 30% add-on on expansion candidates
      return acc + Math.round(c.arr * 0.35);
    }, 0);

    return {
      totalArr,
      dueIn7Count: dueIn7.length,
      arrDueIn7,
      dueIn30Count: dueIn30.length,
      arrDueIn30,
      dueIn90Count: dueIn90.length,
      arrDueIn90,
      revenueAtRisk,
      potentialExpansionRevenue,
      atRiskCount: atRiskAccounts.length,
      expansionCount: expansionAccounts.length
    };
  }, [calculatedCustomers]);

  // Executive overview summary statistics
  const metrics = useMemo(() => {
    const totalCustomers = calculatedCustomers.length;
    const pendingActionsCount = actions.filter(a => a.status === 'PENDING').length;

    return {
      totalCustomers,
      totalArr: forecasting.totalArr,
      atRiskCount: forecasting.atRiskCount,
      arrAtRisk: forecasting.revenueAtRisk,
      upcomingRenewalsCount: forecasting.dueIn30Count,
      expansionOpportunitiesCount: forecasting.expansionCount,
      pendingActionsCount,
      avgHealthScore: Math.round(calculatedCustomers.reduce((acc, c) => acc + c.healthScore, 0) / (totalCustomers || 1))
    };
  }, [calculatedCustomers, actions, forecasting]);

  // Approve action handler with complete audit log entry (PDF: record decision, actor, timestamp, action, and reason)
  const handleApproveAction = (actionId, approvalNotes = '') => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setActions(prev => prev.map(a => {
      if (a.id === actionId) {
        return {
          ...a,
          status: 'APPROVED',
          decidedAt: now,
          decidedBy: 'Sarah Jenkins (Account Owner)',
          decisionReason: approvalNotes || 'Authorized executive outreach and CRM update.',
          executionResult: 'Dispatched via Google Workspace API. Follow-up task logged. CRM deal stage updated in Salesforce.'
        };
      }
      return a;
    }));

    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      timestamp: now,
      actor: 'Sarah Jenkins (Account Owner)',
      eventType: 'HUMAN_APPROVAL',
      target: `${action.customerName} (${action.customerId})`,
      action: action.title,
      reason: approvalNotes || 'Authorized executive outreach and CRM update.',
      details: `Approved proposed action "${action.title}". Task scheduled for ${action.followUpTask?.assignee || 'AE'}. Dispatching outreach to ${action.draft?.to || 'champion'}.`,
      status: 'APPROVED'
    }, ...prev]);

    setSelectedActionId(null);
  };

  // Reject action handler with recorded reason
  const handleRejectAction = (actionId, rejectionReason = '') => {
    const action = actions.find(a => a.id === actionId);
    if (!action) return;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setActions(prev => prev.map(a => {
      if (a.id === actionId) {
        return {
          ...a,
          status: 'REJECTED',
          decidedAt: now,
          decidedBy: 'Sarah Jenkins (Account Owner)',
          decisionReason: rejectionReason || 'Dismissed by account lead',
          executionResult: `Action rejected: ${rejectionReason || 'No external action dispatched.'}`
        };
      }
      return a;
    }));

    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      timestamp: now,
      actor: 'Sarah Jenkins (Account Owner)',
      eventType: 'HUMAN_REJECTION',
      target: `${action.customerName} (${action.customerId})`,
      action: action.title,
      reason: rejectionReason || 'Dismissed by account lead',
      details: `Rejected proposed action "${action.title}". Reason: ${rejectionReason || 'No reason provided'}`,
      status: 'REJECTED'
    }, ...prev]);

    setSelectedActionId(null);
  };

  const handleUpdateActionDraft = (actionId, updatedDraft, updatedCrm, updatedTask, updatedMeeting) => {
    setActions(prev => prev.map(a => {
      if (a.id === actionId) {
        return {
          ...a,
          draft: { ...a.draft, ...updatedDraft },
          crmUpdate: updatedCrm ? { ...a.crmUpdate, ...updatedCrm } : a.crmUpdate,
          followUpTask: updatedTask ? { ...a.followUpTask, ...updatedTask } : a.followUpTask,
          meetingSuggestion: updatedMeeting ? { ...a.meetingSuggestion, ...updatedMeeting } : a.meetingSuggestion
        };
      }
      return a;
    }));
  };

  const handleSyncIntegration = (integrationId) => {
    setIntegrations(prev => prev.map(i => i.id === integrationId ? { ...i, status: 'SYNCING' } : i));

    setTimeout(() => {
      setIntegrations(prev => prev.map(i => i.id === integrationId ? { ...i, status: 'CONNECTED', lastSync: 'Just now', syncErrors: 0 } : i));
      setAuditLogs(prev => [{
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        actor: 'Multi-Source Integration Ingestion',
        eventType: 'DATA_SYNC',
        target: integrationId,
        action: 'Ingest and Normalize Signals',
        reason: 'Scheduled / Manual Data Synchronization',
        details: 'Normalized records, event identity resolution confirmed with zero schema conflicts.',
        status: 'SUCCESS'
      }, ...prev]);
    }, 1200);
  };

  // Import customer records (CSV or JSON format per Section 2 of PDF)
  const handleImportData = (newCustomersList, format = 'CSV') => {
    setCustomers(prev => [...newCustomersList, ...prev]);
    setAuditLogs(prev => [{
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: `RevOps User (${format} Import)`,
      eventType: 'DATA_IMPORT',
      target: `Batch Ingestion (${newCustomersList.length} accounts)`,
      action: 'Import Customer Records and Activity Signals',
      reason: 'Demo Data Ingestion',
      details: `Successfully normalized and ingested ${newCustomersList.length} customer records into unified store.`,
      status: 'SUCCESS'
    }, ...prev]);
  };

  return (
    <RevOpsContext.Provider
      value={{
        customers: calculatedCustomers,
        actions,
        integrations,
        auditLogs,
        metrics,
        forecasting,
        activeTab,
        setActiveTab,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedCustomer,
        selectedActionId,
        setSelectedActionId,
        selectedAction,
        isCopilotOpen,
        setIsCopilotOpen,
        isCsvModalOpen,
        setIsCsvModalOpen,
        searchQuery,
        setSearchQuery,
        riskRules,
        setRiskRules,
        demoStep,
        setDemoStep,
        handleApproveAction,
        handleRejectAction,
        handleUpdateActionDraft,
        handleSyncIntegration,
        handleImportData
      }}
    >
      {children}
    </RevOpsContext.Provider>
  );
}

export function useRevOps() {
  const context = useContext(RevOpsContext);
  if (!context) throw new Error('useRevOps must be used within a RevOpsProvider');
  return context;
}
