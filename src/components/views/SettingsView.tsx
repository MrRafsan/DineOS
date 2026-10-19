import React, { useState } from 'react';
import {
  Settings,
  Store,
  Receipt,
  RotateCcw,
  Database,
  Save,
  Check,
  Server,
} from 'lucide-react';
import { usePOS } from '../../context/POSContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetToDemoData, showToast } = usePOS();

  const [name, setName] = useState(settings.name);
  const [branch, setBranch] = useState(settings.branch);
  const [salesPhone, setSalesPhone] = useState(settings.salesPhone);
  const [vatPercent, setVatPercent] = useState(settings.vatPercent);
  const [address, setAddress] = useState(settings.address);
  const [receiptFooter, setReceiptFooter] = useState(settings.receiptFooter);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name,
      branch,
      salesPhone,
      vatPercent: Number(vatPercent),
      address,
      receiptFooter,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      tables: localStorage.getItem('chillypos_app_state_v1_tables'),
      orders: localStorage.getItem('chillypos_app_state_v1_orders'),
      history: localStorage.getItem('chillypos_app_state_v1_history'),
      menu: localStorage.getItem('chillypos_app_state_v1_menu'),
      settings: localStorage.getItem('chillypos_app_state_v1_settings'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chillypos_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Restaurant System Settings
            </h2>
            <p className="text-xs text-slate-400">
              Configure restaurant branch, VAT %, receipt printer, and storage
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg animate-fade-in font-medium">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Restaurant Profile */}
        <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white">
            <Store className="w-4 h-4 text-rose-400" />
            <span>Restaurant Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Restaurant Brand Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Active Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Sales & Support Helpline (Screenshot match)
              </label>
              <input
                type="text"
                value={salesPhone}
                onChange={(e) => setSalesPhone(e.target.value)}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Default VAT Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={vatPercent}
                onChange={(e) => setVatPercent(Number(e.target.value))}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Address (Printed on receipts)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Receipt Setup */}
        <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white">
            <Receipt className="w-4 h-4 text-sky-400" />
            <span>Thermal Receipt Template (80mm)</span>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Receipt Footer Note
            </label>
            <input
              type="text"
              value={receiptFooter}
              onChange={(e) => setReceiptFooter(e.target.value)}
              className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Database & LocalStorage info */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-5 rounded-xl shadow-lg space-y-3">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Storage & Future Database Integration</span>
        </div>

        <div className="p-3 bg-[#121c3c] rounded-lg text-xs space-y-1 text-slate-300">
          <p className="font-semibold text-emerald-300">
            ✓ Active Mode: LocalStorage Persistent Engine
          </p>
          <p className="text-slate-400">
            All tables, live timers, orders, menu items, and expenses are persistently saved in your browser's local storage.
            When you're ready to deploy to production with MongoDB / Mongoose & Next.js/Express, the schema structures in <code className="text-rose-400">src/types/pos.ts</code> match standard restaurant documents 1:1.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={handleExportData}
            className="px-3.5 py-2 bg-[#172554] hover:bg-[#1e3a8a] text-sky-300 rounded-xl text-xs font-bold transition-colors border border-sky-600/30"
          >
            Export Backup JSON
          </button>
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2a131b] hover:bg-[#3d1a26] text-rose-300 rounded-xl text-xs font-bold transition-colors border border-rose-700/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Screenshot State</span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmReset && (
          <div className="p-3 bg-rose-950/40 border border-rose-700/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mt-3">
            <span className="text-rose-200">
              Are you sure? This will restore all tables, tokens, and menu items to the DineOS demo state.
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  resetToDemoData();
                  setShowConfirmReset(false);
                  showToast('Demo data successfully restored to DineOS state!', 'success');
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold"
              >
                Yes, Reset Now
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
