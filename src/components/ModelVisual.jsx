import React from 'react';
import {
  Box, User, Settings, Droplet, Cpu, Bell, UserPlus, UserMinus,
  AlertTriangle, Leaf, Wrench, RotateCcw
} from 'lucide-react';

export default function ModelVisual({
  units, selectedUnitId, setSelectedUnitId, settings,
  onEnterStall, onExitStall, onManualFlush, onToggleLeak, onFixValve, onResetSim
}) {
  const unit = units.find((u) => u.id === selectedUnitId) || units[0];
  const isLeaking = Boolean(unit.isLeaking || unit.continuousFlowAlert);
  const isFlushing = Boolean(unit.isFlushing);
  const isPreFlush = Boolean(unit.preFlushPending);
  const isOccupied = Boolean(unit.isOccupied);
  const waterActive = isFlushing || isLeaking;
  const activeStage = isOccupied ? 1 : isPreFlush ? 2 : isFlushing ? 3 : 4;

  const badge = isLeaking
    ? { txt: 'Leak Alert', cls: 'bg-rose-950 text-rose-300 border-rose-500/60' }
    : isFlushing
    ? { txt: 'Flushing', cls: 'bg-cyan-950 text-cyan-300 border-cyan-400/60' }
    : isPreFlush
    ? { txt: 'Pre-Flush Wait', cls: 'bg-amber-950 text-amber-300 border-amber-500/50' }
    : isOccupied
    ? { txt: 'Occupied', cls: 'bg-emerald-950 text-emerald-300 border-emerald-500/50' }
    : { txt: 'System Ready', cls: 'bg-slate-900 text-cyan-300 border-cyan-500/40' };

  const cards = [
    { pos: 'lg:top-3 lg:left-3', icon: User, title: 'Occupancy Sensor', desc: 'Detects when someone enters or leaves the stall.' },
    { pos: 'lg:top-40 lg:left-3', icon: Settings, title: 'Automatic Flush Mechanism', desc: 'Triggers flush after the user leaves (with a safety delay).' },
    { pos: 'lg:top-80 lg:left-3', icon: Droplet, title: 'Water Flow Sensor', desc: 'Monitors flow and detects abnormal usage or leaks.' },
    { pos: 'lg:top-3 lg:right-3', icon: Cpu, title: 'Controller', desc: 'Processes sensor data, controls flushing and detects anomalies.' },
    { pos: 'lg:top-60 lg:right-3', icon: Bell, title: 'Alerts', desc: 'Notifies about leaks, continuous flow, sensor issues, etc.' },
  ];

  return (
    <div className="bg-[#03142D] text-white rounded-2xl border border-cyan-500/20 p-4 sm:p-6 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#071D3B] border border-cyan-400/40 flex items-center justify-center shrink-0">
            <Box className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Model Visual</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
              See how Team Sankalp&apos;s smart toilet system works — combining occupancy-based flushing and water-flow wastage detection in one intelligent solution.
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 bg-[#071D3B] p-1.5 rounded-xl border border-cyan-500/30 self-start">
          {units.map((u) => (
            <button key={u.id} onClick={() => setSelectedUnitId(u.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${u.id === unit.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>
              {u.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 relative rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#040d1a] border border-cyan-500/30 p-4 sm:p-5 flex flex-col justify-between min-h-[500px] overflow-hidden">
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:block">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className={`lg:absolute ${c.pos} lg:w-[220px] bg-[#071D3B]/95 border border-cyan-400/50 rounded-xl p-2.5 shadow-lg`}>
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{c.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 my-auto py-4 flex items-center justify-center">
            <svg viewBox="0 0 800 460" className="w-full max-w-[720px] h-auto" role="img" aria-label="Smart Toilet Model">
              <g className="hidden lg:block" stroke="#22d3ee" strokeWidth="1.8" fill="none">
                <polyline points="230,45 318,45" /><circle cx="318" cy="45" r="4" fill="#22d3ee" />
                <polyline points="230,195 302,215" /><circle cx="302" cy="215" r="4" fill="#22d3ee" />
                <polyline points="230,345 255,385" /><circle cx="255" cy="385" r="4" fill="#22d3ee" />
                <polyline points="570,50 492,105" /><circle cx="492" cy="105" r="4" fill="#22d3ee" />
                <polyline points="570,265 492,215" /><circle cx="492" cy="215" r="4" fill="#22d3ee" />
              </g>
              <polygon points="325,58 275,150 385,150" fill="rgba(34,211,238,0.22)" />
              <rect x="308" y="28" width="44" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="322" cy="42" r="4" fill={isOccupied ? '#22d3ee' : '#64748b'} />
              <rect x="448" y="95" width="72" height="120" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <circle cx="484" cy="155" r="7" fill={isLeaking ? '#f43f5e' : '#10b981'} />
              <rect x="278" y="140" width="74" height="140" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
              <rect x="288" y="154" width="48" height="112" rx="5" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="306" y="195" width="12" height="68" fill={isLeaking ? '#f43f5e' : '#0284c7'} />
              <ellipse cx="362" cy="210" rx="32" ry="76" transform="rotate(-8 362 210)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 284 280 L 340 280 L 340 415 L 492 415 C 512 380, 530 320, 528 265 L 350 265 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="436" cy="264" rx="92" ry="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(435, 335)">
                <circle r="54" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
                <g className={isFlushing ? 'animate-bowl-swirl' : isPreFlush ? 'animate-bowl-refill' : ''}>
                  <path d="M -34 -10 A 35 35 0 1 1 26 24" stroke="#67e8f9" strokeWidth="4" fill="none" />
                  <path d="M 34 10 A 35 35 0 1 1 -26 -24" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
                  <circle r="15" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeDasharray="7 5" />
                </g>
              </g>
              <path d="M 25 422 L 295 380 C 322 374, 330 356, 330 325 L 312 262" stroke="#0284c7" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 25 422 L 295 380 C 322 374, 330 356, 330 325 L 312 262" stroke={isLeaking ? '#fda4af' : '#a5f3fc'} strokeWidth="4" fill="none" className={waterActive ? 'animate-pipe-flow' : ''} />
              <rect x="230" y="362" width="52" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="256" y="384" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">{unit.currentFlowRate.toFixed(1)}L</text>
            </svg>
          </div>
          <div className="relative z-20 flex justify-between text-xs text-slate-300 border-t border-cyan-500/20 pt-2">
            <span>Unit: <strong className="text-cyan-300">{unit.name}</strong> ({unit.locationLabel})</span>
            <span className="font-mono text-cyan-300">{unit.currentFlowRate.toFixed(1)} L/min • {unit.totalWaterLiters.toFixed(1)} L</span>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-4 justify-between">
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Live Simulation Controls</h3>
              <button onClick={onResetSim} className="text-xs text-slate-300 hover:text-cyan-300 flex items-center gap-1 bg-[#03142D] px-2.5 py-1 rounded-lg border border-cyan-500/20">
                <RotateCcw className="w-3 h-3" /><span>Reset</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onEnterStall(unit.id)} disabled={isOccupied}
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 disabled:opacity-50 flex items-center justify-center gap-1.5">
                <UserPlus className="w-4 h-4" /><span>Simulate User Enter</span>
              </button>
              <button onClick={() => onExitStall(unit.id)} disabled={!isOccupied}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-cyan-200 border border-cyan-500/30 disabled:opacity-50 flex items-center justify-center gap-1.5">
                <UserMinus className="w-4 h-4" /><span>Simulate User Exit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onManualFlush(unit.id, 'half')} disabled={isFlushing}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" /><span>Half Flush ({settings.halfFlushLiters}L)</span>
              </button>
              <button onClick={() => onManualFlush(unit.id, 'full')} disabled={isFlushing}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" /><span>Full Flush ({settings.fullFlushLiters}L)</span>
              </button>
            </div>
            {isLeaking ? (
              <button onClick={() => onFixValve(unit.id)} className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600/30 text-emerald-200 border border-emerald-400/60 flex items-center justify-center gap-1.5">
                <Wrench className="w-4 h-4" /><span>Close Stuck Valve / Resolve Leak</span>
              </button>
            ) : (
              <button onClick={() => onToggleLeak(unit.id)} className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#2a1225] text-rose-300 border border-rose-500/40 flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" /><span>Simulate Stuck Valve / Pipe Leak</span>
              </button>
            )}
          </div>

          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400">Current Unit Status</h3>
              <p className="text-base font-bold text-white mt-0.5">{unit.name}</p>
              <p className="text-xs text-slate-400">School Block A {isOccupied ? `• ${unit.occupiedSeconds}s` : ''}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.cls}`}>{badge.txt}</span>
          </div>

          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 space-y-2 flex-1">
            <h3 className="text-base font-bold text-white">Animation Guide</h3>
            {[
              [1, 'User enters stall \u2192 Occupancy detected'],
              [2, 'User leaves \u2192 Waiting for pre-flush delay'],
              [3, 'Automatic flush starts \u2192 Water circulates'],
              [4, 'Flush completes \u2192 System ready'],
            ].map(([n, label]) => (
              <div key={n} className={`flex items-center gap-2.5 p-2 rounded-xl text-xs ${activeStage === n ? 'bg-cyan-500/15 border border-cyan-400/50 text-white font-semibold' : 'text-slate-300'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${activeStage === n ? 'bg-cyan-400 text-slate-950' : 'bg-[#154072] text-cyan-200'}`}>{n}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white">Function 1: Occupancy-Based Flushing</h4>
            <p className="text-xs text-slate-300 mt-1">Prevents flushing while occupied and performs an automatic flush after the user leaves (with a safe delay).</p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-cyan-200 font-semibold shrink-0">
            <span className="px-2 py-1 rounded bg-[#0c2647] border border-cyan-500/30">Enter</span><span>→</span>
            <span className="px-2 py-1 rounded bg-rose-950 border border-rose-500/40 text-rose-200">Occupied</span><span>→</span>
            <span className="px-2 py-1 rounded bg-[#0c2647] border border-cyan-500/30">Exit</span><span>→</span>
            <span className="px-2 py-1 rounded bg-[#0c2647] border border-cyan-500/30">Wait</span><span>→</span>
            <span className="px-2 py-1 rounded bg-cyan-600/30 border border-cyan-400">Flush</span>
          </div>
        </div>
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white">Function 2: Water-Flow Wastage Detection</h4>
            <p className="text-xs text-slate-300 mt-1">Monitors water flow in real-time and alerts for prolonged flow, low flow or possible leaks.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">Normal Flow</span>
            <span className="px-2.5 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300">Prolonged Flow</span>
            <span className="px-2.5 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300">Leak Detected</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2 tracking-[0.18em] uppercase text-slate-300 font-semibold">
          <Leaf className="w-4 h-4 text-cyan-400" />
          <span>DETECT THE WASTE. PROTECT EVERY DROP.</span>
        </div>
        <div>Team Sankalp | Eureka Junior</div>
      </div>
    </div>
  );
}
