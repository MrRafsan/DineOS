import React from 'react';
import { Utensils, Bike, ShoppingBag } from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { OrderType } from '../types/pos';

export const OrderTypeSelector: React.FC = () => {
  const {
    selectedOrderType,
    setSelectedOrderType,
    tables,
    setIsOrderModalOpen,
    setSelectedTable,
  } = usePOS();

  // Count occupied dine-in tables
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;

  const handleSelectChannel = (type: OrderType) => {
    setSelectedOrderType(type);
    if (type !== 'dine_in') {
      // For online/delivery channels, open POS ordering terminal directly
      setSelectedTable(null);
      setIsOrderModalOpen(true);
    }
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
      {/* 1. Dine In */}
      <button
        onClick={() => handleSelectChannel('dine_in')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'dine_in'
            ? 'bg-[#101b3a] border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-sm shrink-0">
            <Utensils className="w-5 h-5 text-slate-900" />
          </div>
          {/* Green occupied count badge matching screenshot '5' */}
          <div className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0d152a] font-mono-numbers">
            {occupiedCount}
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Dine In
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Choose Table First
          </div>
        </div>
      </button>

      {/* 2. Foodpanda */}
      <button
        onClick={() => handleSelectChannel('foodpanda')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'foodpanda'
            ? 'bg-[#101b3a] border-[#D70F64] shadow-md ring-1 ring-[#D70F64]/40'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#D70F64] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-sm">
          🐼
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Foodpanda
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Create Foodpanda Orders
          </div>
        </div>
      </button>

      {/* 3. Foodi */}
      <button
        onClick={() => handleSelectChannel('foodi')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'foodi'
            ? 'bg-[#101b3a] border-red-500 shadow-md ring-1 ring-red-500/40'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#E21B70] flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
          F!
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Foodi
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Create Foodi Orders
          </div>
        </div>
      </button>

      {/* 4. Pathao */}
      <button
        onClick={() => handleSelectChannel('pathao')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'pathao'
            ? 'bg-[#101b3a] border-[#e22b2b] shadow-md ring-1 ring-[#e22b2b]/40'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#E52928] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm">
          P
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Pathao
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Create Pathao Orders
          </div>
        </div>
      </button>

      {/* 5. Delivery */}
      <button
        onClick={() => handleSelectChannel('delivery')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'delivery'
            ? 'bg-[#101b3a] border-sky-500 shadow-md ring-1 ring-sky-500/40'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#172554] border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
          <Bike className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Delivery
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Create Delivery Orders
          </div>
        </div>
      </button>

      {/* 6. Takeaway */}
      <button
        onClick={() => handleSelectChannel('takeaway')}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 select-none text-left min-w-[170px] ${
          selectedOrderType === 'takeaway'
            ? 'bg-[#101b3a] border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
            : 'bg-[#0d152a] border-[#182649] hover:bg-[#121c38] hover:border-slate-700'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-[#064e3b] border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white tracking-wide">
            Takeaway
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Create Takeaway Orders
          </div>
        </div>
      </button>
    </div>
  );
};
