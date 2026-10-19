import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from '../../components/Link';
import { Sparkles, Brain, Target, Shield, Users, Award, Building, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us — DineOS | The AI Brain Behind Your Restaurant',
  description:
    "Learn about DineOS — Bangladesh's premier AI-powered restaurant OS. Predicting sales, automating inventory, and empowering restaurateurs worldwide.",
  alternates: {
    canonical: 'https://dineos.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#22C55E] selection:text-black">
      <Navbar currentPath="/about" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story & Mission</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              We Built the <span className="text-[#22C55E]">Brain</span> Behind Modern Dining
            </h1>

            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto">
              DineOS is not just a POS. It's the AI brain behind your restaurant — predicting sales, understanding customers, managing inventory, and helping you grow. Built for restaurants, powered by AI, trusted worldwide.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-20 border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Mission</h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  To eliminate restaurant failure by replacing guesswork with precision AI. From reducing kitchen food waste in Mirpur 10 to synchronizing multi-branch menus across Bangladesh, we equip every food entrepreneur with enterprise-level intelligence.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1F1F28] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Philosophy: AI-First</h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  We believe a POS should not just record the past — it must actively forecast the future. DineOS AI continuously studies dine-in footfall, weather correlations, kitchen bottlenecks, and aggregator demand to keep your restaurant ahead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 border-b border-[#1F1F28]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Built by Restaurateurs for Restaurateurs</h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">The four pillars guiding every line of DineOS code.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1F1F28] space-y-2">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Zero Downtime</h3>
                <p className="text-xs text-[#9CA3AF]">
                  Rush hours never wait. DineOS features offline resilient state caching and instant cloud sync.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1F1F28] space-y-2">
                <Users className="w-6 h-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Staff-Friendly UX</h3>
                <p className="text-xs text-[#9CA3AF]">
                  New waitstaff or cashiers learn the table ordering flow in under 10 minutes with zero mistakes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1F1F28] space-y-2">
                <Building className="w-6 h-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Multi-Branch Scale</h3>
                <p className="text-xs text-[#9CA3AF]">
                  Scale effortlessly from a single outlet in Dhaka to nationwide franchises with unified governance.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1F1F28] space-y-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Direct Local Support</h3>
                <p className="text-xs text-[#9CA3AF]">
                  Real human technicians available via phone, WhatsApp, and on-site visits across Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-2xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Upgrade to DineOS AI?
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Experience the POS terminal that powers Mirpur 10's best dining experiences.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-950/50"
              >
                <span>Launch POS Terminal</span>
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
