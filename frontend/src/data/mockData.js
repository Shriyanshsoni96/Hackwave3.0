// Autonomous RevOps Agent — Mock Dataset
// Structured strictly according to the Feature Analysis & Hackathon Implementation Guide PDF

export const initialCustomers = [
  {
    id: "cust-001",
    name: "Acme Technologies",
    industry: "Enterprise SaaS",
    tier: "Enterprise",
    arr: 145000,
    healthScore: 42,
    healthStatus: "Needs Attention", // PDF States: "Healthy", "Needs Attention", "High Risk"
    churnRiskScore: 84, // 0 - 100
    expansionScore: 18,
    daysToRenewal: 43,
    renewalDate: "2026-11-23",
    accountOwner: "Sarah Jenkins",
    primaryContact: {
      name: "Mark Davis",
      role: "VP of Engineering (Champion)",
      email: "m.davis@acmetech.io",
      phone: "+1 (555) 349-8821"
    },
    signals: {
      usageTrend: -38, // % change in last 30d
      activeUsers: 142,
      totalSeats: 250,
      seatUtilization: 56.8,
      lastMeetingDaysAgo: 21,
      unansweredMessagesDaysAgo: 14,
      usageDeclinedDaysAgo: 7,
      unansweredOutreachCount: 3,
      meetingFrequency: "0 in last 21d (Down from bi-weekly)",
      customerResponses: "No reply to last 3 emails (14d)",
      supportActivity: "4 tickets, avg resolution 32h, NPS 6",
      npsScore: 6,
      openTickets: 4,
      avgResolutionHours: 32
    },
    // Signature Feature: Customer 360° Evidence Timeline (from Page 2 Section 4 of PDF)
    evidenceTimeline: [
      {
        when: "21 days ago",
        date: "2026-09-20",
        event: "Last meeting; no next step",
        source: "Google Calendar & Gong",
        whyItMatters: "Possible follow-up gap",
        category: "MEETING",
        severity: "MEDIUM"
      },
      {
        when: "14 days ago",
        date: "2026-09-27",
        event: "Customer champion did not reply",
        source: "Gmail / Outreach Cadence",
        whyItMatters: "Engagement may be weakening",
        category: "COMMUNICATION",
        severity: "HIGH"
      },
      {
        when: "7 days ago",
        date: "2026-10-04",
        event: "Product activity declined",
        source: "Mixpanel / Segment Telemetry",
        whyItMatters: "Potential adoption issue",
        category: "PRODUCT_USAGE",
        severity: "HIGH"
      },
      {
        when: "Today",
        date: "2026-10-11",
        event: "Agent combines signals",
        source: "Autonomous RevOps Orchestrator",
        whyItMatters: "Elevated renewal risk; investigate and contact customer",
        category: "AI_DETECTION",
        severity: "CRITICAL"
      }
    ],
    // 6-month product usage telemetry
    usageHistory: [
      { month: "May", activeUsers: 240, apiCalls: 850000, sessions: 14200 },
      { month: "Jun", activeUsers: 238, apiCalls: 862000, sessions: 13900 },
      { month: "Jul", activeUsers: 220, apiCalls: 780000, sessions: 12500 },
      { month: "Aug", activeUsers: 190, apiCalls: 620000, sessions: 10100 },
      { month: "Sep", activeUsers: 165, apiCalls: 510000, sessions: 8400 },
      { month: "Oct", activeUsers: 142, apiCalls: 430000, sessions: 6900 }
    ],
    // Explainable AI Agent records
    evidence: [
      {
        id: "ev-001",
        category: "Product Usage",
        type: "FACT",
        title: "Product Telemetry Sharp Decline (-38%)",
        whatHappened: "Weekly active users dropped by 38% across the last 30 days (142 of 250 seats active). API throughput decreased by 49% compared to Q2 average.",
        supportingRecords: "Mixpanel & Segment Telemetry: Event Stream #MP-4482",
        timestamp: "2026-10-04",
        confidence: 0.98,
        isAssumption: false,
        recommendedNextStep: "Offer Solutions Architecture audit to unblock API integration issues."
      },
      {
        id: "ev-002",
        category: "Engagement & Outreach",
        type: "FACT",
        title: "Unanswered Account Outreach (14 days)",
        whatHappened: "Account executive Sarah Jenkins sent 3 check-in emails (Sept 22, Oct 1, Oct 6) and scheduled a quarterly sync that was canceled with no reschedule.",
        supportingRecords: "Google Workspace & CRM Activities Log #GW-881",
        timestamp: "2026-09-27",
        confidence: 0.95,
        isAssumption: false,
        recommendedNextStep: "Initiate multi-channel outreach including executive sponsor re-engagement."
      },
      {
        id: "ev-003",
        category: "Contract & Timeline",
        type: "FACT",
        title: "Renewal Window Approaching (43 days)",
        whatHappened: "Annual enterprise contract expires in 43 days ($145,000 ARR). Contract auto-renewal clause requires 30-day opt-out notice.",
        supportingRecords: "Salesforce CRM Contract #SF-89211",
        timestamp: "2026-10-01",
        confidence: 1.0,
        isAssumption: false,
        recommendedNextStep: "Conduct renewal executive review before 30-day opt-out deadline."
      },
      {
        id: "ev-004",
        category: "Inferred Context",
        type: "ASSUMPTION",
        title: "Possible Executive Sponsor Turnover",
        whatHappened: "LinkedIn change detected for former champion VP David Reynolds; Mark Davis assumed role with no recorded onboarding or relationship mapping.",
        supportingRecords: "AI Relationship Extractor v2",
        timestamp: "2026-10-02",
        confidence: 0.72,
        isAssumption: true,
        caveat: "Unverified via direct customer confirmation. Requires AE validation.",
        recommendedNextStep: "Verify organizational chart and confirm new executive budget authority."
      }
    ],
    aiSummary: "Acme Technologies is flagged for elevated churn risk (Score: 84/100). Renewal is in 43 days; the last meeting was 21 days ago with no next step recorded; the customer champion has not replied in 14 days; and product activity declined 38%. Combined signals indicate immediate risk of non-renewal.",
    // Autonomous Follow-up Workflow: Task + Draft Email + Meeting Suggestion + Proposed CRM Update
    recommendedAction: {
      actionId: "act-acme-01",
      customerId: "cust-001",
      customerName: "Acme Technologies",
      type: "EXECUTIVE_REENGAGEMENT",
      title: "Schedule Renewal Review & Value Recap Meeting",
      urgency: "HIGH",
      priority: 1,
      impact: "Preserve $145,000 ARR",
      rationale: "Contact the customer champion, investigate the usage decline, and schedule a renewal review. Draft the email and task first; require approval before sending or changing CRM data.",
      followUpTask: {
        title: "Account Owner Follow-up: Re-engage Mark Davis before Oct 15",
        assignee: "Sarah Jenkins",
        dueDate: "2026-10-15",
        priority: "High",
        type: "Customer Check-in"
      },
      meetingSuggestion: {
        title: "Executive Renewal Review & Infrastructure ROI Briefing",
        duration: "25 minutes",
        proposedTimes: ["Thursday, Oct 15 at 2:00 PM EST", "Friday, Oct 16 at 11:00 AM EST"],
        attendees: ["Mark Davis (VP Eng)", "Sarah Jenkins (AE)", "Devon Cole (Head of CS)"],
        agenda: "1. Review $1.2M annual savings recap\n2. Diagnose API throughput decline\n3. Renewal schedule alignment"
      },
      draft: {
        to: "m.davis@acmetech.io",
        cc: "s.jenkins@revops.ai",
        subject: "Acme Technologies & CloudPlatform — Partnership check-in & upcoming renewal",
        body: "Hi Mark,\n\nI hope you're having a productive week.\n\nI noticed your team's recent shifts in workflow over the past few weeks. With your renewal coming up in 43 days (Nov 23), our principal solutions architect and I would love to hop on a 20-minute executive check-in.\n\nWe've prepared an updated ROI summary of Acme's $1.2M infra savings this year and want to ensure your new team leads have full onboarding support.\n\nAre you open for a quick chat this Thursday at 2:00 PM or Friday at 11:00 AM?\n\nBest regards,\nSarah Jenkins\nStrategic Account Executive"
      },
      crmUpdate: {
        field: "Account Health & Risk Category",
        currentValue: "Healthy (Standard)",
        proposedValue: "Needs Attention — Renewal Risk (84%)",
        reason: "Telemetry decline (-38%) and 14d unanswered messages ahead of 43d renewal."
      }
    }
  },
  {
    id: "cust-002",
    name: "FinEdge Global",
    industry: "Fintech",
    tier: "Enterprise",
    arr: 210000,
    healthScore: 92,
    healthStatus: "Healthy",
    churnRiskScore: 12,
    expansionScore: 94,
    daysToRenewal: 185,
    renewalDate: "2027-04-14",
    accountOwner: "Marcus Vance",
    primaryContact: {
      name: "Elena Rostova",
      role: "Head of Infrastructure",
      email: "e.rostova@finedge.com",
      phone: "+1 (555) 782-9901"
    },
    signals: {
      usageTrend: 54, // % increase
      activeUsers: 480,
      totalSeats: 500,
      seatUtilization: 96.0,
      lastMeetingDaysAgo: 4,
      unansweredMessagesDaysAgo: 0,
      usageDeclinedDaysAgo: null,
      unansweredOutreachCount: 0,
      meetingFrequency: "Weekly active sync",
      customerResponses: "Fast (avg 1.2h response time)",
      supportActivity: "1 ticket, avg resolution 8h, NPS 10",
      npsScore: 10,
      openTickets: 1,
      avgResolutionHours: 8
    },
    evidenceTimeline: [
      {
        when: "30 days ago",
        date: "2026-09-11",
        event: "Exceeded 80% seat threshold",
        source: "Product Telemetry",
        whyItMatters: "Accelerated adoption velocity",
        category: "PRODUCT_USAGE",
        severity: "LOW"
      },
      {
        when: "10 days ago",
        date: "2026-10-01",
        event: "Customer expressed need for APAC expansion in Slack",
        source: "Slack Connect API",
        whyItMatters: "Direct customer expansion intent",
        category: "COMMUNICATION",
        severity: "EXPANSION"
      },
      {
        when: "Today",
        date: "2026-10-11",
        event: "License capacity reached 96%",
        source: "Product Telemetry",
        whyItMatters: "Customer approaching hard contract plan limits",
        category: "AI_DETECTION",
        severity: "EXPANSION"
      }
    ],
    usageHistory: [
      { month: "May", activeUsers: 280, apiCalls: 1200000, sessions: 22000 },
      { month: "Jun", activeUsers: 310, apiCalls: 1450000, sessions: 26500 },
      { month: "Jul", activeUsers: 360, apiCalls: 1780000, sessions: 31000 },
      { month: "Aug", activeUsers: 410, apiCalls: 2100000, sessions: 38000 },
      { month: "Sep", activeUsers: 450, apiCalls: 2450000, sessions: 44000 },
      { month: "Oct", activeUsers: 480, apiCalls: 2890000, sessions: 51000 }
    ],
    evidence: [
      {
        id: "ev-010",
        category: "Growth Signals",
        type: "FACT",
        title: "Approaching Plan Limits (96% Seat Utilization)",
        whatHappened: "480 of 500 contracted enterprise licenses are active. Weekly API calls surged past 2.8M, bumping against tier rate limits.",
        supportingRecords: "Product Telemetry Engine #TE-981",
        timestamp: "2026-10-09",
        confidence: 0.99,
        isAssumption: false,
        recommendedNextStep: "Offer 250-seat APAC growth add-on schedule."
      },
      {
        id: "ev-011",
        category: "Customer Feedback",
        type: "FACT",
        title: "Direct Expansion Inquiry in Slack",
        whatHappened: "Elena Rostova asked AE Marcus in shared Slack Connect: 'Can we add 250 more seats for our APAC expansion team next month?'",
        supportingRecords: "Slack Connect Channel #ext-finedge-revops",
        timestamp: "2026-10-07",
        confidence: 0.97,
        isAssumption: false,
        recommendedNextStep: "Send APAC order form with volume discount."
      }
    ],
    aiSummary: "FinEdge Global shows strong growth signals: rising usage (+54%), approaching plan limits (96% capacity), and explicit customer request for APAC expansion. Upsell opportunity estimated at +$85,000 ARR.",
    recommendedAction: {
      actionId: "act-finedge-01",
      customerId: "cust-002",
      customerName: "FinEdge Global",
      type: "EXPANSION_UPGRADE",
      title: "Draft APAC Enterprise Add-on Proposal (+$85k ARR)",
      urgency: "MEDIUM",
      priority: 2,
      impact: "+$85,000 ARR Expansion",
      rationale: "Customer is within 20 seats of plan ceiling and requested additional capacity for new regional team.",
      followUpTask: {
        title: "Prepare APAC expansion order form and schedule pricing review",
        assignee: "Marcus Vance",
        dueDate: "2026-10-14",
        priority: "Medium",
        type: "Expansion Proposal"
      },
      meetingSuggestion: {
        title: "FinEdge APAC Rollout & Capacity Review",
        duration: "20 minutes",
        proposedTimes: ["Tuesday, Oct 14 at 10:00 AM EST", "Wednesday, Oct 15 at 3:00 PM EST"],
        attendees: ["Elena Rostova (Head of Infra)", "Marcus Vance (AE)"],
        agenda: "1. Review APAC concurrency requirements\n2. Order form addendum walkthrough"
      },
      draft: {
        to: "e.rostova@finedge.com",
        cc: "m.vance@revops.ai",
        subject: "FinEdge APAC Capacity Expansion — Draft Order Form & Tier Upgrade",
        body: "Hi Elena,\n\nFollowing up on our conversation regarding your APAC team rollouts, I've prepared the add-on schedule for 250 Enterprise seats with consolidated volume pricing.\n\nThis will prevent your team from hitting API concurrency throttling and include dedicated 24/7 APAC support.\n\nLet me know if the attached proposal aligns with your procurement window!\n\nBest,\nMarcus Vance"
      },
      crmUpdate: {
        field: "Opportunity Pipeline Stage",
        currentValue: "Existing Customer - Closed Won",
        proposedValue: "Upsell / Expansion - Proposal Sent ($85k)",
        reason: "Customer verified expansion intent for 250 additional seats."
      }
    }
  },
  {
    id: "cust-003",
    name: "CloudScale Systems",
    industry: "DevOps & Cloud",
    tier: "Mid-Market",
    arr: 68000,
    healthScore: 28,
    healthStatus: "High Risk",
    churnRiskScore: 92,
    expansionScore: 8,
    daysToRenewal: 6, // RENEWALS IN 7 DAYS!
    renewalDate: "2026-10-17",
    accountOwner: "Sarah Jenkins",
    primaryContact: {
      name: "Tariq Mansour",
      role: "VP Operations",
      email: "tariq@cloudscalesys.com",
      phone: "+1 (555) 412-3320"
    },
    signals: {
      usageTrend: -52,
      activeUsers: 28,
      totalSeats: 120,
      seatUtilization: 23.3,
      lastMeetingDaysAgo: 35,
      unansweredMessagesDaysAgo: 21,
      usageDeclinedDaysAgo: 14,
      unansweredOutreachCount: 4,
      meetingFrequency: "None in 35 days",
      customerResponses: "Unresponsive to 4 outreach attempts",
      supportActivity: "7 open tickets, SLA breached by 26h, NPS 4",
      npsScore: 4,
      openTickets: 7,
      avgResolutionHours: 58
    },
    evidenceTimeline: [
      {
        when: "35 days ago",
        date: "2026-09-06",
        event: "Last recorded QBR meeting; unresolved latency complaints",
        source: "Gong & CRM",
        whyItMatters: "Technical blockers left unattended",
        category: "MEETING",
        severity: "HIGH"
      },
      {
        when: "21 days ago",
        date: "2026-09-20",
        event: "Customer ceased responses to AE check-ins",
        source: "Gmail Cadence",
        whyItMatters: "Complete breakdown of sponsor relationship",
        category: "COMMUNICATION",
        severity: "CRITICAL"
      },
      {
        when: "14 days ago",
        date: "2026-09-27",
        event: "Admin user logins dropped to zero",
        source: "Telemetry",
        whyItMatters: "Signals competitor POC evaluation",
        category: "PRODUCT_USAGE",
        severity: "CRITICAL"
      },
      {
        when: "Today",
        date: "2026-10-11",
        event: "Contract expiration in 6 days ($68,000 ARR)",
        source: "Salesforce CRM",
        whyItMatters: "Immediate churn imminent without executive intervention",
        category: "AI_DETECTION",
        severity: "CRITICAL"
      }
    ],
    usageHistory: [
      { month: "May", activeUsers: 110, apiCalls: 540000, sessions: 8900 },
      { month: "Jun", activeUsers: 95, apiCalls: 490000, sessions: 7600 },
      { month: "Jul", activeUsers: 80, apiCalls: 400000, sessions: 6100 },
      { month: "Aug", activeUsers: 55, apiCalls: 280000, sessions: 4200 },
      { month: "Sep", activeUsers: 38, apiCalls: 180000, sessions: 2800 },
      { month: "Oct", activeUsers: 28, apiCalls: 110000, sessions: 1600 }
    ],
    evidence: [
      {
        id: "ev-021",
        category: "Product Usage",
        type: "FACT",
        title: "Severe Usage Degradation (-52%)",
        whatHappened: "Platform logins dropped to 28 active users down from 110 in May. Zero logins from primary admin in 14 days.",
        supportingRecords: "Mixpanel User Session Telemetry",
        timestamp: "2026-10-09",
        confidence: 0.99,
        isAssumption: false,
        recommendedNextStep: "Deploy executive engineering contact immediately."
      },
      {
        id: "ev-022",
        category: "Support Health",
        type: "FACT",
        title: "Chronic SLA Failures (7 open tickets)",
        whatHappened: "7 open support tickets; resolution SLA missed by 26 hours. Customer registered NPS score of 4 citing latency issues.",
        supportingRecords: "Zendesk Incident Log #ZD-9921",
        timestamp: "2026-10-05",
        confidence: 0.97,
        isAssumption: false,
        recommendedNextStep: "Provide dedicated engineering hotfix and executive SLA credit."
      }
    ],
    aiSummary: "CRITICAL CHURN IMMINENT: CloudScale Systems renewal is in 6 days ($68,000 ARR at risk). Support ticket latency and 52% usage decay indicate active competitor evaluation. Immediate VP intervention required.",
    recommendedAction: {
      actionId: "act-cloudscale-01",
      customerId: "cust-003",
      customerName: "CloudScale Systems",
      type: "EXECUTIVE_ESCALATION",
      title: "VP-to-VP Emergency SLA Remediation Call",
      urgency: "CRITICAL",
      priority: 1,
      impact: "Mitigate imminent $68,000 churn (Renews in 6d)",
      rationale: "Contract renewal in 6 days with 7 unresolved support tickets. Executive intervention is the only viable path to retention.",
      followUpTask: {
        title: "Leadership Escalation: Devon Cole to call Tariq Mansour today",
        assignee: "Devon Cole (Head of CS)",
        dueDate: "2026-10-11",
        priority: "Urgent",
        type: "Executive Call"
      },
      meetingSuggestion: {
        title: "Urgent: Executive Support Remediation for CloudScale",
        duration: "15 minutes",
        proposedTimes: ["Today at 3:00 PM EST", "Tomorrow at 9:30 AM EST"],
        attendees: ["Tariq Mansour (VP Ops)", "Devon Cole (Head of CS)", "VP of Engineering"],
        agenda: "1. Dedicated latency hotfix briefing\n2. SLA remediation plan & renewal terms"
      },
      draft: {
        to: "tariq@cloudscalesys.com",
        cc: "leadership@revops.ai",
        subject: "Executive escalation & support remediation for CloudScale",
        body: "Hi Tariq,\n\nI am stepping in directly from executive leadership. I reviewed our recent support logs and am deeply dissatisfied with how our latency SLAs impacted your operations.\n\nOur VP of Engineering has pushed a direct hotfix this morning. I would appreciate 15 minutes today or tomorrow to personally review this and ensure you have what you need.\n\nPlease let me know your availability.\n\nBest,\nDevon Cole\nHead of Customer Success"
      },
      crmUpdate: {
        field: "Account Status",
        currentValue: "Active Customer",
        proposedValue: "Red Account - Executive Intervention",
        reason: "Contract renewal in 6 days with critical support complaints."
      }
    }
  },
  {
    id: "cust-004",
    name: "Dataview AI",
    industry: "Machine Learning",
    tier: "Growth",
    arr: 45000,
    healthScore: 81,
    healthStatus: "Healthy",
    churnRiskScore: 22,
    expansionScore: 72,
    daysToRenewal: 88, // RENEWALS IN 90 DAYS!
    renewalDate: "2027-01-07",
    accountOwner: "Marcus Vance",
    primaryContact: {
      name: "Chloe Zhang",
      role: "Director of Data Platform",
      email: "chloe@dataview.ai",
      phone: "+1 (555) 902-1144"
    },
    signals: {
      usageTrend: 22,
      activeUsers: 85,
      totalSeats: 90,
      seatUtilization: 94.4,
      lastMeetingDaysAgo: 11,
      unansweredMessagesDaysAgo: 0,
      usageDeclinedDaysAgo: null,
      unansweredOutreachCount: 0,
      meetingFrequency: "Monthly check-in",
      customerResponses: "Consistent engagement",
      supportActivity: "1 ticket, avg resolution 12h, NPS 8",
      npsScore: 8,
      openTickets: 1,
      avgResolutionHours: 12
    },
    evidenceTimeline: [
      {
        when: "45 days ago",
        date: "2026-08-27",
        event: "Onboarded new computer vision engineering cohort",
        source: "HR Sync / SSO Logs",
        whyItMatters: "Growing technical team headcount",
        category: "PRODUCT_USAGE",
        severity: "EXPANSION"
      },
      {
        when: "11 days ago",
        date: "2026-09-30",
        event: "Positive feedback on pipeline automation",
        source: "Email Thread",
        whyItMatters: "Strong product satisfaction (NPS 8)",
        category: "COMMUNICATION",
        severity: "LOW"
      },
      {
        when: "Today",
        date: "2026-10-11",
        event: "Seat consumption reached 94.4% (85 of 90 seats)",
        source: "Product Telemetry",
        whyItMatters: "Approaching plan capacity ahead of 90d renewal",
        category: "AI_DETECTION",
        severity: "EXPANSION"
      }
    ],
    usageHistory: [
      { month: "May", activeUsers: 50, apiCalls: 320000, sessions: 5100 },
      { month: "Jun", activeUsers: 58, apiCalls: 380000, sessions: 6200 },
      { month: "Jul", activeUsers: 65, apiCalls: 440000, sessions: 7100 },
      { month: "Aug", activeUsers: 72, apiCalls: 510000, sessions: 8300 },
      { month: "Sep", activeUsers: 79, apiCalls: 590000, sessions: 9400 },
      { month: "Oct", activeUsers: 85, apiCalls: 660000, sessions: 10500 }
    ],
    evidence: [
      {
        id: "ev-031",
        category: "Growth Signals",
        type: "FACT",
        title: "Growing Teams Approaching License Cap (85/90 seats)",
        whatHappened: "Dataview is utilizing 85 of 90 contracted seats with an upward linear trajectory (+22% active users).",
        supportingRecords: "Auth0 & Product Telemetry Service",
        timestamp: "2026-10-09",
        confidence: 0.99,
        isAssumption: false,
        recommendedNextStep: "Propose 50-seat growth expansion block."
      }
    ],
    aiSummary: "Dataview AI exhibits healthy growth (+22% usage) and approaches plan limits (94% utilization). Renewal is in 88 days; proactive expansion pack recommended.",
    recommendedAction: {
      actionId: "act-dataview-01",
      customerId: "cust-004",
      customerName: "Dataview AI",
      type: "EXPANSION_UPGRADE",
      title: "Schedule Mid-Year Review & License Top-up (+$22k ARR)",
      urgency: "LOW",
      priority: 3,
      impact: "+$22,500 ARR Expansion",
      rationale: "Account is within 5 seats of capacity cap; early top-up prevents user provisioning bottlenecks.",
      followUpTask: {
        title: "Send 50-seat addendum proposal to Chloe Zhang",
        assignee: "Marcus Vance",
        dueDate: "2026-10-20",
        priority: "Low",
        type: "Expansion"
      },
      meetingSuggestion: {
        title: "Dataview Capacity Planning Check-in",
        duration: "15 minutes",
        proposedTimes: ["Thursday, Oct 17 at 1:30 PM EST"],
        attendees: ["Chloe Zhang", "Marcus Vance"],
        agenda: "Review batch seat provisioning and grandfathered pricing"
      },
      draft: {
        to: "chloe@dataview.ai",
        cc: "m.vance@revops.ai",
        subject: "Dataview AI — Workspace capacity & mid-year optimization",
        body: "Hi Chloe,\n\nGreat to see your team's expansion over the past quarter! You're currently using 85 of your 90 seats.\n\nWould you like to reserve a 50-seat expansion block under your grandfathered pricing tier before your upcoming batch hire?\n\nHappy to send over a 1-page addendum whenever convenient.\n\nBest,\nMarcus"
      },
      crmUpdate: {
        field: "Forecast Category",
        currentValue: "Pipeline",
        proposedValue: "Upsell Best Case (+$22k)",
        reason: "Steady growth approaching licensing boundaries."
      }
    }
  },
  {
    id: "cust-005",
    name: "OmniRetail Direct",
    industry: "E-Commerce",
    tier: "Enterprise",
    arr: 180000,
    healthScore: 56,
    healthStatus: "Needs Attention",
    churnRiskScore: 68,
    expansionScore: 30,
    daysToRenewal: 28, // RENEWALS IN 30 DAYS!
    renewalDate: "2026-11-08",
    accountOwner: "Sarah Jenkins",
    primaryContact: {
      name: "Carlos Mendez",
      role: "Chief Commercial Officer",
      email: "carlos.m@omniretail.com",
      phone: "+1 (555) 619-7712"
    },
    signals: {
      usageTrend: -18,
      activeUsers: 310,
      totalSeats: 450,
      seatUtilization: 68.8,
      lastMeetingDaysAgo: 24,
      unansweredMessagesDaysAgo: 10,
      usageDeclinedDaysAgo: 14,
      unansweredOutreachCount: 2,
      meetingFrequency: "No meeting in 24 days",
      customerResponses: "Delayed response to renewal outreach",
      supportActivity: "3 tickets, avg resolution 24h, NPS 7",
      npsScore: 7,
      openTickets: 3,
      avgResolutionHours: 24
    },
    evidenceTimeline: [
      {
        when: "24 days ago",
        date: "2026-09-17",
        event: "Renewal check-in rescheduled twice by customer",
        source: "Google Calendar",
        whyItMatters: "Reluctance to commit to renewal cadence",
        category: "MEETING",
        severity: "MEDIUM"
      },
      {
        when: "10 days ago",
        date: "2026-10-01",
        event: "Unanswered follow-up on seat optimization",
        source: "Email Activity",
        whyItMatters: "Customer assessing internal budget cuts",
        category: "COMMUNICATION",
        severity: "HIGH"
      },
      {
        when: "Today",
        date: "2026-10-11",
        event: "Contract renewal in 28 days ($180,000 ARR)",
        source: "Salesforce CRM",
        whyItMatters: "High value contract in immediate 30-day renewal window",
        category: "AI_DETECTION",
        severity: "HIGH"
      }
    ],
    usageHistory: [
      { month: "May", activeUsers: 420, apiCalls: 1800000, sessions: 29000 },
      { month: "Jun", activeUsers: 410, apiCalls: 1750000, sessions: 28000 },
      { month: "Jul", activeUsers: 380, apiCalls: 1520000, sessions: 24500 },
      { month: "Aug", activeUsers: 350, apiCalls: 1390000, sessions: 22000 },
      { month: "Sep", activeUsers: 330, apiCalls: 1240000, sessions: 19800 },
      { month: "Oct", activeUsers: 310, apiCalls: 1110000, sessions: 17500 }
    ],
    evidence: [
      {
        id: "ev-041",
        category: "Product Usage",
        type: "FACT",
        title: "Gradual Engagement Decay (-18%)",
        whatHappened: "Active seats fell from 420 to 310 over 5 months. Weekly dashboard export activity down 28%.",
        supportingRecords: "Segment Event Ingestion Pipeline",
        timestamp: "2026-10-07",
        confidence: 0.94,
        isAssumption: false,
        recommendedNextStep: "Offer consolidated seat right-sizing package."
      }
    ],
    aiSummary: "OmniRetail Direct is in the critical 30-day renewal window (28 days). Seat decay (-18%) and delayed responses warrant proactive right-sizing discussion to secure $180,000 renewal.",
    recommendedAction: {
      actionId: "act-omni-01",
      customerId: "cust-005",
      customerName: "OmniRetail Direct",
      type: "ACCOUNT_REVIEW",
      title: "Offer Consolidated Pricing Strategy Session",
      urgency: "HIGH",
      priority: 2,
      impact: "Protect $180,000 ARR with right-sizing option (28d renewal)",
      rationale: "Proactively addressing seat right-sizing protects the core relationship rather than risking complete cancellation.",
      followUpTask: {
        title: "Present seasonal discount structure to Carlos Mendez",
        assignee: "Sarah Jenkins",
        dueDate: "2026-10-16",
        priority: "High",
        type: "Renewal Negotiation"
      },
      meetingSuggestion: {
        title: "OmniRetail 2027 Renewal Strategy & Scaling Options",
        duration: "20 minutes",
        proposedTimes: ["Tuesday, Oct 14 at 2:00 PM EST"],
        attendees: ["Carlos Mendez (CCO)", "Sarah Jenkins (AE)"],
        agenda: "1. Seat tier right-sizing\n2. Q4 high-volume peak discount"
      },
      draft: {
        to: "carlos.m@omniretail.com",
        cc: "s.jenkins@revops.ai",
        subject: "OmniRetail & Platform alignment — Customizing your 2027 renewal",
        body: "Hi Carlos,\n\nAs we head into retail peak season and look forward to your November renewal (28 days away), we want to ensure our platform is lean and directly driving your margin efficiency.\n\nCould we schedule 20 minutes to review your active seat mapping and share our high-volume seasonal scaling discount?\n\nBest regards,\nSarah Jenkins"
      },
      crmUpdate: {
        field: "Account Tier & Risk",
        currentValue: "Standard Enterprise",
        proposedValue: "Needs Attention — Renewal Risk (68%)",
        reason: "Seat decay suggests downsell risk during renewal negotiations."
      }
    }
  }
];

