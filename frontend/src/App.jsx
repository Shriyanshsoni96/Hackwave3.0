import React from 'react';
import { ReviveProvider, useRevive } from './context/ReviveContext';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import OverviewDashboard from './components/overview/OverviewDashboard';
import RiskDetectionCenter from './components/risks/RiskDetectionCenter';
import CustomerDirectory from './components/customers/CustomerDirectory';
import CustomerProfileModal from './components/customers/CustomerProfileModal';
import AddCustomerModal from './components/customers/AddCustomerModal';
import EditCustomerModal from './components/customers/EditCustomerModal';
import CsvImportModal from './components/customers/CsvImportModal';
import ApprovalCenter from './components/approvals/ApprovalCenter';
import ReportsView from './components/reports/ReportsView';
import ActivityLogsView from './components/audit/ActivityLogsView';
import SettingsView from './components/settings/SettingsView';
import ToastContainer from './components/common/Toast';

function DashboardContent() {
  const { activeTab } = useRevive();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Persistent Left Sidebar (PRD Section 3 & 13) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <OverviewDashboard />}
            {activeTab === 'risks' && <RiskDetectionCenter />}
            {activeTab === 'customers' && <CustomerDirectory />}
            {activeTab === 'approvals' && <ApprovalCenter />}
            {activeTab === 'reports' && <ReportsView />}
            {activeTab === 'audit' && <ActivityLogsView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <CustomerProfileModal />
      <AddCustomerModal />
      <EditCustomerModal />
      <CsvImportModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ReviveProvider>
      <DashboardContent />
    </ReviveProvider>
  );
}
