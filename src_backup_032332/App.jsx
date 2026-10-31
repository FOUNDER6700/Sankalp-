import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import OverviewCards from './components/OverviewCards';
import ToiletUnitCard from './components/ToiletUnitCard';
import FlowChart from './components/FlowChart';
import AlertsPanel from './components/AlertsPanel';
import EventLogTable from './components/EventLogTable';
import SettingsModal from './components/SettingsModal';
import ModelVisual from './components/ModelVisual';

const INITIAL_SETTINGS = {
  halfFlushLiters: 2.5, fullFlushLiters: 4.5,
  fullFlushDurationThreshold: 60, leakFlowRateLpm: 3.6,
  leakAlertDelaySeconds: 10, autoOccupancyFlush: true,
};

const makeUnit = (id, name, locationLabel, occ = false) => ({
  id, name, locationLabel, isOccupied: occ, occupiedSeconds: occ ? 12 : 0,
  preFlushPending: false, isFlushing: false, currentFlowRate: 0,
  totalWaterLiters: 0, flushCount: 0, isLeaking: false, leakSeconds: 0,
  continuousFlowAlert: false, lastEventLabel: occ ? 'User entered stall' : 'Ready',
});

const createInitialUnits = () => [
  makeUnit('U1', 'Toilet Unit 1', 'School Block A', true),
  makeUnit('U2', 'Toilet Unit 2', 'School Block A', false),
  makeUnit('U3', 'Toilet Unit 3', 'School Block B', false),
];

const createInitialHistory = () =>
  Array.from({ length: 20 }, (_, i) => ({ time: `-${20 - i}s`, totalFlow: 0, hasLeak: false }));

