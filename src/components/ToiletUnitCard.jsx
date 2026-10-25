import React from 'react';
import { UserCheck, UserMinus, Droplets, AlertOctagon, ShieldCheck, Wrench, Clock } from 'lucide-react';

export default function ToiletUnitCard({
  unit,
  settings,
  onToggleOccupancy,
  onManualFlush,
  onToggleLeak,
  onFixValve
}) {
  const isAnomaly = unit.isLeaking || unit.continuousFlowAlert;

  // Determine which flush volume will trigger on exit
  const plannedFlushType =
    unit.occupiedSeconds >= settings.fullFlushDurationThreshold
      ? `Full Flush (${settings.fullFlushLiters}L)`
      : `Half Flush (${settings.halfFlushLiters}L)`;

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition-all flex flex-col justify-between ${
        isAnomaly
          ? 'border-rose-400 ring-2 ring-rose-500/20'
          : unit.isOccupied
          ? 'border-cyan-400 ring-2 ring-cyan-500/10'
          : 'border-slate-200'
      }`}
    >
      {/* Card Top Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{unit.name}</h3>
            <span className="text-xs text-slate-400 font-mono">#{unit.id}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{unit.locationLabel}</p>
        </div>

        {/* Status Badge */}
        {isAnomaly ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">
            <AlertOctagon className="w-3.5 h-3.5" />
            Leak / Flow Alert
          </span>
        ) : unit.isFlushing ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
            <Droplets className="w-3.5 h-3.5 animate-bounce" />
            Flushing...
          </span>
        ) : unit.isOccupied ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <UserCheck className="w-3.5 h-3.5" />
            Occupied ({unit.occupiedSeconds}s)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Vacant & Ready
          </span>
        )}
      </div>

      {/* Live Simulated Telemetry Body */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 block">Flow Rate (Sim)</span>
            <span
              className={`text-lg font-bold ${
                unit.currentFlowRate > 0 ? 'text-blue-600' : 'text-slate-800'
              }`}
            >
              {unit.currentFlowRate.toFixed(1)} <small className="text-xs font-normal">L/min</small>
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Unit Volume (Sim)</span>
            <span className="text-lg font-bold text-slate-800">
              {unit.totalWaterLiters.toFixed(1)} <small className="text-xs font-normal">L</small>
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Flush Count</span>
            <span className="text-sm font-semibold text-slate-700">{unit.flushCount} cycles</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Last Action</span>
            <span className="text-xs font-medium text-slate-700 truncate block">
              {unit.lastEventLabel}
            </span>
          </div>
        </div>

        {/* Occupancy Smart-Flush Preview Box */}
        <div className="text-xs bg-cyan-50/70 border border-cyan-100 rounded-lg px-3 py-2 flex items-center justify-between text-cyan-900">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span>
              {unit.isOccupied
                ? `Next Exit Auto-Flush: ${plannedFlushType}`
                : `Auto-Flush Armed (<${settings.fullFlushDurationThreshold}s Half / ≥${settings.fullFlushDurationThreshold}s Full)`}
            </span>
          </span>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="pt-1 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Manual Simulation Triggers
          </p>

          {/* Enter / Exit Occupancy Button */}
          <button
            onClick={() => onToggleOccupancy(unit.id)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              unit.isOccupied
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm'
            }`}
          >
            {unit.isOccupied ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span>Simulate User Exit (Trigger Auto-Flush)</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Simulate User Enter Stall</span>
              </>
            )}
          </button>

          {/* Manual Half / Full Flush Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onManualFlush(unit.id, 'half')}
              disabled={unit.isFlushing}
              className="py-1.5 px-2.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 border border-slate-200"
            >
              Half Flush ({settings.halfFlushLiters}L)
            </button>
            <button
              onClick={() => onManualFlush(unit.id, 'full')}
              disabled={unit.isFlushing}
              className="py-1.5 px-2.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 border border-slate-200"
            >
              Full Flush ({settings.fullFlushLiters}L)
            </button>
          </div>

          {/* Simulate Leak / Fix Valve Button */}
          {isAnomaly ? (
            <button
              onClick={() => onFixValve(unit.id)}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Close Stuck Valve / Resolve Leak</span>
            </button>
          ) : (
            <button
              onClick={() => onToggleLeak(unit.id)}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center gap-1.5"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Simulate Stuck Valve / Pipe Leak</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
