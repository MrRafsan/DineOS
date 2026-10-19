import React, { useState } from 'react';
import { 
  Menu, 
  Globe, 
  Maximize2, 
  Minimize2, 
  Moon, 
  Sun, 
  Calculator, 
  ChevronDown, 
  Flame, 
  X,
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { BRANCH_LIST } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    activeBranch,
    setActiveBranch,
    activeNavView,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    isBannerDismissed,
    setIsBannerDismissed,
    setIsCalculatorOpen,
    settings,
    resetToDemoData,
    setActiveNavView,
    showToast,
  } = usePOS();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleHamburgerClick = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const getViewTitle = () => {
    switch (activeNavView) {
      case 'pos_order':
        return 'POS';
      case 'dashboard':
        return 'Dashboard';
      case 'order_history':
        return 'Order History';
      case 'work_period':
        return 'Work Period';
      case 'reports':
        return 'Reports';
      case 'reservation':
        return 'Reservation';
      case 'tables':
        return 'Tables';
      case 'categories':
        return 'Categories';
      case 'food_items':
        return 'Food Items';
      case 'combined':
        return 'Combined';
      case 'estimator':
        return 'Estimator';
      case 'accounting':
        return 'Accounting';
      case 'expenses':
        return 'Expenses';
      case 'preparation':
        return 'Preparation';
      case 'stocks':
        return 'Stocks';
      case 'purchases':
        return 'Purchases';
      case 'ingredients':
        return 'Ingredients';
      case 'suppliers':
        return 'Suppliers';
      case 'kds':
        return 'Kitchen Display (K.D.S)';
      case 'cds':
        return 'Customer Display (C.D.S)';
      case 'customers':
        return 'Customers';
      case 'subscription':
        return 'Subscription';
      case 'marketing':
        return 'Marketing';
      case 'branches':
        return 'Branches';
      case 'role_access':
        return 'Role Access';
      case 'hrm':
        return 'HRM';
      case 'assets':
        return 'Assets';
      case 'settings':
        return 'Settings';
      case 'help':
        return 'Help & Support';
      default:
        return 'POS';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shrink-0">

      {/* Main Top Bar */}
      <div className="bg-[#090f22] border-b border-[#17254b] px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo + Hamburger Toggle + Section Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={handleHamburgerClick}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#152347] transition-colors shrink-0"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* DineOS Brand */}
          <div 
            onClick={() => setActiveNavView('pos_order')}
            className="flex items-center gap-1.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 flex items-center justify-center shadow-md shadow-emerald-950/40">
              <Flame className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex items-center tracking-tight font-extrabold text-base sm:text-lg text-white">
              <span>Dine</span>
              <span className="text-[#22C55E]">OS</span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-700/60 mx-0.5 hidden sm:block shrink-0" />

          {/* Page Title */}
          <h1 className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-normal truncate max-w-[90px] sm:max-w-xs md:max-w-none">
            {getViewTitle()}
          </h1>
        </div>

        {/* Right Tools & Branch Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Reset Demo Data shortcut */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 bg-[#121c38] hover:bg-[#1a2850] px-2.5 py-1.5 rounded-lg border border-slate-800 transition-colors"
            title="Reset to DineOS Demo State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Quick Cashier Calculator */}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#152347] border border-transparent hover:border-slate-700 transition-colors"
            title="Cashier Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="hidden sm:flex p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#152347] border border-transparent hover:border-slate-700 transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#152347] border border-transparent hover:border-slate-700 transition-colors"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Online / Globe Status */}
          <div className="hidden sm:flex p-1.5 sm:p-2 rounded-lg text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 items-center justify-center" title="System Online">
            <Globe className="w-4 h-4" />
          </div>

          {/* Branch Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
              className="flex items-center gap-1 sm:gap-2 bg-[#101b38] hover:bg-[#16254e] text-slate-100 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-lg border border-[#1e3260] transition-colors max-w-[110px] sm:max-w-none"
            >
              <span className="truncate">{activeBranch}</span>
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
            </button>

            {isBranchDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-[#0e172e] border border-slate-700 rounded-lg shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                  Select Branch
                </div>
                {BRANCH_LIST.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => {
                      setActiveBranch(branch);
                      setIsBranchDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                      activeBranch === branch
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-200 hover:bg-[#17254b]'
                    }`}
                  >
                    <span>{branch}</span>
                    {activeBranch === branch && <span className="text-[10px]">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscription / Payment Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-md rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">DineOS AI Subscription</h3>
              </div>
              <button 
                onClick={() => setShowSubscriptionModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="p-3 bg-[#152347] rounded-lg border border-[#21356b]">
                <div className="text-xs text-slate-400">Current Plan</div>
                <div className="text-base font-bold text-white">Restaurant Professional (Annual)</div>
                <div className="text-xs text-amber-400 mt-1 font-medium">Expires in 1 day 0 hour 43 min</div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Branch:</span>
                  <span className="font-semibold text-white">{activeBranch}</span>
                </div>
                <div className="flex justify-between">
                  <span>Renewal Fee:</span>
                  <span className="font-semibold text-emerald-400">BDT 12,000 / Year</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Helpline:</span>
                  <span className="font-semibold text-white">{settings.salesPhone}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-400 mb-3">Pay via bKash / Nagad Merchant or Card to renew seamlessly.</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      showToast('bKash Payment Gateway: Subscription renewed for +365 days!', 'success');
                      setShowSubscriptionModal(false);
                      setIsBannerDismissed(true);
                    }}
                    className="w-full py-2 bg-[#D12053] hover:bg-[#b01642] text-white font-semibold text-xs rounded-lg transition-colors text-center"
                  >
                    Pay with bKash
                  </button>
                  <button
                    onClick={() => {
                      showToast('Nagad Payment Gateway: Subscription renewed for +365 days!', 'success');
                      setShowSubscriptionModal(false);
                      setIsBannerDismissed(true);
                    }}
                    className="w-full py-2 bg-[#F7931E] hover:bg-[#d67e15] text-white font-semibold text-xs rounded-lg transition-colors text-center"
                  >
                    Pay with Nagad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl">
            <h3 className="font-bold text-base text-white mb-2">Reset Demo Data?</h3>
            <p className="text-xs text-slate-300 mb-4">
              This will restore the exact tables, active orders (BDT 438, BDT 300, BDT 700, etc.), and menu items from your original screenshot.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 rounded-lg font-medium"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
