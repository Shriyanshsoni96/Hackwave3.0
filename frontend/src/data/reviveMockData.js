// ReviveAI MVP PRD v2.0 - Realistic Dataset & Domain Entities
// Schema covers distinct customers, monthly activity (user_monthly),
// risk assessments, retention actions, email logs, manager reports, and activity logs.

export const initialCustomers = [
  {
    id: "CUST-8021",
    name: "Apex Logistics Ltd",
    contactName: "David Miller",
    contactEmail: "david.miller@apexlogistics.com",
    location: "North America (US-West)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 14500,
    arr: 174000,
    contractRenewalDate: "2026-11-18",
    contractTerm: "12 Months",
    supportPriority: "P1",
    optOutStatus: false,
    outreachCount: 1, // Max 3
    cooldownUntil: null, // Eligible
    createdDate: "2024-03-15",
    lastActivityDate: "2026-10-09 16:40",
    lastUpdated: "2026-10-10 11:15",
    tags: ["Logistics", "Strategic Account", "SLA Critical"],
    notes: "Key 3PL logistics provider using our tracking and routing API."
  },
  {
    id: "CUST-7714",
    name: "Beacon Health Systems",
    contactName: "Dr. Elena Rostova",
    contactEmail: "e.rostova@beaconhealth.org",
    location: "North America (US-East)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 22000,
    arr: 264000,
    contractRenewalDate: "2026-11-04",
    contractTerm: "24 Months",
    supportPriority: "P1",
    optOutStatus: false,
    outreachCount: 2,
    cooldownUntil: "2026-10-18", // In cooldown
    createdDate: "2023-11-01",
    lastActivityDate: "2026-10-02 09:12",
    lastUpdated: "2026-10-08 14:20",
    tags: ["Healthcare", "HIPAA Compliant", "High ARR"],
    notes: "Hospital system client experiencing clinical staff turnover."
  },
  {
    id: "CUST-6590",
    name: "OmniCloud Analytics",
    contactName: "Marcus Vance",
    contactEmail: "marcus@omnicloud.io",
    location: "Europe (Germany)",
    isLocationVerified: true,
    subscriptionTier: "Pro",
    subscriptionStatus: "Active",
    mrr: 8200,
    arr: 98400,
    contractRenewalDate: "2026-12-01",
    contractTerm: "12 Months",
    supportPriority: "P2",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2024-08-10",
    lastActivityDate: "2026-10-08 18:22",
    lastUpdated: "2026-10-09 10:00",
    tags: ["SaaS", "GDPR", "High API Usage"],
    notes: "Data analytics scaleup; recent API latency complaints."
  },
  {
    id: "CUST-5421",
    name: "FinGuard Global",
    contactName: "Claire Dupont",
    contactEmail: "cdupont@finguard.ch",
    location: "Europe (Switzerland)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 31000,
    arr: 372000,
    contractRenewalDate: "2026-12-20",
    contractTerm: "36 Months",
    supportPriority: "P1",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2023-05-12",
    lastActivityDate: "2026-10-11 08:30",
    lastUpdated: "2026-10-10 16:45",
    tags: ["Fintech", "SOC2", "Multi-tenant"],
    notes: "Private wealth compliance engine. Healthy volume and regular logins."
  },
  {
    id: "CUST-4189",
    name: "NextWave Media Group",
    contactName: "Jason Reed",
    contactEmail: "jreed@nextwavemedia.com",
    location: "North America (US-West)",
    isLocationVerified: true,
    subscriptionTier: "Pro",
    subscriptionStatus: "Grace Period",
    mrr: 5900,
    arr: 70800,
    contractRenewalDate: "2026-10-25",
    contractTerm: "12 Months",
    supportPriority: "P2",
    optOutStatus: false,
    outreachCount: 2,
    cooldownUntil: null,
    createdDate: "2024-01-20",
    lastActivityDate: "2026-09-28 11:05",
    lastUpdated: "2026-10-07 15:30",
    tags: ["Digital Media", "Billing Overdue"],
    notes: "Payment method expired during monthly renewal cycle."
  },
  {
    id: "CUST-3902",
    name: "Pulse Commerce",
    contactName: "Aiko Tanaka",
    contactEmail: "a.tanaka@pulsecommerce.jp",
    location: "APAC (Japan)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 18400,
    arr: 220800,
    contractRenewalDate: "2027-01-15",
    contractTerm: "12 Months",
    supportPriority: "P2",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2024-02-14",
    lastActivityDate: "2026-10-11 06:14",
    lastUpdated: "2026-10-10 12:00",
    tags: ["E-commerce", "Tokyo HQ", "High Volume"],
    notes: "Retail e-commerce backend; stable adoption across engineering team."
  },
  {
    id: "CUST-3341",
    name: "CyberShield Security",
    contactName: "Robert Thorne",
    contactEmail: "r.thorne@cybershield.co.uk",
    location: "Europe (UK)",
    isLocationVerified: true,
    subscriptionTier: "Pro",
    subscriptionStatus: "Active",
    mrr: 9600,
    arr: 115200,
    contractRenewalDate: "2026-11-28",
    contractTerm: "12 Months",
    supportPriority: "P2",
    optOutStatus: false,
    outreachCount: 1,
    cooldownUntil: null,
    createdDate: "2024-04-18",
    lastActivityDate: "2026-10-04 14:19",
    lastUpdated: "2026-10-09 17:00",
    tags: ["Infosec", "B2B SaaS"],
    notes: "Security audit tool provider. Seat utilization dropped by 38%."
  },
  {
    id: "CUST-2875",
    name: "Terraform Logistics",
    contactName: "Sofia Alvarez",
    contactEmail: "salvarez@terraformlog.br",
    location: "Latin America (Brazil)",
    isLocationVerified: true,
    subscriptionTier: "Growth",
    subscriptionStatus: "Active",
    mrr: 4500,
    arr: 54000,
    contractRenewalDate: "2026-12-10",
    contractTerm: "12 Months",
    supportPriority: "P3",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2024-09-01",
    lastActivityDate: "2026-10-10 19:50",
    lastUpdated: "2026-10-10 19:50",
    tags: ["Logistics", "Emerging Market"],
    notes: "Fast growing freight routing account with strong usage."
  },
  {
    id: "CUST-2104",
    name: "AeroDynamics Corp",
    contactName: "Nathan Cole",
    contactEmail: "ncole@aerodynamics.com",
    location: "North America (US-Central)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 26000,
    arr: 312000,
    contractRenewalDate: "2026-11-10",
    contractTerm: "24 Months",
    supportPriority: "P1",
    optOutStatus: false,
    outreachCount: 1,
    cooldownUntil: null,
    createdDate: "2023-08-19",
    lastActivityDate: "2026-09-30 15:10",
    lastUpdated: "2026-10-08 09:30",
    tags: ["Aerospace", "Defense", "Contract Renewal"],
    notes: "Aviation components supplier. Executive champion left organization."
  },
  {
    id: "CUST-1980",
    name: "BioSynthetix Labs",
    contactName: "Priya Sharma",
    contactEmail: "psharma@biosynthetix.in",
    location: "APAC (India)",
    isLocationVerified: true,
    subscriptionTier: "Pro",
    subscriptionStatus: "Active",
    mrr: 7400,
    arr: 88800,
    contractRenewalDate: "2026-12-05",
    contractTerm: "12 Months",
    supportPriority: "P2",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2024-06-12",
    lastActivityDate: "2026-10-11 05:40",
    lastUpdated: "2026-10-10 18:20",
    tags: ["Biotech", "Bangalore", "Research"],
    notes: "Genomics data pipeline customer. High query volume and active API integration."
  },
  {
    id: "CUST-1432",
    name: "Quantix Capital Management",
    contactName: "Henrik Lindqvist",
    contactEmail: "hlindqvist@quantixcap.se",
    location: "Europe (Sweden)",
    isLocationVerified: true,
    subscriptionTier: "Enterprise",
    subscriptionStatus: "Active",
    mrr: 38000,
    arr: 456000,
    contractRenewalDate: "2027-02-28",
    contractTerm: "24 Months",
    supportPriority: "P1",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2023-04-10",
    lastActivityDate: "2026-10-11 08:15",
    lastUpdated: "2026-10-11 08:15",
    tags: ["Hedge Fund", "Ultra High ARR", "Nordics"],
    notes: "Algorithmic risk surveillance. Consistent SLA, 99.99% uptime compliance."
  },
  {
    id: "CUST-1120",
    name: "Zenith Retail Solutions",
    contactName: "Chloe Martin",
    contactEmail: "cmartin@zenithretail.fr",
    location: "Europe (France)",
    isLocationVerified: true,
    subscriptionTier: "Starter",
    subscriptionStatus: "Active",
    mrr: 2100,
    arr: 25200,
    contractRenewalDate: "2026-11-22",
    contractTerm: "12 Months",
    supportPriority: "P3",
    optOutStatus: false,
    outreachCount: 0,
    cooldownUntil: null,
    createdDate: "2024-10-01",
    lastActivityDate: "2026-10-05 13:20",
    lastUpdated: "2026-10-06 14:10",
    tags: ["Retail", "Starter Tier"],
    notes: "Omnichannel inventory sync. Stable initial pilot."
  },
  {
    id: "CUST-985",
    name: "Legacy Global Holdings",
    contactName: "Unknown Administrator",
    contactEmail: "ops@legacyholdings.net",
    location: "Unverified", // explicit per PRD: "do not infer missing locations"
    isLocationVerified: false,
    subscriptionTier: "Growth",
    subscriptionStatus: "Active",
    mrr: 4100,
    arr: 49200,
    contractRenewalDate: "2026-11-30",
    contractTerm: "12 Months",
    supportPriority: "P3",
    optOutStatus: false,
    outreachCount: 1,
    cooldownUntil: null,
    createdDate: "2024-05-18",
    lastActivityDate: "2026-09-15 10:11",
    lastUpdated: "2026-10-05 11:00",
    tags: ["Holding Co", "Missing Location Data"],
    notes: "Legacy signup with unverified billing address. Decreased query volume."
  }
];

