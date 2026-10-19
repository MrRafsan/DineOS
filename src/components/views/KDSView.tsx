import React from 'react';
import { ChefHat, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { usePOS } from '../../context/POSContext';
import { getElapsedTimeFormatted } from '../../utils/formatters';

export const KDSView: React.FC = () => {
  const { orders, updateKotItemStatus, markAllKdsOrderReady } = usePOS();

  const activeOrders = orders.filter((o) => o.status === 'active');

  const getUrgencyBorder = (createdAt: string, initialSeconds: number = 0) => {
    const elapsed =
      Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000) + initialSeconds;
    if (elapsed > 20 * 60) return 'border-rose-500 bg-[#280c14]';
    if (elapsed > 10 * 60) return 'border-amber-500 bg-[#241708]';
    return 'border-emerald-500/80 bg-[#0c1f24]';
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Kitchen Display System (K.D.S)
            </h2>
            <p className="text-xs text-slate-400">
              Real-time kitchen production queues & ticket timers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-300">&lt;10m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-300">10-20m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-slate-300">&gt;20m (Urgent)</span>
          </div>
        </div>
      </div>

      {/* Grid of Kitchen Tickets */}
      {activeOrders.length === 0 ? (
        <div className="bg-[#0e1738] border border-[#1b2b54] rounded-xl p-12 text-center space-y-2">
          <ChefHat className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">No Pending Kitchen Orders</h3>
          <p className="text-xs text-slate-500">
            All kitchen order tickets (KOT) have been served or settled.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className={`border-2 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden transition-all ${getUrgencyBorder(
                order.createdAt,
                order.initialSeconds || 0
              )}`}
            >
              {/* Ticket Header */}
              <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-white font-mono-numbers">
                    Token #{order.tokenNumber}
                  </span>
                  <div className="text-xs font-bold text-slate-200">
                    {order.tableName || order.channelOrderNumber || order.type.toUpperCase()}
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-1 text-xs font-bold font-mono-numbers px-2 py-1 rounded bg-black/60 text-white">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{getElapsedTimeFormatted(order.createdAt, order.initialSeconds || 0)}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-3.5 space-y-2 flex-1">
                {order.items.map((item) => {
                  const isDone = item.kotStatus === 'ready';
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        updateKotItemStatus(
                          order.id,
                          item.id,
                          isDone ? 'pending' : 'ready'
                        )
                      }
                      className={`p-2 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2 select-none ${
                        isDone
                          ? 'bg-emerald-950/60 border border-emerald-500/40 opacity-70 line-through'
                          : 'bg-black/30 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white">
                          <span className="text-amber-400 font-extrabold mr-1.5 font-mono-numbers">
                            {item.quantity}×
                          </span>
                          <span>{item.name}</span>
                        </div>
                        {item.notes && (
                          <div className="text-[10px] text-amber-300 font-medium italic mt-0.5">
                            Note: {item.notes}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 pt-0.5">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isDone ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-500'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action */}
              <div className="p-3 bg-black/40 border-t border-white/10">
                <button
                  onClick={() => markAllKdsOrderReady(order.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition-colors shadow-md"
                >
                  Mark All Items Ready
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
