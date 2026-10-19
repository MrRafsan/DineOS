'use client';

import React, { useState, useEffect } from 'react';
import { Link } from './Link';
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#1F1F28] shadow-lg shadow-black/40'
          : 'bg-[#0A0A0F]/70 backdrop-blur-xs border-b border-[#1F1F28]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Dine<span className="text-[#22C55E]">OS</span>
                </span>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-[#22C55E] text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-medium tracking-tight -mt-1 hidden sm:block">
                The Brain Behind Your Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-[#1F1F28] shadow-xs'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#0F172A]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] border border-[#1F1F28] px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>POS Terminal</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-bold text-black bg-[#22C55E] hover:bg-[#16A34A] px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-bold text-black bg-[#22C55E] px-3 py-1.5 rounded-lg"
            >
              POS
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0F172A] border border-[#1F1F28] text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-[#1F1F28] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  currentPath === link.href
                    ? 'text-white bg-[#1F1F28]'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#0F172A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1F1F28] flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#0F172A] border border-[#1F1F28] py-2.5 rounded-xl text-center"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Launch POS Dashboard</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-black bg-[#22C55E] py-2.5 rounded-xl text-center shadow-lg shadow-emerald-950/40"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
