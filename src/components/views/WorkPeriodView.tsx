import React, { useState } from 'react';
import { Clock, DollarSign, Lock, Unlock, AlertCircle } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT, formatDateOnly, formatTimeOnly } from '../../utils/formatters';

export const WorkPeriodView: React.FC = () => {
  const { workPeriod, closeWorkPeriod, openNewWorkPeriod } = usePOS();
  const [closingCashInput, setClosingCashInput] = useState<number>(0);
  const [closingNotes, setClosingNotes] = useState('');
  const [startingCashInput, setStartingCashInput] = useState<number>(5000);

  const expectedCash =
    workPeriod.startingCash + workPeriod.totalCashSales - workPeriod.totalExpenses;
  const cashDifference = closingCashInput - expectedCash;

  const handleCloseShift = (e: React.FormEvent) => {
    e.preventDefault();
    closeWorkPeriod(closingCashInput, closingNotes);
  };

  const handleOpenShift = (e: React.FormEvent) => {
    e.preventDefault();
    openNewWorkPeriod(startingCashInput);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Current Register State */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                workPeriod.status === 'open'
                  ? 'bg-emerald-950/80 border border-emerald-600/40 text-emerald-400'
                  : 'bg-rose-950/80 border border-rose-600/40 text-rose-400'
              }`}
            >
              {workPeriod.status === 'open' ? (
                <Unlock className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Cash Register Shift: {workPeriod.status.toUpperCase()}
                </h3>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    workPeriod.status === 'open'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {workPeriod.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Opened by {workPeriod.openedBy} at {formatDateOnly(workPeriod.openedAt)}{' '}
                {formatTimeOnly(workPeriod.openedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Starting Float:</span>
            <span className="text-base font-black text-white font-mono-numbers">
              {formatBDT(workPeriod.startingCash)}
            </span>
          </div>

          <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Cash Sales:</span>
            <span className="text-base font-black text-emerald-400 font-mono-numbers">
              {formatBDT(workPeriod.totalCashSales)}
            </span>
          </div>

          <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Digital (bKash/Card):</span>
            <span className="text-base font-black text-sky-400 font-mono-numbers">
              {formatBDT(workPeriod.totalDigitalSales)}
            </span>
          </div>

          <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Shift Expenses:</span>
            <span className="text-base font-black text-rose-400 font-mono-numbers">
              -{formatBDT(workPeriod.totalExpenses)}
            </span>
          </div>
        </div>

        {/* Expected in Drawer Banner */}
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center justify-between text-xs">
          <span className="text-emerald-200 font-semibold">
            Expected Physical Cash in Drawer:
          </span>
          <span className="text-lg font-black text-emerald-300 font-mono-numbers">
            {formatBDT(expectedCash)}
          </span>
        </div>
      </div>

      {/* Action: Close Shift or Open Shift Form */}
      {workPeriod.status === 'open' ? (
        <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg space-y-4">
          <h4 className="text-sm font-bold text-white">Close Register & End Shift</h4>
          <form onSubmit={handleCloseShift} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Actual Cash Counted in Drawer (BDT)
                </label>
                <input
                  type="number"
                  min="0"
                  value={closingCashInput}
                  onChange={(e) => setClosingCashInput(Number(e.target.value))}
                  placeholder="Enter counted cash..."
                  className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Closing Notes
                </label>
                <input
                  type="text"
                  placeholder="Optional shift notes..."
                  value={closingNotes}
                  onChange={(e) => setClosingNotes(e.target.value)}
                  className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {closingCashInput > 0 && (
              <div
                className={`p-2.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                  cashDifference === 0
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    : cashDifference > 0
                    ? 'bg-sky-950/60 text-sky-300 border border-sky-800'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                }`}
              >
                <span>
                  {cashDifference === 0
                    ? '✓ Drawer perfectly balanced'
                    : cashDifference > 0
                    ? `Over by ${formatBDT(cashDifference)}`
                    : `Short by ${formatBDT(Math.abs(cashDifference))}`}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Close Cash Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg space-y-4">
          <h4 className="text-sm font-bold text-white">Start New Cash Register Shift</h4>
          <form onSubmit={handleOpenShift} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Opening Cash Float (BDT)
              </label>
              <input
                type="number"
                min="0"
                value={startingCashInput}
                onChange={(e) => setStartingCashInput(Number(e.target.value))}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Open New Register Shift
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