// Collection: riskAssessments
// Deterministic engine outputs matching PRD Section 5 & 10
export const initialAssessments = {
  "CUST-8021": {
    id: "ASSESS-901",
    customerId: "CUST-8021",
    score: 84, // High (60-100)
    category: "High",
    status: "Action Pending",
    assessmentDate: "2026-10-10 14:30:00",
    freshness: "3 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "68 days since last active shipment batch; 44% decline in monthly order frequency; upcoming renewal in 38 days.",
    reasons: [
      {
        title: "Extended Inactivity Window",
        description: "68 days elapsed since primary logistics dispatch transaction (benchmark is 14 days).",
        impact: "+35 pts",
        weight: 35,
        period: "Last 60 Days",
        metric: "Recency Gap: 68 days"
      },
      {
        title: "Order Frequency Contraction",
        description: "Monthly order transaction volume fell from 4,120 orders/mo to 2,310 orders/mo (-44%).",
        impact: "+25 pts",
        weight: 25,
        period: "Past 90 Days",
        metric: "Order Vol: -44%"
      },
      {
        title: "Renewal Approaching Without Engagement",
        description: "Annual Enterprise agreement expires in 38 days with 0 active CSM interactions in Q3.",
        impact: "+24 pts",
        weight: 24,
        period: "Upcoming 60 Days",
        metric: "Days to Renewal: 38"
      }
    ],
    suggestedAction: "Executive Partner Check-in & Retention Incentive (15% Extension Credit)",
    actionStatus: "Pending Manager Approval"
  },
  "CUST-7714": {
    id: "ASSESS-902",
    customerId: "CUST-7714",
    score: 78, // High (60-100)
    category: "High",
    status: "Action Pending",
    assessmentDate: "2026-10-09 11:15:00",
    freshness: "1 day ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "3 unresolved critical clinical tickets; seat activity dropped 52%; renewal due in 24 days.",
    reasons: [
      {
        title: "Unresolved Support Escalations",
        description: "3 open P1 tickets concerning HL7 connector latency exceeding 72h SLA.",
        impact: "+32 pts",
        weight: 32,
        period: "Last 14 Days",
        metric: "3 P1 Open Tickets"
      },
      {
        title: "Severe User Dropoff",
        description: "Active clinical clinician seats dropped from 240 to 115 active users.",
        impact: "+28 pts",
        weight: 28,
        period: "Past 30 Days",
        metric: "Seat Usage: -52%"
      },
      {
        title: "Imminent Contract Renewal",
        description: "Contract expires in 24 days. Account is currently in outreach cooldown until Oct 18.",
        impact: "+18 pts",
        weight: 18,
        period: "Upcoming 30 Days",
        metric: "Days to Renewal: 24"
      }
    ],
    suggestedAction: "Dedicated Solutions Engineering SLA Escalation & Clinical Champion Review",
    actionStatus: "Pending Manager Approval"
  },
  "CUST-2104": {
    id: "ASSESS-903",
    customerId: "CUST-2104",
    score: 72, // High (60-100)
    category: "High",
    status: "Action Pending",
    assessmentDate: "2026-10-10 09:00:00",
    freshness: "8 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Executive champion departed; 30-day API call volume declined 35%; contract renewal in 30 days.",
    reasons: [
      {
        title: "Stakeholder Invalidation",
        description: "Primary buyer email bounced and billing contact reported departure of VP Engineering.",
        impact: "+30 pts",
        weight: 30,
        period: "Last 30 Days",
        metric: "Champion Departs"
      },
      {
        title: "API Ingestion Decline",
        description: "Telemetry ingestion dropped from 8.2M events/day to 5.3M events/day.",
        impact: "+24 pts",
        weight: 24,
        period: "Past 45 Days",
        metric: "API Traffic: -35%"
      },
      {
        title: "Contract Renewal Window",
        description: "24-month contract renewal approaching on Nov 10, 2026.",
        impact: "+18 pts",
        weight: 18,
        period: "Upcoming 30 Days",
        metric: "Days to Renewal: 30"
      }
    ],
    suggestedAction: "Executive Re-alignment Meeting with Interim Engineering Leadership",
    actionStatus: "Pending Manager Approval"
  },
  "CUST-4189": {
    id: "ASSESS-904",
    customerId: "CUST-4189",
    score: 65, // High (60-100)
    category: "High",
    status: "Action Pending",
    assessmentDate: "2026-10-08 17:45:00",
    freshness: "2 days ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Subscription in Grace Period due to payment failure; zero platform logins in 14 days.",
    reasons: [
      {
        title: "Billing Grace Period",
        description: "Corporate card charge failed twice; automated retries scheduled.",
        impact: "+35 pts",
        weight: 35,
        period: "Current Billing Cycle",
        metric: "Payment Failed"
      },
      {
        title: "Zero Logins in Recent Period",
        description: "No team members logged into dashboard since Sept 28, 2026.",
        impact: "+30 pts",
        weight: 30,
        period: "Last 14 Days",
        metric: "Zero Logins"
      }
    ],
    suggestedAction: "Manager Account Recovery & Concierge Invoicing Support",
    actionStatus: "Pending Manager Approval"
  },
  "CUST-6590": {
    id: "ASSESS-905",
    customerId: "CUST-6590",
    score: 48, // Medium (30-59)
    category: "Medium",
    status: "Monitoring",
    assessmentDate: "2026-10-09 10:00:00",
    freshness: "1 day ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Declining query speed reported; usage plateaued; renewal in 51 days.",
    reasons: [
      {
        title: "Latency Complaints in Support",
        description: "2 support tickets submitted regarding endpoint response times in EU region.",
        impact: "+25 pts",
        weight: 25,
        period: "Last 20 Days",
        metric: "2 Support Tickets"
      },
      {
        title: "Feature Adoption Plateau",
        description: "Only 2 of 5 purchased enterprise modules utilized in current quarter.",
        impact: "+23 pts",
        weight: 23,
        period: "Past 60 Days",
        metric: "Module Usage: 40%"
      }
    ],
    suggestedAction: "Technical Customer Success Architect Performance Review",
    actionStatus: "Review and Consider"
  },
  "CUST-3341": {
    id: "ASSESS-906",
    customerId: "CUST-3341",
    score: 42, // Medium (30-59)
    category: "Medium",
    status: "Monitoring",
    assessmentDate: "2026-10-09 17:00:00",
    freshness: "1 day ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Seat utilization dropped 38%; last outreach conducted 18 days ago.",
    reasons: [
      {
        title: "Seat Under-utilization",
        description: "Allocated 40 seats, only 25 active users recorded over past 3 weeks.",
        impact: "+26 pts",
        weight: 26,
        period: "Past 30 Days",
        metric: "Seat Util: 62%"
      },
      {
        title: "Mid-cycle Engagement Dip",
        description: "Weekly export report generation decreased by 30%.",
        impact: "+16 pts",
        weight: 16,
        period: "Past 14 Days",
        metric: "Reports: -30%"
      }
    ],
    suggestedAction: "Customer Onboarding Refresher & Seat Activation Webinar",
    actionStatus: "Routine Monitoring"
  },
  "CUST-985": {
    id: "ASSESS-907",
    customerId: "CUST-985",
    score: 55, // Medium (30-59)
    category: "Medium",
    status: "In Review",
    assessmentDate: "2026-10-05 11:00:00",
    freshness: "5 days ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Unverified location; lack of verified point of contact; steady login drop.",
    reasons: [
      {
        title: "Incomplete Account Verification",
        description: "Location unverified, missing administrative point of contact.",
        impact: "+30 pts",
        weight: 30,
        period: "All Time",
        metric: "Unverified Location"
      },
      {
        title: "Activity Inactivity",
        description: "No activity recorded since Sept 15.",
        impact: "+25 pts",
        weight: 25,
        period: "Past 30 Days",
        metric: "Inactive 26 days"
      }
    ],
    suggestedAction: "Profile Verification & Compliance Data Refresh Outreach",
    actionStatus: "Review and Consider"
  },
  "CUST-5421": {
    id: "ASSESS-908",
    customerId: "CUST-5421",
    score: 12, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-10 16:45:00",
    freshness: "18 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Healthy utilization, zero unresolved complaints, consistent multi-region API queries.",
    reasons: [
      {
        title: "Optimal Engagement",
        description: "94% daily active user ratio across team; 12.4M queries processed this month.",
        impact: "-20 pts",
        weight: 0,
        period: "Past 30 Days",
        metric: "94% DAU/MAU"
      }
    ],
    suggestedAction: "Standard Automated Customer Health Monitoring",
    actionStatus: "No Action Needed"
  },
  "CUST-3902": {
    id: "ASSESS-909",
    customerId: "CUST-3902",
    score: 16, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-10 12:00:00",
    freshness: "22 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "High transaction volume, positive quarterly survey rating (CSAT 4.9/5).",
    reasons: [
      {
        title: "High Feature Breadth",
        description: "Utilizing 6 core API endpoints and automated real-time webhooks.",
        impact: "-15 pts",
        weight: 0,
        period: "Past 30 Days",
        metric: "CSAT: 4.9/5"
      }
    ],
    suggestedAction: "Standard Automated Customer Health Monitoring",
    actionStatus: "No Action Needed"
  },
  "CUST-2875": {
    id: "ASSESS-910",
    customerId: "CUST-2875",
    score: 22, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-10 19:50:00",
    freshness: "14 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Growing purchase volume (+18% MoM), timely payments, routine usage.",
    reasons: [
      {
        title: "Growth Acceleration",
        description: "Shipment routing volume increased by 18% over prior calendar month.",
        impact: "-10 pts",
        weight: 0,
        period: "Past 30 Days",
        metric: "Growth: +18%"
      }
    ],
    suggestedAction: "Quarterly Expansion Review & Tier Upgrade Evaluation",
    actionStatus: "Routine Monitoring"
  },
  "CUST-1980": {
    id: "ASSESS-911",
    customerId: "CUST-1980",
    score: 15, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-10 18:20:00",
    freshness: "15 hours ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Active daily data pipeline ingestion; zero support tickets; stable contract.",
    reasons: [
      {
        title: "Stable Data Flow",
        description: "Pipelines executing on scheduled daily cadence without downtime.",
        impact: "-15 pts",
        weight: 0,
        period: "Past 30 Days",
        metric: "Pipeline Health: 100%"
      }
    ],
    suggestedAction: "Standard Automated Customer Health Monitoring",
    actionStatus: "No Action Needed"
  },
  "CUST-1432": {
    id: "ASSESS-912",
    customerId: "CUST-1432",
    score: 8, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-11 08:15:00",
    freshness: "1 hour ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Enterprise champion engagement high; long-term contract locked through 2027.",
    reasons: [
      {
        title: "Benchmark Multi-tenant Client",
        description: "Zero latency breaches, executive check-in conducted last week with glowing feedback.",
        impact: "-25 pts",
        weight: 0,
        period: "Past 30 Days",
        metric: "Satisfaction: 10/10"
      }
    ],
    suggestedAction: "Executive Sponsor Co-marketing Case Study Proposal",
    actionStatus: "No Action Needed"
  },
  "CUST-1120": {
    id: "ASSESS-913",
    customerId: "CUST-1120",
    score: 25, // Low (0-29)
    category: "Low",
    status: "Healthy",
    assessmentDate: "2026-10-06 14:10:00",
    freshness: "4 days ago",
    engineVersion: "ReviveAI Rule Engine v2.4",
    isStale: false,
    primaryReason: "Routine initial usage; no support tickets filed; starter plan running normally.",
    reasons: [
      {
        title: "Baseline Pilot Stable",
        description: "Inventory synchronizations executing twice daily.",
        impact: "0 pts",
        weight: 0,
        period: "Past 14 Days",
        metric: "Sync Status: OK"
      }
    ],
    suggestedAction: "Standard Automated Customer Health Monitoring",
    actionStatus: "Routine Monitoring"
  }
};

