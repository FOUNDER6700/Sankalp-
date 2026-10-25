import React from 'react';
import { Droplets, ShieldAlert, Sliders, Activity, FileSpreadsheet, Play, Pause, RotateCcw } from 'lucide-react';

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
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badge: unreadAlertsCount },
    { id: 'history', label: 'Event Log & CSV', icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
      {/* Honesty & Transparency Top Banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-1.5 text-center text-xs text-amber-200 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>
          <strong>Software Simulation Mode:</strong> All occupancy, flush, and water-flow values are mathematical simulations—not live hardware sensor claims.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-400/30">
              <Droplets className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white">Team Sankalp</h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  Eureka Junior
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Smart Restroom Occupancy Flushing & Water-Flow Monitor
              </p>
            </div>
          </div>

          {/* Mobile Settings Button */}
          <button
            onClick={onOpenSettings}
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Simulation Settings"
          >
            <Sliders className="w-5 h-5" />
          </button>
        </div>

        {/* Simulation Controls & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors relative ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Auto-Simulation Clock & Settings Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSimRunning(!isSimRunning)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSimRunning
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimRunning ? 'Sim Active' : 'Sim Paused'}</span>
            </button>

            <button
              onClick={onResetSim}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title="Reset All Simulated Readings"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Thresholds</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
