import React, { useState } from 'react';
import { BadgeDollarSign, Check, Phone, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const SubscriptionView: React.FC = () => {
  const { settings, showToast } = usePOS();
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium' | 'annual'>('premium');

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <BadgeDollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">DineOS AI Subscription & Packages</h2>
            <p className="text-xs text-slate-400">
              Active branch licensing, renewal gateway, and plan features
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Sales Helpline</span>
          <span className="text-xs font-bold text-emerald-400 font-mono-numbers">
            {settings.salesPhone}
          </span>
        </div>
      </div>

      {/* Current Active Expiry Warning Box */}
      <div className="bg-gradient-to-r from-[#211604] via-[#1a1408] to-[#211604] border border-[#d97706]/60 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-extrabold text-[#f59e0b] uppercase tracking-wider">
              Package Renewal Due
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Current Package Expires in: 2 hours 14 minutes 30 seconds
          </h3>
          <p className="text-xs text-slate-300">
            Branch: <span className="text-white font-bold">{settings.branch}</span> • Package: <span className="text-white font-bold">DineOS Pro AI Edition</span>
          </p>
        </div>

        <button
          onClick={() => showToast(`Connecting to bKash / Nagad Gateway for ${settings.branch}... Subscription renewed successfully!`, 'success')}
          className="bg-[#d97706] hover:bg-[#b45309] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg transition-colors"
        >
          Renew via bKash / Nagad
        </button>
      </div>

      {/* Plan Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Standard Plan */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white">Monthly Standard</h4>
                <p className="text-xs text-slate-400">For small cafes & bakeries</p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Essential
              </span>
            </div>

            <div className="text-2xl font-black text-white font-mono-numbers">
              ৳1,000 <span className="text-xs font-normal text-slate-400">/ month / branch</span>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Unlimited POS Orders</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Table Floor Layout & KOT Print</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Daily Cash Register & Work Period</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Thermal 80mm Receipt Printing</li>
            </ul>
          </div>

          <button
            onClick={() => showToast('Switched to Monthly Standard plan', 'info')}
            className="w-full py-2 bg-[#121c3c] hover:bg-[#1a2850] text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Select Standard
          </button>
        </div>

        {/* Premium Plan (Current) */}
        <div className="bg-[#0e1738] border-2 border-rose-500 rounded-2xl p-5 shadow-2xl space-y-4 flex flex-col justify-between relative">
          <span className="absolute -top-3 right-4 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
            CURRENT ACTIVE PLAN
          </span>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white">Monthly Premium AI</h4>
                <p className="text-xs text-rose-300">Full restaurant automation suite</p>
              </div>
            </div>

            <div className="text-2xl font-black text-white font-mono-numbers">
              ৳2,000 <span className="text-xs font-normal text-slate-400">/ month / branch</span>
            </div>

            <ul className="text-xs text-slate-200 space-y-2 pt-2 border-t border-slate-700">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> All Standard Plan Features</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Kitchen Display Screen (K.D.S)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Customer Dual Screen (C.D.S)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Inventory, Raw Stocks & Low-Stock Alerts</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Customer Loyalty CRM & SMS Marketing</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Full Accounting & Food Cost Estimator</li>
            </ul>
          </div>

          <button
            onClick={() => showToast('Renewing active Premium AI Plan...', 'success')}
            className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
          >
            Renew Active Plan
          </button>
        </div>

        {/* Annual Plan */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white">Annual Enterprise Saver</h4>
                <p className="text-xs text-slate-400">Save 2 months subscription</p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Best Value
              </span>
            </div>

            <div className="text-2xl font-black text-emerald-400 font-mono-numbers">
              ৳20,000 <span className="text-xs font-normal text-slate-400">/ year</span>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> All Premium AI Features</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Multi-Branch Central Dashboard</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Dedicated Account Manager & VIP Support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free Thermal Printer Setup Assistance</li>
            </ul>
          </div>

          <button
            onClick={() => showToast('Switched to Annual Enterprise Saver Plan!', 'success')}
            className="w-full py-2 bg-[#172554] hover:bg-[#1e3a8a] text-sky-200 border border-sky-600/40 text-xs font-bold rounded-xl transition-colors"
          >
            Switch to Annual Saver
          </button>
        </div>
      </div>
    </div>
  );
};
