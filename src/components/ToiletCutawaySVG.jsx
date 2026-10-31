import React from 'react';

export default function ToiletCutawaySVG({ unit, isOccupied, isFlushing, isPreFlush, isLeaking, waterActive }) {
  const flowColor = isLeaking ? '#fb7185' : '#38bdf8';
  const brightFlow = isLeaking ? '#ffe4e6' : '#67e8f9';
  return (
    <svg viewBox="0 0 860 520" className="w-full h-auto select-none" role="img" aria-label="3D Smart Toilet Cutaway System">
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f233f" />
          <stop offset="55%" stopColor="#09172b" />
          <stop offset="100%" stopColor="#050e1c" />
        </linearGradient>
        <linearGradient id="ceramic3D" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="ceramicSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="bowlWater3D" cx="50%" cy="48%" r="54%">
          <stop offset="0%" stopColor={isLeaking ? '#fda4af' : '#67e8f9'} />
          <stop offset="45%" stopColor={isLeaking ? '#e11d48' : '#0284c7'} />
          <stop offset="85%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <linearGradient id="pipeMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="35%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
        <linearGradient id="sensorBeam" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="rgba(56,189,248,0.65)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>
      {/* 3D Architectural Room Corner, Wall Tiles & Perspective Floor */}
      <rect x="0" y="0" width="860" height="520" fill="url(#wallGrad)" />
      <path d="M 215 0 L 215 395 L 0 465" stroke="#1e3a5f" strokeWidth="1.5" fill="none" opacity="0.55" />
      <path d="M 215 395 L 685 495" stroke="#1e3a5f" strokeWidth="2" fill="none" opacity="0.7" />
      <line x1="415" y1="0" x2="415" y2="435" stroke="#1e3a5f" strokeWidth="1" opacity="0.35" />
      <line x1="595" y1="0" x2="595" y2="475" stroke="#1e3a5f" strokeWidth="1" opacity="0.35" />
      <line x1="215" y1="175" x2="860" y2="175" stroke="#1e3a5f" strokeWidth="1" opacity="0.3" />
      {/* Floor Ambient Shadow Under Toilet */}
      <ellipse cx="425" cy="442" rx="145" ry="26" fill="rgba(2,6,23,0.75)" />

      {/* Wall Conduit Pipes */}
      <path d="M 488 0 L 488 120" stroke="#334155" strokeWidth="5" />
      <path d="M 498 0 L 498 120" stroke="#1e293b" strokeWidth="3" />
      {/* 1. Wall-Mounted Occupancy Sensor & Volumetric Cyan Cone */}
      <polygon points="325,78 272,188 378,188" fill="url(#sensorBeam)" opacity={isOccupied ? '1' : '0.7'} />
      <rect x="301" y="42" width="52" height="34" rx="8" fill="#090d16" stroke="#94a3b8" strokeWidth="2" />
      <rect x="305" y="46" width="44" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
      <circle cx="318" cy="59" r="4.5" fill={isOccupied ? '#22d3ee' : '#38bdf8'} />
      <circle cx="337" cy="59" r="3" fill="#e2e8f0" />

      {/* 4. Wall-Mounted 3D Smart Controller Box & Cloud Wi-Fi */}
      <path d="M 455 112 L 472 104 L 538 110 L 538 232 L 520 242 L 455 232 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <rect x="472" y="110" width="64" height="124" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <rect x="492" y="155" width="22" height="22" rx="4" fill="#052e16" stroke={isLeaking ? '#f43f5e' : '#10b981'} strokeWidth="2" />
      <circle cx="503" cy="166" r="5.5" fill={isLeaking ? '#f43f5e' : '#22c55e'} />
      <path d="M 455 155 L 385 178" stroke="#334155" strokeWidth="4" fill="none" />
      <path d="M 455 205 L 385 215" stroke="#0f172a" strokeWidth="3.5" fill="none" />

      {/* Cloud Wi-Fi Telemetry Signal */}
      <line x1="518" y1="172" x2="565" y2="188" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
      <g transform="translate(558, 152)">
        <path d="M22,52 H74 A18,18 0 0,0 76,17 A24,24 0 0,0 28,10 A20,20 0 0,0 10,30 A15,15 0 0,0 22,52 Z" fill="rgba(14,116,144,0.28)" stroke="#38bdf8" strokeWidth="1.6" />
        <path d="M35,40 a16,16 0 0,1 24,0" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M40,46 a10,10 0 0,1 14,0" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="52" r="3" fill="#22d3ee" />
      </g>
      {/* 2. 3D Toilet Cistern Tank with Cutaway Flush Mechanism */}
      <path d="M 280 164 L 368 156 L 382 162 L 382 305 L 280 312 Z" fill="url(#ceramic3D)" stroke="#94a3b8" strokeWidth="1.8" />
      <ellipse cx="331" cy="160" rx="51" ry="9" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <ellipse cx="332" cy="159" rx="12" ry="3.5" fill="#38bdf8" />
      {/* Cutaway Interior of Tank Showing Automatic Flush Valve */}
      <rect x="288" y="174" width="54" height="126" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1.8" />
      <rect x="292" y="218" width="46" height="80" rx="3" fill="rgba(2,132,199,0.45)" />
      {/* Flush Valve Solenoid & Vertical Riser Pipe */}
      <rect x="299" y="182" width="32" height="42" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
      <rect x="303" y="192" width="24" height="14" rx="2" fill="#0284c7" />
      <rect x="308" y="224" width="14" height="76" fill={flowColor} />
      {/* Downward Glowing Arrow Inside Tank Valve */}
      <polygon points="315,268 309,254 313,254 313,238 317,238 317,254 321,254" fill={brightFlow} />
      {/* 3D Raised Toilet Lid & Ceramic Bowl Body */}
      <ellipse cx="374" cy="226" rx="36" ry="86" transform="rotate(-7 374 226)" fill="url(#ceramicSide)" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="379" cy="228" rx="28" ry="76" transform="rotate(-7 379 228)" fill="#f8fafc" />
      {/* Lower Pedestal & Sculpted 3D Bowl Outer Shell */}
      <path d="M 284 308 L 350 308 L 350 438 L 495 442 C 524 405, 545 345, 542 282 L 358 280 Z" fill="url(#ceramic3D)" stroke="#94a3b8" strokeWidth="2" />
      {/* Upper Seat Rim & Glowing Inner Rim Water */}
      <ellipse cx="448" cy="282" rx="96" ry="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="448" cy="283" rx="72" ry="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" />
      <ellipse cx="448" cy="285" rx="58" ry="10" fill="#38bdf8" opacity="0.65" />

      {/* Lower Trapway Glowing Water Channel */}
      <path d="M 405 395 L 405 436 L 442 436 L 442 395 Z" fill={flowColor} opacity="0.85" />
      {/* Glowing Cutaway Bowl Chamber with Rotating 3D Vortex Arrows */}
      <g transform="translate(446, 355)">
        <circle r="62" fill="url(#bowlWater3D)" stroke="#38bdf8" strokeWidth="3" />
        <circle r="52" fill="none" stroke="#67e8f9" strokeWidth="1.2" opacity="0.5" />
        <g className={isFlushing ? 'animate-bowl-swirl' : isPreFlush ? 'animate-bowl-refill' : ''}>
          <path d="M -38 -14 A 40 40 0 1 1 30 28" stroke={brightFlow} strokeWidth="5.5" fill="none" strokeLinecap="round" />
          <polygon points="35,20 30,36 18,25" fill={brightFlow} />
          <path d="M 38 14 A 40 40 0 1 1 -30 -28" stroke="#38bdf8" strokeWidth="5" fill="none" strokeLinecap="round" />
          <polygon points="-35,-20 -30,-36 -18,-25" fill="#38bdf8" />
          <circle r="18" fill="none" stroke="#e0f2fe" strokeWidth="2.5" strokeDasharray="10 7" />
        </g>
      </g>

      {/* 3D Supply Pipeline & Glowing Flow Arrows */}
      <path d="M 0 478 L 312 405 C 336 398, 342 380, 342 348 L 315 292" stroke="url(#pipeMetal)" strokeWidth="34" fill="none" strokeLinecap="round" />
      <path d="M 0 478 L 312 405 C 336 398, 342 380, 342 348 L 315 292" stroke={flowColor} strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M 0 478 L 312 405 C 336 398, 342 380, 342 348 L 315 292" stroke={brightFlow} strokeWidth="4" fill="none" className={waterActive ? 'animate-pipe-flow' : ''} />
      {/* Directional Glowing Arrows Along Supply Pipe */}
      <g className={waterActive ? 'animate-arrow-flow' : ''} fill={brightFlow}>
        <polygon points="42,465 68,459 65,453 82,460 69,471 69,465 44,471" />
        <polygon points="108,450 134,444 131,438 148,445 135,456 135,450 110,456" />
        <polygon points="172,435 198,429 195,423 212,430 199,441 199,435 174,441" />
        <polygon points="274,411 296,406 293,400 308,407 297,417 297,411 276,416" />
      </g>

      {/* 3. Inline 3D Water Flow Sensor Module on Supply Pipe */}
      <g transform="translate(215, 396) rotate(-13)">
        <rect x="0" y="0" width="58" height="44" rx="9" fill="#0f172a" stroke={isLeaking ? '#f43f5e' : '#38bdf8'} strokeWidth="2.5" />
        <rect x="8" y="12" width="42" height="20" rx="4" fill="#0284c7" stroke="#67e8f9" strokeWidth="1" />
        <text x="29" y="26" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
          {unit.currentFlowRate.toFixed(1)}L
        </text>
      </g>

      {/* Thin Cyan Connection Lines & Glowing Anchor Dots */}
      <g stroke="#22d3ee" strokeWidth="1.8" fill="none">
        <polyline points="222,59 301,59" /><circle cx="301" cy="59" r="4.5" fill="#22d3ee" />
        <polyline points="222,208 262,208 292,232" /><circle cx="292" cy="232" r="4.5" fill="#22d3ee" />
        <polyline points="212,355 232,355 238,396" /><circle cx="238" cy="396" r="4.5" fill="#22d3ee" />
        <polyline points="590,62 542,62 505,110" /><circle cx="505" cy="110" r="4.5" fill="#22d3ee" />
        <polyline points="590,285 545,285 505,235" /><circle cx="505" cy="235" r="4.5" fill="#22d3ee" />
      </g>
    </svg>
  );
}
