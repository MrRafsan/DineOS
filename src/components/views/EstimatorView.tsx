import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, TrendingUp, Sparkles } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface RecipeEstimate {
  id: string;
  dishName: string;
  category: string;
  rawCost: number;
  packagingCost: number;
  sellingPrice: number;
}

const INITIAL_ESTIMATES: RecipeEstimate[] = [
  {
    id: 'est_1',
    dishName: 'Smoky BBQ Chicken Burger',
    category: 'Burgers',
    rawCost: 95,
    packagingCost: 15,
    sellingPrice: 240,
  },
  {
    id: 'est_2',
    dishName: 'Special Mutton Kacchi Biryani',
    category: 'Rice & Biryani',
    rawCost: 165,
    packagingCost: 20,
    sellingPrice: 380,
  },
  {
    id: 'est_3',
    dishName: 'BBQ Chicken Supreme Pizza 9"',
    category: 'Pizza & Pasta',
    rawCost: 180,
    packagingCost: 25,
    sellingPrice: 490,
  },
  {
    id: 'est_4',
    dishName: 'Naga Fried Chicken Wings 6pcs',
    category: 'Appetizers & Sides',
    rawCost: 85,
    packagingCost: 12,
    sellingPrice: 230,
  },
];

export const EstimatorView: React.FC = () => {
  const [estimates, setEstimates] = useState<RecipeEstimate[]>(INITIAL_ESTIMATES);
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('Burgers');
  const [rawCost, setRawCost] = useState(100);
  const [packagingCost, setPackagingCost] = useState(15);
  const [sellingPrice, setSellingPrice] = useState(250);

  const calculateMargin = (raw: number, pack: number, sell: number) => {
    const totalCost = raw + pack;
    const profit = sell - totalCost;
    const marginPct = sell > 0 ? Math.round((profit / sell) * 100) : 0;
    return { totalCost, profit, marginPct };
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    setEstimates([
      {
        id: `est_${Date.now()}`,
        dishName: dishName.trim(),
        category,
        rawCost: Number(rawCost),
        packagingCost: Number(packagingCost),
        sellingPrice: Number(sellingPrice),
      },
      ...estimates,
    ]);
    setDishName('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Food Cost & Margin Estimator</h2>
            <p className="text-xs text-slate-400">
              Calculate ingredient cost, packaging overhead, and gross profit margin percentage
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Estimator Tool */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white">Calculate New Recipe Margin</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Recipe / Dish Name</label>
              <input
                type="text"
                placeholder="e.g. Crispy Chicken Strips"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Raw Food Cost (BDT)</label>
                <input
                  type="number"
                  min="1"
                  value={rawCost}
                  onChange={(e) => setRawCost(Number(e.target.value))}
                  className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Packaging (BDT)</label>
                <input
                  type="number"
                  min="0"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Target Selling Price (BDT)</label>
              <input
                type="number"
                min="1"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Live Calculation preview */}
            {(() => {
              const { totalCost, profit, marginPct } = calculateMargin(
                Number(rawCost),
                Number(packagingCost),
                Number(sellingPrice)
              );
              return (
                <div className="p-3 bg-[#121c3c] rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Cost per portion:</span>
                    <span className="font-mono-numbers text-slate-200">{formatBDT(totalCost)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Gross Profit:</span>
                    <span className="font-mono-numbers text-emerald-400 font-bold">{formatBDT(profit)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-700">
                    <span>Gross Margin %:</span>
                    <span className="font-mono-numbers text-emerald-400">{marginPct}%</span>
                  </div>
                </div>
              );
            })()}

            <button
              type="submit"
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              Add to Estimator Ledger
            </button>
          </form>
        </div>

        {/* Saved Recipe Margins Table */}
        <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-white">Standard Recipe Profit Margins</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Recipe Name</th>
                  <th className="py-2.5 px-3">Raw Cost</th>
                  <th className="py-2.5 px-3">Packaging</th>
                  <th className="py-2.5 px-3">Selling Price</th>
                  <th className="py-2.5 px-3">Gross Profit</th>
                  <th className="py-2.5 px-3 text-right">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
                {estimates.map((est) => {
                  const { profit, marginPct } = calculateMargin(
                    est.rawCost,
                    est.packagingCost,
                    est.sellingPrice
                  );
                  return (
                    <tr key={est.id} className="hover:bg-[#121c3c]/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-white">{est.dishName}</td>
                      <td className="py-2.5 px-3 text-slate-300 font-mono-numbers">{formatBDT(est.rawCost)}</td>
                      <td className="py-2.5 px-3 text-slate-400 font-mono-numbers">{formatBDT(est.packagingCost)}</td>
                      <td className="py-2.5 px-3 text-white font-bold font-mono-numbers">{formatBDT(est.sellingPrice)}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold font-mono-numbers">{formatBDT(profit)}</td>
                      <td className="py-2.5 px-3 text-right font-black text-amber-400 font-mono-numbers">
                        {marginPct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
