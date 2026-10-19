'use client';

import React from 'react';
import { POSProvider, usePOS } from '../../src/context/POSContext';
import { Header } from '../../src/components/Header';
import { Sidebar } from '../../components/Sidebar';
import { OrderTypeSelector } from '../../src/components/OrderTypeSelector';
import { TableGrid } from '../../src/components/TableGrid';
import { POSOrderingModal } from '../../src/components/POSOrderingModal';
import { TableOrderModal } from '../../src/components/TableOrderModal';
import { PaymentModal } from '../../src/components/PaymentModal';
import { ReceiptModal } from '../../src/components/ReceiptModal';
import { QuickCalculatorModal } from '../../src/components/QuickCalculatorModal';
import { ToastNotification } from '../../src/components/ToastNotification';

// Import all subviews
import { DashboardView } from '../../src/components/views/DashboardView';
import { OrderHistoryView } from '../../src/components/views/OrderHistoryView';
import { KDSView } from '../../src/components/views/KDSView';
import { FoodItemsView } from '../../src/components/views/FoodItemsView';
import { WorkPeriodView } from '../../src/components/views/WorkPeriodView';
import { ExpensesView } from '../../src/components/views/ExpensesView';
import { ReportsView } from '../../src/components/views/ReportsView';
import { ReservationView } from '../../src/components/views/ReservationView';
import { CategoriesView } from '../../src/components/views/CategoriesView';
import { CustomersView } from '../../src/components/views/CustomersView';
import { StocksView } from '../../src/components/views/StocksView';
import { PurchasesView } from '../../src/components/views/PurchasesView';
import { IngredientsView } from '../../src/components/views/IngredientsView';
import { SuppliersView } from '../../src/components/views/SuppliersView';
import { PreparationView } from '../../src/components/views/PreparationView';
import { AccountingView } from '../../src/components/views/AccountingView';
import { EstimatorView } from '../../src/components/views/EstimatorView';
import { CombinedView } from '../../src/components/views/CombinedView';
import { CDSView } from '../../src/components/views/CDSView';
import { SubscriptionView } from '../../src/components/views/SubscriptionView';
import { MarketingView } from '../../src/components/views/MarketingView';
import { BranchesView } from '../../src/components/views/BranchesView';
import { SettingsView } from '../../src/components/views/SettingsView';

const DashboardMainContent: React.FC = () => {
  const { activeNavView, setActiveNavView } = usePOS();

  const renderActiveView = () => {
    switch (activeNavView) {
      case 'pos_order':
        return (
          <div className="space-y-4">
            <OrderTypeSelector />
            <TableGrid />
          </div>
        );
      case 'dashboard':
        return <DashboardView />;
      case 'order_history':
        return <OrderHistoryView />;
      case 'kds':
        return <KDSView />;
      case 'food_items':
        return <FoodItemsView />;
      case 'work_period':
        return <WorkPeriodView />;
      case 'expenses':
        return <ExpensesView />;
      case 'reports':
        return <ReportsView />;
      case 'reservation':
        return <ReservationView />;
      case 'categories':
        return <CategoriesView />;
      case 'customers':
        return <CustomersView />;
      case 'stocks':
        return <StocksView />;
      case 'purchases':
        return <PurchasesView />;
      case 'ingredients':
        return <IngredientsView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'preparation':
        return <PreparationView />;
      case 'accounting':
        return <AccountingView />;
      case 'estimator':
        return <EstimatorView />;
      case 'combined':
        return <CombinedView />;
      case 'cds':
        return <CDSView />;
      case 'subscription':
        return <SubscriptionView />;
      case 'marketing':
        return <MarketingView />;
      case 'branches':
        return <BranchesView />;
      case 'settings':
        return <SettingsView />;
      case 'tables':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#16234b]">
              <div>
                <h2 className="text-base font-bold text-white">Floor & Tables Management</h2>
                <p className="text-xs text-slate-400">View real-time table statuses, capacity, and live orders</p>
              </div>
              <button
                onClick={() => setActiveNavView('pos_order')}
                className="text-xs text-sky-400 hover:underline font-semibold"
              >
                Go to POS Grid →
              </button>
            </div>
            <TableGrid />
          </div>
        );
      default:
        return (
          <div className="bg-[#0e1738] border border-[#1b2b54] rounded-2xl p-8 text-center max-w-xl mx-auto my-12 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center mx-auto text-xl font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-white capitalize">
              {activeNavView.replace('_', ' ')} Management
            </h3>
            <p className="text-xs text-slate-400">
              Module active in DineOS session mode. You can configure orders, manage floors, and view real-time operations.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => setActiveNavView('pos_order')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
              >
                Back to POS Orders
              </button>
              <button
                onClick={() => setActiveNavView('dashboard')}
                className="px-4 py-2 bg-[#172554] hover:bg-[#1e3a8a] text-sky-300 rounded-xl text-xs font-bold transition-colors"
              >
                View Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5 custom-scrollbar bg-[#080d1a]">
      {renderActiveView()}

      {/* Global POS Modals */}
      <POSOrderingModal />
      <TableOrderModal />
      <PaymentModal />
      <ReceiptModal />
      <QuickCalculatorModal />
      <ToastNotification />
    </main>
  );
};

export default function DashboardPage() {
  return (
    <POSProvider>
      <div className="h-screen w-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
        <Header />
        <div className="flex-1 min-h-0 flex overflow-hidden">
          <Sidebar />
          <DashboardMainContent />
        </div>
      </div>
    </POSProvider>
  );
}