// Historical Assessments for individual customer intelligence profile (Section 6)
export const initialAssessmentHistory = {
  "CUST-8021": [
    {
      date: "2026-10-10 14:30",
      score: 84,
      category: "High",
      engineVersion: "ReviveAI Rule Engine v2.4",
      status: "Action Pending",
      reasonsSummary: "Inactivity (68d), -44% order frequency, renewal in 38d"
    },
    {
      date: "2026-09-15 10:00",
      score: 62,
      category: "High",
      engineVersion: "ReviveAI Rule Engine v2.3",
      status: "Investigated",
      reasonsSummary: "Inactivity gap reached 42d, order decline emerging"
    },
    {
      date: "2026-08-15 09:30",
      score: 38,
      category: "Medium",
      engineVersion: "ReviveAI Rule Engine v2.2",
      status: "Reviewed",
      reasonsSummary: "Minor slowdown in API transactions post summer break"
    },
    {
      date: "2026-07-15 11:15",
      score: 18,
      category: "Low",
      engineVersion: "ReviveAI Rule Engine v2.2",
      status: "Healthy",
      reasonsSummary: "Normal operational cadence; 4,120 monthly orders"
    }
  ],
  "CUST-7714": [
    {
      date: "2026-10-09 11:15",
      score: 78,
      category: "High",
      engineVersion: "ReviveAI Rule Engine v2.4",
      status: "Action Pending",
      reasonsSummary: "3 P1 tickets unresolved, -52% seat usage, renewal in 24d"
    },
    {
      date: "2026-09-01 14:20",
      score: 54,
      category: "Medium",
      engineVersion: "ReviveAI Rule Engine v2.3",
      status: "Email Sent",
      reasonsSummary: "First HL7 connector ticket opened, initial seat drop"
    }
  ]
};

