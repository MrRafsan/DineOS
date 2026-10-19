import React from 'react';
import { X, Printer, Check, Flame } from 'lucide-react';
import { usePOS } from '../context/POSContext';
import { formatBDT, formatDateOnly, formatTimeOnly } from '../utils/formatters';

export const ReceiptModal: React.FC = () => {
  const {
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    receiptOrder,
    settings,
  } = usePOS();

  if (!isReceiptModalOpen || !receiptOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-[#0e172e] border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="bg-[#142045] px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Receipt Preview (80mm)</span>
          </div>
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-slate-900/60 custom-scrollbar">
          <div
            id="thermal-receipt-print-area"
            className="w-full bg-white text-slate-900 p-5 rounded-lg font-mono-numbers text-xs shadow-md select-text"
          >
            {/* Header */}
            <div className="text-center space-y-1 pb-3 border-b border-dashed border-slate-400">
              <div className="flex items-center justify-center gap-1 font-extrabold text-base tracking-tight text-slate-950">
                <Flame className="w-4 h-4 text-red-600 fill-red-600 inline" />
                <span>CHILLYPOS</span>
              </div>
              <p className="font-bold text-[11px] uppercase tracking-wider">{settings.name}</p>
              <p className="text-[10px] text-slate-600">{settings.address}</p>
              <p className="text-[10px] text-slate-600">Tel: {settings.salesPhone}</p>
              <p className="text-[10px] text-slate-600">BIN: 002948192-0102</p>
            </div>

            {/* Token & Meta */}
            <div className="py-2.5 border-b border-dashed border-slate-400 space-y-1 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">TOKEN #{receiptOrder.tokenNumber}</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-slate-200 rounded">
                  {receiptOrder.type.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Table/Ref:</span>
                <span className="font-bold">{receiptOrder.tableName || receiptOrder.channelOrderNumber || 'Counter'}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Date:</span>
                <span>{formatDateOnly(receiptOrder.createdAt)} {formatTimeOnly(receiptOrder.createdAt)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Waiter:</span>
                <span>{receiptOrder.waiterName}</span>
              </div>
              {receiptOrder.customerName && receiptOrder.customerName !== 'Walk-in Guest' && (
                <div className="flex justify-between text-slate-700">
                  <span>Customer:</span>
                  <span>{receiptOrder.customerName}</span>
                </div>
              )}
            </div>

            {/* Itemized Table */}
            <div className="py-2.5 border-b border-dashed border-slate-400 space-y-1.5 text-[11px]">
              <div className="flex justify-between font-bold text-slate-800 pb-1 border-b border-slate-200">
                <span className="w-1/2">Item</span>
                <span className="w-1/6 text-center">Qty</span>
                <span className="w-1/3 text-right">Amount</span>
              </div>

              {receiptOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-slate-800">
                  <div className="w-1/2">
                    <div className="font-semibold leading-tight">{item.name}</div>
                    <div className="text-[9px] text-slate-500">@{item.price}</div>
                  </div>
                  <div className="w-1/6 text-center">{item.quantity}</div>
                  <div className="w-1/3 text-right font-semibold">
                    {formatBDT(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="py-2.5 border-b border-dashed border-slate-400 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatBDT(receiptOrder.subtotal)}</span>
              </div>
              {receiptOrder.discountValue > 0 && (
                <div className="flex justify-between text-slate-700">
                  <span>Discount:</span>
                  <span>-{formatBDT(receiptOrder.discountValue)}</span>
                </div>
              )}
              {receiptOrder.vatAmount > 0 && (
                <div className="flex justify-between">
                  <span>VAT ({receiptOrder.vatRate * 100}%):</span>
                  <span>{formatBDT(receiptOrder.vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-slate-950 pt-1 border-t border-slate-200">
                <span>TOTAL:</span>
                <span>{formatBDT(receiptOrder.total)}</span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="py-2 border-b border-dashed border-slate-400 text-[10px] space-y-0.5 text-slate-700">
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold uppercase">{receiptOrder.paymentMethod || 'Cash'}</span>
              </div>
              {receiptOrder.paymentDetails?.cashReceived !== undefined && (
                <div className="flex justify-between">
                  <span>Cash Paid:</span>
                  <span>{formatBDT(receiptOrder.paymentDetails.cashReceived)}</span>
                </div>
              )}
              {receiptOrder.paymentDetails?.changeReturned !== undefined && (
                <div className="flex justify-between">
                  <span>Change Given:</span>
                  <span>{formatBDT(receiptOrder.paymentDetails.changeReturned)}</span>
                </div>
              )}
              {receiptOrder.paymentDetails?.transactionId && (
                <div className="flex justify-between">
                  <span>Txn ID:</span>
                  <span className="font-bold">{receiptOrder.paymentDetails.transactionId}</span>
                </div>
              )}
            </div>

            {/* Barcode & Footer */}
            <div className="pt-3 text-center space-y-2">
              <div className="tracking-[0.25em] font-mono text-xs text-slate-400">
                ||| |||| | |||||| || | ||| ||
              </div>
              <p className="text-[10px] text-slate-600 italic">
                {settings.receiptFooter}
              </p>
              <p className="text-[9px] text-slate-400">
                Powered by DineOS AI Restaurant OS
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-3 bg-[#142045] border-t border-slate-700 flex gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
