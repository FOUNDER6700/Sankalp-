import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, settings, onSaveSettings, defaultSettings }) {
  const [formState, setFormState] = useState(settings);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? value : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formState);
    onClose();
  };

  const handleResetDefaults = () => {
    setFormState(defaultSettings);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-xl overflow-hidden">
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm">Simulation Parameters & Thresholds</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Half Flush Volume (L)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="10"
                value={formState.halfFlushLiters}
                onChange={(e) => handleChange('halfFlushLiters', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Flush Volume (L)
              </label>
              <input
                type="number"
                step="0.5"
                min="2"
                max="15"
                value={formState.fullFlushLiters}
                onChange={(e) => handleChange('fullFlushLiters', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Full Flush Occupancy Threshold (Seconds)
            </label>
            <input
              type="number"
              step="5"
              min="5"
              max="300"
              value={formState.fullFlushDurationThreshold}
              onChange={(e) => handleChange('fullFlushDurationThreshold', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 font-medium"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Stays shorter than this trigger a Half Flush; longer stays trigger a Full Flush.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Sim Leak Flow (L/min)
              </label>
              <input
                type="number"
                step="0.2"
                min="0.5"
                max="20"
                value={formState.leakFlowRateLpm}
                onChange={(e) => handleChange('leakFlowRateLpm', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Leak Alert Delay (Sec)
              </label>
              <input
                type="number"
                step="1"
                min="3"
                max="120"
                value={formState.leakAlertDelaySeconds}
                onChange={(e) => handleChange('leakAlertDelaySeconds', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <span className="font-semibold text-slate-800 block">
                Auto-Flush on User Exit
              </span>
              <span className="text-[11px] text-slate-500">
                Automatically trigger smart flush when user leaves stall
              </span>
            </div>
            <input
              type="checkbox"
              checked={formState.autoOccupancyFlush}
              onChange={(e) => handleChange('autoOccupancyFlush', e.target.checked)}
              className="w-4 h-4 accent-cyan-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Parameters</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
