import React, { useState } from 'react';
import { Download, Filter, Trash2, FileSpreadsheet } from 'lucide-react';
import { exportEventLogToCSV } from '../utils/csvExport';

export default function EventLogTable({ eventLog, onClearLog }) {
  const [unitFilter, setUnitFilter] = useState('ALL');

  const filteredLogs =
    unitFilter === 'ALL'
      ? eventLog
      : eventLog.filter((item) => item.unitId === unitFilter);

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Simulation Event History & CSV Export
            </h2>
            <p className="text-xs text-slate-500">
              Complete timestamped log of simulated occupancy, smart flushes, and flow anomalies ({filteredLogs.length} entries).
            </p>
          </div>
        </div>

        {/* Filter & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            {['ALL', 'U1', 'U2', 'U3'].map((id) => (
              <button
                key={id}
                onClick={() => setUnitFilter(id)}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  unitFilter === id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {id === 'ALL' ? 'All' : id}
              </button>
            ))}
          </div>

          <button
            onClick={() => exportEventLogToCSV(filteredLogs)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onClearLog}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="Clear History Log"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Responsive Event Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500 bg-slate-50">
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Unit</th>
              <th className="py-2.5 px-3">Event Type</th>
              <th className="py-2.5 px-3">Simulation Details</th>
              <th className="py-2.5 px-3 text-right">Volume (L)</th>
              <th className="py-2.5 px-3 text-right">Flow (L/min)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80">
                <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                  {log.unitName}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      log.type.includes('Leak') || log.type.includes('Anomaly')
                        ? 'bg-rose-100 text-rose-700'
                        : log.type.includes('Flush')
                        ? 'bg-blue-100 text-blue-700'
                        : log.type.includes('Occupancy')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {log.type}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-slate-600">{log.details}</td>
                <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-800">
                  {log.volumeLiters > 0 ? `${log.volumeLiters.toFixed(1)} L` : '—'}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                  {log.flowRateLpm > 0 ? `${log.flowRateLpm.toFixed(1)}` : '0.0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
