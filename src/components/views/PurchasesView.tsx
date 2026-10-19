import React, { useState } from 'react';
import { ShoppingCart, Plus, Calendar, DollarSign, CheckCircle2, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface PurchaseInvoice {
  id: string;
  invoiceNo: string;
  supplierName: string;
  date: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'due';
  itemsSummary: string;
}

const INITIAL_PURCHASES: PurchaseInvoice[] = [
  { id: 'pur_1', invoiceNo: 'INV-2026-901', supplierName: 'Mirpur Poultry & Chicken Firm', date: '2026-10-14', totalAmount: 5200, paidAmount: 5200, paymentStatus: 'paid', itemsSummary: '20kg Chicken Breast' },
  { id: 'pur_2', invoiceNo: 'INV-2026-902', supplierName: 'Bengal Meat Corporation', date: '2026-10-13', totalAmount: 9360, paidAmount: 5000, paymentStatus: 'partial', itemsSummary: '12kg Prime Beef Boneless' },
  { id: 'pur_3', invoiceNo: 'INV-2026-903', supplierName: 'Dhaka Dairy & Mozzarella Trade', date: '2026-10-12', totalAmount: 4250, paidAmount: 4250, paymentStatus: 'paid', itemsSummary: '5kg Mozzarella Cheese' },
];

export const PurchasesView: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseInvoice[]>(INITIAL_PURCHASES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [supplierName, setSupplierName] = useState('Mirpur Poultry & Chicken Firm');
  const [totalAmount, setTotalAmount] = useState(2500);
  const [itemsSummary, setItemsSummary] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNo.trim()) return;

    setPurchases([
      {
        id: `pur_${Date.now()}`,
        invoiceNo: invoiceNo.trim(),
        supplierName,
        date: new Date().toISOString().split('T')[0],
        totalAmount: Number(totalAmount),
        paidAmount: Number(totalAmount),
        paymentStatus: 'paid',
        itemsSummary: itemsSummary.trim() || 'Raw kitchen supplies',
      },
      ...purchases,
    ]);
    setShowAddModal(false);
    setInvoiceNo('');
    setItemsSummary('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Supplier Purchases & Invoices</h2>
            <p className="text-xs text-slate-400">
              Track raw ingredient purchases, vendor invoices, and outstanding payables
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Purchase Bill</span>
        </button>
      </div>

      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Supplier Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Items Summary</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Paid</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
            {purchases.map((p) => (
              <tr key={p.id} className="hover:bg-[#121c3c]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white font-mono-numbers">{p.invoiceNo}</td>
                <td className="py-3 px-4 font-semibold text-sky-400">{p.supplierName}</td>
                <td className="py-3 px-4 text-slate-400 font-mono-numbers">{p.date}</td>
                <td className="py-3 px-4 text-slate-300">{p.itemsSummary}</td>
                <td className="py-3 px-4 font-black text-white font-mono-numbers">{formatBDT(p.totalAmount)}</td>
                <td className="py-3 px-4 text-emerald-400 font-bold font-mono-numbers">{formatBDT(p.paidAmount)}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      p.paymentStatus === 'paid'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Record Purchase Bill</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Invoice Number</label>
                <input
                  type="text"
                  placeholder="e.g. INV-904"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Supplier Name</label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Bill Amount (BDT)</label>
                <input
                  type="number"
                  min="1"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Purchased Items Memo</label>
                <input
                  type="text"
                  placeholder="e.g. 10kg Basmati Rice, 5L Oil"
                  value={itemsSummary}
                  onChange={(e) => setItemsSummary(e.target.value)}
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
                  Save Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
