import React from 'react';
import {
  Box, User, Settings, Droplet, Cpu, Bell, UserPlus, UserMinus,
  AlertTriangle, Check, Clock, ArrowRight, Leaf, Wrench, RotateCcw
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
    ? { txt: 'Leak Alert', cls: 'bg-rose-950/90 text-rose-300 border-rose-500/60' }
    : isFlushing
    ? { txt: 'Flushing', cls: 'bg-cyan-950/90 text-cyan-300 border-cyan-400/60' }
    : isPreFlush
    ? { txt: 'Pre-Flush Wait', cls: 'bg-amber-950/90 text-amber-300 border-amber-500/50' }
    : isOccupied
    ? { txt: 'Occupied', cls: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50' }
    : { txt: 'System Ready', cls: 'bg-slate-900 text-cyan-300 border-cyan-500/40' };

  const cards = [
    { pos: 'md:top-4 md:left-4', icon: User, title: 'Occupancy Sensor', desc: 'Detects when someone enters or leaves the stall.' },
    { pos: 'md:top-[36%] md:left-4', icon: Settings, title: 'Automatic Flush Mechanism', desc: 'Triggers flush after the user leaves (with a safety delay).' },
    { pos: 'md:bottom-12 md:left-4', icon: Droplet, title: 'Water Flow Sensor', desc: 'Monitors flow and detects abnormal usage or leaks.' },
    { pos: 'md:top-4 md:right-4', icon: Cpu, title: 'Controller', desc: 'Processes sensor data, controls flushing and detects anomalies.' },
    { pos: 'md:top-[48%] md:right-4', icon: Bell, title: 'Alerts', desc: 'Notifies about leaks, continuous flow, sensor issues, etc.' },
  ];
  return (
    <div className="bg-[#03142D] text-white rounded-2xl border border-cyan-500/20 p-4 sm:p-6 shadow-2xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#071D3B] border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(34,211,238,0.2)]">
            <Box className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Model Visual</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
              See how Team Sankalp&apos;s smart toilet system works — combining occupancy-based flushing and water-flow wastage detection in one intelligent solution.
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 bg-[#071D3B] p-1 rounded-xl border border-cyan-500/30 self-start">
          {units.map((u) => (
            <button key={u.id} onClick={() => setSelectedUnitId(u.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${u.id === unit.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>
              {u.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-8 relative rounded-2xl bg-gradient-to-b from-[#0b1d36] via-[#071529] to-[#040c18] border border-cyan-500/30 p-3 sm:p-5 flex flex-col justify-between min-h-[460px] md:min-h-[550px] overflow-hidden">
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="110 10 580 445" className="w-full max-w-[760px] h-auto drop-shadow-[0_12px_30px_rgba(6,182,212,0.22)]" role="img" aria-label="Smart Toilet Model">
              <g className="hidden md:block" stroke="#22d3ee" strokeWidth="2" fill="none">
                <polyline points="235,52 312,52" /><circle cx="312" cy="52" r="4.5" fill="#22d3ee" />
                <polyline points="235,195 270,195 298,218" /><circle cx="298" cy="218" r="4.5" fill="#22d3ee" />
                <polyline points="235,345 252,345 256,382" /><circle cx="256" cy="382" r="4.5" fill="#22d3ee" />
                <polyline points="565,55 525,55 488,105" /><circle cx="488" cy="105" r="4.5" fill="#22d3ee" />
                <polyline points="565,255 528,255 488,215" /><circle cx="488" cy="215" r="4.5" fill="#22d3ee" />
              </g>
              <polygon points="328,60 265,165 395,165" fill="rgba(34,211,238,0.25)" />
              <rect x="306" y="32" width="46" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="320" cy="46" r="4" fill={isOccupied ? '#22d3ee' : '#64748b'} />
              <rect x="448" y="92" width="74" height="126" rx="9" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <rect x="475" y="142" width="20" height="20" rx="4" fill="#064e3b" stroke={isLeaking ? '#f43f5e' : '#10b981'} strokeWidth="2" />
              <circle cx="485" cy="152" r="5" fill={isLeaking ? '#f43f5e' : '#10b981'} />
              <rect x="276" y="138" width="76" height="142" rx="9" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
              <rect x="286" y="152" width="50" height="114" rx="5" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="304" y="192" width="14" height="72" fill={isLeaking ? '#f43f5e' : '#0284c7'} />
              <ellipse cx="364" cy="208" rx="34" ry="78" transform="rotate(-8 364 208)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
              <path d="M 282 280 L 340 280 L 340 420 L 496 420 C 518 382, 536 320, 532 264 L 350 264 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="438" cy="264" rx="94" ry="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <g transform="translate(436, 338)">
                <circle r="58" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
                <g className={isFlushing ? 'animate-bowl-swirl' : isPreFlush ? 'animate-bowl-refill' : ''}>
                  <path d="M -36 -12 A 38 38 0 1 1 28 26" stroke="#67e8f9" strokeWidth="4.5" fill="none" />
                  <path d="M 36 12 A 38 38 0 1 1 -28 -26" stroke="#38bdf8" strokeWidth="4" fill="none" />
                  <circle r="18" fill="none" stroke="#a5f3fc" strokeWidth="2.5" strokeDasharray="8 6" />
                </g>
              </g>
              <path d="M 115 430 L 295 382 C 322 375, 330 356, 330 325 L 311 262" stroke="#0284c7" strokeWidth="22" fill="none" strokeLinecap="round" />
              <path d="M 115 430 L 295 382 C 322 375, 330 356, 330 325 L 311 262" stroke={isLeaking ? '#fda4af' : '#67e8f9'} strokeWidth="5" fill="none" className={waterActive ? 'animate-pipe-flow' : ''} />
              <rect x="228" y="362" width="54" height="38" rx="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="255" y="385" textAnchor="middle" fill="#67e8f9" fontSize="11" fontFamily="monospace" fontWeight="bold">{unit.currentFlowRate.toFixed(1)}L</text>
            </svg>
          </div>
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:block mt-3 md:mt-0">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className={`md:absolute ${c.pos} md:w-[210px] bg-[#071D3B]/95 backdrop-blur-sm border border-cyan-400/50 rounded-xl p-2.5 shadow-[0_0_18px_rgba(6,182,212,0.18)]`}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{c.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4 justify-between">
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Live Simulation Controls</h3>
              <button onClick={onResetSim} className="text-[11px] text-slate-300 hover:text-cyan-300 flex items-center gap-1 bg-[#03142D] px-2 py-1 rounded-lg border border-cyan-500/20">
                <RotateCcw className="w-3 h-3" /><span>Reset</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onEnterStall(unit.id)} disabled={isOccupied}
                className="py-2.5 px-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                <UserPlus className="w-4 h-4 shrink-0" /><span>Simulate User Enter</span>
              </button>
              <button onClick={() => onExitStall(unit.id)} disabled={!isOccupied}
                className="py-2.5 px-2.5 rounded-xl text-xs font-semibold bg-[#0c2442] text-cyan-200 border border-cyan-500/30 disabled:opacity-50 flex items-center justify-center gap-1.5">
                <UserMinus className="w-4 h-4 shrink-0" /><span>Simulate User Exit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onManualFlush(unit.id, 'half')} disabled={isFlushing}
                className="py-2.5 px-2.5 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>Half Flush ({settings.halfFlushLiters}L)</span>
              </button>
              <button onClick={() => onManualFlush(unit.id, 'full')} disabled={isFlushing}
                className="py-2.5 px-2.5 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>Full Flush ({settings.fullFlushLiters}L)</span>
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
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-lg space-y-2.5">
            <h3 className="text-base font-bold text-white">Current Unit Status</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#0c2647] border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">{unit.name}</p>
                  <p className="text-xs text-slate-400">School Block A</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.cls}`}>
                <User className="w-3.5 h-3.5" /><span>{badge.txt}</span>
              </span>
            </div>
          </div>

          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-lg space-y-2.5 flex-1 flex flex-col justify-between">
            <h3 className="text-base font-bold text-white">Animation Guide</h3>
            <div className="space-y-2">
              {[
                [1, 'User enters stall \u2192 Occupancy detected'],
                [2, 'User leaves \u2192 Waiting for pre-flush delay'],
                [3, 'Automatic flush starts \u2192 Water circulates'],
                [4, 'Flush completes \u2192 System ready'],
              ].map(([n, label]) => (
                <div key={n} className={`flex items-center gap-2.5 p-2 rounded-xl text-xs ${activeStage === n ? 'bg-cyan-500/15 border border-cyan-400/50 text-white font-semibold' : 'text-slate-300'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeStage === n ? 'bg-cyan-400 text-slate-950' : 'bg-[#154072] text-cyan-200'}`}>{n}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Function 1: Occupancy-Based Flushing</h4>
              <p className="text-xs text-slate-300 mt-1">Prevents flushing while occupied and performs an automatic flush after the user leaves (with a safe delay).</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-center lg:self-auto shrink-0">
            {[
              ['Enter', User, 'border-cyan-400/60 bg-[#0c2647] text-cyan-200'],
              ['Occupied', AlertTriangle, 'border-rose-500/70 bg-rose-950 text-rose-300'],
              ['Exit', UserMinus, 'border-cyan-400/60 bg-[#0c2647] text-cyan-200'],
              ['Wait', Clock, 'border-cyan-400/60 bg-[#0c2647] text-cyan-200'],
              ['Flush', Droplet, 'border-cyan-400 bg-cyan-600/30 text-cyan-200'],
            ].map(([lbl, Icon, cls], i) => (
              <React.Fragment key={lbl}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${cls}`}><Icon className="w-3.5 h-3.5" /></div>
                  <span className="text-[10px] text-slate-300">{lbl}</span>
                </div>
                {i < 4 && <ArrowRight className="w-3 h-3 text-slate-500 -mt-3" />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-950 border border-indigo-400/40 flex items-center justify-center shrink-0 text-indigo-300">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Function 2: Water-Flow Wastage Detection</h4>
              <p className="text-xs text-slate-300 mt-1">Monitors water flow in real-time and alerts for prolonged flow, low flow or possible leaks.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-center lg:self-auto shrink-0 text-center">
            {[
              ['Normal Flow', Check, 'bg-emerald-950 border-emerald-400 text-emerald-300'],
              ['Prolonged Flow', AlertTriangle, 'bg-amber-950 border-amber-400 text-amber-300'],
              ['Leak Detected', AlertTriangle, 'bg-rose-950 border-rose-400 text-rose-300'],
            ].map(([lbl, Icon, cls]) => (
              <div key={lbl} className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center ${cls}`}><Icon className="w-4 h-4" /></div>
                <span className="text-[10px] text-slate-300 max-w-[52px] leading-tight">{lbl}</span>
              </div>
            ))}
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
