'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — DineOS | Restaurant Tech Consultation',
  description:
    'Contact the DineOS team in Mirpur 10, Dhaka. Schedule an in-person demo or talk to our 24/7 restaurant POS specialists.',
  alternates: {
    canonical: 'https://dineos.com/contact',
  },
};

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    restaurant: '',
    branches: '1',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col selection:bg-[#22C55E] selection:text-black">
      <Navbar currentPath="/contact" />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-[#1F1F28] text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#1F1F28] text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We're Here to Help</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Talk with Our <span className="text-[#22C55E]">Restaurant POS Specialists</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              Whether you operate a bustling diner in Mirpur 10 or a multi-location chain across Bangladesh, our engineers are ready to assist.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Direct Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black text-white">Direct Contacts & Headquarters</h2>
                  <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
                    Visit our office or call our 24/7 hotline for instant assistance.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1F1F28] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-semibold uppercase">Headquarters</div>
                      <div className="text-sm font-bold text-white">Plot 12, Main Road, Mirpur 10 Roundabout</div>
                      <div className="text-xs text-[#9CA3AF]">Dhaka-1216, Bangladesh</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1F1F28] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-semibold uppercase">24/7 Phone & WhatsApp</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">+880 1712-345678</div>
                      <div className="text-xs text-[#9CA3AF]">Instant triage for live restaurant operations</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1F1F28] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-semibold uppercase">Email Support</div>
                      <div className="text-sm font-bold text-white">support@dineos.com</div>
                      <div className="text-xs text-[#9CA3AF]">Enterprise Inquiries: sales@dineos.com</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1F1F28] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-semibold uppercase">Business Support Hours</div>
                      <div className="text-sm font-bold text-white">24 Hours / 7 Days a Week</div>
                      <div className="text-xs text-[#9CA3AF]">Because restaurants never stop</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="p-8 rounded-3xl bg-[#0F172A] border border-[#1F1F28] shadow-2xl relative">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Request Received!</h3>
                    <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                      Thank you for contacting DineOS. Our Mirpur 10 senior restaurant consultant will call you at {formData.phone || '+880 1712-345678'} within 15 minutes.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold text-emerald-400 hover:underline"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Schedule an In-Person POS Demo</h3>
                    <p className="text-xs text-[#9CA3AF]">Fill out this brief form and our team will get in touch.</p>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0F] border border-[#1F1F28] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 01712345678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0F] border border-[#1F1F28] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Restaurant Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ZEVOOX Grill"
                          value={formData.restaurant}
                          onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0F] border border-[#1F1F28] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Total Branches</label>
                      <select
                        value={formData.branches}
                        onChange={(e) => setFormData({ ...formData, branches: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0F] border border-[#1F1F28] text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1">1 Branch (Single Outlet)</option>
                        <option value="2-4">2 to 4 Branches</option>
                        <option value="5+">5+ Branches (Franchise Chain)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Message or Specific Requirements</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your seating capacity, thermal printers, or delivery aggregators..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0A0F] border border-[#1F1F28] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