// Monthly Activity Records (Collection: customer_monthly)
// Representing monthly historical dataset (Section 6 & 11)
export const initialMonthlyActivity = {
  "CUST-8021": [
    {
      period: "2026-10 (Current MTD)",
      subscriptionStatus: "Active",
      purchaseCount: 310,
      purchaseAmount: "$3,450",
      daysSinceLastPurchase: 68,
      activeUsers: 8,
      apiCalls: "42,100",
      supportTickets: 2,
      engagementScore: 32,
      events: "Renewal inquiry sent; billing contact verified"
    },
    {
      period: "2026-09",
      subscriptionStatus: "Active",
      purchaseCount: 940,
      purchaseAmount: "$9,200",
      daysSinceLastPurchase: 42,
      activeUsers: 14,
      apiCalls: "89,400",
      supportTickets: 1,
      engagementScore: 48,
      events: "Quarterly review notice dispatched"
    },
    {
      period: "2026-08",
      subscriptionStatus: "Active",
      purchaseCount: 1820,
      purchaseAmount: "$18,500",
      daysSinceLastPurchase: 14,
      activeUsers: 22,
      apiCalls: "154,000",
      supportTickets: 0,
      engagementScore: 68,
      events: "API credentials rotated"
    },
    {
      period: "2026-07",
      subscriptionStatus: "Active",
      purchaseCount: 3450,
      purchaseAmount: "$34,100",
      daysSinceLastPurchase: 3,
      activeUsers: 34,
      apiCalls: "248,000",
      supportTickets: 1,
      engagementScore: 84,
      events: "New logistics warehouse integration completed"
    },
    {
      period: "2026-06",
      subscriptionStatus: "Active",
      purchaseCount: 4120,
      purchaseAmount: "$41,000",
      daysSinceLastPurchase: 2,
      activeUsers: 36,
      apiCalls: "290,000",
      supportTickets: 0,
      engagementScore: 92,
      events: "Peak seasonal dispatch period"
    },
    {
      period: "2026-05",
      subscriptionStatus: "Active",
      purchaseCount: 3890,
      purchaseAmount: "$38,400",
      daysSinceLastPurchase: 1,
      activeUsers: 35,
      apiCalls: "275,000",
      supportTickets: 2,
      engagementScore: 90,
      events: "Account onboarding complete"
    }
  ],
  "CUST-7714": [
    {
      period: "2026-10 (Current MTD)",
      subscriptionStatus: "Active",
      purchaseCount: 115,
      purchaseAmount: "$1,800",
      daysSinceLastPurchase: 9,
      activeUsers: 115,
      apiCalls: "112,000",
      supportTickets: 3,
      engagementScore: 41,
      events: "3 P1 tickets escalated to Tier 3 engineering"
    },
    {
      period: "2026-09",
      subscriptionStatus: "Active",
      purchaseCount: 198,
      purchaseAmount: "$3,100",
      daysSinceLastPurchase: 4,
      activeUsers: 180,
      apiCalls: "210,000",
      supportTickets: 2,
      engagementScore: 62,
      events: "Initial clinical user feedback survey completed"
    },
    {
      period: "2026-08",
      subscriptionStatus: "Active",
      purchaseCount: 260,
      purchaseAmount: "$4,200",
      daysSinceLastPurchase: 2,
      activeUsers: 240,
      apiCalls: "320,000",
      supportTickets: 0,
      engagementScore: 88,
      events: "Hospital wing expansion deployment"
    }
  ]
};

