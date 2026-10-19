'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from '../../components/Link';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Pricing — DineOS | Transparent Plans for Every Restaurant',
  description:
    'DineOS pricing plans: Starter, Pro AI Edition, and Enterprise. Predictable BDT pricing with no hidden charges.',
  alternates: {
    canonical: 'https://dineos.com/pricing',
  },
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const faqs = [
    {
      q: 'Can I switch between monthly and yearly plans?',
      a: 'Yes, you can upgrade, downgrade, or switch billing cycles anytime from your account settings without disruption.',
    },
    {
      q: 'Does DineOS work with our existing thermal receipt printer?',
      a: 'Yes! DineOS supports standard 80mm and 58mm ESC/POS thermal printers via USB, Bluetooth, and LAN network connections.',
    },
    {
      q: 'Is there any commission taken on Foodpanda or Pathao orders?',
      a: 'Zero commission from DineOS. You only pay your flat software subscription fee.',
    },
    {
      q: 'Do you provide on-site setup in Dhaka and other districts?',
      a: 'Yes, our certified field engineers provide complete on-site installation, staff training, and router configuration in Dhaka, Chittagong, Sylhet, and nationwide.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#22C55E] selection:text-black">
      <Navbar currentPath="/pricing" />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Investment in Growth</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Predictable Pricing, <span className="text-[#22C55E]">Zero Hidden Fees</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              Every plan includes full table management, regular software updates, and cloud backups.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-xl bg-[#0F172A] border border-[#1F1F28]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === 'monthly' ? 'bg-[#22C55E] text-black shadow-xs' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === 'yearly' ? 'bg-[#22C55E] text-black shadow-xs' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Annual Billing <span className="text-[10px] uppercase font-black bg-black/20 px-1.5 py-0.5 rounded ml-1">Save 20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Starter Tier */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Starter</div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    {billingCycle === 'yearly' ? '8,000' : '999'}{' '}
                    <span className="text-xs font-medium text-slate-400">
                      BDT / {billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Essential POS functionality for small cafes, juice bars, and single-register food counters.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1 Branch License (e.g. Mirpur 10)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 25 Dine-In Tables
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-Speed POS Terminal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Thermal 80mm Receipt Printing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily Cashier Settle Breakdown
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      ✕ Advanced AI Forecast & Auto Stock
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-xl bg-[#1F1F28] hover:bg-[#2A2A38] text-white font-bold text-xs text-center transition-colors"
                >
                  Start With Starter
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="bg-[#0F172A] border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-emerald-950/40">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#22C55E] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Pro (AI Edition)</div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    {billingCycle === 'yearly' ? '12,000' : '1,499'}{' '}
                    <span className="text-xs font-medium text-slate-400">
                      BDT / {billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Complete restaurant operating system with 7 AI engines, KDS bump screen, and delivery channels.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2 font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Dine-In Tables
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DineOS AI: Sales Forecast & Auto Stock
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DineOS AI: Smart Suggest & Chat Assist
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kitchen Display (K.D.S) & Bump Bar
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Customer Display (C.D.S) with Bangla QR
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Foodpanda, Pathao & Foodi Integration
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs text-center transition-all shadow-lg shadow-emerald-950/50"
                >
                  Choose Pro AI Plan
                </Link>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-sm font-bold text-white uppercase tracking-wider">Enterprise</div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    Custom <span className="text-xs font-medium text-slate-400">Quote</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Designed for multi-unit restaurant groups, franchised dining chains, and hotel resort dining.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Branch Licenses
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom AI Model Trained on Your Menu
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Central Inventory Commissary Sync
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated 24/7 Account Manager
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom ERP & Accounting Bridge
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="w-full py-3.5 rounded-xl bg-[#1F1F28] hover:bg-[#2A2A38] text-white font-bold text-xs text-center transition-colors"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="p-5 rounded-xl bg-[#0F172A] border border-[#1F1F28] space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f.q}</span>
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed pl-6">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
