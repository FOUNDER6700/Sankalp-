import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewCards from './components/OverviewCards';
import ToiletUnitCard from './components/ToiletUnitCard';
import FlowChart from './components/FlowChart';
import AlertsPanel from './components/AlertsPanel';
import EventLogTable from './components/EventLogTable';
import SettingsModal from './components/SettingsModal';

const INITIAL_SETTINGS = {
  halfFlushLiters: 2.5,
  fullFlushLiters: 4.5,
  fullFlushDurationThreshold: 60,
  leakFlowRateLpm: 3.6,
  leakAlertDelaySeconds: 10,
  autoOccupancyFlush: true,
};

const makeUnit = (id, name, locationLabel) => ({
  id, name, locationLabel,
  isOccupied: false, occupiedSeconds: 0, isFlushing: false,
  currentFlowRate: 0, totalWaterLiters: 0, flushCount: 0,
  isLeaking: false, leakSeconds: 0, continuousFlowAlert: false,
  lastEventLabel: 'System initialized',
});

const createInitialUnits = () => [
  makeUnit('U1', 'Toilet Unit 1', 'Block A • Ground Floor (Stall 1)'),
  makeUnit('U2', 'Toilet Unit 2', 'Block A • Ground Floor (Stall 2)'),
  makeUnit('U3', 'Toilet Unit 3', 'Block B • Accessible Stall'),
];