// Collection: retentionActions
// Powers Section 8: Approval Center
export const initialRetentionActions = [
  {
    id: "ACT-401",
    customerId: "CUST-8021",
    customerName: "Apex Logistics Ltd",
    contactName: "David Miller",
    contactEmail: "david.miller@apexlogistics.com",
    riskScore: 84,
    riskCategory: "High",
    reasonsSummary: "Inactivity (68d), -44% order volume, renewal in 38 days",
    proposedAction: "Executive Partner Check-in & Retention Incentive (15% Extension Credit)",
    actionType: "Executive Outreach & Renewal Incentive",
    draftEmail: {
      subject: "Exclusive ReviveAI Partner Check-in & Executive Support for Apex Logistics",
      recipient: "david.miller@apexlogistics.com",
      sender: "sarah.lin@reviveai.io (Customer Success Lead)",
      body: `Hi David,

I noticed that your team's platform activity has dipped over the past two months and your annual agreement renewal is approaching on November 18, 2026.

We want to make sure Apex Logistics is maximizing the full return on your logistics tracking integration. To support your team, I'd welcome a brief 15-minute call this week with our Head of Solutions. Additionally, we are pre-approving a 15% renewal incentive credit toward your Q1 contract extension.

Could you let me know if Thursday at 2:00 PM PT works for a quick sync?

Warm regards,
Sarah Lin
Customer Success Lead, ReviveAI`
    },
    outreachCount: 1, // 1 of 3 warning emails sent
    maxOutreach: 3,
    cooldownStatus: "Eligible for outreach",
    status: "pending", // 'pending' | 'approved' | 'rejected' | 'failed' | 'completed'
    createdAt: "2026-10-10 14:35:00",
    decision: null,
    decisionNotes: "",
    deliveryOutcome: null
  },
  {
    id: "ACT-402",
    customerId: "CUST-7714",
    customerName: "Beacon Health Systems",
    contactName: "Dr. Elena Rostova",
    contactEmail: "e.rostova@beaconhealth.org",
    riskScore: 78,
    riskCategory: "High",
    reasonsSummary: "3 unresolved P1 HL7 tickets, -52% seat usage, renewal in 24d",
    proposedAction: "Dedicated Solutions Engineering SLA Escalation & Clinical Champion Review",
    actionType: "Technical SLA Intervention",
    draftEmail: {
      subject: "Urgent: Direct Engineering Escalation for Beacon Health Systems",
      recipient: "e.rostova@beaconhealth.org",
      sender: "sarah.lin@reviveai.io (Customer Success Lead)",
      body: `Dear Dr. Rostova,

I am writing directly from ReviveAI leadership regarding the HL7 connector latency tickets your clinical IT team recently filed. 

We have assigned a senior Principal Solutions Engineer to take direct ownership of resolving this latency issue within the next 24 hours. Because your renewal is scheduled for November 4, 2026, we want to ensure your operations are flawless before discussing next year's agreement.

Our engineer will join you directly on your staging call tomorrow morning.

Sincerely,
Sarah Lin
ReviveAI Customer Success`
    },
    outreachCount: 2,
    maxOutreach: 3,
    cooldownStatus: "In cooldown until Oct 18 (Approval will queue send)",
    status: "pending",
    createdAt: "2026-10-09 11:20:00",
    decision: null,
    decisionNotes: "",
    deliveryOutcome: null
  },
  {
    id: "ACT-403",
    customerId: "CUST-2104",
    customerName: "AeroDynamics Corp",
    contactName: "Nathan Cole",
    contactEmail: "ncole@aerodynamics.com",
    riskScore: 72,
    riskCategory: "High",
    reasonsSummary: "Executive champion departed; -35% API events; renewal in 30d",
    proposedAction: "Executive Re-alignment Meeting with Interim Engineering Leadership",
    actionType: "Leadership Re-alignment",
    draftEmail: {
      subject: "ReviveAI Strategic Partnership Briefing — AeroDynamics Corp",
      recipient: "ncole@aerodynamics.com",
      sender: "sarah.lin@reviveai.io (Customer Success Lead)",
      body: `Hi Nathan,

Following the recent organizational transition in your engineering department, ReviveAI is committed to ensuring full operational continuity for AeroDynamics Corp.

We have prepared a customized Executive Briefing detailing your current data pipeline architecture and savings benchmarks, ahead of your November 10 contract renewal.

Please let us know who from your interim technical steering committee should attend.

Best regards,
Sarah Lin`
    },
    outreachCount: 1,
    maxOutreach: 3,
    cooldownStatus: "Eligible for outreach",
    status: "pending",
    createdAt: "2026-10-10 09:15:00",
    decision: null,
    decisionNotes: "",
    deliveryOutcome: null
  },
  {
    id: "ACT-398",
    customerId: "CUST-4189",
    customerName: "NextWave Media Group",
    contactName: "Jason Reed",
    contactEmail: "jreed@nextwavemedia.com",
    riskScore: 65,
    riskCategory: "High",
    reasonsSummary: "Grace Period payment failure; zero logins past 14 days",
    proposedAction: "Manager Account Recovery & Concierge Invoicing Support",
    actionType: "Billing & Invoicing Rescue",
    draftEmail: {
      subject: "Notice: Seamless Payment Resolution for NextWave Media Group",
      recipient: "jreed@nextwavemedia.com",
      sender: "sarah.lin@reviveai.io (Customer Success Lead)",
      body: `Hi Jason,\n\nWe noticed the automatic payment for your recent billing period could not be processed. We have extended your active grace period through October 25 to prevent any service interruptions.\n\nPlease reply or click here to update your payment details safely with our finance desk.\n\nWarm regards,\nSarah Lin`
    },
    outreachCount: 2,
    maxOutreach: 3,
    cooldownStatus: "Eligible for outreach",
    status: "approved",
    createdAt: "2026-10-08 18:00:00",
    decision: "Approved by Sarah Lin",
    decisionNotes: "Confirmed grace period extension with billing controller.",
    deliveryOutcome: "Sent via SendGrid SMTP (Message-ID: #sg-991204)"
  },
  {
    id: "ACT-395",
    customerId: "CUST-6590",
    customerName: "OmniCloud Analytics",
    contactName: "Marcus Vance",
    contactEmail: "marcus@omnicloud.io",
    riskScore: 48,
    riskCategory: "Medium",
    reasonsSummary: "Latency complaints; feature adoption plateaued",
    proposedAction: "Aggressive Renewal Discount Campaign",
    actionType: "Commercial Discount",
    draftEmail: {
      subject: "Immediate 30% Discount on OmniCloud Renewal",
      recipient: "marcus@omnicloud.io",
      sender: "sarah.lin@reviveai.io",
      body: `Special offer for OmniCloud...`
    },
    outreachCount: 0,
    maxOutreach: 3,
    cooldownStatus: "Eligible",
    status: "rejected",
    createdAt: "2026-10-07 10:00:00",
    decision: "Rejected by Sarah Lin",
    decisionNotes: "Customer issue is technical latency, not pricing. Discounting now weakens contractual posture.",
    deliveryOutcome: "Never sent (Enforced PRD Safeguard)"
  },
  {
    id: "ACT-390",
    customerId: "CUST-985",
    customerName: "Legacy Global Holdings",
    contactName: "Unknown Administrator",
    contactEmail: "ops@legacyholdings.net",
    riskScore: 55,
    riskCategory: "Medium",
    reasonsSummary: "Unverified location; inactive 26 days",
    proposedAction: "Automated Re-engagement Blast",
    actionType: "Compliance Audit",
    draftEmail: {
      subject: "Action Required: Complete Your Account Profile",
      recipient: "ops@legacyholdings.net",
      sender: "sarah.lin@reviveai.io",
      body: `Please verify your company location.`
    },
    outreachCount: 1,
    maxOutreach: 3,
    cooldownStatus: "Eligible",
    status: "failed",
    createdAt: "2026-10-06 12:00:00",
    decision: "Approved by Sarah Lin",
    decisionNotes: "Required for annual compliance validation.",
    deliveryOutcome: "Delivery Failed: SMTP 550 Mailbox does not exist (Retry queued)"
  },
  {
    id: "ACT-385",
    customerId: "CUST-3341",
    customerName: "CyberShield Security",
    contactName: "Robert Thorne",
    contactEmail: "r.thorne@cybershield.co.uk",
    riskScore: 42,
    riskCategory: "Medium",
    reasonsSummary: "Seat utilization drop -38%",
    proposedAction: "Onboarding Refresher & New Feature Walkthrough",
    actionType: "Educational Success Review",
    draftEmail: {
      subject: "ReviveAI Feature Release & Team Enablement Session",
      recipient: "r.thorne@cybershield.co.uk",
      sender: "sarah.lin@reviveai.io",
      body: `Hi Robert, sharing our Q3 enablement modules for your security engineers.`
    },
    outreachCount: 1,
    maxOutreach: 3,
    cooldownStatus: "Eligible",
    status: "completed",
    createdAt: "2026-10-04 14:30:00",
    decision: "Approved by Sarah Lin",
    decisionNotes: "Outreach delivered; client booked workshop session with CSM.",
    deliveryOutcome: "Delivered & Opened (Tracked Response: Meeting Booked)"
  }
];

