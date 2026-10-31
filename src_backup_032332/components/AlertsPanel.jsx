import React from 'react';
import { ShieldAlert, CheckCircle2, Wrench, Check, Trash2 } from 'lucide-react';

export default function AlertsPanel({ alerts, onAcknowledge, onFixValve, onClearResolved }) {
  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Water Wastage & Continuous-Flow Alerts
            </h2>
            <p className="text-xs text-slate-500">
              Triggered automatically when simulated water flows continuously beyond the configured delay threshold.
            </p>
          </div>
        </div>

        {alerts.some((a) => a.acknowledged) && (
          <button
            onClick={onClearResolved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Resolved</span>
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="py-10 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <p className="text-sm font-semibold text-slate-800">
            No Leak or Wastage Alerts Recorded
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            All three simulated toilet units are operating within normal parameters. Tap "Simulate Stuck Valve / Pipe Leak" on any unit card to test alert detection.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                alert.acknowledged
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                      alert.acknowledged
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {alert.acknowledged ? 'Resolved / Ack' : `${alert.severity} Priority`}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{alert.unitName}</span>
                  <span className="text-xs text-slate-400 font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-slate-700">{alert.message}</p>
              </div>

              {!alert.acknowledged && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onFixValve(alert.unitId)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Close Valve</span>
                  </button>
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Ack</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
