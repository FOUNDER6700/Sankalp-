import React from 'react';
import { Droplets, Sliders, Play, Pause, RotateCcw } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  isSimRunning,
  setIsSimRunning,
  onResetSim,
  unreadAlertsCount,
  onOpenSettings
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
      {/* Honesty & Transparency Top Banner */}
      <div className="bg-[#071D3B] border-b border-cyan-500/20 px-4 py-1 text-center text-[11px] text-cyan-200/90 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>
          <strong>Software Simulation Mode:</strong> Mathematical simulation only — no physical IoT sensors connected.
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left Brand + Eureka Junior Pill */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Team Sankalp
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#062c49] text-cyan-300 border border-cyan-400/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.15)]">
              EUREKA JUNIOR
            </span>
          </div>

          {/* Mobile Quick Controls */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onResetSim}
              className="p-1.5 rounded-lg bg-[#071D3B] text-slate-300 hover:text-white border border-cyan-500/20"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg bg-[#071D3B] text-slate-300 hover:text-white border border-cyan-500/20"
              title="Simulation Thresholds"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Navigation Links with Cyan Underline */}
        <nav className="flex items-center gap-1 sm:gap-5 overflow-x-auto no-scrollbar border-b lg:border-b-0 border-slate-800 pb-1 lg:pb-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Subtitle + Sim Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <p className="text-xs text-slate-300/90 leading-tight text-right max-w-[230px]">
            Smart Restroom Occupancy Flushing &amp; Water-Flow Monitor
          </p>
          <div className="flex items-center gap-1.5 border-l border-slate-700/80 pl-3">
            <button
              onClick={() => setIsSimRunning(!isSimRunning)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSimRunning
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#071D3B] text-slate-300 border-cyan-500/20'
              }`}
              title="Pause or Resume 1s Simulation Clock"
            >
              {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimRunning ? 'Live' : 'Paused'}</span>
            </button>
            <button
              onClick={onResetSim}
              className="p-1.5 rounded-lg bg-[#071D3B] text-slate-300 hover:text-white border border-cyan-500/20"
              title="Reset All Simulated Readings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#071D3B] text-slate-300 hover:text-white border border-cyan-500/20 text-xs font-medium"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Thresholds</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
