import React, { useState } from 'react';
import {
  Search,
  Filter,
  Printer,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { formatBDT, formatDateOnly, formatTimeOnly } from '../../utils/formatters';
import { Order } from '../../types/pos';

export const OrderHistoryView: React.FC = () => {
  const { orders, orderHistory, setReceiptOrder, setIsReceiptModalOpen } = usePOS();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const allOrders: Order[] = [...orders, ...orderHistory];

  const filteredOrders = allOrders.filter((order) => {
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesType =
      typeFilter === 'all' || order.type === typeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      order.tokenNumber.toString().includes(q) ||
      (order.tableName && order.tableName.toLowerCase().includes(q)) ||
      (order.customerName && order.customerName.toLowerCase().includes(q)) ||
      (order.customerPhone && order.customerPhone.includes(q)) ||
      (order.channelOrderNumber && order.channelOrderNumber.toLowerCase().includes(q));

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleReprint = (order: Order) => {
    setReceiptOrder(order);
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by token #, table, customer phone, order #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121c3c] border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1">
          {(['all', 'active', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#121c3c] text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Channel Dropdown */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-[#121c3c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
        >
          <option value="all">All Channels</option>
          <option value="dine_in">Dine In</option>
          <option value="foodpanda">Foodpanda</option>
          <option value="foodi">Foodi</option>
          <option value="pathao">Pathao</option>
          <option value="delivery">Delivery</option>
          <option value="takeaway">Takeaway</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0e1738] border border-[#1b2b54] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121c3c] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Channel / Table</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#152349]/70 transition-colors">
                    <td className="py-3 px-4 font-black text-white font-mono-numbers">
                      #{ord.tokenNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div>{formatDateOnly(ord.createdAt)}</div>
                      <div className="text-[10px] text-slate-500 font-mono-numbers">
                        {formatTimeOnly(ord.createdAt)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-white">
                        {ord.tableName || ord.channelOrderNumber || ord.type.toUpperCase()}
                      </span>
                      <div className="text-[10px] uppercase text-indigo-400">
                        {ord.type.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{ord.customerName}</div>
                      {ord.customerPhone && (
                        <div className="text-[10px] text-slate-400 font-mono-numbers">
                          {ord.customerPhone}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-400">
                      {ord.items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-200">
                        {ord.paymentMethod || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-400 font-mono-numbers text-sm">
                      {formatBDT(ord.total)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          ord.status === 'active'
                            ? 'bg-sky-950 text-sky-400 border border-sky-800'
                            : ord.status === 'completed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleReprint(ord)}
                        className="p-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800/60 text-indigo-300 hover:text-white transition-colors"
                        title="View / Reprint Thermal Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
