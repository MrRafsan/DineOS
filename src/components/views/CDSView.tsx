import React, { useState } from 'react';
import { Tv, Flame, QrCode, ShoppingBag, Utensils, Check } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const CDSView: React.FC = () => {
  const { orders, tables, settings } = usePOS();
  const [selectedOrderId, setSelectedOrderId] = useState<string>(() => orders[0]?.id || '');

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Control bar */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-3 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-white">Customer Display Screen (C.D.S) Dual-Monitor Simulation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Previewing Order:</span>
          <select
            value={activeOrder?.id || ''}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="bg-[#121c3c] border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                Token #{o.tokenNumber} ({o.tableName || o.type.toUpperCase()}) - {formatBDT(o.total)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Simulated Customer Screen (16:9 Cinema Aspect) */}
      <div className="bg-gradient-to-br from-[#060a19] via-[#091129] to-[#040817] border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-rose-950/40">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-wide">
                {settings.name}
              </h1>
              <p className="text-xs text-slate-400">
                Welcome! Section 10, Mirpur, Dhaka
              </p>
            </div>
          </div>

          {activeOrder && (
            <div className="bg-indigo-950/80 border border-indigo-700/80 px-4 py-1.5 rounded-2xl text-right">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">Token Number</span>
              <span className="text-2xl font-black text-white font-mono-numbers">
                #{activeOrder.tokenNumber}
              </span>
            </div>
          )}
        </div>

        {/* Content Split: Left Promo/QR, Right Live Bill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          {/* Left: Promotional & bKash QR */}
          <div className="bg-[#0b1328]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-1">
                TODAY'S CHEF SPECIAL
              </span>
              <h3 className="text-2xl font-black text-white">
                Smoky BBQ Burger & Cold Coffee
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Enjoy 100% prime chicken & beef patties grilled to smoky perfection with our signature sauce.
              </p>
            </div>

            {/* bKash scan QR card */}
            <div className="bg-[#121c3c] border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-20 h-20 bg-white p-1 rounded-xl flex items-center justify-center shrink-0">
                <QrCode className="w-16 h-16 text-slate-900" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#D12053] block uppercase tracking-wider">
                  Scan & Pay via bKash / Nagad
                </span>
                <p className="text-xs text-white font-semibold">
                  Merchant: {settings.name}
                </p>
                <p className="text-[11px] text-slate-400 font-mono-numbers">
                  Counter: Mirpur 10 Branch
                </p>
              </div>
            </div>
          </div>

          {/* Right: Live Customer Bill */}
          <div className="bg-[#0b1328]/90 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Order Items</span>
                <span className="text-slate-400">
                  {activeOrder?.tableName || activeOrder?.type.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2.5 mt-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                {activeOrder ? (
                  activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-white">{item.name}</span>
                        <div className="text-[11px] text-slate-400 font-mono-numbers">
                          {formatBDT(item.price)} × {item.quantity}
                        </div>
                      </div>
                      <span className="font-black text-white font-mono-numbers text-sm">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-8">No active orders</p>
                )}
              </div>
            </div>

            {/* Total Grand Banner */}
            {activeOrder && (
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono-numbers text-slate-200">{formatBDT(activeOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>VAT ({activeOrder.vatRate * 100}%):</span>
                  <span className="font-mono-numbers text-slate-200">{formatBDT(activeOrder.vatAmount)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-white pt-2 border-t border-white/10">
                  <span>TOTAL PAYABLE:</span>
                  <span className="text-emerald-400 font-mono-numbers">
                    {formatBDT(activeOrder.total)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer ticker */}
        <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400">
          Thank you for dining with us! For feedback or inquiries: {settings.salesPhone}
        </div>
      </div>
    </div>
  );
};