// Collection: emailLogs
// Email delivery history (Section 8 & 9 & 15)
export const initialEmailLogs = [
  {
    id: "EMAIL-8801",
    actionId: "ACT-385",
    customerId: "CUST-3341",
    customerName: "CyberShield Security",
    recipient: "r.thorne@cybershield.co.uk",
    subject: "ReviveAI Feature Release & Team Enablement Session",
    status: "delivered", // 'delivered' | 'sent' | 'failed' | 'queued'
    attempt: 1,
    maxAttempts: 3,
    sentAt: "2026-10-04 14:35:10",
    responseReceived: true,
    errorDetails: null
  },
  {
    id: "EMAIL-8802",
    actionId: "ACT-398",
    customerId: "CUST-4189",
    customerName: "NextWave Media Group",
    recipient: "jreed@nextwavemedia.com",
    subject: "Notice: Seamless Payment Resolution for NextWave Media Group",
    status: "sent",
    attempt: 1,
    maxAttempts: 3,
    sentAt: "2026-10-08 18:05:40",
    responseReceived: false,
    errorDetails: null
  },
  {
    id: "EMAIL-8803",
    actionId: "ACT-390",
    customerId: "CUST-985",
    customerName: "Legacy Global Holdings",
    recipient: "ops@legacyholdings.net",
    subject: "Action Required: Complete Your Account Profile",
    status: "failed",
    attempt: 2,
    maxAttempts: 3,
    sentAt: "2026-10-06 12:05:00",
    responseReceived: false,
    errorDetails: "SMTP 550 Recipient domain rejects unknown addresses. Retry attempt #2 failed."
  }
];

