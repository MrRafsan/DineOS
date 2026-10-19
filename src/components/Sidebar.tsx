import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  Clock,
  FileText,
  Calendar,
  Grid,
  FolderTree,
  UtensilsCrossed,
  Layers,
  Calculator,
  ReceiptText,
  Wallet,
  ChefHat,
  Boxes,
  ShoppingCart,
  Wheat,
  Truck,
  Monitor,
  Tv,
  Users,
  BadgeDollarSign,
  Megaphone,
  Building,
  UserCheck,
  Briefcase,
  Wrench,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  X,
} from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { ActiveNavView } from '../types/pos';

interface NavItem {
  id: ActiveNavView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const {
    activeNavView,
    setActiveNavView,
    sidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    orders,
    settings,
    showToast,
  } = usePOS();

  const [expandedSubmenus, setExpandedSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (menuId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubmenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleNavClick = (viewId: ActiveNavView) => {
    setActiveNavView(viewId);
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(false);
    }
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pos_order', label: 'POS Order', icon: ShoppingBag },
    { id: 'order_history', label: 'Order History', icon: ListOrdered },
    { id: 'work_period', label: 'Work Period', icon: Clock },
    { id: 'reports', label: 'Reports', icon: FileText, hasSubmenu: true },
    { id: 'reservation', label: 'Reservation', icon: Calendar },
    { id: 'tables', label: 'Tables', icon: Grid },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'food_items', label: 'Food Items', icon: UtensilsCrossed },
    { id: 'combined', label: 'Combined', icon: Layers, hasSubmenu: true },
    { id: 'estimator', label: 'Estimator', icon: Calculator },
    { id: 'accounting', label: 'Accounting', icon: ReceiptText },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
    { id: 'preparation', label: 'Preparation', icon: ChefHat },
    { id: 'stocks', label: 'Stocks', icon: Boxes },
    { id: 'purchases', label: 'Purchases', icon: ShoppingCart },
    { id: 'ingredients', label: 'Ingredients', icon: Wheat },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'kds', label: 'K.D.S', icon: Monitor, badge: orders.length },
    { id: 'cds', label: 'C.D.S', icon: Tv },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: BadgeDollarSign },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'branches', label: 'Branches', icon: Building },
    { id: 'role_access', label: 'Role Access', icon: UserCheck },
    { id: 'hrm', label: 'HRM', icon: Briefcase, hasSubmenu: true },
    { id: 'assets', label: 'Assets', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  // Dynamic user profile: ZEVOOX / Owner (customizable for any restaurant)
  const ownerName = 'ZEVOOX';
  const ownerRole = 'Owner';
  const avatarLetter = ownerName.charAt(0);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Container: Drawer on mobile (< md), in-flow on desktop (md+) */}
      <aside
        className={`bg-[#070c1e] border-r border-[#141f3d] flex flex-col h-full min-h-0 select-none transition-all duration-200 z-50
          fixed inset-y-0 left-0 w-64 max-w-[80vw] shadow-2xl ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }
          md:static md:translate-x-0 md:z-20 md:shadow-none ${
            sidebarCollapsed ? 'md:w-14' : 'md:w-[168px]'
          } shrink-0`}
      >
        {/* Mobile Header: brand + close button */}
        <div className="flex md:hidden items-center justify-between px-3 py-3 border-b border-[#141f3d] bg-[#090f24]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CP</span>
            </div>
            <span className="text-xs font-bold text-white tracking-wide">Menu Navigation</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation List: only the menu items scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-1.5 px-1.5 space-y-0.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavView === item.id;
            const isExpanded = !!expandedSubmenus[item.id];

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-2 md:py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#121f44] text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#0d162f]'
                  } ${sidebarCollapsed ? 'md:justify-center md:px-1' : 'justify-between'}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {/* Always visible on mobile drawer, toggleable on desktop */}
                    <span className={`truncate tracking-normal text-[12px] whitespace-nowrap ${
                      sidebarCollapsed ? 'md:hidden' : 'inline'
                    }`}>
                      {item.label}
                    </span>
                  </div>

                  <div className={`flex items-center gap-1 shrink-0 ${
                    sidebarCollapsed ? 'md:hidden' : 'flex'
                  }`}>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-rose-600 text-white text-[9.5px] font-bold px-1.5 py-0.2 rounded-full font-mono-numbers">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu && (
                      <div
                        onClick={(e) => toggleSubmenu(item.id, e)}
                        className="p-0.5 hover:bg-[#1f2f5c] rounded text-slate-400 hover:text-white"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </button>

                {/* Collapsed Badge Indicator for desktop */}
                {sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="hidden md:block absolute top-1 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </div>
            );
          })}
        </div>

        {/* Permanently Fixed Bottom Section: Log Out + ZEVOOX Owner (Never scrolls away) */}
        <div className="p-2 border-t border-[#141f3d] bg-[#060a19] space-y-1 shrink-0">
          {/* Log Out Button */}
          <button
            onClick={() => {
              showToast('Current restaurant session closed. LocalStorage state preserved.', 'info');
              if (window.innerWidth < 768) setMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 text-xs text-rose-500 hover:text-rose-400 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-950/30 w-full transition-colors ${
              sidebarCollapsed ? 'md:justify-center md:px-1' : ''
            }`}
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 text-rose-500" />
            <span className={`text-[12px] whitespace-nowrap ${sidebarCollapsed ? 'md:hidden' : 'inline'}`}>
              Log Out
            </span>
          </button>

          {/* User Card: ZEVOOX Owner (Pinned at bottom, adaptable for any restaurant) */}
          <div
            onClick={() => {
              handleNavClick('settings');
            }}
            className={`flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#0d162f] cursor-pointer transition-colors ${
              sidebarCollapsed ? 'md:justify-center' : ''
            }`}
            title={`${ownerName} - ${ownerRole}`}
          >
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-inner">
              {avatarLetter}
            </div>
            <div className={`min-w-0 flex-1 overflow-hidden ${sidebarCollapsed ? 'md:hidden' : 'block'}`}>
              <div className="text-xs font-bold text-white tracking-wide truncate leading-tight">
                {ownerName}
              </div>
              <div className="text-[10px] text-slate-400 truncate leading-tight">
                {ownerRole}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
