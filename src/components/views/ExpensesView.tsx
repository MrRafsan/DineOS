import React, { useState } from 'react';
import { Plus, Wallet, Trash2, Calendar, Tag } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const ExpensesView: React.FC = () => {
  const { expenses, addExpense } = usePOS();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kitchen Groceries');
  const [amount, setAmount] = useState<number>(350);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [note, setNote] = useState('');

  const totalExpenseAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;
    addExpense(title.trim(), category, amount, paymentMethod, note.trim() || undefined);
    setTitle('');
    setNote('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Stat */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Restaurant Daily Expenses</h2>
            <p className="text-xs text-slate-400">
              Track daily kitchen purchases, petty cash, and operating expenses
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Total Recorded Today:</span>
            <span className="text-xl font-black text-rose-400 font-mono-numbers">
              {formatBDT(totalExpenseAmount)}
            </span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-[#0e1738] border border-[#1b2b54] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121c3c] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Expense Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Paid Via</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#142045]/60 transition-colors">
                  <td className="py-3 px-4 text-slate-400 font-mono-numbers">
                    <div>{exp.date}</div>
                    <div className="text-[10px] text-slate-500">{exp.time}</div>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">{exp.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-300">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-3 px-4 text-slate-400 italic">
                    {exp.note || '—'}
                  </td>
                  <td className="py-3 px-4 font-black text-rose-400 font-mono-numbers text-sm text-right">
                    -{formatBDT(exp.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <h3 className="font-bold text-base text-white mb-3">Record Expense</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Expense Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2kg Chicken or Gas refill"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="Kitchen Groceries">Kitchen Groceries</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Utilities & Gas">Utilities & Gas</option>
                  <option value="Staff Refreshment">Staff Refreshment</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Amount (BDT)
                </label>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="Cash">Cash (from drawer)</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Bank">Bank Account</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Note / Invoice Ref
                </label>
                <input
                  type="text"
                  placeholder="Optional memo..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
