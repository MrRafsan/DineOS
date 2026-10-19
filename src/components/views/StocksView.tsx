import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle2, Plus, Search, RefreshCw, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface StockItem {
  id: string;
  name: string;
  category: string;
  currentQty: number;
  unit: string;
  minThreshold: number;
  costPerUnit: number;
}

const INITIAL_STOCKS: StockItem[] = [
  { id: 'stk_1', name: 'Fresh Chicken Breast', category: 'Meat & Poultry', currentQty: 18.5, unit: 'kg', minThreshold: 10, costPerUnit: 260 },
  { id: 'stk_2', name: 'Prime Beef Boneless', category: 'Meat & Poultry', currentQty: 12.0, unit: 'kg', minThreshold: 8, costPerUnit: 780 },
  { id: 'stk_3', name: 'Premium Chinigura / Basmati Rice', category: 'Grains & Rice', currentQty: 45.0, unit: 'kg', minThreshold: 20, costPerUnit: 140 },
  { id: 'stk_4', name: 'Mozzarella Shredded Cheese', category: 'Dairy', currentQty: 4.5, unit: 'kg', minThreshold: 6, costPerUnit: 850 }, // Low stock!
  { id: 'stk_5', name: 'Soft Burger Buns (Fresh)', category: 'Bakery', currentQty: 32, unit: 'pcs', minThreshold: 20, costPerUnit: 18 },
  { id: 'stk_6', name: 'Refined Soybean Cooking Oil', category: 'Oils & Ghee', currentQty: 25.0, unit: 'ltr', minThreshold: 15, costPerUnit: 175 },
  { id: 'stk_7', name: 'Hot Naga Chilli Paste', category: 'Spices & Sauces', currentQty: 2.1, unit: 'kg', minThreshold: 3, costPerUnit: 450 }, // Low stock!
  { id: 'stk_8', name: 'Roasted Espresso Coffee Beans', category: 'Beverage Raw', currentQty: 6.0, unit: 'kg', minThreshold: 3, costPerUnit: 1600 },
];

export const StocksView: React.FC = () => {
  const [stocks, setStocks] = useState<StockItem[]>(INITIAL_STOCKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRestockModal, setShowRestockModal] = useState<StockItem | null>(null);
  const [addedQty, setAddedQty] = useState(5);

  const filtered = stocks.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = stocks.filter((s) => s.currentQty <= s.minThreshold).length;

  const handleRestock = () => {
    if (!showRestockModal) return;
    setStocks(
      stocks.map((s) =>
        s.id === showRestockModal.id
          ? { ...s, currentQty: s.currentQty + Number(addedQty) }
          : s
      )
    );
    setShowRestockModal(null);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Inventory & Raw Stocks</h2>
            <p className="text-xs text-slate-400">
              Auto inventory deductions, threshold warnings, and reorder levels
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-700 text-rose-300 text-xs px-3 py-1.5 rounded-lg font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{lowStockCount} Low Stock Alerts!</span>
            </div>
          )}

          <div className="relative w-52">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121c3c] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Ingredient Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Qty</th>
                <th className="py-3 px-4">Min Reorder Level</th>
                <th className="py-3 px-4">Cost / Unit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
              {filtered.map((item) => {
                const isLow = item.currentQty <= item.minThreshold;
                return (
                  <tr key={item.id} className="hover:bg-[#121c3c]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                    <td className="py-3 px-4 text-slate-400">{item.category}</td>
                    <td className="py-3 px-4 font-black font-mono-numbers text-sm text-white">
                      {item.currentQty} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono-numbers">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono-numbers">
                      {formatBDT(item.costPerUnit)} / {item.unit}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 w-max ${
                          isLow
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {isLow ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        <span>{isLow ? 'Low Stock' : 'In Stock'}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setShowRestockModal(item)}
                        className="p-1.5 rounded bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 text-[11px] font-bold px-2.5 transition-colors"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showRestockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Restock {showRestockModal.name}</h3>
              <button onClick={() => setShowRestockModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-slate-300">
                Current Stock: <span className="font-bold text-white">{showRestockModal.currentQty} {showRestockModal.unit}</span>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Add Quantity ({showRestockModal.unit})
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={addedQty}
                  onChange={(e) => setAddedQty(Number(e.target.value))}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowRestockModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestock}
                  className="px-4 py-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold"
                >
                  Confirm Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
