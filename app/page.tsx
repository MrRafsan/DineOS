'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Link } from '../components/Link';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Boxes,
  Lightbulb,
  MessageSquare,
  BarChart3,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Play,
  Layers,
  Monitor,
  Tv,
  Building2,
  Clock,
  Headphones,
  ChefHat,
  Star,
  Brain,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#22C55E] selection:text-black">
      {/* 1. Sticky Navbar */}
      <Navbar currentPath="/" />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-[#1F1F28]/60">
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/20 via-blue-600/15 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400 mb-6 shadow-md shadow-black/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>AI-Powered. Restaurant-Focused.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[#9CA3AF] text-[11px]">Next-Gen POS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              DineOS AI — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">The Brain Behind</span> Your Restaurant
            </h1>

            {/* Subheadline & Description */}
            <p className="mt-5 text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto font-normal leading-relaxed">
              DineOS is Bangladesh's first AI-powered restaurant OS — built to revolutionize how modern restaurants operate, manage, and grow.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-sm transition-all shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1F1F28] text-white font-bold text-sm transition-all shadow-md hover:border-slate-600"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Launch Live Demo</span>
              </Link>
            </div>

            {/* Hero Dashboard Preview Mockup */}
            <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-[#1F1F28] via-[#0F172A] to-[#0A0A0F] border border-[#1F1F28] shadow-2xl shadow-black/80">
              <div className="bg-[#0A0A0F] rounded-xl overflow-hidden border border-[#1F1F28]/80 text-left">
                {/* Mockup Header Bar */}
                <div className="bg-[#090F22] px-4 py-2.5 border-b border-[#18264C] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-bold text-white ml-2">DineOS POS Terminal • Mirpur 10 Branch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded">
                      ● Live Sync
                    </span>
                    <span className="text-xs text-[#9CA3AF]">ZEVOOX (Owner)</span>
                  </div>
                </div>

                {/* Mockup Metrics Cards */}
                <div className="p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-[#060B19]">
                  <div className="bg-[#0B1328] border border-[#18264C] p-3.5 rounded-xl">
                    <div className="text-[11px] text-slate-400">Settled Gross Sales</div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">2,783 <span className="text-xs">BDT</span></div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1">↑ 18.4% vs last week</div>
                  </div>
                  <div className="bg-[#0B1328] border border-[#18264C] p-3.5 rounded-xl">
                    <div className="text-[11px] text-slate-400">Settled Orders</div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">14</div>
                    <div className="text-[10px] text-slate-400 mt-1">Avg 198 BDT / Order</div>
                  </div>
                  <div className="bg-[#0B1328] border border-[#18264C] p-3.5 rounded-xl">
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Running Sales
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">1,438 <span className="text-xs">BDT</span></div>
                    <div className="text-[10px] text-emerald-400/80 mt-1">5 Tables Dining In</div>
                  </div>
                  <div className="bg-[#0B1328] border border-[#18264C] p-3.5 rounded-xl">
                    <div className="text-[11px] text-slate-400">DineOS AI Forecast</div>
                    <div className="text-xl sm:text-2xl font-black text-teal-300 font-mono mt-1">12,500 <span className="text-xs">BDT</span></div>
                    <div className="text-[10px] text-teal-400 font-semibold mt-1">Peak: 7 PM - 10 PM</div>
                  </div>
                </div>

                {/* Mockup Action Channels */}
                <div className="px-4 pb-4 bg-[#060B19] flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#101B3A] border border-indigo-500/50 text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Dine In (Choose Table First)
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#101B3A] border border-[#D70F64]/50 text-xs font-bold text-white">
                    Foodpanda (Create Foodpanda Orders)
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#101B3A] border border-red-500/50 text-xs font-bold text-white">
                    Foodi (Create Foodi Orders)
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#101B3A] border border-[#e22b2b]/50 text-xs font-bold text-white">
                    Pathao (Create Pathao Orders)
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#101B3A] border border-sky-500/50 text-xs font-bold text-white">
                    Delivery (Create Delivery Orders)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trust Bar */}
        <section className="py-10 bg-[#0A0A0F] border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-[#9CA3AF] mb-6">
              Trusted by restaurants worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-sm font-semibold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Mirpur 10 (Flagship)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Gulshan 2
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Dhanmondi 27
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Banani 11
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Uttara Sector 3
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> Chittagong GEC
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" /> London & Dubai Hubs
              </span>
            </div>
          </div>
        </section>

        {/* 4. Features Section (Powered by DineOS AI) */}
        <section id="features" className="py-20 sm:py-28 bg-[#0A0A0F] border-b border-[#1F1F28] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400 mb-3">
                <Brain className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next-Gen Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Powered by <span className="text-[#22C55E]">DineOS AI</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                Seven purpose-built AI engines working together in real time to optimize every order, ingredient, shift, and taka in your restaurant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: Sales Forecast */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>📊 Sales Forecast</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">Predictive</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Predict your sales before they happen. Uses weather, holiday schedules, local events, and historical hourly data to forecast rush hours and revenue.
                </p>
              </div>

              {/* Feature 2: Customer Insights */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>👥 Customer Insights</span>
                  <span className="text-[10px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">Analytics</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Understand your customers deeply. Identifies VIPs, dining frequency, favorite combos, and dietary preferences for automated retention campaigns.
                </p>
              </div>

              {/* Feature 3: Auto Stock */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>📦 Auto Stock</span>
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">Automation</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Never run out of ingredients. Automatically calculates depletion based on recipe yields, alerts on low thresholds, and prepares supplier POs.
                </p>
              </div>

              {/* Feature 4: Smart Suggest */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>💡 Smart Suggest</span>
                  <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">Upselling</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  AI-powered menu recommendations. Suggests high-margin add-ons, pairings, and combo upsells directly at the POS table ordering terminal.
                </p>
              </div>

              {/* Feature 5: Chat Assist */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>💬 Chat Assist</span>
                  <span className="text-[10px] text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded">24/7 AI</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  24/7 AI chat support for staff and managers. Ask questions like "What was our best-selling burger yesterday?" and get instant answers.
                </p>
              </div>

              {/* Feature 6: Insight & Shift */}
              <div className="bg-[#0F172A] border border-[#1F1F28] rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-xl space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>📈 Insight & ⏱️ Shift</span>
                  <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">Operations</span>
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Comprehensive automated daily sales reports (Insight) coupled with intelligent labor cost scheduling and shift assignments (Shift).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why DineOS Section */}
        <section className="py-20 sm:py-28 bg-[#0A0A0F] border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Why Restaurant Leaders Choose <span className="text-[#22C55E]">DineOS</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9CA3AF]">
                Engineered for speed, built for reliability, and ready to scale from a single cafe to 50+ branches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Zap className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Real-Time Analytics</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Sub-second live order synchronization, active running table totals, and settle breakdowns without page refreshes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Building2 className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Multi-Branch Central Control</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Seamlessly switch between Mirpur 10, Gulshan, Dhanmondi, or Banani with centralized menus, pricing, and consolidated reporting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Boxes className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Precision Inventory</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Gram-level recipe costing, waste logging, vendor tracking, and live stock valuation protecting your bottom-line profit.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Monitor className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Kitchen Display System (K.D.S)</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Paperless kitchen order ticketing with color-coded preparation timers, station routing, and one-tap bump bar functionality.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Tv className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Customer Display System (C.D.S)</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Facing screen showing live cart itemization, taxes, Bangla QR payment options, and promotional multimedia banners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                <Headphones className="w-8 h-8 text-emerald-400" />
                <h3 className="text-base font-bold text-white">24/7 Dedicated Support</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Direct phone, WhatsApp, and on-site field technicians in Dhaka and nationwide ensuring your POS never stops during rush hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AI Engine Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#0A0A0F] via-[#0F172A] to-[#0A0A0F] border-b border-[#1F1F28] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span>Deep Neural Architecture</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  DineOS AI — <br />
                  <span className="text-[#22C55E]">The Brain Behind</span> Your Restaurant
                </h2>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                  Traditional POS systems are passive cash registers. DineOS AI is an active intelligence engine that constantly analyzes customer order patterns, seasonal demands, and wastage to maximize profitability.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">
                      <strong>98.4% Accuracy</strong> in peak dinner-hour sales forecasting.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">
                      <strong>22% Food Waste Reduction</strong> via Auto Stock replenishment algorithms.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">
                      <strong>15% Higher Ticket Sizes</strong> powered by Smart Suggest upsell pairings.
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22C55E] text-black font-extrabold text-sm hover:bg-[#16A34A] transition-all"
                  >
                    <span>Experience DineOS AI Live</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Brain Visual Card */}
              <div className="bg-[#0B1328] border border-[#1F1F28] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between pb-4 border-b border-[#1F1F28]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white tracking-wide">DineOS Neural Core</span>
                  </div>
                  <span className="text-[11px] text-[#9CA3AF] font-mono">v4.8 • Online</span>
                </div>

                <div className="py-8 text-center space-y-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600/30 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center shadow-xl shadow-emerald-950/60">
                    <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-base font-extrabold text-white">Active Predictive Processing</div>
                  <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                    Continuous learning from Mirpur 10 dine-in sales, aggregator order queues, and kitchen prep timings.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1F1F28] text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#0F172A]">
                    <div className="text-[10px] text-slate-400">Response</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">14ms</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0F172A]">
                    <div className="text-[10px] text-slate-400">Accuracy</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">99.1%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0F172A]">
                    <div className="text-[10px] text-slate-400">Insights</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">1,480+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Pricing Section */}
        <section id="pricing" className="py-20 sm:py-28 bg-[#0A0A0F] border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Simple, Transparent <span className="text-[#22C55E]">Pricing</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9CA3AF]">
                Choose the plan that fits your restaurant scale. No hidden fees. Cancel anytime.
              </p>

              {/* Billing Toggle */}
              <div className="mt-6 inline-flex items-center gap-2 p-1 rounded-xl bg-[#0F172A] border border-[#1F1F28]">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    billingCycle === 'monthly' ? 'bg-[#22C55E] text-black shadow-xs' : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    billingCycle === 'yearly' ? 'bg-[#22C55E] text-black shadow-xs' : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  Yearly <span className="text-[10px] uppercase font-black bg-black/20 px-1 rounded ml-1">Save 20%</span>
                </button>
              </div>
            </div>

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
                    Ideal for small cafes, juice bars, and single-counter quick service eateries.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1 Branch License
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dine-In Table Management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-Speed POS Terminal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Thermal 80mm Receipt Printing
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      ✕ Advanced AI Forecast Engine
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-xl bg-[#1F1F28] hover:bg-[#2A2A38] text-white font-bold text-xs text-center transition-colors"
                >
                  Start With Starter
                </Link>
              </div>

              {/* Pro Tier (Highlighted) */}
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
                    Designed for fast-growing restaurants wanting full DineOS AI automation & multi-channel orders.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2 font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Everything in Starter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full DineOS AI Suite (Forecast, Auto Stock)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> K.D.S & C.D.S Displays
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Foodpanda, Pathao & Foodi Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recipe Inventory & Cost Analysis
                    </li>
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs text-center transition-all shadow-lg shadow-emerald-950/50"
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
                    For multi-unit restaurant chains, franchise operators, and luxury hotel dining groups.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Branch Licenses
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom AI Fine-Tuning On Your Data
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Account Manager & SLA
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ERP & Accounting Integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> On-Site Installation & Staff Training
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl bg-[#1F1F28] hover:bg-[#2A2A38] text-white font-bold text-xs text-center transition-colors"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Testimonials Section */}
        <section className="py-20 sm:py-28 bg-[#0A0A0F] border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Loved by Restaurateurs & Chefs
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9CA3AF]">
                Hear how DineOS AI transforms everyday restaurant rush hours into smooth, profitable operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "DineOS AI's Sales Forecast completely eliminated our Friday night ingredient shortages. The Kitchen Display System keeps our chefs coordinated in Mirpur 10."
                </p>
                <div className="pt-2 border-t border-[#1F1F28]">
                  <div className="text-xs font-bold text-white">Tanvir Ahmed</div>
                  <div className="text-[11px] text-[#9CA3AF]">Owner, ZEVOOX Restaurant Group</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "We run both Foodpanda and Dine-In orders simultaneously. DineOS handles the rush effortlessly, and our cashiers learned the interface in less than 15 minutes."
                </p>
                <div className="pt-2 border-t border-[#1F1F28]">
                  <div className="text-xs font-bold text-white">Nafis Rahman</div>
                  <div className="text-[11px] text-[#9CA3AF]">General Manager, Mirpur Dining Club</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "The 4-card dashboard gives me instant visibility over settled cash, bKash payments, running sales, and kitchen tickets. It's the best investment we made this year."
                </p>
                <div className="pt-2 border-t border-[#1F1F28]">
                  <div className="text-xs font-bold text-white">Chef Farhana Islam</div>
                  <div className="text-[11px] text-[#9CA3AF]">Head Chef & Co-founder, Smoke & Grill</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. CTA Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-tr from-[#0F172A] to-[#0A0A0F] text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Run Your Restaurant on AI. <br />
              <span className="text-[#22C55E]">Run on DineOS.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
              Join hundreds of forward-thinking restaurants predicting sales, delighting guests, and growing with DineOS AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-sm transition-all shadow-xl shadow-emerald-950/60"
              >
                Launch POS Terminal Now
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#1F1F28] text-white font-bold text-sm transition-all"
              >
                Talk to Sales Hotline
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Reusable Footer */}
      <Footer />
    </div>
  );
}
