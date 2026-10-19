import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Plus,
  Minus,
  Trash2,
  Utensils,
  Receipt,
  CreditCard,
  ChefHat,
  MessageSquare,
  Percent,
} from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { OrderItem, MenuItem } from '../types/pos';
import { WAITER_LIST } from '../data/mockData';
import { formatBDT } from '../utils/formatters';

export const POSOrderingModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    selectedTable,
    selectedOrderType,
    menuItems,
    categories,
    settings,
    createOrder,
    setOrderToPay,
    setIsPaymentModalOpen,
    showToast,
  } = usePOS();

  const [activeCategory, setActiveCategory] = useState<string>('cat_all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [waiterName, setWaiterName] = useState<string>('Default Waiter');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [discountType, setDiscountType] = useState<'flat' | 'percentage'>('flat');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [editingItemNotes, setEditingItemNotes] = useState<{ id: string; notes: string } | null>(null);
  const [mobileTab, setMobileTab] = useState<'menu' | 'cart'>('menu');

  // Filter food items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'cat_all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.banglaName && item.banglaName.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount =
    discountType === 'percentage'
      ? Math.round((subtotal * discountValue) / 100)
      : discountValue;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const vatAmount = Math.round((afterDiscount * settings.vatPercent) / 100);
  const total = afterDiscount + vatAmount;

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          kotStatus: 'pending',
        },
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleSaveNotes = () => {
    if (!editingItemNotes) return;
    setCart((prev) =>
      prev.map((i) =>
        i.id === editingItemNotes.id ? { ...i, notes: editingItemNotes.notes } : i
      )
    );
    setEditingItemNotes(null);
  };

  const handleCreateOrder = (action: 'hold' | 'kot' | 'pay') => {
    if (cart.length === 0) {
      showToast('Please select at least one menu item before placing an order.', 'error');
      return;
    }

    const order = createOrder({
      type: selectedOrderType,
      tableId: selectedTable?.id,
      tableName: selectedTable?.name,
      waiterName,
      customerName: customerName.trim() || 'Walk-in Guest',
      customerPhone: customerPhone.trim(),
      items: cart,
      discountType,
      discountValue,
    });

    // Reset and close
    setCart([]);
    setIsOrderModalOpen(false);

    if (action === 'pay') {
      setOrderToPay(order);
      setIsPaymentModalOpen(true);
    }
  };

  if (!isOrderModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-2 sm:p-4">
      <div className="bg-[#090f24] border border-[#1b2b54] w-full max-w-6xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#0e1738] border-b border-[#1b2b54] px-4 py-3 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  New Order: {selectedTable ? selectedTable.name : selectedOrderType.toUpperCase()}
                </h2>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                  {selectedOrderType.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                DineOS High-Speed Order Entry
              </p>
            </div>
          </div>

          {/* Waiter & Customer Quick Inputs */}
          <div className="hidden md:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-[#142045] px-2.5 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Waiter:</span>
              <select
                value={waiterName}
                onChange={(e) => setWaiterName(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none"
              >
                {WAITER_LIST.map((w) => (
                  <option key={w} value={w} className="bg-[#0e1738] text-white">
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Guest Name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-[#142045] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 w-36"
            />
            <input
              type="text"
              placeholder="Guest Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="bg-[#142045] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 w-32"
            />
          </div>

          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Tab Switcher (< lg screens) */}
        <div className="flex lg:hidden bg-[#0c142e] border-b border-[#1b2b54] p-1.5 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('menu')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === 'menu'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white bg-[#142045]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Menu Items ({filteredItems.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('cart')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              mobileTab === 'cart'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white bg-[#142045]'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-amber-400" />
            <span>Cart ({cart.reduce((s, i) => s + i.quantity, 0)}) • {formatBDT(total)}</span>
          </button>
        </div>

        {/* Modal Body: Left Items Explorer (65%), Right Cart (35%) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* Left: Search, Category Tabs, Menu Grid */}
          <div className={`flex-1 flex-col p-3 sm:p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1b2b54] ${
            mobileTab === 'menu' ? 'flex' : 'hidden lg:flex'
          }`}>
            {/* Search & Category Tabs */}
            <div className="space-y-2.5 pb-2.5 shrink-0">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search item by English or Bangla name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#101b3a] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-[#121c38] text-slate-300 hover:text-white hover:bg-[#1a2850] border border-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3 custom-scrollbar min-h-0">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#101b3a] hover:bg-[#16244f] border border-[#1d2d5a] hover:border-indigo-500/60 rounded-xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-150 group shadow-md"
                >
                  <div className="space-y-1.5">
                    {/* Item Image */}
                    <div className="w-full h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-800 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {item.spicyLevel && item.spicyLevel > 0 ? (
                        <span className="absolute top-1 right-1 bg-rose-600/90 text-white text-[9px] px-1 py-0.5 rounded-full font-bold">
                          {'🌶️'.repeat(item.spicyLevel)}
                        </span>
                      ) : null}
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-rose-400 transition-colors">
                      {item.name}
                    </h4>
                    {item.banglaName && (
                      <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">
                        {item.banglaName}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono-numbers">
                      {formatBDT(item.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-6 h-6 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Mobile Checkout Bar */}
            {cart.length > 0 && (
              <div className="lg:hidden pt-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setMobileTab('cart')}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-between shadow-lg transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Receipt className="w-4 h-4" />
                    <span>{cart.reduce((s, i) => s + i.quantity, 0)} Items Added</span>
                  </span>
                  <span className="font-mono-numbers">{formatBDT(total)} → View Cart & Pay</span>
                </button>
              </div>
            )}
          </div>

          {/* Right: Cart & Order Breakdown (35%) */}
          <div className={`w-full lg:w-96 bg-[#0a1024] flex-col justify-between shrink-0 ${
            mobileTab === 'cart' ? 'flex flex-1 min-h-0' : 'hidden lg:flex'
          }`}>
            {/* Cart Header */}
            <div className="p-3.5 border-b border-[#1b2b54] flex items-center justify-between bg-[#0e1634]">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Current Cart</span>
                <span className="bg-indigo-900/60 text-indigo-300 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono-numbers">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Mobile-only Waiter & Customer Quick Inputs */}
            <div className="md:hidden p-2.5 bg-[#0e1634] border-b border-[#1b2b54] grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 bg-[#142045] px-2 py-1.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[11px]">Waiter:</span>
                <select
                  value={waiterName}
                  onChange={(e) => setWaiterName(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none text-[11px] w-full"
                >
                  {WAITER_LIST.map((w) => (
                    <option key={w} value={w} className="bg-[#0e1738] text-white">
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Guest Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="bg-[#142045] border border-slate-700 rounded-lg px-2 py-1.5 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 text-[11px] w-full font-mono-numbers"
              />
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Utensils className="w-10 h-10 text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-300">Your cart is empty</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Click items from the menu on the left to add them to this order
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#121c3c] border border-slate-800 rounded-xl p-2.5 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-white truncate">
                          {item.name}
                        </h5>
                        <span className="text-[11px] text-slate-400 font-mono-numbers">
                          {formatBDT(item.price)} each
                        </span>
                        {item.notes && (
                          <p className="text-[10px] text-amber-300 italic">
                            Note: {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-xs font-black text-white font-mono-numbers">
                        {formatBDT(item.price * item.quantity)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <button
                        onClick={() =>
                          setEditingItemNotes({ id: item.id, notes: item.notes || '' })
                        }
                        className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{item.notes ? 'Edit Note' : 'Add Note'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-5 text-center font-mono-numbers">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-5 h-5 rounded hover:bg-rose-950/40 text-rose-400 flex items-center justify-center ml-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Note Editor Drawer */}
            {editingItemNotes && (
              <div className="p-3 bg-[#152347] border-t border-slate-700">
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Item Instructions (e.g. Less spicy, Extra ketchup):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItemNotes.notes}
                    onChange={(e) =>
                      setEditingItemNotes({ ...editingItemNotes, notes: e.target.value })
                    }
                    className="flex-1 bg-[#0b1328] border border-slate-600 rounded px-2 py-1 text-xs text-white"
                    placeholder="Enter instructions..."
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-2.5 py-1 rounded font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItemNotes(null)}
                    className="text-slate-400 hover:text-white text-xs px-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Billing Summary & Actions */}
            <div className="p-3.5 bg-[#080d1e] border-t border-[#1b2b54] space-y-2.5">
              {/* Discount selection */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-amber-400" />
                  <span>Discount:</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-14 bg-[#142042] border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs text-white font-mono-numbers"
                  />
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="bg-[#142042] border border-slate-700 rounded px-1 py-0.5 text-xs text-white"
                  >
                    <option value="flat">BDT</option>
                    <option value="percentage">%</option>
                  </select>
                </div>
              </div>

              {/* Subtotal, VAT, Total */}
              <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono-numbers text-slate-200">
                    {formatBDT(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount:</span>
                    <span className="font-mono-numbers">-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>VAT ({settings.vatPercent}%):</span>
                  <span className="font-mono-numbers text-slate-200">
                    {formatBDT(vatAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white border-t border-slate-700 pt-1.5">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400 font-mono-numbers">
                    {formatBDT(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Hold / KOT / Pay */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => handleCreateOrder('hold')}
                  className="py-2.5 px-2 bg-[#172554] hover:bg-[#1e3a8a] text-sky-200 text-xs font-bold rounded-xl transition-colors text-center border border-sky-600/30"
                  title="Save order and keep table occupied"
                >
                  Hold Table
                </button>
                <button
                  onClick={() => handleCreateOrder('kot')}
                  className="py-2.5 px-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold rounded-xl transition-colors text-center shadow-md flex items-center justify-center gap-1"
                  title="Send Kitchen Order Ticket"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Send KOT</span>
                </button>
                <button
                  onClick={() => handleCreateOrder('pay')}
                  className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-colors text-center shadow-md flex items-center justify-center gap-1"
                  title="Settle bill immediately"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
