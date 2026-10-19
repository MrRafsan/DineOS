import React, { useState } from 'react';
import { Calendar, Plus, Phone, Users, Clock, Check, X, Search, MapPin } from 'lucide-react';
import { usePOS } from '../../context/POSContext';

interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  partySize: number;
  tableName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'seated' | 'cancelled';
  notes?: string;
}

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res_1',
    guestName: 'Dr. Mahbubur Rahman',
    phone: '+8801712345678',
    partySize: 6,
    tableName: 'Rooftop VIP',
    date: '2026-10-15',
    time: '08:00 PM',
    status: 'confirmed',
    notes: 'Family dinner, requested rooftop corner view',
  },
  {
    id: 'res_2',
    guestName: 'Nusrat Faria',
    phone: '+8801822334455',
    partySize: 4,
    tableName: 'Balcony 3',
    date: '2026-10-15',
    time: '08:30 PM',
    status: 'confirmed',
    notes: 'Birthday celebration, requested candle on brownie',
  },
  {
    id: 'res_3',
    guestName: 'Engr. Shamim Hossain',
    phone: '+8801933445566',
    partySize: 2,
    tableName: 'Table 6',
    date: '2026-10-15',
    time: '07:30 PM',
    status: 'seated',
    notes: 'Arrived on time',
  },
];

export const ReservationView: React.FC = () => {
  const { tables } = usePOS();
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('chillypos_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'seated' | 'cancelled'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(4);
  const [tableName, setTableName] = useState('Balcony 2');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('08:00 PM');
  const [notes, setNotes] = useState('');

  const saveToStorage = (updated: Reservation[]) => {
    setReservations(updated);
    try {
      localStorage.setItem('chillypos_reservations', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newRes: Reservation = {
      id: `res_${Date.now()}`,
      guestName: guestName.trim(),
      phone: phone.trim(),
      partySize: Number(partySize),
      tableName,
      date,
      time,
      status: 'confirmed',
      notes: notes.trim() || undefined,
    };

    saveToStorage([newRes, ...reservations]);
    setGuestName('');
    setPhone('');
    setNotes('');
    setShowAddModal(false);
  };

  const handleUpdateStatus = (id: string, newStatus: 'confirmed' | 'seated' | 'cancelled') => {
    const updated = reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    saveToStorage(updated);
  };

  const filtered = reservations.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.guestName.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.tableName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      {/* Top Header & Actions */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Table Reservations</h2>
            <p className="text-xs text-slate-400">
              Manage advance guest bookings, party sizes, and floor seating allocations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guest or table..."
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
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'confirmed', 'seated', 'cancelled'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 text-xs font-bold capitalize rounded-lg transition-colors ${
              statusFilter === st
                ? 'bg-rose-600 text-white'
                : 'bg-[#121c3c] text-slate-300 hover:text-white'
            }`}
          >
            {st} ({st === 'all' ? reservations.length : reservations.filter((r) => r.status === st).length})
          </button>
        ))}
      </div>

      {/* Reservations Table */}
      <div className="bg-[#0b1328] border border-[#18264c] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101b38] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4 text-center">Guests</th>
                <th className="py-3 px-4">Assigned Table</th>
                <th className="py-3 px-4">Booking Time</th>
                <th className="py-3 px-4">Special Notes</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18264c]/40 text-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No reservations found for the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-[#121c3c]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs shrink-0">
                        {res.guestName.charAt(0)}
                      </div>
                      <span>{res.guestName}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono-numbers">{res.phone}</td>
                    <td className="py-3 px-4 text-center font-mono-numbers font-bold text-amber-400">
                      {res.partySize} Pers.
                    </td>
                    <td className="py-3 px-4 font-semibold text-sky-400">{res.tableName}</td>
                    <td className="py-3 px-4 text-slate-300 font-mono-numbers">
                      {res.date} at {res.time}
                    </td>
                    <td className="py-3 px-4 text-slate-400 italic max-w-xs truncate">
                      {res.notes || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          res.status === 'confirmed'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : res.status === 'seated'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(res.id, 'seated')}
                            className="p-1 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-[10px] font-bold px-2 transition-colors"
                            title="Guest has arrived and is seated"
                          >
                            Mark Seated
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(res.id, 'cancelled')}
                            className="p-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[10px] px-2 transition-colors"
                            title="Cancel reservation"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Reservation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Create Table Reservation</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Guest Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tanvir Ahmed"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+8801..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Party Size (Persons)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white font-mono-numbers focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Assign Table</label>
                  <select
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.floor} - {t.capacity} seats)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="08:00 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Special Request / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Window view, Anniversary celebration..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
