import React, { useState } from 'react';
import { Building, Plus, MapPin, Phone, CheckCircle, ArrowRight, X } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { BRANCH_LIST } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';

interface BranchInfo {
  id: string;
  name: string;
  manager: string;
  phone: string;
  address: string;
  tablesCount: number;
  todaySales: number;
  isActive: boolean;
}

const INITIAL_BRANCHES: BranchInfo[] = [
  { id: 'b_1', name: 'Mirpur 10', manager: 'Tanvir Ahmed', phone: '+8801711001122', address: 'Plot 5, Section 10, Mirpur, Dhaka', tablesCount: 10, todaySales: 3301, isActive: true },
  { id: 'b_2', name: 'Dhanmondi Branch', manager: 'Hasan Mahmud', phone: '+8801822112233', address: 'Road 27, Dhanmondi, Dhaka', tablesCount: 14, todaySales: 5400, isActive: false },
  { id: 'b_3', name: 'Gulshan Branch', manager: 'Rafiqul Islam', phone: '+8801933112233', address: 'Gulshan 2 Circle, Dhaka', tablesCount: 16, todaySales: 8900, isActive: false },
  { id: 'b_4', name: 'Uttara Sector 11', manager: 'Sumon Mia', phone: '+8801644112233', address: 'Gareeb-e-Nawaz Ave, Uttara, Dhaka', tablesCount: 12, todaySales: 4100, isActive: false },
  { id: 'b_5', name: 'Banani 11', manager: 'Mahmudur Rahman', phone: '+8801755112233', address: 'Road 11, Block D, Banani, Dhaka', tablesCount: 15, todaySales: 7200, isActive: false },
];

export const BranchesView: React.FC = () => {
  const { activeBranch, setActiveBranch } = usePOS();
  const [branches, setBranches] = useState<BranchInfo[]>(INITIAL_BRANCHES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Multi-Branch Outlets Management</h2>
            <p className="text-xs text-slate-400">
              Centralized branch controls, outlet revenue, and branch switching
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Branch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((b) => {
          const isSelected = activeBranch === b.name;
          return (
            <div
              key={b.id}
              className={`rounded-2xl p-5 border shadow-xl flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-[#101b3d] border-indigo-500 ring-1 ring-indigo-500/50'
                  : 'bg-[#0b1328] border-[#18264c]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-white">{b.name}</h4>
                    <p className="text-xs text-slate-400">Manager: {b.manager}</p>
                  </div>
                  {isSelected ? (
                    <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Active POS
                    </span>
                  ) : (
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Online
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400 truncate">{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono-numbers">{b.phone}</span>
                  </div>
                </div>

                <div className="bg-[#121c3c] p-2.5 rounded-xl border border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">Tables: {b.tablesCount}</span>
                  <span className="font-bold text-emerald-400 font-mono-numbers">
                    Today: {formatBDT(isSelected ? 3301 : b.todaySales)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                {isSelected ? (
                  <span className="text-xs font-semibold text-indigo-400">Current Session</span>
                ) : (
                  <button
                    onClick={() => setActiveBranch(b.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#172554] hover:bg-[#1e3a8a] text-sky-200 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>Switch to this Branch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Add New Branch</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBranches([
                  ...branches,
                  {
                    id: `b_${Date.now()}`,
                    name,
                    manager: 'Assigned Manager',
                    phone: '+8801700000000',
                    address: address || 'Dhaka',
                    tablesCount: 10,
                    todaySales: 0,
                    isActive: false,
                  },
                ]);
                setName('');
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Branch Name</label>
                <input
                  type="text"
                  placeholder="e.g. Khilgaon Taltola Branch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Branch Address</label>
                <input
                  type="text"
                  placeholder="e.g. Shahid Baki Road, Khilgaon"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
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
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
