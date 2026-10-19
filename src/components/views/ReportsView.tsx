import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Printer,
  Download,
  DollarSign,
  TrendingUp,
  Percent,
  Receipt,
} from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const ReportsView: React.FC = () => {
  const { orderHistory, orders } = usePOS();
  const [dateRange, setDateRange] = useState('Today');
  const [reportTab, setReportTab] = useState<'sales' | 'category' | 'payments'>('sales');

  const settled = orderHistory.filter((o) => o.status === 'completed');
  const totalGrossSales = settled.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = settled.length;
  const totalDiscount = settled.reduce((sum, o) => sum + (o.discountValue || 0), 0);
  const totalVat = settled.reduce((sum, o) => sum + (o.vatAmount || 0), 0);
  const netSales = totalGrossSales - totalVat;
  const aov = totalOrders > 0 ? Math.round(totalGrossSales / totalOrders) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['Token', 'Date', 'Type', 'Table', 'Waiter', 'Payment', 'Total (BDT)'],
      ...settled.map((o) => [
        o.tokenNumber,
        new Date(o.createdAt).toLocaleDateString(),
        o.type,
        o.tableName || 'Counter',
        o.waiterName,
        o.paymentMethod || 'Cash',
        o.total,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DineOS_Sales_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Top Filter and Action Bar */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Restaurant Business Reports</h2>
            <p className="text-xs text-slate-400">
              Daily sales, item revenue, tax breakdown, and audit exports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#121c3c] border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-500"
          >
            <option value="Today">Today (Oct 15, 2026)</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Month">This Month</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-[#172554] hover:bg-[#1e3a8a] text-sky-300 border border-sky-600/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-xl shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">Gross Revenue</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers mt-1">
            {formatBDT(totalGrossSales)}
          </div>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">Total settled bills</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-xl shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">Total Orders</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers mt-1">
            {totalOrders}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">{orders.length} active running</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-xl shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">Average Order Value</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono-numbers mt-1">
            {formatBDT(aov)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Per ticket average</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-xl shadow-lg">
          <span className="text-[11px] text-slate-400 block font-medium">VAT & Taxes</span>
          <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono-numbers mt-1">
            {formatBDT(totalVat)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Discounts: -{formatBDT(totalDiscount)}</span>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex gap-2 border-b border-[#1b2b54] pb-2">
        <button
          onClick={() => setReportTab('sales')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            reportTab === 'sales'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-[#121c3c] text-slate-300 hover:text-white'
          }`}
        >
          Daily Sales Audit
        </button>
        <button
          onClick={() => setReportTab('category')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            reportTab === 'category'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-[#121c3c] text-slate-300 hover:text-white'
          }`}
        >
          Category Wise Sales
        </button>
        <button
          onClick={() => setReportTab('payments')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            reportTab === 'payments'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-[#121c3c] text-slate-300 hover:text-white'
          }`}
        >
          Payment Method Summary
        </button>
      </div>

      {/* Tab 1: Sales Audit Table */}
      {reportTab === 'sales' && (
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#18264c] flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Detailed Sales Ledger ({dateRange})</h3>
            <span className="text-xs text-slate-400">{settled.length} Transactions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Token #</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Channel / Table</th>
                  <th className="py-2.5 px-3">Waiter</th>
                  <th className="py-2.5 px-3">Items Qty</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3 text-right">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
                {settled.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#121c3c]/50 transition-colors">
                    <td className="py-2 px-3 font-bold text-white font-mono-numbers">
                      #{ord.tokenNumber}
                    </td>
                    <td className="py-2 px-3 text-slate-400 font-mono-numbers">
                      {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-200">
                      {ord.tableName || ord.channelOrderNumber || ord.type.toUpperCase()}
                    </td>
                    <td className="py-2 px-3 text-slate-400">{ord.waiterName}</td>
                    <td className="py-2 px-3 font-mono-numbers">
                      {ord.items.reduce((s, i) => s + i.quantity, 0)} items
                    </td>
                    <td className="py-2 px-3 text-slate-300 font-medium">
                      {ord.paymentMethod || 'Cash'}
                    </td>
                    <td className="py-2 px-3 text-right font-black text-emerald-400 font-mono-numbers">
                      {formatBDT(ord.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Category Wise */}
      {reportTab === 'category' && (
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white">Category Sales Distribution</h3>
          <div className="space-y-3">
            {[
              { name: 'Burgers', pct: 36, sales: 1200, count: 5 },
              { name: 'Rice & Biryani', pct: 30, sales: 980, count: 3 },
              { name: 'Pizza & Pasta', pct: 15, sales: 490, count: 1 },
              { name: 'Beverages & Coffee', pct: 12, sales: 390, count: 4 },
              { name: 'Appetizers & Sides', pct: 7, sales: 241, count: 2 },
            ].map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white">{cat.name}</span>
                  <span className="font-mono-numbers">
                    {formatBDT(cat.sales)} ({cat.pct}%) • {cat.count} items sold
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Payment Methods */}
      {reportTab === 'payments' && (
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white">Payment Method Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#121c3c] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Cash Payments</span>
              <div className="text-xl font-black text-emerald-400 font-mono-numbers">
                {formatBDT(totalGrossSales)}
              </div>
              <span className="text-[11px] text-slate-400">{settled.length} Transactions (100%)</span>
            </div>
            <div className="bg-[#121c3c] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Digital (bKash / Nagad)</span>
              <div className="text-xl font-black text-sky-400 font-mono-numbers">
                BDT 0
              </div>
              <span className="text-[11px] text-slate-400">0 Transactions (0%)</span>
            </div>
            <div className="bg-[#121c3c] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Card & POS Terminal</span>
              <div className="text-xl font-black text-indigo-400 font-mono-numbers">
                BDT 0
              </div>
              <span className="text-[11px] text-slate-400">0 Transactions (0%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
