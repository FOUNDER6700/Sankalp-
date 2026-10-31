import React from 'react';
import { BarChart3, Activity } from 'lucide-react';

export default function FlowChart({ units, flowHistory }) {
  const maxVolume = Math.max(...units.map((u) => u.totalWaterLiters), 10);
  const maxHistoryFlow = Math.max(...flowHistory.map((p) => p.totalFlow), 25);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Live Combined Flow Rate Timeline (L/min) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Real-Time Combined Water Flow (L/min)
              </h3>
              <p className="text-xs text-slate-500">
                Last {flowHistory.length} seconds of simulated pipeline flow across all 3 units
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
            Peak scale: {maxHistoryFlow.toFixed(0)} L/min
          </span>
        </div>

        {/* SVG Bar/Sparkline Timeline */}
        <div className="h-44 flex items-end gap-1 pt-6 pb-2 px-2 bg-slate-50 rounded-lg border border-slate-100">
          {flowHistory.map((point, idx) => {
            const heightPct = Math.min(100, Math.max(4, (point.totalFlow / maxHistoryFlow) * 100));
            const isActive = point.totalFlow > 0;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
              >
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all duration-300 ${
                    point.hasLeak
                      ? 'bg-rose-500'
                      : isActive
                      ? 'bg-cyan-500'
                      : 'bg-slate-200'
                  }`}
                />
                {/* Tooltip on tap/hover */}
                <span className="opacity-0 group-hover:opacity-100 absolute -top-5 text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
                  {point.totalFlow.toFixed(1)} L/m ({point.time})
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" /> Normal Flush Flow
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Leak / Anomaly Active
            </span>
          </div>
          <span>Updates every 1s</span>
        </div>
      </div>

      {/* Per-Unit Cumulative Water Volume Comparison (L) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Unit-Wise Simulated Water Usage (Liters)
                </h3>
                <p className="text-xs text-slate-500">
                  Comparison of cumulative flush & leak volume per toilet stall
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {units.map((u) => {
              const widthPct = Math.min(100, (u.totalWaterLiters / maxVolume) * 100);
              return (
                <div key={u.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      {u.name} <span className="text-slate-400 font-normal">({u.flushCount} flushes)</span>
                    </span>
                    <span className="font-bold text-slate-900">
                      {u.totalWaterLiters.toFixed(1)} L
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      style={{ width: `${Math.max(widthPct, u.totalWaterLiters > 0 ? 4 : 0)}%` }}
                      className={`h-full transition-all duration-300 rounded-full ${
                        u.isLeaking ? 'bg-rose-500' : 'bg-indigo-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-4 pt-2 border-t border-slate-100">
          Note: Values reflect mathematical volume accumulation based on configured flush sizes and simulated leak durations.
        </p>
      </div>
    </section>
  );
}