// Collection: managerReports
// Scheduled manager reports generated every 12 hours (Section 9)
export const initialManagerReports = [
  {
    id: "REP-20261011-0800",
    period: "Oct 10, 2026 20:00 – Oct 11, 2026 08:00",
    generationTimestamp: "2026-10-11 08:00:15",
    deliveryStatus: "sent", // explicit: generated vs sent
    recipient: "sarah.lin@reviveai.io",
    summary: "Routine 12-hour manager digest. 2,840 distinct customers evaluated across MongoDB Atlas.",
    metrics: {
      distinctEvaluated: 2840,
      highRiskCount: 342,
      mediumRiskCount: 518,
      lowRiskCount: 1980,
      pendingApprovals: 24,
      approvedActions: 18,
      rejectedActions: 2,
      emailsDelivered: 17,
      deliveryFailures: 1
    },
    locationSummary: {
      "North America (US-West)": 780,
      "North America (US-East)": 640,
      "Europe (Germany)": 420,
      "Europe (UK)": 310,
      "Europe (Switzerland)": 180,
      "APAC (Japan)": 210,
      "APAC (India)": 150,
      "Latin America (Brazil)": 90,
      "Unverified": 60
    },
    executionTimeMs: 4120,
    workerId: "wk-revive-04"
  },
  {
    id: "REP-20261010-2000",
    period: "Oct 10, 2026 08:00 – Oct 10, 2026 20:00",
    generationTimestamp: "2026-10-10 20:00:12",
    deliveryStatus: "sent",
    recipient: "sarah.lin@reviveai.io",
    summary: "Evening digest. Apex Logistics flagged as high risk (Score 84). 1 retention draft prepared.",
    metrics: {
      distinctEvaluated: 2840,
      highRiskCount: 339,
      mediumRiskCount: 521,
      lowRiskCount: 1980,
      pendingApprovals: 22,
      approvedActions: 14,
      rejectedActions: 1,
      emailsDelivered: 14,
      deliveryFailures: 0
    },
    locationSummary: {
      "North America (US-West)": 780,
      "North America (US-East)": 640,
      "Europe (Germany)": 420,
      "Europe (UK)": 310,
      "Europe (Switzerland)": 180,
      "APAC (Japan)": 210,
      "APAC (India)": 150,
      "Latin America (Brazil)": 90,
      "Unverified": 60
    },
    executionTimeMs: 3890,
    workerId: "wk-revive-02"
  },
  {
    id: "REP-20261010-0800",
    period: "Oct 09, 2026 20:00 – Oct 10, 2026 08:00",
    generationTimestamp: "2026-10-10 08:00:20",
    deliveryStatus: "sent",
    recipient: "sarah.lin@reviveai.io",
    summary: "Morning digest. Beacon Health P1 latency ticket spike noted. High risk alert triggered.",
    metrics: {
      distinctEvaluated: 2839,
      highRiskCount: 335,
      mediumRiskCount: 524,
      lowRiskCount: 1980,
      pendingApprovals: 19,
      approvedActions: 16,
      rejectedActions: 3,
      emailsDelivered: 15,
      deliveryFailures: 1
    },
    locationSummary: {
      "North America (US-West)": 779,
      "North America (US-East)": 640,
      "Europe (Germany)": 420,
      "Europe (UK)": 310,
      "Europe (Switzerland)": 180,
      "APAC (Japan)": 210,
      "APAC (India)": 150,
      "Latin America (Brazil)": 90,
      "Unverified": 60
    },
    executionTimeMs: 4450,
    workerId: "wk-revive-01"
  }
];