export const initialActions = [
  {
    id: "act-acme-01",
    customerId: "cust-001",
    customerName: "Acme Technologies",
    accountOwner: "Sarah Jenkins",
    type: "EXECUTIVE_REENGAGEMENT",
    title: "Schedule Renewal Review & Value Recap Meeting",
    urgency: "HIGH",
    status: "PENDING", // PENDING, APPROVED, REJECTED
    arrAtRisk: 145000,
    impact: "Preserve $145,000 ARR",
    rationale: "Renewal is in 43 days; last meeting was 21 days ago; customer champion did not reply in 14 days; product activity declined 38%.",
    evidenceSummary: "Mixpanel usage -38%, 3 unanswered emails, 43 days to renewal.",
    followUpTask: {
      title: "Account Owner Follow-up: Re-engage Mark Davis before Oct 15",
      assignee: "Sarah Jenkins",
      dueDate: "2026-10-15",
      priority: "High"
    },
    meetingSuggestion: {
      title: "Executive Renewal Review & Infrastructure ROI Briefing",
      duration: "25 minutes",
      proposedTimes: ["Thursday, Oct 15 at 2:00 PM EST", "Friday, Oct 16 at 11:00 AM EST"],
      attendees: ["Mark Davis", "Sarah Jenkins", "Devon Cole"]
    },
    draft: {
      to: "m.davis@acmetech.io",
      cc: "s.jenkins@revops.ai",
      subject: "Acme Technologies & CloudPlatform — Partnership check-in & upcoming renewal",
      body: "Hi Mark,\n\nI hope you're having a productive week.\n\nI noticed your team's recent shifts in workflow over the past few weeks. With your renewal coming up in 43 days (Nov 23), our principal solutions architect and I would love to hop on a 20-minute executive check-in.\n\nWe've prepared an updated ROI summary of Acme's $1.2M infra savings this year and want to ensure your new team leads have full onboarding support.\n\nAre you open for a quick chat this Thursday at 2:00 PM or Friday at 11:00 AM?\n\nBest regards,\nSarah Jenkins\nStrategic Account Executive"
    },
    crmUpdate: {
      field: "Account Health & Risk Category",
      currentValue: "Healthy (Standard)",
      proposedValue: "Needs Attention — Renewal Risk (84%)",
      reason: "Telemetry decline (-38%) and 14d unanswered messages ahead of 43d renewal."
    },
    createdAt: "2026-10-11 09:14 AM",
    decidedAt: null,
    decidedBy: null,
    executionResult: null
  },
  {
    id: "act-cloudscale-01",
    customerId: "cust-003",
    customerName: "CloudScale Systems",
    accountOwner: "Sarah Jenkins",
    type: "EXECUTIVE_ESCALATION",
    title: "VP-to-VP Emergency SLA Remediation Call",
    urgency: "CRITICAL",
    status: "PENDING",
    arrAtRisk: 68000,
    impact: "Mitigate imminent $68,000 churn (Renews in 6d)",
    rationale: "Renewal in 6 days with 7 unresolved support tickets and NPS 4. High churn certainty without VP involvement.",
    evidenceSummary: "Zero logins from admin in 14 days, 7 open tickets, 6 days remaining on contract.",
    followUpTask: {
      title: "Leadership Escalation: Devon Cole to call Tariq Mansour today",
      assignee: "Devon Cole (Head of CS)",
      dueDate: "2026-10-11",
      priority: "Urgent"
    },
    meetingSuggestion: {
      title: "Urgent: Executive Support Remediation for CloudScale",
      duration: "15 minutes",
      proposedTimes: ["Today at 3:00 PM EST"],
      attendees: ["Tariq Mansour", "Devon Cole"]
    },
    draft: {
      to: "tariq@cloudscalesys.com",
      cc: "leadership@revops.ai",
      subject: "Executive escalation & support remediation for CloudScale",
      body: "Hi Tariq,\n\nI am stepping in directly from executive leadership to personally address recent support SLA delays. Let's talk today for 15 minutes.\n\nBest,\nDevon Cole\nHead of Customer Success"
    },
    crmUpdate: {
      field: "Account Status",
      currentValue: "Active Customer",
      proposedValue: "Red Account - Executive Intervention",
      reason: "Contract renewal in 6 days with critical support complaints."
    },
    createdAt: "2026-10-11 08:30 AM",
    decidedAt: null,
    decidedBy: null,
    executionResult: null
  },
  {
    id: "act-finedge-01",
    customerId: "cust-002",
    customerName: "FinEdge Global",
    accountOwner: "Marcus Vance",
    type: "EXPANSION_UPGRADE",
    title: "Draft APAC Enterprise Add-on Proposal (+$85k ARR)",
    urgency: "MEDIUM",
    status: "PENDING",
    arrAtRisk: 0,
    impact: "+$85,000 ARR Expansion",
    rationale: "Capacity saturation at 96% and direct customer request in Slack Connect channel.",
    evidenceSummary: "480/500 seats utilized, +54% 30d usage, Slack Connect request confirmed.",
    followUpTask: {
      title: "Prepare APAC expansion order form and schedule pricing review",
      assignee: "Marcus Vance",
      dueDate: "2026-10-14",
      priority: "Medium"
    },
    meetingSuggestion: {
      title: "FinEdge APAC Rollout & Capacity Review",
      duration: "20 minutes",
      proposedTimes: ["Tuesday, Oct 14 at 10:00 AM EST"],
      attendees: ["Elena Rostova", "Marcus Vance"]
    },
    draft: {
      to: "e.rostova@finedge.com",
      cc: "m.vance@revops.ai",
      subject: "FinEdge APAC Capacity Expansion — Draft Order Form & Tier Upgrade",
      body: "Hi Elena,\n\nFollowing up on our conversation regarding your APAC team rollouts, I've prepared the add-on schedule for 250 Enterprise seats with consolidated volume pricing.\n\nBest,\nMarcus Vance"
    },
    crmUpdate: {
      field: "Opportunity Pipeline Stage",
      currentValue: "Existing Customer - Closed Won",
      proposedValue: "Upsell / Expansion - Proposal Sent ($85k)",
      reason: "Customer verified expansion intent for 250 additional seats."
    },
    createdAt: "2026-10-11 08:00 AM",
    decidedAt: null,
    decidedBy: null,
    executionResult: null
  }
];

