# ReviveAI — Manager Dashboard & Retention Platform (MVP v2.0)

> **Customer Intelligence • Risk Detection • Approved Retention Workflows**

ReviveAI is an AI-powered customer-retention and revenue-operations platform designed for Managers and Customer Success Managers (CSMs). It helps managers identify customers who may stop purchasing or renewing, understand the evidence behind that risk, choose appropriate retention actions, and monitor what happens next.

---

## 🛠️ Tech Stack (Adheres to PRD v2.0)

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Visualization**: Recharts (Risk distribution bar chart & monthly trends)
- **Icons**: Lucide React
- **Design Direction**: Premium light-mode B2B SaaS UI
  - **Deep Navy**: `#14213D` (Sidebar, primary text on light backgrounds)
  - **Indigo**: `#4F46E5` (Primary buttons, active navigation, links)
  - **Soft Indigo**: `#EEF2FF` (Selected states, subtle highlighted panels)
  - **Teal**: `#0F766E` (Secondary accent, healthy/positive trends)
  - **Page Background**: `#F8FAFC`
  - **Card Surface**: `#FFFFFF`
  - **Border**: `#E2E8F0`
  - **Primary Text**: `#0F172A`
  - **Secondary Text**: `#64748B`
  - **Semantic Risk Tokens**:
    - **High Risk**: `#DC2626` (Score 60–100: *Prioritize investigation*)
    - **Medium Risk**: `#D97706` (Score 30–59: *Review and consider engagement*)
    - **Low Risk**: `#15803D` (Score 0–29: *Routine monitoring*)
    - **Warning**: `#B45309`
    - **Error**: `#B91C1C`

---

## 🧭 Navigation & Modules (Section 3)

1. **Overview Dashboard**:
   - 5 KPI Cards: Total Customers (2,840 distinct accounts / 79,817 monthly records), High-Risk Customers, Requiring Attention, Pending Approvals, Actions Completed.
   - Customer Risk Distribution chart with exact semantic risk tokens.
   - Location-Wise Risk breakdown (verified locations strictly counted; no inferred locations).
   - Historical Risk Trend over time.
   - Priority Attention Queue with direct customer profile inspection.
   - Live append-only audit stream.

2. **Risk Detection Center**:
   - Shows **one row per distinct customer** using their latest valid assessment (not per monthly activity record).
   - Rich filter toolbar: Risk Category, Score Range, Location, Subscription Tier, Action Status, and Customer ID search.
   - Sortable columns, server-side styled pagination.
   - Configurable score bands callout with strict calibration disclaimer.
   - Batch "Trigger Assessment Run" action (`POST /api/risk-assessments/run`).

3. **Customer Management**:
   - Distinct customer directory with search, tier, and location filters.
   - **Add Customer Modal**: Manual customer entry with client & server-side validation and duplicate ID check.
   - **Edit Customer Modal**: Permitted field modification, editor signature recording (`Sarah Lin`), marks prior assessment as STALE, with optional immediate recalculation.
   - **CSV Batch Import Modal**: Schema-aware ingestion, column mapping preview, duplicate detection, and import summary.

4. **Customer Intelligence Profile**:
   - Deep 360° modal view answering the 5 core MVP questions:
     1. *Who is this customer?*
     2. *Why are they at risk?*
     3. *What happened over time?*
     4. *What has ReviveAI done?*
     5. *What should happen next?*
   - Profile Header with freshness, SLA priority, and actions (Edit, Recalculate Risk, View History).
   - "Reasons Behind the Risk" section with feature contribution impact (`+35 pts`, `+25 pts`, etc.).
   - Chronological monthly telemetry from `user_monthly` collection.
   - Assessment and retention history with previous outreach counts and cooldown indicators.
   - Recommended Action Panel with full draft email preview and Approve / Reject controls.

5. **Approval Center**:
   - 5 Dedicated Workflow Tabs: `Pending`, `Approved`, `Rejected`, `Delivery Failed`, `Completed`.
   - Outreach limit enforcement: Maximum 3 warning emails per customer.
   - 14-day mandatory cooldown window tracking.
   - Manager decision confirmation modal capturing rejection rationale for audit logging.
   - Strict safeguard: Rejected actions are suppressed and never sent.

6. **Executive Reports**:
   - Automated 12-hour manager digest schedule.
   - "Generate Report Now" on-demand action.
   - Explicitly distinguishes `generated`, `queued`, `sent`, and `failed` delivery states.
   - Full printable report drawer with location summary and metric breakdowns.

7. **Activity Logs**:
   - Append-only audit trail capturing customer mutations, risk evaluations, manager decisions, and email outcomes.
   - Search and filters by event type, status, and customer ID.

8. **Settings**:
   - Manager profile configuration (Sarah Lin, CS Lead).
   - Configurable risk thresholds (Low, Medium, High).
   - Retention safeguards (Max emails, Cooldown days).
   - MongoDB Atlas architecture status (79,817 records mapped).

---

## 🚀 Getting Started

```bash
# Navigate to the project directory
cd C:\Users\vansh\.gemini\antigravity\scratch\revops-agent-frontend

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
