import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronDown,
  HelpCircle,
  Utensils,
  Bike,
  CupSoda,
  Brain,
  Star,
  Banknote,
  CreditCard,
  Smartphone,
  QrCode,
  Gift,
  FileEdit,
  ArrowUpDown,
  X,
} from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const DashboardView: React.FC = () => {
  const { orders, orderHistory } = usePOS();

  const [dateRangePreset, setDateRangePreset] = useState<string>('Today');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showGrowthModal, setShowGrowthModal] = useState<boolean>(false);
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Active / Running Orders
  const runningOrders = useMemo(() => orders.filter((o) => o.status === 'active'), [orders]);
  const runningOrdersCount = runningOrders.length;
  const runningSalesTotal = runningOrders.reduce((sum, o) => sum + o.total, 0);

  // Settled / Completed Orders
  const settledOrders = useMemo(
    () => orderHistory.filter((o) => o.status === 'completed'),
    [orderHistory]
  );
  const settledOrdersCount = settledOrders.length;
  const settledGrossSales = settledOrders.reduce((sum, o) => sum + o.total, 0);
  const settledSubTotal = settledOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const settledDiscount = settledOrders.reduce((sum, o) => sum + (o.discountValue || 0), 0);
  const settledVAT = settledOrders.reduce((sum, o) => sum + (o.vatAmount || 0), 0);

  // Breakdown by Order Type
  const dineInOrders = settledOrders.filter((o) => o.type === 'dine_in');
  const dineInAmount = dineInOrders.reduce((sum, o) => sum + o.total, 0);

  const deliveryOrders = settledOrders.filter((o) => o.type === 'delivery');
  const deliveryAmount = deliveryOrders.reduce((sum, o) => sum + o.total, 0);

  const takeawayOrders = settledOrders.filter((o) => o.type === 'takeaway');
  const takeawayAmount = takeawayOrders.reduce((sum, o) => sum + o.total, 0);

  const foodpandaOrders = settledOrders.filter((o) => o.type === 'foodpanda');
  const foodpandaAmount = foodpandaOrders.reduce((sum, o) => sum + o.total, 0);

  const pathaoOrders = settledOrders.filter((o) => o.type === 'pathao');
  const pathaoAmount = pathaoOrders.reduce((sum, o) => sum + o.total, 0);

  const foodiOrders = settledOrders.filter((o) => o.type === 'foodi');
  const foodiAmount = foodiOrders.reduce((sum, o) => sum + o.total, 0);

  // Breakdown by Payment Methods
  const paymentMethodsList = useMemo(() => {
    const methods = [
      {
        id: 'Cash',
        name: 'Cash',
        icon: Banknote,
        iconColor: 'text-emerald-400',
        orders: settledOrders.filter((o) => (o.paymentMethod || 'Cash') === 'Cash').length,
        amount: settledOrders
          .filter((o) => (o.paymentMethod || 'Cash') === 'Cash')
          .reduce((sum, o) => sum + o.total, 0),
      },
      {
        id: 'Visa',
        name: 'Visa',
        icon: CreditCard,
        iconColor: 'text-blue-400',
        orders: settledOrders.filter((o) => o.paymentMethod === 'Card' && o.paymentDetails?.method?.includes('Visa')).length,
        amount: 0,
      },
      {
        id: 'Amex',
        name: 'Amex',
        icon: CreditCard,
        iconColor: 'text-sky-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Mastercard',
        name: 'Mastercard',
        icon: CreditCard,
        iconColor: 'text-orange-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Bkash',
        name: 'Bkash',
        icon: Smartphone,
        iconColor: 'text-[#D12053]',
        orders: settledOrders.filter((o) => o.paymentMethod === 'bKash').length,
        amount: settledOrders
          .filter((o) => o.paymentMethod === 'bKash')
          .reduce((sum, o) => sum + o.total, 0),
      },
      {
        id: 'Nagad',
        name: 'Nagad',
        icon: Smartphone,
        iconColor: 'text-[#F7931E]',
        orders: settledOrders.filter((o) => o.paymentMethod === 'Nagad').length,
        amount: settledOrders
          .filter((o) => o.paymentMethod === 'Nagad')
          .reduce((sum, o) => sum + o.total, 0),
      },
      {
        id: 'Rocket',
        name: 'Rocket',
        icon: Smartphone,
        iconColor: 'text-purple-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Pathao',
        name: 'Pathao',
        icon: Bike,
        iconColor: 'text-red-500',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Foodpanda',
        name: 'Foodpanda',
        icon: Gift,
        iconColor: 'text-pink-500',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Foodi',
        name: 'Foodi',
        icon: Gift,
        iconColor: 'text-red-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Bangla QR',
        name: 'Bangla QR',
        icon: QrCode,
        iconColor: 'text-teal-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Other',
        name: 'Other',
        icon: CreditCard,
        iconColor: 'text-slate-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Complimentary',
        name: 'Complimentary',
        subName: '(Excluded From Sales)',
        hasHelp: true,
        icon: Gift,
        iconColor: 'text-indigo-400',
        orders: 0,
        amount: 0,
      },
      {
        id: 'Due',
        name: 'Due',
        icon: FileEdit,
        iconColor: 'text-amber-400',
        orders: 0,
        amount: 0,
      },
    ];

    if (sortAsc) {
      return [...methods].sort((a, b) => a.amount - b.amount);
    }
    return methods;
  }, [settledOrders, sortAsc]);

  // Aggregate Top Selling Items
  const topSellingItems = useMemo(() => {
    const itemMap = new Map<
      string,
      { name: string; category: string; qty: number; complimentary: number; total: number }
    >();

    // Process from settled orders
    settledOrders.forEach((ord) => {
      ord.items.forEach((item) => {
        const existing = itemMap.get(item.name);
        const itemCat =
          item.name.toLowerCase().includes('burger')
            ? 'Burgers'
            : item.name.toLowerCase().includes('pizza') || item.name.toLowerCase().includes('pasta')
            ? 'Pizza & Pasta'
            : item.name.toLowerCase().includes('biryani')
            ? 'Rice & Biryani'
            : item.name.toLowerCase().includes('coffee') || item.name.toLowerCase().includes('lemonade')
            ? 'Beverages & Coffee'
            : item.name.toLowerCase().includes('brownie')
            ? 'Desserts'
            : 'Appetizers & Sides';

        if (existing) {
          existing.qty += item.quantity;
          existing.total += item.price * item.quantity;
        } else {
          itemMap.set(item.name, {
            name: item.name,
            category: itemCat,
            qty: item.quantity,
            complimentary: 0,
            total: item.price * item.quantity,
          });
        }
      });
    });

    return Array.from(itemMap.values()).sort((a, b) => b.total - a.total);
  }, [settledOrders]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Date Filter Bar matching screenshot */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Date display input / button */}
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex items-center gap-2 bg-[#0d162e] hover:bg-[#121c3b] text-slate-200 border border-[#1b2b54] px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Oct 15, 2026 - Oct 15, 2026</span>
        </button>

        {/* Preset dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 bg-[#0d162e] hover:bg-[#121c3b] text-slate-200 border border-[#1b2b54] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors min-w-[100px] justify-between shadow-sm"
          >
            <span>{dateRangePreset}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-1 w-36 bg-[#0e1738] border border-slate-700 rounded-lg shadow-2xl py-1 z-50">
              {['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'All Time'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setDateRangePreset(preset);
                    setShowDatePicker(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                    dateRangePreset === preset
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-300 hover:bg-[#152349]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TOP SECTION: 4 CARDS GRID (2x2 on desktop, clean responsive on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CARD 1: Settled Gross Sales & Orders (KPI Overview) */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#18264c]/60">
              <span className="text-xs font-bold text-white tracking-wide">
                Sales Overview
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
            </div>

            {/* Top Row: 4 Metric Columns (responsive 2-col on mobile, 4-col on sm+) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-1">
              {/* Settled Gross Sales */}
              <div>
                <div className="text-[11px] font-medium text-slate-400 leading-tight">
                  Settled Gross Sales
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers mt-1 leading-tight">
                  {settledGrossSales.toLocaleString()}
                </div>
                <div className="text-xs font-extrabold text-white">BDT</div>
              </div>

              {/* Settled Orders */}
              <div>
                <div className="text-[11px] font-medium text-slate-400 leading-tight">
                  Settled Orders
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers mt-1 leading-tight">
                  {settledOrdersCount}
                </div>
              </div>

              {/* Running Sales */}
              <div>
                <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Running Sales</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-numbers mt-1 leading-tight">
                  {runningSalesTotal.toLocaleString()}
                </div>
                <div className="text-xs font-extrabold text-emerald-400">BDT</div>
              </div>

              {/* Running Orders */}
              <div>
                <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Running Orders</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-numbers mt-1 leading-tight">
                  {runningOrdersCount}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Average Order Value stat bar */}
          <div className="pt-3 border-t border-[#18264c]/60 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Avg. Order Value</span>
            <span className="text-white font-mono-numbers font-bold">
              {settledOrdersCount > 0 ? Math.round(settledGrossSales / settledOrdersCount).toLocaleString() : 0} BDT
            </span>
          </div>
        </div>

        {/* CARD 2: Settled Sales Breakdown & Revenue Growth */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4">
          {/* Settled Sales Breakdown (2x2 Grid) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1 text-xs font-bold text-white tracking-wide">
              <span>Settled Sales Breakdown</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Sub Total</span>
                <span className="text-white font-extrabold font-mono-numbers text-sm">
                  {settledSubTotal.toLocaleString()} BDT
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">VAT</span>
                <span className="text-white font-extrabold font-mono-numbers text-sm">
                  {settledVAT.toLocaleString()} BDT
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Discount</span>
                <span className="text-white font-extrabold font-mono-numbers text-sm">
                  {settledDiscount.toLocaleString()} BDT
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Rounding</span>
                <span className="text-white font-extrabold font-mono-numbers text-sm">
                  0 BDT
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#18264c]" />

          {/* Revenue Growth Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-slate-300" />
                <span className="text-xs font-bold text-white">Revenue Growth</span>
              </div>
              <button
                onClick={() => setShowGrowthModal(true)}
                className="text-[11px] font-semibold text-slate-300 hover:text-white bg-[#121c38] hover:bg-[#1a2850] px-3 py-1 rounded-lg border border-slate-700 transition-colors"
              >
                View Details
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-mono-numbers font-semibold">0 (0)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">Daily Target</span>
            </div>

            {/* Tri-color progress meter matching screenshot */}
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
              <div className="bg-[#10b981] h-full" style={{ width: '65%' }} />
              <div className="bg-[#f59e0b] h-full" style={{ width: '15%' }} />
              <div className="bg-[#ef4444] h-full" style={{ width: '20%' }} />
            </div>
          </div>
        </div>

        {/* CARD 3: Settled Breakdown by Type */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-4 sm:p-5 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-white tracking-wide mb-2">
              Settled Breakdown by Type
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 text-[11px] font-medium border-b border-[#18264c]/60 pb-1">
                    <th className="text-left font-medium pb-1.5">Type</th>
                    <th className="text-center font-medium pb-1.5">Orders</th>
                    <th className="text-right font-medium pb-1.5">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
                  {/* Dine In */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-900 shrink-0">
                        <Utensils className="w-3 h-3 text-slate-900" />
                      </div>
                      <span className="font-semibold text-white">Dine In</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {dineInOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {dineInAmount.toLocaleString()}
                    </td>
                  </tr>

                  {/* Delivery */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#121c38] border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                        <Bike className="w-3 h-3" />
                      </div>
                      <span>Delivery</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {deliveryOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {deliveryAmount.toLocaleString()}
                    </td>
                  </tr>

                  {/* Takeaway */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#121c38] border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                        <CupSoda className="w-3 h-3" />
                      </div>
                      <span>Takeaway</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {takeawayOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {takeawayAmount.toLocaleString()}
                    </td>
                  </tr>

                  {/* Foodpanda */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#D70F64] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        🐼
                      </div>
                      <span>Foodpanda</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {foodpandaOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {foodpandaAmount.toLocaleString()}
                    </td>
                  </tr>

                  {/* Pathao */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E52928] flex items-center justify-center text-white text-[10px] font-black shrink-0">
                        P
                      </div>
                      <span>Pathao</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {pathaoOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {pathaoAmount.toLocaleString()}
                    </td>
                  </tr>

                  {/* Foodi */}
                  <tr>
                    <td className="py-1.5 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#E21B70] flex items-center justify-center text-white text-[10px] font-black shrink-0">
                        F!
                      </div>
                      <span>Foodi</span>
                    </td>
                    <td className="py-1.5 text-center font-mono-numbers font-medium">
                      {foodiOrders.length}
                    </td>
                    <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                      {foodiAmount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-[#18264c]/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Total Orders</span>
            <span className="text-white font-mono-numbers font-bold">
              {settledOrdersCount}
            </span>
          </div>
        </div>

        {/* CARD 4: Settled Breakdown by Payment Methods */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-4 sm:p-5 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-sm font-bold text-white tracking-wide mb-2">
              Settled Breakdown by Payment Methods
            </div>

            <div className="overflow-x-auto max-h-[290px] overflow-y-auto pr-1">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-[#0b1328] z-10">
                  <tr className="text-slate-400 text-[11px] font-medium border-b border-[#18264c]/60">
                    <th className="text-left font-medium pb-2">Method</th>
                    <th className="text-center font-medium pb-2">Orders</th>
                    <th
                      onClick={() => setSortAsc(!sortAsc)}
                      className="text-right font-medium pb-2 cursor-pointer hover:text-white select-none flex items-center justify-end gap-1 ml-auto"
                    >
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
                  {paymentMethodsList.map((m) => {
                    const Icon = m.icon;
                    return (
                      <tr key={m.id} className="hover:bg-[#121c3c]/50 transition-colors">
                        <td className="py-1.5 flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${m.iconColor}`} />
                          <span className={m.amount > 0 ? 'font-bold text-white' : ''}>
                            {m.name}
                          </span>
                          {m.hasHelp && (
                            <HelpCircle className="w-3 h-3 text-slate-400 inline" />
                          )}
                          {m.subName && (
                            <span className="text-[10px] text-slate-500 font-normal">
                              {m.subName}
                            </span>
                          )}
                        </td>
                        <td className="py-1.5 text-center font-mono-numbers">
                          {m.orders}
                        </td>
                        <td className="py-1.5 text-right font-mono-numbers font-bold text-white">
                          {m.amount > 0 ? m.amount.toLocaleString() : '0'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer: Total Commission */}
          <div className="pt-3 border-t border-[#18264c] flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Total Commission</span>
            <span className="text-white font-mono-numbers font-bold">0</span>
          </div>
        </div>
      </div>

      {/* SECOND SECTION: Total Sales Area Chart matching screenshot */}
      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            Total Sales
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing total sales for the provided data
          </p>
        </div>

        {/* Sales Chart with Exact Y-Axis labels: 2783, 1400, 700, 0 */}
        <div className="relative pt-2 pb-4">
          <div className="flex">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-[11px] text-slate-400 font-mono-numbers pr-4 h-52 text-right select-none shrink-0 w-12">
              <span>2783</span>
              <span>1400</span>
              <span>700</span>
              <span>0</span>
            </div>

            {/* Grid & SVG Curve Area */}
            <div className="flex-1 relative h-52">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-b border-slate-800/80" />
                <div className="w-full border-b border-slate-800/80" />
                <div className="w-full border-b border-slate-800/80" />
                <div className="w-full border-b border-slate-700/90" />
              </div>

              {/* Smooth Area Curve matching Bangladeshi restaurant peak lunch & evening times */}
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 700 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path
                  d="M 0,200 L 0,200 C 60,198 120,195 180,185 C 240,175 300,120 360,70 C 420,25 480,95 540,110 C 600,125 650,180 700,190 L 700,200 Z"
                  fill="url(#salesGrad)"
                />

                {/* Blue Line Curve */}
                <path
                  d="M 0,200 C 60,198 120,195 180,185 C 240,175 300,120 360,70 C 420,25 480,95 540,110 C 600,125 650,180 700,190"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Peak point indicator */}
                <circle cx="360" cy="70" r="4" fill="#38bdf8" />
                <circle cx="360" cy="70" r="7" fill="none" stroke="#38bdf8" strokeOpacity="0.5" />
              </svg>
            </div>
          </div>

          {/* X-Axis Labels: 2 AM, 5 AM, 8 AM, 11 AM, 2 PM, 5 PM, 8 PM, 11 PM */}
          <div className="flex justify-between pl-8 sm:pl-12 pt-2 text-[9px] sm:text-[11px] text-slate-400 select-none">
            <span>2 AM</span>
            <span className="hidden sm:inline">5 AM</span>
            <span>8 AM</span>
            <span className="hidden sm:inline">11 AM</span>
            <span>2 PM</span>
            <span className="hidden sm:inline">5 PM</span>
            <span>8 PM</span>
            <span>11 PM</span>
          </div>
        </div>
      </div>

      {/* THIRD SECTION: Top Selling Items Table matching screenshot */}
      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white tracking-wide">
          Top Selling Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 text-[11px] font-semibold border-b border-[#18264c]/70 pb-2">
                <th className="py-2.5 px-3">Food Item</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-center">Complimentary Qty</th>
                <th className="py-2.5 px-3 text-right">Total Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
              {topSellingItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    No items recorded yet.
                  </td>
                </tr>
              ) : (
                topSellingItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#121c3c]/50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {item.category}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono-numbers font-semibold">
                      {item.qty}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono-numbers text-slate-500">
                      {item.complimentary}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers font-black text-emerald-400">
                      {formatBDT(item.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Growth Details Modal */}
      {showGrowthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Revenue Growth Insights</h3>
              </div>
              <button
                onClick={() => setShowGrowthModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-[#121c3c] rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Day Target Achievement</span>
                <div className="text-lg font-black text-emerald-400 font-mono-numbers">
                  {formatBDT(settledGrossSales + runningSalesTotal)} / {formatBDT(10000)}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round(((settledGrossSales + runningSalesTotal) / 10000) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Sales trajectory is performing on track for the lunch-to-dinner shift at Mirpur 10 branch. Dine-in orders contribute over 90% of revenue today.
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowGrowthModal(false)}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
