import React, { useState } from 'react';
import { Users, Plus, Search, Phone, Star, Gift, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
}

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c_1', name: 'Kazi Naim', phone: '+8801700112233', totalVisits: 14, totalSpent: 8450, loyaltyPoints: 420, lastVisit: 'Today' },
  { id: 'c_2', name: 'Sadia Jahan', phone: '+8801833445566', totalVisits: 9, totalSpent: 6200, loyaltyPoints: 310, lastVisit: 'Yesterday' },
  { id: 'c_3', name: 'Mr. Zahid', phone: '+8801911445566', totalVisits: 6, totalSpent: 4300, loyaltyPoints: 215, lastVisit: 'Today' },
  { id: 'c_4', name: 'Ms. Ayesha', phone: '+8801611778899', totalVisits: 8, totalSpent: 5120, loyaltyPoints: 256, lastVisit: '3 days ago' },
];

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setCustomers([
      {
        id: `c_${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        totalVisits: 1,
        totalSpent: 0,
        loyaltyPoints: 50, // welcome bonus
        lastVisit: 'Today',
      },
      ...customers,
    ]);
    setShowAddModal(false);
    setName('');
    setPhone('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Customer Database & Loyalty CRM</h2>
            <p className="text-xs text-slate-400">
              Customer phone directory, lifetime dining spend, and reward points
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search phone or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121c3c] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4 text-center">Total Visits</th>
              <th className="py-3 px-4">Lifetime Spend</th>
              <th className="py-3 px-4 text-center">Loyalty Points</th>
              <th className="py-3 px-4">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#121c3c]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <span>{c.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono-numbers">{c.phone}</td>
                <td className="py-3 px-4 text-center font-mono-numbers font-bold text-sky-400">
                  {c.totalVisits} visits
                </td>
                <td className="py-3 px-4 font-black text-emerald-400 font-mono-numbers">
                  {formatBDT(c.totalSpent)}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-numbers">
                    ★ {c.loyaltyPoints} pts
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{c.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Add Customer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mahfuzur Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+8801..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 rounded-lg font-bold"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
