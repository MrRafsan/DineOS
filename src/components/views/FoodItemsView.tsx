import React, { useState } from 'react';
import { Plus, Search, UtensilsCrossed, Check, X } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT } from '../../utils/formatters';

export const FoodItemsView: React.FC = () => {
  const { menuItems, categories, addMenuItem } = usePOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('cat_all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [category, setCategory] = useState('cat_burgers');
  const [price, setPrice] = useState(250);
  const [image, setImage] = useState('');
  const [prepTime, setPrepTime] = useState(10);
  const [description, setDescription] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'cat_all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.banglaName && item.banglaName.includes(searchQuery));
    return matchesCat && matchesQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addMenuItem({
      name: name.trim(),
      banglaName: banglaName.trim() || undefined,
      category,
      price: Number(price),
      image:
        image.trim() ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      description: description.trim() || undefined,
      isAvailable: true,
      prepTime: Number(prepTime),
    });

    setName('');
    setBanglaName('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Add Bar */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121c3c] border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-[#121c3c] text-slate-300 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Food Item</span>
        </button>
      </div>

      {/* Food Items Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#0e1738] border border-[#1b2b54] rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="w-full h-36 bg-slate-800 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-emerald-400 text-xs font-extrabold px-2 py-0.5 rounded font-mono-numbers">
                  {formatBDT(item.price)}
                </span>
              </div>

              <div className="p-3.5 space-y-1">
                <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                {item.banglaName && (
                  <p className="text-xs text-slate-400 line-clamp-1">{item.banglaName}</p>
                )}
                {item.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-[#121c3c] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Prep: {item.prepTime} mins</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Available
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-base text-white">Add New Food Item</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Item Name (English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Naga Chicken Burger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Bangla Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. নাগা চিকেন বার্গার"
                  value={banglaName}
                  onChange={(e) => setBanglaName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    {categories.filter((c) => c.id !== 'cat_all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Price (BDT)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Photo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Ingredients or description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
