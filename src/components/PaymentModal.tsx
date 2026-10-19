import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { formatBDT } from '../utils/formatters';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    orderToPay,
    settleOrder,
  } = usePOS();

  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'bKash' | 'Nagad' | 'Card'>('Cash');
  const [cashReceived, setCashReceived] = useState<number>(() => orderToPay?.total || 0);
  const [transactionId, setTransactionId] = useState<string>('');

  if (!isPaymentModalOpen || !orderToPay) return null;

  const totalAmount = orderToPay.total;
  const changeToReturn = Math.max(0, cashReceived - totalAmount);

  // Quick cash note buttons common in Bangladesh (500, 1000, 2000)
  const quickCashOptions = [
    totalAmount,
    500,
    1000,
    1500,
    2000,
    5000,
  ].filter((amt, idx, arr) => amt >= totalAmount && arr.indexOf(amt) === idx);

  const handleSettle = () => {
    settleOrder(orderToPay.id, paymentMethod, {
      cashReceived: paymentMethod === 'Cash' ? cashReceived : totalAmount,
      changeReturned: paymentMethod === 'Cash' ? changeToReturn : 0,
      transactionId: transactionId || undefined,
    });
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-[#0b1228] border border-[#1b2b54] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0f1738] border-b border-[#1b2b54] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Settle Payment
              </h3>
              <p className="text-xs text-slate-400">
                Token #{orderToPay.tokenNumber} • {orderToPay.tableName || orderToPay.type.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Total Payable Box */}
          <div className="bg-[#101b3b] border border-indigo-900/60 rounded-xl p-4 text-center">
            <span className="text-xs font-semibold text-slate-300 block mb-1">
              Total Amount Payable
            </span>
            <div className="text-3xl font-black text-emerald-400 font-mono-numbers">
              {formatBDT(totalAmount)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Includes {orderToPay.items.length} items & VAT
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-4 gap-2">
              {/* Cash */}
              <button
                onClick={() => setPaymentMethod('Cash')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'Cash'
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                    : 'bg-[#121c3c] border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">Cash</span>
              </button>

              {/* bKash */}
              <button
                onClick={() => setPaymentMethod('bKash')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'bKash'
                    ? 'bg-[#d12053]/20 border-[#d12053] text-white shadow-md'
                    : 'bg-[#121c3c] border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#d12053]" />
                <span className="text-xs font-bold">bKash</span>
              </button>

              {/* Nagad */}
              <button
                onClick={() => setPaymentMethod('Nagad')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'Nagad'
                    ? 'bg-[#f7931e]/20 border-[#f7931e] text-white shadow-md'
                    : 'bg-[#121c3c] border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#f7931e]" />
                <span className="text-xs font-bold">Nagad</span>
              </button>

              {/* Card */}
              <button
                onClick={() => setPaymentMethod('Card')}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all ${
                  paymentMethod === 'Card'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                    : 'bg-[#121c3c] border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold">Card</span>
              </button>
            </div>
          </div>

          {/* Method Specific Details */}
          {paymentMethod === 'Cash' && (
            <div className="space-y-3 bg-[#121c3c] border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Cash Given by Guest:
                </label>
                <input
                  type="number"
                  min={totalAmount}
                  value={cashReceived}
                  onChange={(e) => setCashReceived(Number(e.target.value))}
                  className="w-36 bg-[#0b1228] border border-slate-600 rounded-lg px-3 py-1.5 text-right text-sm font-extrabold text-white font-mono-numbers focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick Cash Buttons */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">
                  Quick Amount:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickCashOptions.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCashReceived(amt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono-numbers transition-colors ${
                        cashReceived === amt
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#182650] text-slate-300 hover:text-white'
                      }`}
                    >
                      BDT {amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Change to Return */}
              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Change to Return:</span>
                <span className="text-base font-black text-amber-400 font-mono-numbers">
                  {formatBDT(changeToReturn)}
                </span>
              </div>
            </div>
          )}

          {(paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Card') && (
            <div className="space-y-2 bg-[#121c3c] border border-slate-800 rounded-xl p-3.5">
              <label className="text-xs font-bold text-slate-300 block">
                {paymentMethod} Transaction ID / Reference:
              </label>
              <input
                type="text"
                placeholder={
                  paymentMethod === 'Card'
                    ? 'e.g. Approval Code / Card Last 4 digits'
                    : 'e.g. 9J8K7L6M5'
                }
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full bg-[#0b1228] border border-slate-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0f1738] border-t border-[#1b2b54] p-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSettle}
            className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Payment & Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