export default function App() {
  const [activeTab, setActiveTab] = useState('model');
  const [selectedUnitId, setSelectedUnitId] = useState('U1');
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [units, setUnits] = useState(createInitialUnits);
  const [flowHistory, setFlowHistory] = useState(createInitialHistory);
  const [alerts, setAlerts] = useState([]);
  const timersRef = useRef([]);
  const [eventLog, setEventLog] = useState([{
    id: 'EVT-INIT', timestamp: new Date().toLocaleTimeString(),
    unitId: 'SYSTEM', unitName: 'All Units', type: 'System Ready',
    details: '3-unit simulation initialized (Honest software simulation mode)',
    volumeLiters: 0, flowRateLpm: 0,
  }]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const addLog = (unitId, unitName, type, details, vol = 0, flow = 0) => {
    setEventLog((p) => [{
      id: `EVT-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: new Date().toLocaleTimeString(), unitId, unitName, type, details,
      volumeLiters: Number(vol.toFixed(2)), flowRateLpm: Number(flow.toFixed(1)),
    }, ...p.slice(0, 199)]);
  };

  useEffect(() => {
    if (!isSimRunning) return;
    const timer = setInterval(() => {
      setUnits((prev) => prev.map((u) => {
        let x = { ...u };
        if (x.isOccupied) x.occupiedSeconds += 1;
        if (x.isLeaking) {
          x.leakSeconds += 1;
          x.totalWaterLiters = Number((x.totalWaterLiters + settings.leakFlowRateLpm / 60).toFixed(2));
          x.currentFlowRate = x.isFlushing ? 18.0 + settings.leakFlowRateLpm : settings.leakFlowRateLpm;
          if (x.leakSeconds >= settings.leakAlertDelaySeconds && !x.continuousFlowAlert) {
            x.continuousFlowAlert = true;
            x.lastEventLabel = 'Continuous flow alert!';
            setAlerts((p) => [{
              id: `ALT-${Date.now()}-${x.id}`, timestamp: new Date().toLocaleTimeString(),
              unitId: x.id, unitName: x.name, severity: 'High',
              message: `Abnormal flow (${settings.leakFlowRateLpm} L/min) for ${settings.leakAlertDelaySeconds}s.`,
              acknowledged: false,
            }, ...p]);
            addLog(x.id, x.name, 'Leak Alert', 'Abnormal flow detected', 0, settings.leakFlowRateLpm);
          }
        }
        return x;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSimRunning, settings]);

  const triggerFlush = (unitId, mode, reason) => {
    const vol = mode === 'full' ? settings.fullFlushLiters : settings.halfFlushLiters;
    const flow = mode === 'full' ? 22.0 : 15.0;
    setUnits((p) => p.map((u) => u.id === unitId ? {
      ...u, preFlushPending: false, isFlushing: true,
      currentFlowRate: flow + (u.isLeaking ? settings.leakFlowRateLpm : 0),
      totalWaterLiters: Number((u.totalWaterLiters + vol).toFixed(2)),
      flushCount: u.flushCount + 1, lastEventLabel: `${mode} flush (${vol}L)`,
    } : u));
    addLog(unitId, 'Unit', mode === 'full' ? 'Full Flush' : 'Half Flush', reason, vol, flow);
    const tid = setTimeout(() => {
      setUnits((p) => p.map((u) => u.id === unitId ? {
        ...u, isFlushing: false, currentFlowRate: u.isLeaking ? settings.leakFlowRateLpm : 0,
        lastEventLabel: 'Ready',
      } : u));
    }, 2600);
    timersRef.current.push(tid);
  };

  const handleEnter = (id) => {
    setUnits((p) => p.map((u) => u.id === id ? { ...u, isOccupied: true, occupiedSeconds: 0, preFlushPending: false } : u));
    addLog(id, 'Unit', 'Occupancy', 'User entered stall', 0, 0);
  };

  const handleExit = (id) => {
    const t = units.find((u) => u.id === id);
    if (!t || !t.isOccupied) return;
    const dur = t.occupiedSeconds;
    const mode = dur >= settings.fullFlushDurationThreshold ? 'full' : 'half';
    setUnits((p) => p.map((u) => u.id === id ? { ...u, isOccupied: false, occupiedSeconds: 0, preFlushPending: settings.autoOccupancyFlush } : u));
    addLog(id, 'Unit', 'Exit', `User exited after ${dur}s`, 0, 0);
    if (settings.autoOccupancyFlush) {
      const tid = setTimeout(() => triggerFlush(id, mode, `Auto-flush (${dur}s stay)`), 1600);
      timersRef.current.push(tid);
    }
  };

  const handleToggleLeak = (id) => {
    setUnits((p) => p.map((u) => u.id === id ? { ...u, isLeaking: true, leakSeconds: 0, currentFlowRate: settings.leakFlowRateLpm } : u));
    addLog(id, 'Unit', 'Leak', 'Simulated leak started', 0, settings.leakFlowRateLpm);
  };

  const handleFixValve = (id) => {
    setUnits((p) => p.map((u) => u.id === id ? { ...u, isLeaking: false, leakSeconds: 0, continuousFlowAlert: false, currentFlowRate: 0 } : u));
    setAlerts((p) => p.map((a) => a.unitId === id ? { ...a, acknowledged: true } : a));
    addLog(id, 'Unit', 'Repair', 'Leak resolved', 0, 0);
  };

  const handleResetSim = () => {
    clearAllTimers();
    setUnits(createInitialUnits());
    setFlowHistory(createInitialHistory());
    setAlerts([]);
  };

  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-[#020c1b] text-slate-900 flex flex-col">
      <Navbar
        activeTab={activeTab} setActiveTab={setActiveTab}
        isSimRunning={isSimRunning} setIsSimRunning={setIsSimRunning}
        onResetSim={handleResetSim} unreadAlertsCount={unreadAlertsCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <main className="max-w-[1400px] w-full mx-auto px-4 lg:px-8 py-6 space-y-6 flex-1">
        {(activeTab === 'model' || activeTab === 'home') && (
          <ModelVisual
            units={units} selectedUnitId={selectedUnitId} setSelectedUnitId={setSelectedUnitId}
            settings={settings} onEnterStall={handleEnter} onExitStall={handleExit}
            onManualFlush={(id, m) => triggerFlush(id, m, 'Manual flush')}
            onToggleLeak={handleToggleLeak} onFixValve={handleFixValve} onResetSim={handleResetSim}
          />
        )}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 bg-slate-50 p-4 sm:p-6 rounded-2xl">
            <OverviewCards units={units} activeAlertsCount={unreadAlertsCount} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {units.map((u) => (
                <ToiletUnitCard
                  key={u.id} unit={u} settings={settings}
                  onToggleOccupancy={(id) => u.isOccupied ? handleExit(id) : handleEnter(id)}
                  onManualFlush={(id, m) => triggerFlush(id, m, 'Manual flush')}
                  onToggleLeak={handleToggleLeak} onFixValve={handleFixValve}
                />
              ))}
            </div>
            <FlowChart units={units} flowHistory={flowHistory} />
          </div>
        )}
        {activeTab === 'alerts' && (
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl">
            <AlertsPanel
              alerts={alerts} onAcknowledge={(id) => setAlerts((p) => p.map((a) => a.id === id ? { ...a, acknowledged: true } : a))}
              onFixValve={handleFixValve} onClearResolved={() => setAlerts((p) => p.filter((a) => !a.acknowledged))}
            />
          </div>
        )}
        {activeTab === 'history' && (
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl">
            <EventLogTable eventLog={eventLog} onClearLog={() => setEventLog([])} />
          </div>
        )}
      </main>
      <SettingsModal
        isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
        settings={settings} defaultSettings={INITIAL_SETTINGS}
        onSaveSettings={(s) => setSettings(s)}
      />
    </div>
  );
}
