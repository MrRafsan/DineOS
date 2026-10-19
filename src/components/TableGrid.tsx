import React, { useState } from 'react';
import { Clock, Plus, Search, Filter } from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { Table, Order } from '../types/pos';
import { getElapsedTimeFormatted } from '../utils/formatters';

export const TableGrid: React.FC = () => {
  const {
    tables,
    orders,
    setSelectedTable,
    setIsTableDetailModalOpen,
    setIsOrderModalOpen,
    addTable,
  } = usePOS();

  const [activeFloor, setActiveFloor] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddTableModal, setShowAddTableModal] = useState<boolean>(false);
  const [newTableName, setNewTableName] = useState<string>('');
  const [newTableFloor, setNewTableFloor] = useState<string>('Main Hall');
  const [newTableCapacity, setNewTableCapacity] = useState<number>(4);

  // Filter tables
  const floors = ['All', 'Balcony', 'Main Hall', 'Rooftop'];

  const filteredTables = tables.filter((table) => {
    const matchesFloor = activeFloor === 'All' || table.floor === activeFloor;
    const matchesSearch = table.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFloor && matchesSearch;
  });

  const getTableOrder = (table: Table): Order | undefined => {
    if (!table.currentOrderId) return undefined;
    return orders.find((o) => o.id === table.currentOrderId);
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    if (table.status === 'occupied') {
      setIsTableDetailModalOpen(true);
    } else {
      // Available table: directly open ordering terminal
      setIsOrderModalOpen(true);
    }
  };

  const handleAddTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;
    addTable(newTableName.trim(), newTableFloor, newTableCapacity);
    setNewTableName('');
    setShowAddTableModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Filter and Area bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0a1128] p-3 rounded-xl border border-[#16234b]">
        {/* Floor selection tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeFloor === floor
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#152349]'
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Search & Add Table button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101b38] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAddTableModal(true)}
            className="flex items-center gap-1.5 bg-[#172554] hover:bg-[#1e3a8a] text-sky-300 border border-sky-600/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Table</span>
          </button>
        </div>
      </div>

      {/* Grid of Tables matching screenshot exact layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTables.map((table) => {
          const order = getTableOrder(table);
          const isOccupied = table.status === 'occupied' && order;

          if (isOccupied && order) {
            // OCCUPIED BLUE TABLE CARD
            return (
              <div
                key={table.id}
                onClick={() => handleTableClick(table)}
                className="bg-[#101b3d] hover:bg-[#14224c] border border-[#1e305e] hover:border-indigo-400/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-150 flex flex-col justify-between shadow-lg select-none group min-h-[170px]"
              >
                {/* Top Token header */}
                <div className="pt-3 pb-1 text-center border-b border-[#1b2b52]/50">
                  <span className="text-xs font-bold text-slate-300 tracking-wide font-mono-numbers">
                    Token #{order.tokenNumber}
                  </span>
                </div>

                {/* Body: Table No, Name, Waiter, Live Timer */}
                <div className="px-4 py-3 text-center space-y-1 flex-1 flex flex-col justify-center">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Table No.
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                    {table.name}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium">
                    {order.waiterName || 'Default Waiter'}
                  </div>

                  {/* Live Timer matching 🕒 5m 32s in screenshot */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-sky-400 font-semibold pt-1">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span className="font-mono-numbers">
                      {getElapsedTimeFormatted(order.createdAt, order.initialSeconds || 0)}
                    </span>
                  </div>
                </div>

                {/* Footer: BDT 438 */}
                <div className="px-4 py-2.5 bg-[#0b132c] border-t border-[#1b2b52] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">BDT</span>
                  <span className="text-base font-extrabold text-white font-mono-numbers tracking-tight">
                    {order.total}
                  </span>
                </div>
              </div>
            );
          }

          // AVAILABLE GREEN TABLE CARD matching screenshot Balcony 2 & Table 1
          return (
            <div
              key={table.id}
              onClick={() => handleTableClick(table)}
              className="bg-[#032e18] hover:bg-[#053d20] border border-[#0d6e3c] hover:border-[#10b981] rounded-xl overflow-hidden cursor-pointer transition-all duration-150 flex flex-col justify-between shadow-lg select-none group min-h-[170px]"
            >
              {/* Spacer or top tag */}
              <div className="pt-3 pb-1 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  {table.floor}
                </span>
              </div>

              {/* Body: Table No, Name */}
              <div className="px-4 py-3 text-center space-y-1 flex-1 flex flex-col justify-center">
                <div className="text-[11px] text-emerald-300/80 font-medium">
                  Table No.
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                  {table.name}
                </h3>
                <div className="text-[11px] text-emerald-300/60 font-medium">
                  Capacity: {table.capacity} Persons
                </div>
              </div>

              {/* Footer: AVAILABLE status with animated green ring matching screenshot */}
              <div className="px-4 py-2.5 bg-[#022413] border-t border-[#09572f] flex items-center justify-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="w-4 h-4 rounded-full border border-emerald-400/60 absolute animate-ping" />
                </div>
                <span className="text-xs font-black tracking-widest text-emerald-300">
                  AVAILABLE
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Table Modal */}
      {showAddTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-xl p-5 shadow-2xl">
            <h3 className="font-bold text-base text-white mb-3">Add New Dining Table</h3>
            <form onSubmit={handleAddTableSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Table 7 or Rooftop 2"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Floor / Zone
                </label>
                <select
                  value={newTableFloor}
                  onChange={(e) => setNewTableFloor(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Main Hall">Main Hall</option>
                  <option value="Balcony">Balcony</option>
                  <option value="Rooftop">Rooftop</option>
                  <option value="VIP Area">VIP Area</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Seating Capacity (Guests)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(Number(e.target.value))}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTableModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-500 rounded-lg font-semibold"
                >
                  Create Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
