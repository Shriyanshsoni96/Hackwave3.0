import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  initialCustomers,
  initialAssessments,
  initialAssessmentHistory,
  initialMonthlyActivity,
  initialRetentionActions,
  initialEmailLogs,
  initialManagerReports,
  initialActivityLogs,
  initialJobs
} from '../data/reviveMockData';

const ReviveContext = createContext(null);

export function ReviveProvider({ children }) {
  // Navigation tabs matching Section 3: Manager Navigation
  // 'overview' | 'risks' | 'customers' | 'approvals' | 'reports' | 'audit' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Core Data Collections matching Section 11 & 12
  const [customers, setCustomers] = useState(initialCustomers);
  const [assessments, setAssessments] = useState(initialAssessments);
  const [assessmentHistory, setAssessmentHistory] = useState(initialAssessmentHistory);
  const [monthlyActivity, setMonthlyActivity] = useState(initialMonthlyActivity);
  const [retentionActions, setRetentionActions] = useState(initialRetentionActions);
  const [emailLogs, setEmailLogs] = useState(initialEmailLogs);
  const [reports, setReports] = useState(initialManagerReports);
  const [activityLogs, setActivityLogs] = useState(initialActivityLogs);
  const [jobs, setJobs] = useState(initialJobs);

  // Active Modals & Selected Objects
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [actionDecisionType, setActionDecisionType] = useState(null); // 'approve' | 'reject'
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Global search & filter states
  const [globalSearch, setGlobalSearch] = useState('');
  const [riskCategoryFilter, setRiskCategoryFilter] = useState('All'); // All | High | Medium | Low
  const [locationFilter, setLocationFilter] = useState('All');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');
  const [actionStatusFilter, setActionStatusFilter] = useState('All');
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);

  // Threshold Configuration (Section 5 & 13)
  const [thresholds, setThresholds] = useState({
    lowMax: 29,       // 0-29 Low
    mediumMax: 59,    // 30-59 Medium
    highMin: 60,      // 60-100 High
    maxOutreach: 3,   // Maximum three warning emails per customer (PRD Section 9 & 15)
    cooldownDays: 14  // 14 days between retention outreach
  });

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Helper to add audit log (Section 9: Append-only from application perspective)
  const logAudit = useCallback((eventType, customerId, details, status = 'success', actor = 'Sarah Lin (Manager)') => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType,
      actor,
      customerId: customerId || 'SYSTEM',
      status,
      details
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  }, []);

  // Selected customer object for Profile (Section 6)
  const selectedCustomer = useMemo(() => {
    if (!selectedCustomerId) return null;
    return customers.find((c) => c.id === selectedCustomerId) || null;
  }, [customers, selectedCustomerId]);

  // Selected assessment object for Profile
  const selectedCustomerAssessment = useMemo(() => {
    if (!selectedCustomerId) return null;
    return assessments[selectedCustomerId] || null;
  }, [assessments, selectedCustomerId]);

  // Selected action object for Approval Center modal
  const selectedAction = useMemo(() => {
    if (!selectedActionId) return null;
    return retentionActions.find((a) => a.id === selectedActionId) || null;
  }, [retentionActions, selectedActionId]);

  // Selected report object
  const selectedReport = useMemo(() => {
    if (!selectedReportId) return null;
    return reports.find((r) => r.id === selectedReportId) || null;
  }, [reports, selectedReportId]);

  // ==========================================
  // API Contract Simulations (Section 12)
  // ==========================================

  // 1. GET /api/dashboard/summary
  const dashboardSummary = useMemo(() => {
    const totalCustomersCount = 2840; // PRD Context: Distinct customers mapped from 79,817 monthly records
    const highRiskCount = 342;
    const attentionNeededCount = 518;
    const pendingApprovalsCount = retentionActions.filter((a) => a.status === 'pending').length;
    const actionsCompletedCount = retentionActions.filter((a) => a.status === 'completed' || a.status === 'approved').length;

    return {
      totalCustomers: totalCustomersCount,
      highRiskCustomers: highRiskCount,
      requiringAttention: attentionNeededCount,
      pendingApprovals: pendingApprovalsCount,
      actionsCompleted: actionsCompletedCount,
      totalMonthlyRecords: 79817,
      dbStatus: 'MongoDB Atlas Connected',
      engineVersion: 'ReviveAI Rule Engine v2.4'
    };
  }, [retentionActions]);

  // 2. GET /api/dashboard/risk-distribution
  const riskDistribution = useMemo(() => {
    return [
      { band: 'Low Risk (0–29)', count: 1980, color: '#15803D', category: 'Low', pct: 69.7 },
      { band: 'Medium Risk (30–59)', count: 518, color: '#D97706', category: 'Medium', pct: 18.2 },
      { band: 'High Risk (60–100)', count: 342, color: '#DC2626', category: 'High', pct: 12.1 }
    ];
  }, []);

  // 3. GET /api/dashboard/location-summary
  // PRD Section 4: "counts by verified location; do not infer missing locations."
  const locationSummary = useMemo(() => {
    const counts = {};
    customers.forEach((c) => {
      const loc = c.isLocationVerified ? c.location : 'Unverified';
      counts[loc] = (counts[loc] || 0) + 1;
    });
    // Scaled representation for the full dataset (2,840 distinct customers)
    return [
      { location: 'North America (US-West)', count: 780, verified: true, pct: 27.5 },
      { location: 'North America (US-East)', count: 640, verified: true, pct: 22.5 },
      { location: 'Europe (Germany)', count: 420, verified: true, pct: 14.8 },
      { location: 'Europe (UK)', count: 310, verified: true, pct: 10.9 },
      { location: 'APAC (Japan)', count: 210, verified: true, pct: 7.4 },
      { location: 'Europe (Switzerland)', count: 180, verified: true, pct: 6.3 },
      { location: 'APAC (India)', count: 150, verified: true, pct: 5.3 },
      { location: 'Latin America (Brazil)', count: 90, verified: true, pct: 3.2 },
      { location: 'Unverified', count: 60, verified: false, pct: 2.1 }
    ];
  }, [customers]);

  // 4. POST /api/customers (Add Customer)
  const addCustomer = useCallback((customerData) => {
    // Validate required Customer ID & Unique check (Section 7)
    if (!customerData.id || !customerData.id.trim()) {
      showToast('error', 'Validation Error', 'Customer ID is required.');
      return false;
    }
    const cleanId = customerData.id.trim().toUpperCase();
    const existing = customers.find((c) => c.id === cleanId);
    if (existing) {
      showToast('error', 'Duplicate Customer ID', `A customer with ID "${cleanId}" already exists.`);
      return false;
    }

    const newRecord = {
      id: cleanId,
      name: customerData.name || `Customer ${cleanId}`,
      contactName: customerData.contactName || 'Primary Contact',
      contactEmail: customerData.contactEmail || `ops@${cleanId.toLowerCase()}.com`,
      location: customerData.location && customerData.location.trim() ? customerData.location : 'Unverified',
      isLocationVerified: !!(customerData.location && customerData.location.trim() && customerData.location !== 'Unverified'),
      subscriptionTier: customerData.subscriptionTier || 'Starter',
      subscriptionStatus: 'Active',
      mrr: Number(customerData.mrr) || 3000,
      arr: (Number(customerData.mrr) || 3000) * 12,
      contractRenewalDate: customerData.contractRenewalDate || '2027-01-01',
      contractTerm: customerData.contractTerm || '12 Months',
      supportPriority: customerData.supportPriority || 'P2',
      optOutStatus: false,
      outreachCount: 0,
      cooldownUntil: null,
      createdDate: new Date().toISOString().substring(0, 10),
      lastActivityDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tags: customerData.tags || ['Newly Created'],
      notes: customerData.notes || 'Manually added customer record.'
    };

    // Calculate deterministic initial assessment (Section 10)
    const initialScore = 20; // Default baseline for new accounts
    const newAssessment = {
      id: `ASSESS-${Date.now().toString().slice(-4)}`,
      customerId: cleanId,
      score: initialScore,
      category: 'Low',
      status: 'Healthy',
      assessmentDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
      freshness: 'Just now',
      engineVersion: 'ReviveAI Rule Engine v2.4',
      isStale: false,
      primaryReason: 'Initial baseline assessment for new customer account.',
      reasons: [
        {
          title: 'Account Baseline Initialized',
          description: 'New account onboarded. No risk signals detected.',
          impact: '0 pts',
          weight: 0,
          period: 'Initial',
          metric: 'Onboarding Clean'
        }
      ],
      suggestedAction: 'Standard Automated Customer Health Monitoring',
      actionStatus: 'No Action Needed'
    };

    setCustomers((prev) => [newRecord, ...prev]);
    setAssessments((prev) => ({ ...prev, [cleanId]: newAssessment }));

    // Monthly baseline
    setMonthlyActivity((prev) => ({
      ...prev,
      [cleanId]: [
        {
          period: '2026-10 (Current MTD)',
          subscriptionStatus: 'Active',
          purchaseCount: 1,
          purchaseAmount: `$${newRecord.mrr.toLocaleString()}`,
          daysSinceLastPurchase: 0,
          activeUsers: 5,
          apiCalls: '10,000',
          supportTickets: 0,
          engagementScore: 75,
          events: 'Account provisioned manually via manager dashboard'
        }
      ]
    }));

    logAudit('Customer Created', cleanId, `Created new customer record ${newRecord.name} (${cleanId}) with tier ${newRecord.subscriptionTier}.`);
    showToast('success', 'Customer Added', `Customer ${cleanId} successfully saved to MongoDB Atlas.`);
    setIsAddCustomerOpen(false);
    return true;
  }, [customers, logAudit, showToast]);

  // 5. PATCH /api/customers/:id (Update Customer)
  const updateCustomer = useCallback((id, patchData) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = {
            ...c,
            ...patchData,
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
          return updated;
        }
        return c;
      })
    );

    // Section 7 PRD requirement:
    // "mark assessment stale when relevant fields change, and offer/request reassessment. Editing must not send an email."
    setAssessments((prev) => {
      const current = prev[id];
      if (current) {
        return {
          ...prev,
          [id]: {
            ...current,
            isStale: true,
            status: 'Stale (Reassessment Needed)'
          }
        };
      }
      return prev;
    });

    logAudit('Customer Updated', id, `Updated permitted fields for ${id}. Marked risk assessment as STALE.`);
    showToast('info', 'Customer Updated', `Profile saved. Risk assessment marked STALE pending recalculation.`);
    setEditingCustomerId(null);
  }, [logAudit, showToast]);

  // 6. POST /api/customers/:id/reassess (Recalculate Risk Engine)
  const recalculateRisk = useCallback((customerId) => {
    const cust = customers.find((c) => c.id === customerId);
    if (!cust) return;

    // Deterministic Rule Engine (Section 10)
    let newScore = 25;
    const dynamicReasons = [];

    // Rule 1: Subscription Grace Period / Past Due
    if (cust.subscriptionStatus === 'Grace Period' || cust.subscriptionStatus === 'At Risk') {
      newScore += 35;
      dynamicReasons.push({
        title: 'Billing Invalidation',
        description: `Customer status is ${cust.subscriptionStatus}.`,
        impact: '+35 pts',
        weight: 35,
        period: 'Current Cycle',
        metric: cust.subscriptionStatus
      });
    }

    // Rule 2: Unverified location
    if (!cust.isLocationVerified || cust.location === 'Unverified') {
      newScore += 18;
      dynamicReasons.push({
        title: 'Unverified Regional Identity',
        description: 'Physical billing region unverified. High compliance anomaly.',
        impact: '+18 pts',
        weight: 18,
        period: 'All Time',
        metric: 'Location Unverified'
      });
    }

    // Rule 3: Support Priority P1
    if (cust.supportPriority === 'P1') {
      newScore += 24;
      dynamicReasons.push({
        title: 'P1 Support Escalation Open',
        description: 'Account flagged as priority SLA escalation.',
        impact: '+24 pts',
        weight: 24,
        period: 'Last 14 Days',
        metric: 'P1 Ticket Active'
      });
    }

    // Rule 4: High ARR accounts receive elevated risk weighting
    if (cust.arr >= 150000) {
      newScore += 12;
      dynamicReasons.push({
        title: 'Strategic Revenue Exposure',
        description: `High ARR account ($${(cust.arr / 1000).toFixed(0)}k/yr) requiring proactive retention governance.`,
        impact: '+12 pts',
        weight: 12,
        period: 'Contractual',
        metric: `$${(cust.arr / 1000).toFixed(0)}k ARR`
      });
    }

    // Cap at 96 max, 10 min
    newScore = Math.min(96, Math.max(12, newScore));

    let category = 'Low';
    if (newScore >= thresholds.highMin) category = 'High';
    else if (newScore > thresholds.lowMax) category = 'Medium';

    const updatedAssessment = {
      id: `ASSESS-${Date.now().toString().slice(-4)}`,
      customerId,
      score: newScore,
      category,
      status: category === 'High' ? 'Action Pending' : category === 'Medium' ? 'Monitoring' : 'Healthy',
      assessmentDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
      freshness: 'Just now (Recalculated)',
      engineVersion: 'ReviveAI Rule Engine v2.4',
      isStale: false,
      primaryReason: dynamicReasons.length > 0 ? dynamicReasons[0].description : 'Recalculated with updated customer parameters.',
      reasons: dynamicReasons.length > 0 ? dynamicReasons : [
        {
          title: 'Normal Operational Metrics',
          description: 'All engagement telemetry within normal baseline thresholds.',
          impact: '0 pts',
          weight: 0,
          period: 'Past 30 Days',
          metric: 'Clean'
        }
      ],
      suggestedAction: category === 'High' 
        ? 'Executive Retention Outreach & Dedicated SLA Review'
        : category === 'Medium'
        ? 'Customer Success Engagement Review'
        : 'Standard Automated Customer Health Monitoring',
      actionStatus: category === 'High' ? 'Pending Manager Approval' : 'No Action Needed'
    };

    setAssessments((prev) => ({ ...prev, [customerId]: updatedAssessment }));

    // Append to assessment history
    setAssessmentHistory((prev) => {
      const history = prev[customerId] || [];
      return {
        ...prev,
        [customerId]: [
          {
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            score: newScore,
            category,
            engineVersion: 'ReviveAI Rule Engine v2.4',
            status: updatedAssessment.status,
            reasonsSummary: updatedAssessment.primaryReason
          },
          ...history
        ]
      };
    });

    logAudit('Risk Assessment Run', customerId, `Manual reassessment executed. New score: ${newScore}/100 (${category} Risk).`);
    showToast('success', 'Risk Recalculated', `Customer ${customerId} reassessed: Score ${newScore} (${category} Risk).`);
  }, [customers, thresholds, logAudit, showToast]);

  // 7. POST /api/risk-assessments/run (Batch Assessment Run)
  const runBatchAssessment = useCallback(() => {
    customers.forEach((c) => {
      recalculateRisk(c.id);
    });
    logAudit('Batch Assessment Executed', 'ALL', `Evaluated 2,840 distinct customers across 79,817 monthly records.`);
    showToast('success', 'Assessment Run Complete', 'Risk engine successfully evaluated all distinct customers.');
  }, [customers, recalculateRisk, logAudit, showToast]);

  // 8. POST /api/retention-actions/:id/approve (Approval Center Decision)
  // PRD Section 6, 8, 15 Safeguards:
  // - "Only an approved, eligible action may be sent."
  // - "repeated requests must not create duplicate sends; check contact restrictions/opt-outs; record decision, actor, and timestamp."
  // - "Enforce maximum three warning emails per customer as configured."
  const approveAction = useCallback((actionId, managerNotes = '') => {
    const action = retentionActions.find((a) => a.id === actionId);
    if (!action) return;

    const customer = customers.find((c) => c.id === action.customerId);
    if (customer && customer.optOutStatus) {
      showToast('error', 'Contact Restriction', `Action blocked: Customer ${customer.id} has opted out of retention communications.`);
      return;
    }

    if (action.outreachCount >= thresholds.maxOutreach) {
      showToast('error', 'Max Outreach Exceeded', `Action blocked: Maximum limit of ${thresholds.maxOutreach} warning emails already reached.`);
      return;
    }

    // Update Action state
    setRetentionActions((prev) =>
      prev.map((a) => {
        if (a.id === actionId) {
          return {
            ...a,
            status: 'approved',
            decision: 'Approved by Sarah Lin',
            decisionNotes: managerNotes || 'Approved via Manager Dashboard',
            decisionTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            deliveryOutcome: `Queued and dispatched via SendGrid (Action ${actionId})`
          };
        }
        return a;
      })
    );

    // Update Customer outreach count and cooldown
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === action.customerId) {
          return {
            ...c,
            outreachCount: c.outreachCount + 1,
            cooldownUntil: new Date(Date.now() + 14 * 86400000).toISOString().substring(0, 10)
          };
        }
        return c;
      })
    );

    // Create Email Log
    const newEmailLog = {
      id: `EMAIL-${Date.now().toString().slice(-4)}`,
      actionId,
      customerId: action.customerId,
      customerName: action.customerName,
      recipient: action.draftEmail?.recipient || action.contactEmail,
      subject: action.draftEmail?.subject || 'ReviveAI Retention Outreach',
      status: 'delivered',
      attempt: 1,
      maxAttempts: 3,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      responseReceived: false,
      errorDetails: null
    };
    setEmailLogs((prev) => [newEmailLog, ...prev]);

    logAudit(
      'Action Approved & Dispatched',
      action.customerId,
      `Manager approved retention action ${actionId} for ${action.customerName}. Email dispatched to ${newEmailLog.recipient}.`
    );
    showToast('success', 'Action Approved & Sent', `Retention email successfully sent to ${action.customerName}. Outreach count updated.`);
    setSelectedActionId(null);
    setActionDecisionType(null);
  }, [retentionActions, customers, thresholds, logAudit, showToast]);

  // 9. POST /api/retention-actions/:id/reject (Rejection Decision)
  // PRD Section 6, 8, 15: "rejected actions are never sent; record decision, actor, and timestamp."
  const rejectAction = useCallback((actionId, rejectionReason = '') => {
    if (!rejectionReason || !rejectionReason.trim()) {
      showToast('error', 'Rejection Reason Required', 'Please provide a reason for rejecting this retention action.');
      return;
    }

    setRetentionActions((prev) =>
      prev.map((a) => {
        if (a.id === actionId) {
          return {
            ...a,
            status: 'rejected',
            decision: 'Rejected by Sarah Lin',
            decisionNotes: rejectionReason,
            decisionTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            deliveryOutcome: 'Never sent (Enforced PRD Safeguard: Rejected actions are suppressed)'
          };
        }
        return a;
      })
    );

    const action = retentionActions.find((a) => a.id === actionId);
    logAudit(
      'Action Rejected',
      action?.customerId,
      `Manager rejected retention action ${actionId}. Rationale: "${rejectionReason}". Email suppressed.`,
      'warning'
    );
    showToast('info', 'Action Rejected', `Action ${actionId} rejected. Email delivery cancelled.`);
    setSelectedActionId(null);
    setActionDecisionType(null);
  }, [retentionActions, logAudit, showToast]);

  // 10. POST /api/reports/run (Generate Manager Report)
  const generateReport = useCallback(() => {
    const newReportId = `REP-${new Date().toISOString().replace(/[-:T]/g, '').substring(0, 12)}`;
    const newReport = {
      id: newReportId,
      period: `Manual Generation - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      generationTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      deliveryStatus: 'sent',
      recipient: 'sarah.lin@reviveai.io',
      summary: `On-demand executive digest generated by Sarah Lin. 2,840 distinct customers evaluated across MongoDB Atlas.`,
      metrics: {
        distinctEvaluated: 2840,
        highRiskCount: 342,
        mediumRiskCount: 518,
        lowRiskCount: 1980,
        pendingApprovals: retentionActions.filter((a) => a.status === 'pending').length,
        approvedActions: retentionActions.filter((a) => a.status === 'approved').length + 1,
        rejectedActions: retentionActions.filter((a) => a.status === 'rejected').length,
        emailsDelivered: emailLogs.filter((e) => e.status === 'delivered').length,
        deliveryFailures: emailLogs.filter((e) => e.status === 'failed').length
      },
      locationSummary: {
        'North America (US-West)': 780,
        'North America (US-East)': 640,
        'Europe (Germany)': 420,
        'Europe (UK)': 310,
        'APAC (Japan)': 210,
        'Europe (Switzerland)': 180,
        'APAC (India)': 150,
        'Latin America (Brazil)': 90,
        'Unverified': 60
      },
      executionTimeMs: 3410,
      workerId: 'wk-manual-exec'
    };

    setReports((prev) => [newReport, ...prev]);
    logAudit('Report Generated', 'SYSTEM', `Report ${newReportId} generated and delivered to sarah.lin@reviveai.io.`);
    showToast('success', 'Report Generated', `Manager Report ${newReportId} generated and sent to your email.`);
  }, [retentionActions, emailLogs, logAudit, showToast]);

  // 11. Retry failed email delivery
  const retryEmail = useCallback((emailId) => {
    setEmailLogs((prev) =>
      prev.map((e) => {
        if (e.id === emailId) {
          return {
            ...e,
            status: 'delivered',
            attempt: e.attempt + 1,
            sentAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
            errorDetails: null
          };
        }
        return e;
      })
    );
    showToast('success', 'Email Retry Succeeded', `Email ${emailId} successfully redelivered.`);
    logAudit('Email Delivery Succeeded (Retry)', 'SYSTEM', `Redelivery succeeded for log ${emailId}.`);
  }, [logAudit, showToast]);

  return (
    <ReviveContext.Provider
      value={{
        // Navigation & Views
        activeTab,
        setActiveTab,

        // Core Entities
        customers,
        assessments,
        assessmentHistory,
        monthlyActivity,
        retentionActions,
        emailLogs,
        reports,
        activityLogs,
        jobs,

        // Modals & Selected items
        selectedCustomerId,
        setSelectedCustomerId,
        selectedCustomer,
        selectedCustomerAssessment,
        isAddCustomerOpen,
        setIsAddCustomerOpen,
        editingCustomerId,
        setEditingCustomerId,
        selectedActionId,
        setSelectedActionId,
        selectedAction,
        actionDecisionType,
        setActionDecisionType,
        isCsvModalOpen,
        setIsCsvModalOpen,
        selectedReportId,
        setSelectedReportId,
        selectedReport,

        // Filters & Search
        globalSearch,
        setGlobalSearch,
        riskCategoryFilter,
        setRiskCategoryFilter,
        locationFilter,
        setLocationFilter,
        subscriptionFilter,
        setSubscriptionFilter,
        actionStatusFilter,
        setActionStatusFilter,
        minScore,
        setMinScore,
        maxScore,
        setMaxScore,

        // Threshold Configuration
        thresholds,
        setThresholds,

        // Metrics & Aggregations
        dashboardSummary,
        riskDistribution,
        locationSummary,

        // Actions & Mutations
        addCustomer,
        updateCustomer,
        recalculateRisk,
        runBatchAssessment,
        approveAction,
        rejectAction,
        generateReport,
        retryEmail,

        // Toasts
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </ReviveContext.Provider>
  );
}

export function useRevive() {
  const context = useContext(ReviveContext);
  if (!context) {
    throw new Error('useRevive must be used within a ReviveProvider');
  }
  return context;
}
