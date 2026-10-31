import React from 'react';
import { Droplets, Sliders, RotateCcw } from 'lucide-react';

export default function Navbar({
  activeTab, setActiveTab, onResetSim, unreadAlertsCount, onOpenSettings
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'model', label: 'Model Visual' },
    { id: 'alerts', label: 'Alerts', badge: unreadAlertsCount },
    { id: 'history', label: 'Event Log & CSV' },
  ];
  return (
    <header className="bg-[#03142D] text-white border-b border-cyan-500/20 sticky top-0 z-30 shadow-lg">
      <div className="bg-[#071D3B] border-b border-cyan-500/15 px-3 py-1 text-center text-[10px] sm:text-[11px] text-cyan-200/90">
        <strong>Software Simulation Mode:</strong> Mathematical simulation only — no physical sensors connected.
      </div>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <span className="font-bold text-base sm:text-xl tracking-tight text-white whitespace-nowrap">Team Sankalp</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#062c49] text-cyan-300 border border-cyan-400/40 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              EUREKA JUNIOR
            </span>
          </div>
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button onClick={onResetSim} className="p-1.5 rounded-lg bg-[#071D3B] text-slate-300 border border-cyan-500/25" title="Reset"><RotateCcw className="w-3.5 h-3.5" /></button>
            <button onClick={onOpenSettings} className="p-1.5 rounded-lg bg-[#071D3B] text-cyan-400 border border-cyan-500/25" title="Thresholds"><Sliders className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <nav className="flex items-center gap-1 sm:gap-5 overflow-x-auto no-scrollbar border-t md:border-t-0 border-slate-800/80 pt-1.5 md:pt-0">
          {navItems.map((it) => {
            const act = activeTab === it.id;
            return (
              <button key={it.id} onClick={() => setActiveTab(it.id)}
                className={`relative px-2 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-1 ${act ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}>
                <span>{it.label}</span>
                {it.badge > 0 && <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">{it.badge}</span>}
                {act && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />}
              </button>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <p className="hidden xl:block text-[11px] text-slate-300 leading-tight text-right max-w-[220px]">
            Smart Restroom Occupancy Flushing &amp; Water-Flow Monitor
          </p>
          <button onClick={onResetSim} className="p-1.5 rounded-lg bg-[#071D3B] text-slate-300 hover:text-white border border-cyan-500/25" title="Reset"><RotateCcw className="w-3.5 h-3.5" /></button>
          <button onClick={onOpenSettings} className="p-1.5 rounded-lg bg-[#071D3B] text-cyan-400 hover:text-white border border-cyan-500/25" title="Thresholds"><Sliders className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </header>
  );
}
