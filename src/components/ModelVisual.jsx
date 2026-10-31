import React from 'react';
import {
  Box, User, Settings, Droplet, Cpu, Bell, UserPlus, UserMinus,
  AlertTriangle, Check, Clock, ArrowRight, Leaf, Wrench, RotateCcw
} from 'lucide-react';
import ToiletCutawaySVG from './ToiletCutawaySVG';

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
    : { txt: 'Vacant & Ready', cls: 'bg-slate-900 text-cyan-300 border-cyan-500/40' };

  const callouts = [
    { pos: 'md:top-4 md:left-4', icon: User, title: 'Occupancy Sensor', desc: 'Detects when someone enters or leaves the stall.' },
    { pos: 'md:top-[35%] md:left-4', icon: Settings, title: 'Automatic Flush Mechanism', desc: 'Triggers flush after the user leaves (with a safety delay).' },
    { pos: 'md:top-[64%] md:left-4', icon: Droplet, title: 'Water Flow Sensor', desc: 'Monitors flow and detects abnormal usage or leaks.' },
    { pos: 'md:top-4 md:right-4', icon: Cpu, title: 'Controller', desc: 'Processes sensor data, controls flushing and detects anomalies.' },
    { pos: 'md:top-[48%] md:right-4', icon: Bell, title: 'Alerts', desc: 'Notifies about leaks, continuous flow, sensor issues, etc.' },
  ];
  return (
    <div className="text-white space-y-5">
      {/* TOP TWO-COLUMN COMPOSITION: Left ~70% (8 cols) | Right ~30% Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Heading + 3D Toilet Stage */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#071D3B] border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(34,211,238,0.2)]">
                <Box className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Our Model Visual</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
                  See how Team Sankalp&apos;s smart toilet system works — combining occupancy-based flushing and water-flow wastage detection in one intelligent solution.
                </p>
              </div>
            </div>
          </div>
          {/* Main 3D Smart Toilet Stage with Floating Component Labels */}
          <div className="relative rounded-2xl bg-[#07162c] border border-cyan-500/30 shadow-[0_0_40px_rgba(3,20,45,0.9)] overflow-hidden flex-1 flex flex-col justify-between">
            <div className="relative w-full my-auto">
              <ToiletCutawaySVG
                unit={unit} isOccupied={isOccupied} isFlushing={isFlushing}
                isPreFlush={isPreFlush} isLeaking={isLeaking} waterActive={waterActive}
              />
            </div>

            {/* 5 Connected Component Callout Cards (Floating on Desktop, Clean Grid Below on Mobile) */}
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 md:p-0 md:block bg-[#040d1a]/90 md:bg-transparent border-t border-cyan-500/20 md:border-t-0">
              {callouts.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className={`md:absolute ${c.pos} md:w-[205px] bg-[#071D3B]/92 backdrop-blur-md border border-cyan-400/50 rounded-xl p-2.5 shadow-[0_0_20px_rgba(6,182,212,0.18)]`}>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">{c.title}</h4>
                        <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* RIGHT SIDEBAR (~30% Width): Controls + Unit Status + Animation Guide */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
          {/* Panel A: Live Simulation Controls */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">Live Simulation Controls</h3>
              <div className="flex items-center gap-1 bg-[#03142D] p-1 rounded-lg border border-cyan-500/25">
                {units.map((u, idx) => (
                  <button key={u.id} onClick={() => setSelectedUnitId(u.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${u.id === unit.id ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>
                    U{idx + 1}
                  </button>
                ))}
                <button onClick={onResetSim} className="p-1 text-slate-300 hover:text-cyan-300" title="Reset"><RotateCcw className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onEnterStall(unit.id)} disabled={isOccupied}
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <UserPlus className="w-4 h-4 shrink-0" /><span>Simulate User Enter</span>
              </button>
              <button onClick={() => onExitStall(unit.id)} disabled={!isOccupied}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/30 disabled:opacity-50 flex items-center justify-center gap-1.5">
                <UserMinus className="w-4 h-4 shrink-0" /><span>Simulate User Exit</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => onManualFlush(unit.id, 'half')} disabled={isFlushing}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>Half Flush ({settings.halfFlushLiters}L)</span>
              </button>
              <button onClick={() => onManualFlush(unit.id, 'full')} disabled={isFlushing}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#0c2442] text-slate-200 border border-cyan-500/25 flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>Full Flush ({settings.fullFlushLiters}L)</span>
              </button>
            </div>
            {isLeaking ? (
              <button onClick={() => onFixValve(unit.id)} className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600/30 text-emerald-200 border border-emerald-400/60 flex items-center justify-center gap-2">
                <Wrench className="w-4 h-4" /><span>Close Stuck Valve / Resolve Leak</span>
              </button>
            ) : (
              <button onClick={() => onToggleLeak(unit.id)} className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#2a1225] text-rose-300 border border-rose-500/40 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" /><span>Simulate Stuck Valve / Pipe Leak</span>
              </button>
            )}
          </div>
          {/* Panel B: Current Unit Status */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg space-y-3">
            <h3 className="text-base font-bold text-white">Current Unit Status</h3>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0c2647] border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M7 3h4a1 1 0 0 1 1 1v6h6a2 2 0 0 1 2 2v1a5 5 0 0 1-4 4.9V21h-6v-3.1A5 5 0 0 1 6 13V4a1 1 0 0 1 1-1zm2 2v7h8v-.5a.5.5 0 0 0-.5-.5H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">{unit.name}</p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    School Block A • <span className="text-cyan-300 font-mono">{unit.currentFlowRate.toFixed(1)} L/min</span>
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${badge.cls}`}>
                <User className="w-3.5 h-3.5" /><span>{badge.txt}</span>
              </span>
            </div>
          </div>

          {/* Panel C: Animation Guide */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg space-y-3 flex-1 flex flex-col justify-between">
            <h3 className="text-base font-bold text-white">Animation Guide</h3>
            <div className="space-y-2.5">
              {[
                [1, 'User enters stall \u2192 Occupancy detected'],
                [2, 'User leaves \u2192 Waiting for pre-flush delay'],
                [3, 'Automatic flush starts \u2192 Water circulates'],
                [4, 'Flush completes \u2192 System ready'],
              ].map(([n, label]) => (
                <div key={n} className={`flex items-center gap-3 p-2 rounded-xl text-xs sm:text-sm ${activeStage === n ? 'bg-cyan-500/15 border border-cyan-400/50 text-white font-semibold' : 'text-slate-300'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${activeStage === n ? 'bg-cyan-400 text-slate-950' : 'bg-[#154072] text-cyan-200'}`}>{n}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM TWO HORIZONTAL INFORMATION PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Function 1: Occupancy-Based Flushing</h4>
              <p className="text-xs text-slate-300 mt-1">Prevents flushing while occupied and performs an automatic flush after the user leaves (with a safe delay).</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-center sm:self-auto shrink-0">
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

        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-full bg-indigo-950 border border-indigo-400/40 flex items-center justify-center shrink-0 text-indigo-300">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Function 2: Water-Flow Wastage Detection</h4>
              <p className="text-xs text-slate-300 mt-1">Monitors water flow in real-time and alerts for prolonged flow, low flow or possible leaks.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-center sm:self-auto shrink-0 text-center">
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

      {/* Footer Tagline */}
      <div className="pt-2 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2 tracking-[0.2em] uppercase text-slate-300 font-semibold">
          <Leaf className="w-4 h-4 text-cyan-400" />
          <span>DETECT THE WASTE. PROTECT EVERY DROP.</span>
        </div>
        <div>Team Sankalp | Eureka Junior</div>
      </div>
    </div>
  );
}