const createInitialHistory = () =>
  Array.from({ length: 20 }, (_, i) => ({ time: `-${20 - i}s`, totalFlow: 0, hasLeak: false }));

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [units, setUnits] = useState(createInitialUnits);
  const [flowHistory, setFlowHistory] = useState(createInitialHistory);
  const [alerts, setAlerts] = useState([]);
  const [eventLog, setEventLog] = useState([{
    id: 'EVT-INIT', timestamp: new Date().toLocaleTimeString(),
    unitId: 'SYSTEM', unitName: 'All Units', type: 'System Ready',
    details: '3-unit simulation initialized (Honest software simulation mode)',
    volumeLiters: 0, flowRateLpm: 0,
  }]);

  const addLog = (unitId, unitName, type, details, volumeLiters = 0, flowRateLpm = 0) => {
    setEventLog((prev) => [{
      id: `EVT-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: new Date().toLocaleTimeString(),
      unitId, unitName, type, details,
      volumeLiters: Number(volumeLiters.toFixed(2)),
      flowRateLpm: Number(flowRateLpm.toFixed(1)),
    }, ...prev.slice(0, 199)]);
  };

  useEffect(() => {
    if (!isSimRunning) return;
    const timer = setInterval(() => {
      setUnits((prevUnits) => {
        const nextUnits = prevUnits.map((unit) => {
          let u = { ...unit };
          if (u.isOccupied) u.occupiedSeconds += 1;
          if (u.isLeaking) {
            u.leakSeconds += 1;
            u.totalWaterLiters = Number((u.totalWaterLiters + settings.leakFlowRateLpm / 60).toFixed(2));
            u.currentFlowRate = u.isFlushing ? 18.0 + settings.leakFlowRateLpm : settings.leakFlowRateLpm;
            if (u.leakSeconds >= settings.leakAlertDelaySeconds && !u.continuousFlowAlert) {
              u.continuousFlowAlert = true;
              u.lastEventLabel = 'Continuous flow alert!';
              const msg = `Abnormal continuous flow (${settings.leakFlowRateLpm} L/min) for ${settings.leakAlertDelaySeconds}s.`;
              setAlerts((p) => [{
                id: `ALT-${Date.now()}-${u.id}`, timestamp: new Date().toLocaleTimeString(),
                unitId: u.id, unitName: u.name, severity: 'High', message: msg, acknowledged: false,
              }, ...p]);
              addLog(u.id, u.name, 'Leak Alert', msg, 0, settings.leakFlowRateLpm);
            }
          }
          return u;
        });
        const combined = nextUnits.reduce((s, u) => s + u.currentFlowRate, 0);
        setFlowHistory((p) => [...p.slice(1), {
          time: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          totalFlow: Number(combined.toFixed(1)),
          hasLeak: nextUnits.some((u) => u.isLeaking),
        }]);
        return nextUnits;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSimRunning, settings]);

  const triggerFlush = (unitId, mode, reason) => {
    const vol = mode === 'full' ? settings.fullFlushLiters : settings.halfFlushLiters;
    const flow = mode === 'full' ? 22.0 : 15.0;
    setUnits((p) => p.map((u) => {
      if (u.id !== unitId) return u;
      addLog(u.id, u.name, mode === 'full' ? 'Full Flush' : 'Half Flush', `${reason} (${vol}L)`, vol, flow);
      return {
        ...u, isFlushing: true, currentFlowRate: flow + (u.isLeaking ? settings.leakFlowRateLpm : 0),
        totalWaterLiters: Number((u.totalWaterLiters + vol).toFixed(2)),
        flushCount: u.flushCount + 1, lastEventLabel: `${mode === 'full' ? 'Full' : 'Half'} Flush (${vol}L)`,
      };
    }));
    setTimeout(() => {
      setUnits((p) => p.map((u) => u.id === unitId ? { ...u, isFlushing: false, currentFlowRate: u.isLeaking ? settings.leakFlowRateLpm : 0 } : u));
    }, 2500);
  };

  const handleToggleOccupancy = (unitId) => {
    const t = units.find((u) => u.id === unitId);
    if (!t) return;
    if (!t.isOccupied) {
      setUnits((p) => p.map((u) => u.id === unitId ? { ...u, isOccupied: true, occupiedSeconds: 0, lastEventLabel: 'User entered stall' } : u));
      addLog(t.id, t.name, 'Occupancy Start', 'User entered stall', 0, 0);
    } else {
      const dur = t.occupiedSeconds;
      const mode = dur >= settings.fullFlushDurationThreshold ? 'full' : 'half';
      setUnits((p) => p.map((u) => u.id === unitId ? { ...u, isOccupied: false, occupiedSeconds: 0 } : u));
      addLog(t.id, t.name, 'Occupancy Exit', `User exited after ${dur}s`, 0, 0);
      if (settings.autoOccupancyFlush) triggerFlush(unitId, mode, `Auto-Flush on Exit (${dur}s stay)`);
    }
  };

  const handleToggleLeak = (unitId) => {
    const t = units.find((u) => u.id === unitId);
    if (!t) return;
    setUnits((p) => p.map((u) => u.id === unitId ? { ...u, isLeaking: true, leakSeconds: 0, currentFlowRate: settings.leakFlowRateLpm, lastEventLabel: 'Simulated valve leak started' } : u));
    addLog(t.id, t.name, 'Anomaly Injected', `Simulated leak started (${settings.leakFlowRateLpm} L/min)`, 0, settings.leakFlowRateLpm);
  };

  const handleFixValve = (unitId) => {
    const t = units.find((u) => u.id === unitId);
    if (!t) return;
    setUnits((p) => p.map((u) => u.id === unitId ? { ...u, isLeaking: false, leakSeconds: 0, continuousFlowAlert: false, currentFlowRate: u.isFlushing ? 15.0 : 0, lastEventLabel: 'Leak resolved' } : u));
    setAlerts((p) => p.map((a) => a.unitId === unitId ? { ...a, acknowledged: true } : a));
    addLog(t.id, t.name, 'Maintenance', 'Simulated valve leak resolved', 0, 0);
  };

  const handleResetSim = () => {
    setUnits(createInitialUnits());
    setFlowHistory(createInitialHistory());
    setAlerts([]);
    addLog('SYSTEM', 'All Units', 'Simulation Reset', 'All counters reset to zero', 0, 0);
  };

  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar
        activeTab={activeTab} setActiveTab={setActiveTab}
        isSimRunning={isSimRunning} setIsSimRunning={setIsSimRunning}
        onResetSim={handleResetSim} unreadAlertsCount={unreadAlertsCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-6 flex-1">
        <OverviewCards units={units} activeAlertsCount={unreadAlertsCount} />
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {units.map((u) => (
                <ToiletUnitCard
                  key={u.id} unit={u} settings={settings}
                  onToggleOccupancy={handleToggleOccupancy}
                  onManualFlush={(id, m) => triggerFlush(id, m, 'Manual flush')}
                  onToggleLeak={handleToggleLeak} onFixValve={handleFixValve}
                />
              ))}
            </div>
            <FlowChart units={units} flowHistory={flowHistory} />
          </>
        )}
        {activeTab === 'alerts' && (
          <AlertsPanel
            alerts={alerts}
            onAcknowledge={(id) => setAlerts((p) => p.map((a) => a.id === id ? { ...a, acknowledged: true } : a))}
            onFixValve={handleFixValve}
            onClearResolved={() => setAlerts((p) => p.filter((a) => !a.acknowledged))}
          />
        )}
        {activeTab === 'history' && (
          <EventLogTable eventLog={eventLog} onClearLog={() => setEventLog([])} />
        )}
      </main>
      <SettingsModal
        isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
        settings={settings} defaultSettings={INITIAL_SETTINGS}
        onSaveSettings={(s) => { setSettings(s); addLog('SYSTEM', 'All Units', 'Settings Updated', 'Thresholds updated', 0, 0); }}
      />
    </div>
  );
}
