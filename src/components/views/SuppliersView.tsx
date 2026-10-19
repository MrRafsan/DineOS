import React, { useState } from 'react';
import { Truck, Plus, Phone, MapPin, DollarSign, X } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  category: string;
  address: string;
  totalPurchased: number;
  currentDue: number;
}

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 'sup_1', companyName: 'Mirpur Poultry & Chicken Firm', contactPerson: 'Haji Rafiqul', phone: '+8801711223344', category: 'Meat & Poultry', address: 'Plot 12, Mirpur 1, Dhaka', totalPurchased: 45000, currentDue: 0 },
  { id: 'sup_2', companyName: 'Bengal Meat Corporation', contactPerson: 'Zakir Hossain', phone: '+8801822334455', category: 'Beef & Mutton', address: 'Tejgaon Industrial Area, Dhaka', totalPurchased: 82000, currentDue: 4360 },
  { id: 'sup_3', companyName: 'Dhaka Dairy & Mozzarella Trade', contactPerson: 'Aminul Islam', phone: '+8801933445566', category: 'Cheese & Dairy', address: 'Dhanmondi 27, Dhaka', totalPurchased: 28000, currentDue: 0 },
  { id: 'sup_4', companyName: 'Fresh Pack & Paper Carton Ltd.', contactPerson: 'Saiful Babu', phone: '+8801644556677', category: 'Packaging', address: 'Chawkbazar, Old Dhaka', totalPurchased: 15000, currentDue: 1200 },
];

export const SuppliersView: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Kitchen Groceries');
  const [address, setAddress] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setSuppliers([
      ...suppliers,
      {
        id: `sup_${Date.now()}`,
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim() || 'Manager',
        phone: phone.trim(),
        category,
        address: address.trim() || 'Dhaka',
        totalPurchased: 0,
        currentDue: 0,
      },
    ]);
    setShowAddModal(false);
    setCompanyName('');
    setPhone('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Vendors & Suppliers Directory</h2>
            <p className="text-xs text-slate-400">
              Supplier contacts, purchase volumes, and outstanding payable balances
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{sup.companyName}</h4>
                  <p className="text-xs text-slate-400">{sup.contactPerson} • {sup.category}</p>
                </div>
                {sup.currentDue > 0 ? (
                  <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-numbers">
                    Due: {formatBDT(sup.currentDue)}
                  </span>
                ) : (
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Zero Due
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono-numbers">{sup.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400 truncate">{sup.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Lifetime Purchases:</span>
              <span className="font-black text-white font-mono-numbers">{formatBDT(sup.totalPurchased)}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-bold text-base text-white">Add New Supplier</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Company / Vendor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka Rice Agency"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Contact Person</label>
                <input
                  type="text"
                  placeholder="e.g. Abdul Karim"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-[#142042] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
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
                <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Meat / Vegetables / Dairy"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
