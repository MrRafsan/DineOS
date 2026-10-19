import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from '../../components/Link';
import {
  Brain,
  TrendingUp,
  Users,
  Boxes,
  Lightbulb,
  MessageSquare,
  BarChart3,
  CalendarDays,
  Utensils,
  Monitor,
  Tv,
  Bike,
  Receipt,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Features — DineOS AI | AI-Powered Restaurant OS Modules',
  description:
    'Explore DineOS AI features: Sales Forecast, Customer Insights, Auto Stock, Smart Suggest, Chat Assist, Insight, Shift, KDS, and multi-branch POS.',
  alternates: {
    canonical: 'https://dineos.com/features',
  },
};

export default function FeaturesPage() {
  const aiFeatures = [
    {
      title: '📊 Sales Forecast',
      subtitle: 'Predict your sales before they happen.',
      desc: 'DineOS AI analyzes historical lunch/dinner rushes, local festivities, weather conditions, and day-of-week trends to forecast sales with up to 98% accuracy. Plan preparation volumes and avoid prep shortages.',
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      title: '👥 Customer Insights',
      subtitle: 'Understand your customers deeply.',
      desc: 'Tracks dining frequency, preferred tables, average spend, and favorite items. Automatically identifies high-value VIPs and triggers targeted SMS loyalty coupons.',
      icon: Users,
      color: 'blue',
    },
    {
      title: '📦 Auto Stock',
      subtitle: 'Never run out of ingredients.',
      desc: 'Automatic sub-recipe ingredient depletion whenever a burger, pizza, or cold coffee is ordered. Sends instant alerts when beef patties, cheese, or milk cross reorder levels.',
      icon: Boxes,
      color: 'amber',
    },
    {
      title: '💡 Smart Suggest',
      subtitle: 'AI-powered menu recommendations.',
      desc: 'Recommends high-margin beverages, sides, and desserts at the POS terminal based on active items in the cart, boosting average order values by 15-20%.',
      icon: Lightbulb,
      color: 'purple',
    },
    {
      title: '💬 Chat Assist',
      subtitle: '24/7 AI chat support.',
      desc: 'An intelligent AI assistant built into the POS. Ask natural questions like "How did Mirpur 10 perform today?" or "Which chef has the fastest burger prep time?" for instant answers.',
      icon: MessageSquare,
      color: 'teal',
    },
    {
      title: '📈 Insight (AI Sales Report)',
      subtitle: 'Automated executive sales synthesis.',
      desc: 'Generates daily and monthly executive summaries comparing Dine-In vs Foodpanda vs Delivery sales, profit margins, discounts given, and VAT collected.',
      icon: BarChart3,
      color: 'rose',
    },
    {
      title: '⏱️ Shift (Staff Scheduling)',
      subtitle: 'Intelligent labor cost optimization.',
      desc: 'Aligns kitchen and floor staff rosters with predicted customer rushes. Avoids overstaffing during quiet morning hours and understaffing during Friday dinner peak.',
      icon: CalendarDays,
      color: 'indigo',
    },
  ];

  const posModules = [
    {
      title: 'Dine In & Table Management',
      desc: 'Visual floor map with real-time occupied counters, table transfer, bill splitting, and guest counts.',
      icon: Utensils,
    },
    {
      title: 'Kitchen Display System (K.D.S)',
      desc: 'Digital bump screen with preparation timers, urgency indicators, and station routing for hot & cold lines.',
      icon: Monitor,
    },
    {
      title: 'Customer Display System (C.D.S)',
      desc: 'External facing screen with order itemization, Bangla QR payment barcodes, and multimedia promotional banners.',
      icon: Tv,
    },
    {
      title: 'Foodpanda, Pathao & Foodi Integration',
      desc: 'Aggregator channel hub allowing cashiers to take delivery orders directly inside the POS terminal.',
      icon: Bike,
    },
    {
      title: '80mm Thermal Receipt Printing',
      desc: 'Customizable Bengali and English receipts with VAT registration, QR codes, and custom footer greetings.',
      icon: Receipt,
    },
    {
      title: 'Central Multi-Branch Architecture',
      desc: 'Manage Mirpur 10, Gulshan, Banani, and Dhanmondi with master menu sync and role-based permissions.',
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#22C55E] selection:text-black">
      <Navbar currentPath="/features" />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400">
              <Brain className="w-3.5 h-3.5" />
              <span>Full Capabilities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Built for Speed. <span className="text-[#22C55E]">Powered by AI.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              Explore the complete suite of DineOS AI engines and front-of-house POS modules designed for modern Bangladeshi restaurants.
            </p>
          </div>
        </section>

        {/* DineOS AI Suite */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                The 7 Core <span className="text-[#22C55E]">DineOS AI</span> Engines
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                Integrated intelligence that turns everyday restaurant data into higher profits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] hover:border-emerald-500/50 transition-all space-y-4 shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{f.title}</h3>
                      <div className="text-xs font-semibold text-emerald-400 mt-0.5">{f.subtitle}</div>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Complete POS Modules */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Full-Stack POS Infrastructure
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                Everything required to operate dining rooms, kitchens, bars, and delivery drivers with zero friction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posModules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">{m.title}</h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Experience All Features in Action</h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Launch the live interactive POS terminal to test table ordering, KDS, and analytics right now.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-950/50"
              >
                <span>Launch DineOS Live Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
