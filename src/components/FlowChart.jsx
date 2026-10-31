import React from 'react';
import { BarChart3, Activity } from 'lucide-react';

export default function FlowChart({ units = [], flowHistory = [] }) {
  const hist = flowHistory.length ? flowHistory : Array.from({ length: 20 }, (_, i) => ({ time: `-${20 - i}s`, totalFlow: 0, hasLeak: false }));
  const maxVol = Math.max(...units.map((u) => Number(u.totalWaterLiters) || 0), 10);
  const maxFlow = Math.max(...hist.map((p) => Number(p.totalFlow) || 0), 25);
  const hasLeak = units.some((u) => u.isLeaking || u.continuousFlowAlert) || hist.some((p) => p.hasLeak);
  const W = 560, H = 140, padT = 14, plotH = 104;
  const pts = hist.map((pt, i) => {
    const flow = Math.max(0, Number(pt.totalFlow) || 0);
    const x = 32 + (i / Math.max(hist.length - 1, 1)) * (W - 46);
    const y = padT + plotH - Math.min(1, flow / maxFlow) * plotH;
    return { x, y, flow, time: pt.time || '', leak: Boolean(pt.hasLeak) };
  });
  const line = pts.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${padT + plotH} L${pts[0].x.toFixed(1)},${padT + plotH} Z`;
  const col = hasLeak ? '#f43f5e' : '#06b6d4';
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100"><Activity className="w-4 h-4" /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Real-Time Combined Water Flow (L/min)</h3>
              <p className="text-xs text-slate-500">Last {hist.length} seconds of simulated pipeline flow across all 3 units</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">Peak scale: {maxFlow.toFixed(0)} L/min</span>
        </div>
        <div className="h-44 w-full bg-slate-50 rounded-lg border border-slate-100 p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible">
            {[0, 0.5, 1].map((r, i) => (
              <g key={i}>
                <line x1="32" y1={padT + r * plotH} x2={W - 14} y2={padT + r * plotH} stroke="#cbd5e1" strokeDasharray="3 3" />
                <text x="26" y={padT + r * plotH + 3} textAnchor="end" fontSize="9" fill="#64748b">{((1 - r) * maxFlow).toFixed(0)}</text>
              </g>
            ))}
            <path d={area} fill={col} fillOpacity="0.18" />
            <path d={line} fill="none" stroke={col} strokeWidth="2.5" />
            {pts.map((c, i) => {
              const bh = Math.max(3, padT + plotH - c.y);
              const pCol = c.leak ? '#f43f5e' : c.flow > 0 ? '#06b6d4' : '#94a3b8';
              return (
                <g key={i}>
                  <rect x={c.x - 4} y={padT + plotH - bh} width="8" height={bh} rx="2" fill={pCol} fillOpacity="0.3" />
                  <circle cx={c.x} cy={c.y} r={c.flow > 0 ? 3.5 : 2} fill={pCol} />
                  {i % 4 === 0 && <text x={c.x} y={H - 4} textAnchor="middle" fontSize="8.5" fill="#64748b">{c.time}</text>}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block" /> Normal Flush Flow</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Leak / Anomaly Active</span>
          </div>
          <span>Updates every 1s</span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100"><BarChart3 className="w-4 h-4" /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Unit-Wise Simulated Water Usage (Liters)</h3>
              <p className="text-xs text-slate-500">Comparison of cumulative flush &amp; leak volume per toilet stall</p>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {units.map((u) => {
              const pct = Math.min(100, ((Number(u.totalWaterLiters) || 0) / maxVol) * 100);
              return (
                <div key={u.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{u.name} ({u.flushCount} flushes)</span>
                    <span className="font-bold text-slate-900">{Number(u.totalWaterLiters || 0).toFixed(1)} L</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: `${Math.max(pct, u.totalWaterLiters > 0 ? 4 : 0)}%` }} className={`h-full rounded-full ${u.isLeaking ? 'bg-rose-500' : 'bg-indigo-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
