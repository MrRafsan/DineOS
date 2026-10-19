import React, { useState } from 'react';
import { Wheat, Plus, Search, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface Ingredient {
  id: string;
  name: string;
  banglaName?: string;
  category: string;
  unit: string;
  avgCost: number;
  inStock: number;
}

const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 'ing_1', name: 'Chicken Breast Boneless', banglaName: 'চিকেন ব্রেস্ট', category: 'Meat', unit: 'kg', avgCost: 260, inStock: 18.5 },
  { id: 'ing_2', name: 'Beef Mince / Patty Meat', banglaName: 'বিফ কিমা', category: 'Meat', unit: 'kg', avgCost: 780, inStock: 12.0 },
  { id: 'ing_3', name: 'Chinigura Aromatic Rice', banglaName: 'চিনিগুঁড়া চাল', category: 'Grains', unit: 'kg', avgCost: 140, inStock: 45.0 },
  { id: 'ing_4', name: 'Mozzarella Block Cheese', banglaName: 'মোজারেলা চিজ', category: 'Dairy', unit: 'kg', avgCost: 850, inStock: 4.5 },
  { id: 'ing_5', name: 'Sesame Seed Burger Buns', banglaName: 'বার্গার বান', category: 'Bakery', unit: 'pcs', avgCost: 18, inStock: 32 },
  { id: 'ing_6', name: 'Pure Cow Milk Ghee', banglaName: 'খাঁটি ঘি', category: 'Dairy', unit: 'kg', avgCost: 1250, inStock: 8.0 },
  { id: 'ing_7', name: 'Hot Naga Morich Chili Paste', banglaName: 'নাগা মরিচ পেস্ট', category: 'Spices', unit: 'kg', avgCost: 450, inStock: 2.1 },
];

export const IngredientsView: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('kg');
  const [cost, setCost] = useState(200);

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (i.banglaName && i.banglaName.includes(searchQuery))
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Raw Ingredients Master List</h2>
            <p className="text-xs text-slate-400">
              Units of measurement, average raw costs, and recipe ingredient linkages
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ingredient</span>
        </button>
      </div>

      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Ingredient Name</th>
              <th className="py-3 px-4">Bangla Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Measurement Unit</th>
              <th className="py-3 px-4">Avg Cost / Unit</th>
              <th className="py-3 px-4 text-right">Current Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#121c3c]/50 transition-colors">
                <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                <td className="py-3 px-4 text-slate-400">{item.banglaName || '—'}</td>
                <td className="py-3 px-4 text-slate-300">{item.category}</td>
                <td className="py-3 px-4 text-sky-400 font-semibold">{item.unit}</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-200">{formatBDT(item.avgCost)}</td>
                <td className="py-3 px-4 text-right font-black text-emerald-400 font-mono-numbers">
                  {item.inStock} {item.unit}
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
              <h3 className="font-bold text-base text-white">Add Raw Material</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIngredients([
                  ...ingredients,
                  {
                    id: `ing_${Date.now()}`,
                    name,
                    category: 'Kitchen Raw',
                    unit,
                    avgCost: Number(cost),
                    inStock: 10,
                  },
                ]);
                setName('');
                setShowAddModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Ingredient Name</label>
                <input
                  type="text"
                  placeholder="e.g. Black Pepper Whole"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="ltr">ltr</option>
                    <option value="pcs">pcs</option>
                    <option value="gm">gm</option>
                    <option value="packet">packet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Cost / Unit (BDT)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                    required
                  />
                </div>
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
                  Save Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