// Collection: activityLogs
// Append-only audit trail (Section 9 & 15)
export const initialActivityLogs = [
  {
    id: "LOG-901",
    timestamp: "2026-10-11 08:00:15",
    eventType: "Report Generated",
    actor: "Cron Worker #wk-revive-04",
    customerId: "SYSTEM",
    status: "success",
    details: "Automated 12-hour manager digest REP-20261011-0800 generated and delivered to sarah.lin@reviveai.io"
  },
  {
    id: "LOG-902",
    timestamp: "2026-10-10 14:35:00",
    eventType: "Recommendation Created",
    actor: "ReviveAI Risk Engine v2.4",
    customerId: "CUST-8021",
    status: "success",
    details: "Detected high risk score (84). Generated retention recommendation ACT-401 for Apex Logistics Ltd."
  },
  {
    id: "LOG-903",
    timestamp: "2026-10-10 14:30:00",
    eventType: "Assessment Executed",
    actor: "ReviveAI Risk Engine v2.4",
    customerId: "CUST-8021",
    status: "success",
    details: "Evaluated 79,817 historical monthly activity records. Apex Logistics score updated to 84 (High Risk)."
  },
  {
    id: "LOG-904",
    timestamp: "2026-10-09 11:20:00",
    eventType: "Recommendation Created",
    actor: "ReviveAI Risk Engine v2.4",
    customerId: "CUST-7714",
    status: "success",
    details: "Generated technical SLA escalation recommendation ACT-402 for Beacon Health Systems."
  },
  {
    id: "LOG-905",
    timestamp: "2026-10-08 18:05:40",
    eventType: "Action Approved & Email Sent",
    actor: "Sarah Lin (Manager)",
    customerId: "CUST-4189",
    status: "success",
    details: "Manager approved billing recovery action ACT-398. Email dispatched via SendGrid to jreed@nextwavemedia.com."
  },
  {
    id: "LOG-906",
    timestamp: "2026-10-07 10:05:12",
    eventType: "Action Rejected",
    actor: "Sarah Lin (Manager)",
    customerId: "CUST-6590",
    status: "warning",
    details: "Manager rejected recommendation ACT-395. Rationale: Technical latency issue, premature to discount price."
  },
  {
    id: "LOG-907",
    timestamp: "2026-10-06 12:05:00",
    eventType: "Email Delivery Failed",
    actor: "Mail Delivery Worker",
    customerId: "CUST-985",
    status: "error",
    details: "Email delivery attempt #2 failed for ops@legacyholdings.net. SMTP 550 Mailbox does not exist."
  },
  {
    id: "LOG-908",
    timestamp: "2026-10-05 11:00:00",
    eventType: "Customer Updated",
    actor: "Sarah Lin (Manager)",
    customerId: "CUST-985",
    status: "success",
    details: "Manager edited customer profile. Marked prior assessment ASSESS-907 as review pending."
  }
];

// Scheduled Jobs status (Section 11 & 12: GET /api/jobs/status)
export const initialJobs = [
  {
    id: "JOB-01",
    name: "12-Hour Executive Risk Digest",
    schedule: "Every 12 hours (08:00, 20:00)",
    nextRun: "Today at 20:00:00",
    lastRun: "Today at 08:00:15",
    status: "Healthy",
    lastDuration: "4.1s",
    deliveryTarget: "Manager Email (sarah.lin@reviveai.io)"
  },
  {
    id: "JOB-02",
    name: "Risk Engine Assessment Batch",
    schedule: "Every 60 minutes",
    nextRun: "In 18 minutes",
    lastRun: "42 minutes ago",
    status: "Running",
    lastDuration: "12.3s",
    deliveryTarget: "MongoDB Atlas (riskAssessments)"
  },
  {
    id: "JOB-03",
    name: "Retention Outreach & Cooldown Worker",
    schedule: "Every 15 minutes",
    nextRun: "In 3 minutes",
    lastRun: "12 minutes ago",
    status: "Healthy",
    lastDuration: "0.8s",
    deliveryTarget: "SMTP Gateway (SendGrid)"
  }
];