export const initialIntegrations = [
  {
    id: "int-sf",
    name: "Salesforce CRM",
    category: "CRM & Contracts",
    status: "CONNECTED",
    icon: "database",
    lastSync: "4 mins ago",
    recordsCount: "1,248 accounts",
    healthRate: "99.8%",
    syncErrors: 0,
    details: "Bidirectional sync: Accounts, Opportunities, Contracts, Renewal Timelines."
  },
  {
    id: "int-gsuite",
    name: "Google Workspace (Email & Calendar)",
    category: "Communications & Meetings",
    status: "CONNECTED",
    icon: "mail",
    lastSync: "2 mins ago",
    recordsCount: "18,450 events",
    healthRate: "99.4%",
    syncErrors: 1,
    details: "Inbound calendar meetings, response latencies, and sentiment detection."
  },
  {
    id: "int-telemetry",
    name: "Product Usage (Mixpanel/Segment)",
    category: "Product Usage Telemetry",
    status: "CONNECTED",
    icon: "activity",
    lastSync: "Just now",
    recordsCount: "2.4M events/day",
    healthRate: "99.9%",
    syncErrors: 0,
    details: "Telemetry tracking: monthly active users, seat capacity, API throughput."
  },
  {
    id: "int-slack",
    name: "Collaboration (Slack Connect)",
    category: "Customer Collaboration",
    status: "CONNECTED",
    icon: "message-square",
    lastSync: "Live Webhook",
    recordsCount: "14 customer channels",
    healthRate: "100%",
    syncErrors: 0,
    details: "Detects customer expansion queries and surfaces urgent churn warnings."
  },
  {
    id: "int-zendesk",
    name: "Support Activity (Zendesk)",
    category: "Support & Customer Health",
    status: "CONNECTED",
    icon: "life-buoy",
    lastSync: "18 mins ago",
    recordsCount: "42 open tickets",
    healthRate: "98.7%",
    syncErrors: 2,
    details: "Ingests ticket priority, resolution SLA breach hours, and NPS survey ratings."
  }
];

