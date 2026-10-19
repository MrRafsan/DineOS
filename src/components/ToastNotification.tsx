import React from 'react';
import { usePOS } from '../context/POSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = usePOS();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-[#0d1633] text-white px-4 py-3 rounded-xl border border-[#233567] shadow-2xl backdrop-blur-md">
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
      <span className="text-xs font-semibold">{toast.message}</span>
      <button
        onClick={hideToast}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastNotification;
