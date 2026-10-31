import React from 'react';
import { Users, Gauge, Droplet, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function OverviewCards({ units, activeAlertsCount }) {
  const occupiedCount = units.filter((u) => u.isOccupied).length;
  const totalFlowRate = units.reduce((sum, u) => sum + u.currentFlowRate, 0).toFixed(1);
  const totalVolume = units.reduce((sum, u) => sum + u.totalWaterLiters, 0).toFixed(1);
  const totalFlushes = units.reduce((sum, u) => sum + u.flushCount, 0);
  const leakingUnitsCount = units.filter((u) => u.isLeaking || u.continuousFlowAlert).length;

  const cards = [
    {
      title: 'Stall Occupancy (Sim)',
      value: `${occupiedCount} / ${units.length} Active`,
      subtext: occupiedCount > 0 ? 'Smart flush armed on exit' : 'All units currently vacant',
      icon: Users,
      color: occupiedCount > 0 ? 'text-cyan-600 bg-cyan-50 border-cyan-200' : 'text-slate-600 bg-slate-100 border-slate-200',
    },
    {
      title: 'Instant Water Flow (Sim)',
      value: `${totalFlowRate} L/min`,
      subtext: Number(totalFlowRate) > 0 ? 'Active valve or leak flow' : 'Zero flow (valves closed)',
      icon: Gauge,
      color: Number(totalFlowRate) > 0 ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-slate-600 bg-slate-100 border-slate-200',
    },
    {
      title: 'Cumulative Volume (Sim)',
      value: `${totalVolume} L`,
      subtext: `Across ${totalFlushes} simulated flush cycles`,
      icon: Droplet,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      title: 'Leak & Wastage Monitor',
      value: leakingUnitsCount > 0 ? `${leakingUnitsCount} Anomaly` : 'Nominal',
      subtext:
        activeAlertsCount > 0
          ? `${activeAlertsCount} unacknowledged alert(s)`
          : 'No abnormal flow detected in sim',
      icon: leakingUnitsCount > 0 ? AlertTriangle : CheckCircle2,
      color:
        leakingUnitsCount > 0
          ? 'text-rose-600 bg-rose-50 border-rose-200'
          : 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section aria-label="System Overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start justify-between gap-3"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1">{card.subtext}</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${card.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