export const initialAuditLogs = [
  {
    id: "aud-109",
    timestamp: "2026-10-11 09:14:22",
    actor: "RevOps Autonomous Engine (AI)",
    eventType: "ACTION_RECOMMENDED",
    target: "Acme Technologies (cust-001)",
    details: "Generated recommendation: Executive Renewal Review & Value Recap ($145k ARR at risk). Awaiting human review.",
    status: "SUCCESS"
  },
  {
    id: "aud-108",
    timestamp: "2026-10-11 08:30:15",
    actor: "RevOps Autonomous Engine (AI)",
    eventType: "ACTION_RECOMMENDED",
    target: "CloudScale Systems (cust-003)",
    details: "Flagged critical churn risk (Score: 92, Renews in 6d). Generated VP Escalation Call recommendation.",
    status: "SUCCESS"
  },
  {
    id: "aud-107",
    timestamp: "2026-10-10 16:30:00",
    actor: "Marcus Vance (Account Executive)",
    eventType: "HUMAN_APPROVAL",
    target: "PulseHealth Analytics (cust-006)",
    details: "Approved action: Present HIPAA Compliance Suite Upgrade. Triggered automated outreach and CRM stage update.",
    status: "APPROVED"
  }
];

export const sampleCopilotPrompts = [
  "Which accounts are most likely to churn this month?",
  "Show renewals due in 7, 30, and 90 days",
  "Explain why Acme Technologies was flagged as elevated risk",
  "What accounts have rising usage and expansion opportunities?",
  "Show pending actions requiring human approval today"
];
