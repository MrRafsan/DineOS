import React, { useState } from 'react';
import { X, Delete, Equal } from 'lucide-react';
import { usePOS } from '../context/POSContext';

export const QuickCalculatorModal: React.FC = () => {
  const { isCalculatorOpen, setIsCalculatorOpen } = usePOS();
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  if (!isCalculatorOpen) return null;

  const handleDigit = (digit: string) => {
    setDisplay((prev) => (prev === '0' ? digit : prev + digit));
  };

  const handleOp = (op: string) => {
    setPrevVal(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEqual = () => {
    if (prevVal === null || !operation) return;
    const current = parseFloat(display);
    let result = 0;
    if (operation === '+') result = prevVal + current;
    if (operation === '-') result = prevVal - current;
    if (operation === '×') result = prevVal * current;
    if (operation === '÷') result = current !== 0 ? prevVal / current : 0;

    setDisplay(String(Math.round(result * 100) / 100));
    setPrevVal(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-[#0e172e] border border-slate-700 w-full max-w-xs rounded-2xl shadow-2xl p-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs font-bold text-white">Cashier Calculator</span>
          <button
            onClick={() => setIsCalculatorOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="my-3 p-3 bg-[#080d1a] border border-slate-800 rounded-xl text-right">
          <div className="text-[10px] text-slate-500 h-4">
            {prevVal !== null && `${prevVal} ${operation}`}
          </div>
          <div className="text-2xl font-black text-white font-mono-numbers truncate">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2 text-sm font-bold">
          <button
            onClick={handleClear}
            className="col-span-2 py-2.5 bg-rose-600/30 text-rose-300 hover:bg-rose-600/40 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => handleOp('÷')}
            className="py-2.5 bg-[#172554] text-sky-300 hover:bg-[#1e3a8a] rounded-lg transition-colors"
          >
            ÷
          </button>
          <button
            onClick={() => handleOp('×')}
            className="py-2.5 bg-[#172554] text-sky-300 hover:bg-[#1e3a8a] rounded-lg transition-colors"
          >
            ×
          </button>

          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-[#142042] text-white hover:bg-[#1b2b57] rounded-lg transition-colors font-mono-numbers"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOp('-')}
            className="py-2.5 bg-[#172554] text-sky-300 hover:bg-[#1e3a8a] rounded-lg transition-colors"
          >
            -
          </button>

          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-[#142042] text-white hover:bg-[#1b2b57] rounded-lg transition-colors font-mono-numbers"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOp('+')}
            className="py-2.5 bg-[#172554] text-sky-300 hover:bg-[#1e3a8a] rounded-lg transition-colors"
          >
            +
          </button>

          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-[#142042] text-white hover:bg-[#1b2b57] rounded-lg transition-colors font-mono-numbers"
            >
              {d}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="row-span-2 py-2.5 bg-emerald-600 text-white hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors shadow-md"
          >
            <Equal className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-2.5 bg-[#142042] text-white hover:bg-[#1b2b57] rounded-lg transition-colors font-mono-numbers"
          >
            0
          </button>
          <button
            onClick={() => handleDigit('.')}
            className="py-2.5 bg-[#142042] text-white hover:bg-[#1b2b57] rounded-lg transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};
