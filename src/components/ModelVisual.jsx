import React from 'react';
import {
  Box, User, Settings, Droplet, Cpu, Bell, UserPlus, UserMinus,
  AlertTriangle, Check, Clock, ArrowRight, Wifi, Leaf, Wrench, RotateCcw
} from 'lucide-react';

export default function ModelVisual({
  units,
  selectedUnitId,
  setSelectedUnitId,
  settings,
  onEnterStall,
  onExitStall,
  onManualFlush,
  onToggleLeak,
  onFixValve,
  onResetSim
}) {
  const unit = units.find((u) => u.id === selectedUnitId) || units[0];
  const isLeaking = unit.isLeaking || unit.continuousFlowAlert;
  const isFlushing = unit.isFlushing;
  const isPreFlush = unit.preFlushPending;
  const isOccupied = unit.isOccupied;
  const waterActive = isFlushing || isLeaking;

  // Determine current Animation Guide active step (1..4)
  let activeStage = 4;
  if (isOccupied) activeStage = 1;
  else if (isPreFlush) activeStage = 2;
  else if (isFlushing) activeStage = 3;
  else activeStage = 4;

  // Status badge config for Current Unit Status card
  let statusBadge = {
    label: 'Vacant & Ready',
    classes: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50',
    dot: 'bg-emerald-400'
  };
  if (isLeaking) {
    statusBadge = {
      label: unit.continuousFlowAlert ? 'Leak Detected' : 'Abnormal Flow',
      classes: 'bg-rose-950/90 text-rose-300 border-rose-500/60 animate-pulse',
      dot: 'bg-rose-400'
    };
  } else if (isFlushing) {
    statusBadge = {
      label: 'Flushing Active',
      classes: 'bg-cyan-950/90 text-cyan-300 border-cyan-400/60',
      dot: 'bg-cyan-400'
    };
  } else if (isPreFlush) {
    statusBadge = {
      label: 'Pre-Flush Delay',
      classes: 'bg-amber-950/90 text-amber-300 border-amber-500/50',
      dot: 'bg-amber-400'
    };
  } else if (isOccupied) {
    statusBadge = {
      label: 'Occupied',
      classes: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50',
      dot: 'bg-emerald-400'
    };
  }

  return (
    <div className="bg-[#03142D] text-white rounded-2xl border border-cyan-500/20 p-4 sm:p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Top Heading Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071D3B] border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Box className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Our Model Visual
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 mt-1 max-w-2xl leading-relaxed">
              See how Team Sankalp&apos;s smart toilet system works — combining occupancy-based flushing and water-flow wastage detection in one intelligent solution.
            </p>
          </div>
        </div>

        {/* Unit Selector Pills */}
        <div className="flex items-center gap-1.5 bg-[#071D3B] p-1.5 rounded-xl border border-cyan-500/30 self-start md:self-auto">
          {units.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUnitId(u.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                u.id === unit.id
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {u.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Model Stage (8 cols) + Right Control Column (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* LEFT-HAND SMART TOILET VISUAL STAGE */}
        <div className="xl:col-span-8 relative rounded-2xl bg-gradient-to-br from-[#0a192f] via-[#07162c] to-[#040d1a] border border-cyan-500/30 shadow-[inset_0_0_60px_rgba(6,182,212,0.08)] overflow-hidden p-4 sm:p-6 flex flex-col justify-between min-h-[540px] lg:min-h-[600px]">
          {/* Subtle Architectural Wall & Floor Grid Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.18) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />

          {/* Desktop / Tablet Connected Callout Cards Overlay */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:block">
            {/* 1. Occupancy Sensor Card (Top Left) */}
            <div className="lg:absolute lg:top-2 lg:left-2 lg:w-[235px] bg-[#071D3B]/95 backdrop-blur-md border border-cyan-400/50 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <div className="flex items-start gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${isOccupied ? 'bg-cyan-500/30 border-cyan-300 text-cyan-200 shadow-[0_0_12px_#22d3ee]' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'}`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Occupancy Sensor</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    Detects when someone enters or leaves the stall.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Automatic Flush Mechanism Card (Mid Left) */}
            <div className="lg:absolute lg:top-[165px] lg:left-2 lg:w-[235px] bg-[#071D3B]/95 backdrop-blur-md border border-cyan-400/50 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <div className="flex items-start gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${isFlushing ? 'bg-cyan-500/30 border-cyan-300 text-cyan-200 animate-spin' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'}`}>
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Automatic Flush Mechanism</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    Triggers flush after the user leaves (with a safety delay).
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Water Flow Sensor Card (Bottom Left) */}
            <div className="lg:absolute lg:top-[325px] lg:left-2 lg:w-[225px] bg-[#071D3B]/95 backdrop-blur-md border border-cyan-400/50 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <div className="flex items-start gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${waterActive ? 'bg-cyan-500/30 border-cyan-300 text-cyan-200 shadow-[0_0_12px_#22d3ee]' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'}`}>
                  <Droplet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Water Flow Sensor</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    Monitors flow and detects abnormal usage or leaks.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Controller Card (Top Right) */}
            <div className="lg:absolute lg:top-2 lg:right-2 lg:w-[220px] bg-[#071D3B]/95 backdrop-blur-md border border-cyan-400/50 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Controller</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    Processes sensor data, controls flushing and detects anomalies.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Alerts Card (Mid-Low Right) */}
            <div className={`lg:absolute lg:top-[250px] lg:right-2 lg:w-[220px] bg-[#071D3B]/95 backdrop-blur-md border rounded-xl p-3 transition-colors ${isLeaking ? 'border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.35)]' : 'border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.18)]'}`}>
              <div className="flex items-start gap-2.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${isLeaking ? 'bg-rose-500/30 border-rose-400 text-rose-300 animate-bounce' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Alerts</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                    Notifies about leaks, continuous flow, sensor issues, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Smart Toilet Cutaway SVG Illustration */}
          <div className="relative z-10 my-auto pt-4 lg:pt-8 flex items-center justify-center">
            <svg
              viewBox="0 0 800 500"
              className="w-full max-w-[760px] h-auto drop-shadow-[0_12px_35px_rgba(0,195,255,0.2)]"
              role="img"
              aria-label="Interactive Smart Toilet Cutaway Model"
            >
              <defs>
                <linearGradient id="waterGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isLeaking ? '#fb7185' : '#38bdf8'} />
                  <stop offset="50%" stopColor={isLeaking ? '#e11d48' : '#0284c7'} />
                  <stop offset="100%" stopColor={isLeaking ? '#881337' : '#0369a1'} />
                </linearGradient>
                <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="65%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <radialGradient id="sensorCone" cx="50%" cy="0%" r="100%">
                  <stop offset="0%" stopColor="rgba(34,211,238,0.55)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </radialGradient>
                <radialGradient id="bowlRadial" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor={isLeaking ? '#fda4af' : '#67e8f9'} />
                  <stop offset="50%" stopColor={isLeaking ? '#e11d48' : '#0284c7'} />
                  <stop offset="100%" stopColor="#082f49" />
                </radialGradient>
              </defs>

              {/* Perspective Floor Line */}
              <line x1="20" y1="435" x2="780" y2="435" stroke="#1e3a5f" strokeWidth="2" opacity="0.6" />

              {/* Cyan Connection Leader Lines (Matching Reference) */}
              <g className="hidden lg:block" stroke="#22d3ee" strokeWidth="1.8" fill="none">
                {/* Occupancy Sensor Line */}
                <polyline points="240,55 318,55" />
                <circle cx="318" cy="55" r="4.5" fill="#22d3ee" />
                {/* Automatic Flush Mechanism Line */}
                <polyline points="240,210 278,210 302,232" />
                <circle cx="302" cy="232" r="4.5" fill="#22d3ee" />
                {/* Water Flow Sensor Line */}
                <polyline points="230,368 248,368 255,405" />
                <circle cx="255" cy="405" r="4.5" fill="#22d3ee" />
                {/* Controller Line */}
                <polyline points="570,58 532,58 492,108" />
                <circle cx="492" cy="108" r="4.5" fill="#22d3ee" />
                {/* Alerts Line */}
                <polyline points="570,295 535,295 492,235" />
                <circle cx="492" cy="235" r="4.5" fill="#22d3ee" />
              </g>

              {/* 1. Wall-Mounted Occupancy Sensor & Glowing Detection Cone */}
              <polygon
                points="318,68 272,165 388,165"
                fill="url(#sensorCone)"
                className={isOccupied ? 'opacity-100' : 'opacity-65'}
              />
              <rect x="308" y="36" width="46" height="30" rx="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="323" cy="51" r="4" fill={isOccupied ? '#22d3ee' : '#64748b'} />
              <circle cx="340" cy="51" r="3" fill="#38bdf8" />

              {/* 4. Wall-Mounted Smart Controller Box & Cloud Wi-Fi Signal */}
              <rect x="445" y="102" width="76" height="128" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="3" />
              <rect x="455" y="112" width="56" height="108" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              {/* Controller Green/Red Status LED */}
              <rect x="473" y="150" width="20" height="20" rx="4" fill="#064e3b" stroke={isLeaking ? '#f43f5e' : '#10b981'} strokeWidth="2" />
              <circle cx="483" cy="160" r="5" fill={isLeaking ? '#f43f5e' : '#10b981'} />
              {/* Cables from Controller to Flush Tank */}
              <path d="M 445 145 L 365 165" stroke="#475569" strokeWidth="3" fill="none" />
              <path d="M 445 190 L 365 205" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

              {/* Cloud + Wi-Fi Signal Icon Next to Controller */}
              <g transform="translate(525, 145)">
                <path
                  d="M25,45 H68 A16,16 0 0,0 70,14 A22,22 0 0,0 28,8 A18,18 0 0,0 12,26 A14,14 0 0,0 25,45 Z"
                  fill="rgba(14,116,144,0.25)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <path d="M36,36 a14,14 0 0,1 20,0" stroke="#22d3ee" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M40,41 a8,8 0 0,1 12,0" stroke="#22d3ee" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="46" cy="46" r="2.5" fill="#22d3ee" />
              </g>

              {/* Smart Toilet Ceramic Tank, Raised Lid & Cutaway Bowl */}
              {/* Outer Tank */}
              <rect x="275" y="148" width="76" height="145" rx="10" fill="url(#ceramicBody)" stroke="#94a3b8" strokeWidth="2" />
              {/* Tank Top Lid */}
              <rect x="270" y="138" width="86" height="14" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Tank Cutaway Window (2. Automatic Flush Mechanism Valve) */}
              <rect x="285" y="162" width="52" height="118" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Internal Valve Cylinder */}
              <rect x="298" y="170" width="26" height="44" rx="4" fill="#334155" stroke="#67e8f9" strokeWidth="1.5" />
              <rect x="305" y="214" width="12" height="62" fill="url(#waterGlow)" />

              {/* Raised Toilet Seat Lid */}
              <ellipse cx="362" cy="218" rx="34" ry="82" transform="rotate(-8 362 218)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
              <ellipse cx="366" cy="220" rx="25" ry="70" transform="rotate(-8 366 220)" fill="#e2e8f0" />

              {/* Lower Ceramic Pedestal & Bowl Body */}
              <path
                d="M 282 290 L 340 290 L 340 432 L 495 432 C 515 395, 535 335, 532 275 L 352 275 Z"
                fill="url(#ceramicBody)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              {/* Toilet Seat Rim */}
              <ellipse cx="438" cy="274" rx="96" ry="22" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <ellipse cx="438" cy="274" rx="74" ry="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Glowing Cutaway Bowl Cross-Section (Rotating Water Vortex) */}
              <g transform="translate(435, 348)">
                <circle r="58" fill="url(#bowlRadial)" stroke="#38bdf8" strokeWidth="2.5" />
                <g className={isFlushing ? 'animate-bowl-swirl' : isPreFlush ? 'animate-bowl-refill' : ''}>
                  {/* Glowing Swirl Arcs & Arrows Inside Bowl */}
                  <path
                    d="M -36 -12 A 38 38 0 1 1 28 26"
                    stroke="#67e8f9"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <polygon points="32,20 28,34 18,24" fill="#67e8f9" />
                  <path
                    d="M 36 12 A 38 38 0 1 1 -28 -26"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <polygon points="-32,-20 -28,-34 -18,-24" fill="#38bdf8" />
                  <circle r="16" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeDasharray="8 6" />
                </g>
              </g>

              {/* Supply Pipe from Bottom-Left into Flush Valve + Bowl */}
              <path
                d="M 20 442 L 295 396 C 325 390, 332 372, 332 340 L 311 275 L 311 235"
                stroke="#1e293b"
                strokeWidth="30"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 20 442 L 295 396 C 325 390, 332 372, 332 340 L 311 275 L 311 235"
                stroke="url(#waterGlow)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={waterActive ? '1' : '0.75'}
              />
              {/* Animated Cyan Flow Stream Along Supply Pipe */}
              <path
                d="M 20 442 L 295 396 C 325 390, 332 372, 332 340 L 311 275 L 311 235"
                stroke={isLeaking ? '#fda4af' : '#a5f3fc'}
                strokeWidth="4"
                fill="none"
                className={waterActive ? 'animate-pipe-flow' : ''}
                opacity={waterActive ? '0.95' : '0.3'}
              />

              {/* Glowing Flow Arrows Inside Bottom Supply Pipe */}
              <g className={waterActive ? 'animate-arrow-flow' : ''} fill={isLeaking ? '#ffe4e6' : '#67e8f9'}>
                <polygon points="55,433 78,430 74,424 90,431 76,441 77,435 56,438" />
                <polygon points="125,422 148,418 144,412 160,419 146,429 147,423 126,427" />
                <polygon points="195,410 218,406 214,400 230,407 216,417 217,411 196,415" />
              </g>

              {/* 3. Inline Digital Water Flow Sensor Module on Supply Pipe */}
              <g transform="translate(232, 376) rotate(-9)">
                <rect x="0" y="0" width="54" height="42" rx="8" fill="#0f172a" stroke={isLeaking ? '#f43f5e' : '#38bdf8'} strokeWidth="2.5" />
                <rect x="8" y="10" width="38" height="20" rx="4" fill="#0284c7" />
                <text x="27" y="24" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {unit.currentFlowRate.toFixed(1)}L
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Status Strip Inside Stage */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyan-500/20 text-xs text-slate-300">
            <span>
              Selected: <strong className="text-cyan-300">{unit.name}</strong> ({unit.locationLabel})
            </span>
            <span className="font-mono text-cyan-300">
              Flow: {unit.currentFlowRate.toFixed(1)} L/min • Total: {unit.totalWaterLiters.toFixed(1)} L ({unit.flushCount} flushes)
            </span>
          </div>
        </div>

        {/* RIGHT-HAND CONTROL & TELEMETRY COLUMN */}
        <div className="xl:col-span-4 space-y-4 flex flex-col justify-between">
          {/* 1. Live Simulation Controls Card */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Live Simulation Controls
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onEnterStall(unit.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  isOccupied
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold'
                }`}
              >
                {isOccupied ? <UserMinus className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                <span>{isOccupied ? 'Simulate User Exit' : 'Simulate User Enter'}</span>
              </button>

              <button
                onClick={() => onExitStall(unit.id)}
                disabled={!isOccupied && !isPreFlush}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 flex items-center justify-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Exit Now</span>
              </button>

              <button
                onClick={() => onManualFlush(unit.id, 'half')}
                disabled={isFlushing}
                className="py-2 px-3 rounded-xl text-xs font-medium bg-[#03142D] hover:bg-[#0a254a] text-cyan-300 border border-cyan-500/30 disabled:opacity-40 flex items-center justify-center gap-1.5"
              >
                <Droplet className="w-3.5 h-3.5" />
                <span>Half Flush (2.5L)</span>
              </button>

              <button
                onClick={() => onManualFlush(unit.id, 'full')}
                disabled={isFlushing}
                className="py-2 px-3 rounded-xl text-xs font-medium bg-[#03142D] hover:bg-[#0a254a] text-cyan-300 border border-cyan-500/30 disabled:opacity-40 flex items-center justify-center gap-1.5"
              >
                <Droplet className="w-3.5 h-3.5" />
                <span>Full Flush (4.5L)</span>
              </button>
            </div>

            {/* Stuck Valve / Leak Trigger Button */}
            {isLeaking ? (
              <button
                onClick={() => onFixValve(unit.id)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>Resolve Leak / Close Stuck Valve</span>
              </button>
            ) : (
              <button
                onClick={() => onToggleLeak(unit.id)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/60 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Simulate Stuck Valve / Pipe Leak</span>
              </button>
            )}
          </div>

          {/* 2. Current Unit Status Card */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Current Unit Status
            </h3>
            <div className="bg-[#03142D] p-3.5 rounded-xl border border-cyan-500/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{unit.name}</h4>
                  <p className="text-[11px] text-slate-400">{unit.locationLabel}</p>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${statusBadge.classes}`}>
                <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                <span>{statusBadge.label}</span>
              </div>
            </div>
          </div>

          {/* 3. Animation Guide Card (4 Stages) */}
          <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-4 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Animation Guide
            </h3>
            <div className="space-y-2">
              {[
                { step: 1, text: 'User enters stall → Occupancy detected' },
                { step: 2, text: 'User leaves → Waiting for pre-flush delay' },
                { step: 3, text: 'Automatic flush starts → Water circulates' },
                { step: 4, text: 'Flush completes → System ready' },
              ].map((item) => {
                const isCurrent = activeStage === item.step;
                return (
                  <div
                    key={item.step}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs transition-colors ${
                      isCurrent
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.15)] font-semibold'
                        : 'bg-[#03142D]/60 text-slate-400 border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_#22d3ee]'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.step}
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FEATURE CARDS & FOOTER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* Function 1: Occupancy-Based Flushing */}
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Function 1: Occupancy-Based Flushing
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Prevents flushing while occupied and performs an automatic flush after the user leaves (with a safe delay).
              </p>
            </div>
          </div>

          {/* 5-Step Mini Flow Pipeline */}
          <div className="flex items-center justify-between bg-[#03142D] px-4 py-3 rounded-xl border border-cyan-500/20 overflow-x-auto gap-2">
            {[
              { label: 'Enter', icon: User },
              { label: 'Occupied', icon: ShieldCheck, alert: true },
              { label: 'Exit', icon: UserMinus },
              { label: 'Wait', icon: Clock },
              { label: 'Flush', icon: Droplet },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step.alert ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-cyan-950 border-cyan-500/40 text-cyan-300'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] text-slate-300 mt-1 font-medium">{step.label}</span>
                  </div>
                  {idx < 4 && <ArrowRight className="w-3.5 h-3.5 text-cyan-400/60 shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Function 2: Water-Flow Wastage Detection */}
        <div className="bg-[#071D3B] rounded-2xl border border-cyan-500/30 p-5 shadow-lg flex flex-col justify-between space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-400">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Function 2: Water-Flow Wastage Detection
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Monitors water flow in real-time and alerts for prolonged flow, low flow or possible leaks.
              </p>
            </div>
          </div>

          {/* 3 Status Indicators */}
          <div className="grid grid-cols-3 gap-2 bg-[#03142D] p-3 rounded-xl border border-cyan-500/20 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 mb-1">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200">Normal Flow</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 mb-1">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200">Prolonged Flow</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-300 mb-1">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200">Leak Detected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-wider uppercase text-cyan-300">
            Detect the waste. Protect every drop.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>Team Sankalp</span>
          <span>•</span>
          <span>Eureka Junior Innovation</span>
        </div>
      </div>
    </div>
  );
}
