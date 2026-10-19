import React, { useState } from 'react';
import { Megaphone, Plus, Tag, Send, MessageSquare, Check, X } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  timesUsed: number;
  status: 'active' | 'expired';
}

const INITIAL_PROMOS: PromoCode[] = [
  { id: 'p_1', code: 'CHILLY50', discountType: 'flat', discountValue: 50, minOrder: 300, timesUsed: 28, status: 'active' },
  { id: 'p_2', code: 'WEEKEND10', discountType: 'percentage', discountValue: 10, minOrder: 500, timesUsed: 45, status: 'active' },
  { id: 'p_3', code: 'BIRTHDAYVIP', discountType: 'flat', discountValue: 100, minOrder: 800, timesUsed: 12, status: 'active' },
];

export const MarketingView: React.FC = () => {
  const { showToast } = usePOS();
  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [smsMessage, setSmsMessage] = useState('DineOS Special: Enjoy 10% OFF on all Dine-In orders today! Use code DINEOS50 at Mirpur 10 branch.');
  const [code, setCode] = useState('');
  const [value, setValue] = useState(50);
  const [type, setType] = useState<'flat' | 'percentage'>('flat');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setPromos([
      {
        id: `p_${Date.now()}`,
        code: code.trim().toUpperCase(),
        discountType: type,
        discountValue: Number(value),
        minOrder: 300,
        timesUsed: 0,
        status: 'active',
      },
      ...promos,
    ]);
    setShowAddPromo(false);
    setCode('');
  };

  const handleSendSMS = () => {
    showToast(`Broadcast SMS sent to all registered customers successfully!`, 'success');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Marketing, Discounts & SMS Campaigns</h2>
            <p className="text-xs text-slate-400">
              Promotional voucher codes, targeted SMS broadcasting, and campaign analytics
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddPromo(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Promo Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Promo Codes List */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-white">Active Promo Discount Vouchers</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Voucher Code</th>
                <th className="py-2.5 px-3">Discount</th>
                <th className="py-2.5 px-3">Min Order</th>
                <th className="py-2.5 px-3 text-center">Times Used</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
              {promos.map((p) => (
                <tr key={p.id} className="hover:bg-[#121c3c]/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white font-mono-numbers tracking-wider">
                    {p.code}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400 font-mono-numbers">
                    {p.discountType === 'percentage' ? `${p.discountValue}% OFF` : `BDT ${p.discountValue} OFF`}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono-numbers">{formatBDT(p.minOrder)}</td>
                  <td className="py-2.5 px-3 text-center text-sky-400 font-bold font-mono-numbers">{p.timesUsed}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SMS Campaign Broadcaster */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">SMS Campaign Broadcaster</h3>
          </div>
          <p className="text-xs text-slate-400">
            Broadcast promotional deals directly to verified diner phone numbers.
          </p>

          <textarea
            rows={4}
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            className="w-full bg-[#121c3c] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
          />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Audience: All Customers</span>
            <span className="font-mono-numbers text-slate-300">{smsMessage.length} characters</span>
          </div>

          <button
            onClick={handleSendSMS}
            className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Broadcast SMS</span>
          </button>
        </div>
      </div>

      {showAddPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Create Promo Voucher</h3>
              <button onClick={() => setShowAddPromo(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Promo Code</label>
                <input
                  type="text"
                  placeholder="e.g. HOT100"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono-numbers focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Discount Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="flat">Flat BDT</option>
                    <option value="percentage">Percentage %</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Value</label>
                  <input
                    type="number"
                    min="1"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPromo(false)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 rounded-lg font-bold"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
