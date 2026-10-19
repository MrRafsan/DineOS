import React, { useState } from 'react';
import { FolderTree, Plus, Search, Utensils, Pizza, Soup, Coffee, Cake, Layers, Sandwich, X } from 'lucide-react';
import { usePOS } from '../../context/POSContext';

export const CategoriesView: React.FC = () => {
  const { categories, menuItems, showToast } = usePOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryCount = (catId: string) => {
    if (catId === 'cat_all') return menuItems.length;
    return menuItems.filter((i) => i.category === catId).length;
  };

  const getIconComponent = (catName: string) => {
    const n = catName.toLowerCase();
    if (n.includes('burger')) return Sandwich;
    if (n.includes('pizza') || n.includes('pasta')) return Pizza;
    if (n.includes('biryani') || n.includes('rice')) return Soup;
    if (n.includes('beverage') || n.includes('coffee') || n.includes('drink')) return Coffee;
    if (n.includes('dessert') || n.includes('cake')) return Cake;
    if (n.includes('platter') || n.includes('combo')) return Layers;
    return Utensils;
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Top Bar */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Food Menu Categories</h2>
            <p className="text-xs text-slate-400">
              Organize food items, fast POS order filtering, and catalog structure
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-52">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search category..."
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
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((cat) => {
          const Icon = getIconComponent(cat.name);
          const count = getCategoryCount(cat.id);

          return (
            <div
              key={cat.id}
              className="bg-[#0b1328] border border-[#18264c] hover:border-indigo-500/60 rounded-2xl p-4 shadow-xl flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#121c3c] border border-slate-700/80 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-mono-numbers">
                    {count} items active
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded font-mono-numbers">
                #{cat.id.replace('cat_', '')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Create Category</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`Category "${newCatName}" created successfully!`, 'success');
                setShowAddModal(false);
                setNewCatName('');
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Category Title</label>
                <input
                  type="text"
                  placeholder="e.g. Seafood & Soups"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
