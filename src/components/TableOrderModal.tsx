import React, { useState } from 'react';
import {
  X,
  Clock,
  Printer,
  CreditCard,
  Plus,
  ArrowRightLeft,
  Utensils,
  ChefHat,
  Receipt,
  User,
  Phone,
} from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { formatBDT, getElapsedTimeFormatted } from '../utils/formatters';

export const TableOrderModal: React.FC = () => {
  const {
    isTableDetailModalOpen,
    setIsTableDetailModalOpen,
    selectedTable,
    tables,
    orders,
    transferTable,
    setOrderToPay,
    setIsPaymentModalOpen,
    setIsOrderModalOpen,
    setReceiptOrder,
    setIsReceiptModalOpen,
    showToast,
  } = usePOS();

  const [showTransferSelect, setShowTransferSelect] = useState(false);
  const [targetTableId, setTargetTableId] = useState('');

  if (!isTableDetailModalOpen || !selectedTable) return null;

  const currentOrder = orders.find((o) => o.id === selectedTable.currentOrderId);
  const availableTables = tables.filter((t) => t.status === 'available');

  if (!currentOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
        <div className="bg-[#0e1738] border border-slate-700 w-full max-w-md rounded-xl p-6 text-center">
          <p className="text-sm text-slate-300 mb-4">No active order found for this table.</p>
          <button
            onClick={() => setIsTableDetailModalOpen(false)}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleTransfer = () => {
    if (!targetTableId) return;
    const success = transferTable(selectedTable.id, targetTableId);
    if (success) {
      showToast('Table order transferred successfully!', 'success');
      setIsTableDetailModalOpen(false);
      setShowTransferSelect(false);
    } else {
      showToast('Unable to transfer table. Make sure the target table is available.', 'error');
    }
  };

  const handlePrintKOT = () => {
    // Show thermal KOT modal or print preview
    setReceiptOrder(currentOrder);
    setIsReceiptModalOpen(true);
  };

  const handlePrintBill = () => {
    // Show guest check receipt preview
    setReceiptOrder(currentOrder);
    setIsReceiptModalOpen(true);
  };

  const handleProceedPayment = () => {
    setIsTableDetailModalOpen(false);
    setOrderToPay(currentOrder);
    setIsPaymentModalOpen(true);
  };

  const handleAddMoreItems = () => {
    setIsTableDetailModalOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-[#0a1128] border border-[#1b2b54] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#0e1738] border-b border-[#1b2b54] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">
                  {selectedTable.name}
                </h3>
                <span className="text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded font-mono-numbers">
                  Token #{currentOrder.tokenNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{selectedTable.floor}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-sky-400">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono-numbers">
                    {getElapsedTimeFormatted(currentOrder.createdAt, currentOrder.initialSeconds || 0)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsTableDetailModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest & Waiter info strip */}
        <div className="bg-[#121c3c] px-5 py-2.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Waiter:</span>
            <span className="font-semibold text-white">{currentOrder.waiterName}</span>
          </div>
          {currentOrder.customerName && currentOrder.customerName !== 'Walk-in Guest' && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-400">Guest:</span>
              <span className="font-semibold text-white">{currentOrder.customerName}</span>
              {currentOrder.customerPhone && (
                <span className="text-slate-400 font-mono-numbers flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {currentOrder.customerPhone}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Transfer Table Section (Conditional) */}
        {showTransferSelect && (
          <div className="p-4 bg-[#142247] border-b border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Transfer Order to Table:</span>
              <button
                onClick={() => setShowTransferSelect(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
            {availableTables.length === 0 ? (
              <p className="text-xs text-amber-400">No other available tables currently.</p>
            ) : (
              <div className="flex gap-2">
                <select
                  value={targetTableId}
                  onChange={(e) => setTargetTableId(e.target.value)}
                  className="flex-1 bg-[#0b1328] border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="">Select available table...</option>
                  {availableTables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.floor} - {t.capacity} seats)
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleTransfer}
                  disabled={!targetTableId}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-semibold"
                >
                  Confirm Transfer
                </button>
              </div>
            )}
          </div>
        )}

        {/* Order Items Table */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ordered Items ({currentOrder.items.length})
            </h4>
            <button
              onClick={handleAddMoreItems}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add More Items</span>
            </button>
          </div>

          <div className="space-y-2">
            {currentOrder.items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-[#101b38] border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                      {item.kotStatus || 'Ready'}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-[10px] text-amber-300 italic">
                      Note: {item.notes}
                    </p>
                  )}
                  <div className="text-[11px] text-slate-400 font-mono-numbers">
                    {formatBDT(item.price)} × {item.quantity}
                  </div>
                </div>

                <div className="text-sm font-black text-white font-mono-numbers shrink-0">
                  {formatBDT(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bill Breakdown & Actions */}
        <div className="p-5 bg-[#080d1e] border-t border-[#1b2b54] space-y-4 shrink-0">
          <div className="space-y-1.5 text-xs text-slate-400 border-b border-slate-800/80 pb-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono-numbers text-slate-200">
                {formatBDT(currentOrder.subtotal)}
              </span>
            </div>
            {currentOrder.discountValue > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Discount:</span>
                <span className="font-mono-numbers">-{formatBDT(currentOrder.discountValue)}</span>
              </div>
            )}
            {currentOrder.vatAmount > 0 && (
              <div className="flex justify-between">
                <span>VAT ({currentOrder.vatRate * 100}%):</span>
                <span className="font-mono-numbers text-slate-200">
                  {formatBDT(currentOrder.vatAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-black text-white pt-1">
              <span>Total Payable:</span>
              <span className="text-emerald-400 font-mono-numbers">
                {formatBDT(currentOrder.total)}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setShowTransferSelect(!showTransferSelect)}
              className="py-2 sm:py-2.5 px-1.5 sm:px-2 bg-[#142042] hover:bg-[#1a2b57] text-slate-300 hover:text-white text-[11px] sm:text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Transfer</span>
            </button>

            <button
              onClick={handlePrintKOT}
              className="py-2 sm:py-2.5 px-1.5 sm:px-2 bg-[#142042] hover:bg-[#1a2b57] text-slate-300 hover:text-white text-[11px] sm:text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Print KOT</span>
            </button>

            <button
              onClick={handlePrintBill}
              className="py-2 sm:py-2.5 px-1.5 sm:px-2 bg-[#142042] hover:bg-[#1a2b57] text-slate-300 hover:text-white text-[11px] sm:text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Receipt className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Print Bill</span>
            </button>

            <button
              onClick={handleProceedPayment}
              className="py-2 sm:py-2.5 px-2 sm:px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Pay & Settle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
