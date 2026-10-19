import React, { useState } from 'react';
import { Layers, Plus, Sparkles, Tag, Check, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface ComboItem {
  id: string;
  name: string;
  itemsIncluded: string[];
  regularPrice: number;
  comboPrice: number;
  savings: number;
  isAvailable: boolean;
}

const INITIAL_COMBOS: ComboItem[] = [
  {
    id: 'combo_1',
    name: 'Mega Burger Platter (Couple)',
    itemsIncluded: ['2x Smoky BBQ Chicken Burger', '1x Large Fries', '2x Chilly Cold Coffee'],
    regularPrice: 900,
    comboPrice: 799,
    savings: 101,
    isAvailable: true,
  },
  {
    id: 'combo_2',
    name: 'Family Feast Pizza Combo',
    itemsIncluded: ['1x BBQ Chicken Supreme 9"', '6x Naga Wings', '1x 1.5L Soft Drink'],
    regularPrice: 850,
    comboPrice: 750,
    savings: 100,
    isAvailable: true,
  },
  {
    id: 'combo_3',
    name: 'Royal Kacchi Biryani Platter',
    itemsIncluded: ['2x Special Mutton Kacchi Biryani', '2x Borhani', '2x Firni'],
    regularPrice: 960,
    comboPrice: 880,
    savings: 80,
    isAvailable: true,
  },
];

export const CombinedView: React.FC = () => {
  const [combos, setCombos] = useState<ComboItem[]>(INITIAL_COMBOS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [items, setItems] = useState('');
  const [regularPrice, setRegularPrice] = useState(600);
  const [comboPrice, setComboPrice] = useState(499);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCombo: ComboItem = {
      id: `combo_${Date.now()}`,
      name: name.trim(),
      itemsIncluded: items.split(',').map((s) => s.trim()),
      regularPrice: Number(regularPrice),
      comboPrice: Number(comboPrice),
      savings: Math.max(0, Number(regularPrice) - Number(comboPrice)),
      isAvailable: true,
    };

    setCombos([newCombo, ...combos]);
    setName('');
    setItems('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Combined & Set Menus (Combos)</h2>
            <p className="text-xs text-slate-400">
              Create value platters, couple set menus, and discounted bundle deals
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Combo Deal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{combo.name}</h4>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-numbers">
                  Save {formatBDT(combo.savings)}
                </span>
              </div>

              <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Items Included:
                </span>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {combo.itemsIncluded.map((it, idx) => (
                    <li key={idx} className="truncate">{it}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 line-through font-mono-numbers block">
                  {formatBDT(combo.regularPrice)}
                </span>
                <span className="text-base font-black text-emerald-400 font-mono-numbers">
                  {formatBDT(combo.comboPrice)}
                </span>
              </div>

              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Active on POS
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">New Combo Bundle</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Combo Deal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Student Burger Platter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Items Included (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 1x Burger, 1x Fries, 1x Drink"
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Original Price (BDT)</label>
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(Number(e.target.value))}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Combo Price (BDT)</label>
                  <input
                    type="number"
                    value={comboPrice}
                    onChange={(e) => setComboPrice(Number(e.target.value))}
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
                  Save Combo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
