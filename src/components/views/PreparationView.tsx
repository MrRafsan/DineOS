import React, { useState } from 'react';
import { ChefHat, Flame, Coffee, Pizza, Soup, CheckCircle, Clock } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  chefAssigned: string;
  activeOrders: number;
  status: 'busy' | 'ready' | 'idle';
  temperature?: string;
}

const STATIONS: Station[] = [
  { id: 'st_1', name: 'Burger & Grill Station', chefAssigned: 'Chef Arif', activeOrders: 3, status: 'busy', temperature: '180°C' },
  { id: 'st_2', name: 'Pizza Stone Oven Station', chefAssigned: 'Chef Sohel', activeOrders: 1, status: 'busy', temperature: '260°C' },
  { id: 'st_3', name: 'Dum Biryani & Rice Pot', chefAssigned: 'Ustad Karim', activeOrders: 2, status: 'busy', temperature: 'Slow Simmer' },
  { id: 'st_4', name: 'Deep Fryer & Appetizers', chefAssigned: 'Assistant Babu', activeOrders: 2, status: 'busy', temperature: '175°C' },
  { id: 'st_5', name: 'Cold Drinks, Coffee & Dessert Bar', chefAssigned: 'Barista Joy', activeOrders: 1, status: 'ready' },
];

export const PreparationView: React.FC = () => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      <div className="bg-[#0e1738] border border-[#1b2b54] p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Kitchen Preparation Stations</h2>
            <p className="text-xs text-slate-400">
              Station line monitor, chefs assigned, temperature gauges, and active workload
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATIONS.map((station) => (
          <div
            key={station.id}
            className="bg-[#0b1328] border border-[#18264c] rounded-2xl p-5 shadow-xl space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{station.name}</h4>
                <span className="text-xs text-slate-400">Lead: {station.chefAssigned}</span>
              </div>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  station.status === 'busy'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}
              >
                {station.status}
              </span>
            </div>

            <div className="bg-[#121c3c] p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Queue:</span>
              <span className="text-amber-400 font-bold font-mono-numbers">
                {station.activeOrders} Orders in prep
              </span>
            </div>

            {station.temperature && (
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Station Temp:</span>
                </span>
                <span className="font-bold text-white font-mono-numbers">{station.temperature}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
