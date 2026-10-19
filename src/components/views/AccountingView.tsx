import React from 'react';
import { ReceiptText, TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const AccountingView: React.FC = () => {
  const { orderHistory, expenses } = usePOS();

  const settled = orderHistory.filter((o) => o.status === 'completed');
  const grossRevenue = settled.reduce((sum, o) => sum + o.total, 0);
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const estimatedCOGS = Math.round(grossRevenue * 0.38); // estimated 38% food cost
  const grossProfit = grossRevenue - estimatedCOGS;
  const netProfit = grossProfit - totalExpensesAmount;
  const netMargin = grossRevenue > 0 ? Math.round((netProfit / grossRevenue) * 100) : 0;

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ReceiptText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Restaurant Financial Accounting</h2>
            <p className="text-xs text-slate-400">
              Profit & loss ledger, COGS food cost, operational overheads, and cash flow
            </p>
          </div>
        </div>
      </div>

      {/* 4 Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-2xl shadow-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Gross Revenue</span>
          <div className="text-2xl font-black text-white font-mono-numbers">
            {formatBDT(grossRevenue)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">From 9 completed bills</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-2xl shadow-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Estimated Food COGS (38%)</span>
          <div className="text-2xl font-black text-amber-400 font-mono-numbers">
            {formatBDT(estimatedCOGS)}
          </div>
          <span className="text-[10px] text-slate-400 block">Raw inventory used</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-2xl shadow-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Operating Expenses</span>
          <div className="text-2xl font-black text-rose-400 font-mono-numbers">
            -{formatBDT(totalExpensesAmount)}
          </div>
          <span className="text-[10px] text-slate-400 block">{expenses.length} expense logs</span>
        </div>

        <div className="bg-[#0b1328] border border-[#18264c] p-4 rounded-2xl shadow-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Net Profit Margin</span>
          <div className="text-2xl font-black text-emerald-400 font-mono-numbers">
            {formatBDT(netProfit)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">Net Margin: {netMargin}%</span>
        </div>
      </div>

      {/* Income Statement Table */}
      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white">Daily Profit & Loss Statement (P&L)</h3>
        <table className="w-full text-xs">
          <tbody className="divide-y divide-[#18264c]/50 text-slate-300">
            <tr>
              <td className="py-2.5 font-bold text-white">1. Total Gross Sales</td>
              <td className="py-2.5 text-right font-black text-white font-mono-numbers">{formatBDT(grossRevenue)}</td>
            </tr>
            <tr>
              <td className="py-2.5 pl-4 text-slate-400">Less: Estimated Raw Material Cost (COGS)</td>
              <td className="py-2.5 text-right text-amber-400 font-mono-numbers">-{formatBDT(estimatedCOGS)}</td>
            </tr>
            <tr className="bg-[#121c3c]/40 font-bold text-white">
              <td className="py-2.5">2. Gross Operational Profit</td>
              <td className="py-2.5 text-right text-emerald-400 font-mono-numbers">{formatBDT(grossProfit)}</td>
            </tr>
            <tr>
              <td className="py-2.5 pl-4 text-slate-400">Less: Kitchen Supplies & Petty Cash</td>
              <td className="py-2.5 text-right text-rose-400 font-mono-numbers">-{formatBDT(totalExpensesAmount)}</td>
            </tr>
            <tr>
              <td className="py-2.5 pl-4 text-slate-400">Less: Payment Gateway Commission (Cash)</td>
              <td className="py-2.5 text-right text-slate-400 font-mono-numbers">BDT 0</td>
            </tr>
            <tr className="bg-[#101b38] font-black text-sm text-white border-t-2 border-emerald-500/40">
              <td className="py-3">3. Estimated Net Profit</td>
              <td className="py-3 text-right text-emerald-400 font-mono-numbers">{formatBDT(netProfit)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
