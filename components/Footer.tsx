'use client';

import React from 'react';
import { Link } from './Link';
import { Sparkles, MapPin, Phone, Mail, Globe, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0F] border-t border-[#1F1F28] text-[#9CA3AF] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand Info & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group select-none">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-950/40">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Dine<span className="text-[#22C55E]">OS</span>
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-[#22C55E] text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                AI
              </span>
            </Link>

            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              DineOS is not just a POS. It's the AI brain behind your restaurant — predicting sales, understanding customers, managing inventory, and helping you grow. Built for restaurants, powered by AI, trusted worldwide.
            </p>

            <div className="flex flex-col space-y-1.5 text-xs text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Headquarters: Mirpur 10, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>24/7 Hotline: +880 1712-345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Support: support@dineos.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: DineOS AI Features */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              DineOS AI
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Sales Forecast
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Customer Insights
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Auto Stock
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Smart Suggest
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Chat Assist
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Insight (AI Report)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Shift (Staff Scheduling)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: POS Modules */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              POS Modules
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dine-In & Tables
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Kitchen Display (K.D.S)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Customer Display (C.D.S)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Foodpanda & Pathao
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Multi-Branch Manager
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Live Thermal Receipt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Sales
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Live Demo Terminal
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                  <Shield className="w-3 h-3" />
                  Cloud Enterprise Grade
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1F1F28] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-xs text-white font-medium">
              © 2026 DineOS. All rights reserved.
            </p>
            <p className="text-[11px] text-[#22C55E] font-semibold tracking-wide">
              DineOS AI — The Brain Behind Your Restaurant
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
