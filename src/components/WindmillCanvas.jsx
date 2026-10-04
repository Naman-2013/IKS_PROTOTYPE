import React, { useState, useEffect, useRef } from 'react';
import { Wind, Info } from 'lucide-react';

export default function WindmillCanvas({
  windSpeed,
  bladeRPM,
  isSimulating,
  isDarkMode
}) {
  const [selectedPart, setSelectedPart] = useState(null);
  const [showBreeze, setShowBreeze] = useState(true);
  const rotorRef = useRef(null);

  // Center coordinate of windmill rotor hub
  const cx = 200;
  const cy = 125;

  // Rock-solid 60-120fps rotation via direct requestAnimationFrame
  useEffect(() => {
    let angle = 0;
    let lastTime = performance.now();
    let animId;

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isSimulating && bladeRPM > 0) {
        // Revolutions per second * 360 = degrees per second
        const degPerSec = (bladeRPM / 60) * 360;
        angle = (angle + degPerSec * dt) % 360;
        if (rotorRef.current) {
          rotorRef.current.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isSimulating, bladeRPM]);

  const duration = isSimulating && bladeRPM > 0 ? (60 / bladeRPM).toFixed(2) : 0;

  return (
    <div className="bento-card p-3 sm:p-4 flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#7a9a3b]/15 text-[#557327] dark:text-[#a5c9be] border border-[#7a9a3b]/20">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#233217] dark:text-[#fefae0]">
              Windmill in the Meadow
            </h2>
            <p className="text-[11px] text-[#557327] dark:text-[#a5c9be]">
              Interactive Rotor Simulation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xs:flex items-center gap-2 text-xs font-mono text-[#557327] dark:text-[#a5c9be]">
            <span>Speed: <strong className="text-[#233217] dark:text-[#fefae0]">{bladeRPM} RPM</strong></span>
            <span>•</span>
            <span>Turn: <strong className="text-[#233217] dark:text-[#fefae0]">{duration > 0 ? `${duration}s` : 'At rest'}</strong></span>
          </div>

          <button
            onClick={() => setShowBreeze(!showBreeze)}
            className={`px-2.5 py-0.5 text-xs font-medium rounded-lg border transition-all ${
              showBreeze
                ? 'bg-[#7a9a3b] text-[#fefae0] border-[#7a9a3b]'
                : 'bg-[#fefae0] dark:bg-[#1b2612] border-[#7a9a3b]/30 text-[#557327] dark:text-[#a5c9be]'
            }`}
          >
            Trails: {showBreeze ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full flex-1 flex items-center justify-center h-[210px] sm:h-[240px] md:h-[260px] select-none rounded-xl overflow-hidden bg-gradient-to-b from-[#8eb5a8] via-[#a0c5b8] to-[#92b7aa] border border-[#7a9a3b]/25 shadow-inner">
        
        {/* Soft Background Clouds */}
        <div className="absolute top-2 left-6 opacity-80 pointer-events-none">
          <svg width="140" height="65" viewBox="0 0 140 65" fill="none">
            <ellipse cx="45" cy="40" rx="35" ry="22" fill="#fefae0" />
            <ellipse cx="80" cy="32" rx="30" ry="24" fill="#fefae0" />
            <ellipse cx="60" cy="22" rx="24" ry="18" fill="#ffffff" />
            <ellipse cx="105" cy="44" rx="24" ry="16" fill="#fefae0" />
            <ellipse cx="60" cy="45" rx="45" ry="12" fill="#dce9cf" />
          </svg>
        </div>

        <div className="absolute top-4 right-8 opacity-75 pointer-events-none">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <ellipse cx="40" cy="38" rx="28" ry="18" fill="#fefae0" />
            <ellipse cx="70" cy="32" rx="26" ry="20" fill="#fefae0" />
            <ellipse cx="55" cy="22" rx="20" ry="15" fill="#ffffff" />
            <ellipse cx="55" cy="42" rx="35" ry="12" fill="#dce9cf" />
          </svg>
        </div>

        {/* Dynamic Wind Trails */}
        {showBreeze && isSimulating && windSpeed > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[45, 90, 135, 180, 220].map((yPos, i) => {
              const speedFactor = Math.max(0.7, 3.2 - (windSpeed / 100) * 2.5);
              return (
                <div
                  key={i}
                  className="absolute left-0 w-full"
                  style={{ top: `${yPos}px` }}
                >
                  <div
                    className="w-24 h-1 rounded-full bg-[#fefae0]/70"
                    style={{
                      animation: `windFloat ${speedFactor * (1 + i * 0.18)}s linear infinite`,
                      animationDelay: `${i * 0.4}s`
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Windmill SVG Scene */}
        <svg
          viewBox="0 0 400 320"
          className="w-full h-full max-h-[260px] overflow-visible relative z-10"
        >
          <defs>
            <linearGradient id="millTowerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f4ede2" />
              <stop offset="45%" stopColor="#fdfbf7" />
              <stop offset="100%" stopColor="#dfd5c4" />
            </linearGradient>

            <linearGradient id="millRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b56743" />
              <stop offset="100%" stopColor="#874323" />
            </linearGradient>

            <linearGradient id="millSailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdfcf5" />
              <stop offset="60%" stopColor="#f5efe0" />
              <stop offset="100%" stopColor="#e3d8be" />
            </linearGradient>
          </defs>

          {/* Rolling Green Hill slope */}
          <path
            d="M -20 250 Q 140 210 420 245 L 420 330 L -20 330 Z"
            fill="#7a9a3b"
          />
          <path
            d="M -20 280 Q 180 250 420 285 L 420 330 L -20 330 Z"
            fill="#557327"
          />

          {/* Pasture Flowers */}
          <circle cx="85" cy="265" r="2.5" fill="#fefae0" />
          <circle cx="95" cy="272" r="2" fill="#f4f8d3" />
          <circle cx="285" cy="270" r="2.5" fill="#fefae0" />
          <circle cx="325" cy="285" r="2.5" fill="#fefae0" />

          {/* Windmill Base */}
          <ellipse cx="200" cy="285" rx="34" ry="10" fill="#586c47" />

          {/* Windmill Tower Body */}
          <polygon
            points="188,135 212,135 224,282 176,282"
            fill="url(#millTowerGrad)"
            stroke="#655b4b"
            strokeWidth="1.5"
            className="cursor-pointer"
            onClick={() => setSelectedPart('Windmill Tower: Traditional stone and timber architecture.')}
          />
          <path d="M 185 185 L 215 185" stroke="#877561" strokeWidth="1.5" />
          <path d="M 181 235 L 219 235" stroke="#877561" strokeWidth="1.5" />
          <rect x="195" y="195" width="10" height="15" rx="4" fill="#3d5225" stroke="#877561" strokeWidth="0.8" />
          <path d="M 195 282 L 195 258 Q 200 252 205 258 L 205 282 Z" fill="#6d4c38" stroke="#483325" strokeWidth="1" />

          {/* Roof Cap */}
          <path
            d="M 180,135 Q 200,112 220,135 Z"
            fill="url(#millRoofGrad)"
            stroke="#5c2d17"
            strokeWidth="1.5"
            className="cursor-pointer"
            onClick={() => setSelectedPart('Cap: Turnable timber roof holding the main drive axle.')}
          />

          {/* ROTOR BLADES - Direct DOM animation via rotorRef */}
          <g
            ref={rotorRef}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedPart('Rotor Sails: Traditional sailcloth blades rotating in the meadow breeze.')}
          >
            {/* 4 Sails at 0, 90, 180, 270 degrees */}
            {[0, 90, 180, 270].map((angle) => (
              <g key={`sail-${angle}`} transform={`rotate(${angle} ${cx} ${cy})`}>
                {/* Main Wooden Arm */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx}
                  y2={cy - 96}
                  stroke="#573e27"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Sailcloth Canvas Sheet */}
                <path
                  d={`
                    M ${cx + 2.5} ${cy - 18}
                    L ${cx + 17} ${cy - 22}
                    L ${cx + 14} ${cy - 92}
                    L ${cx + 2.5} ${cy - 94}
                    Z
                  `}
                  fill="url(#millSailGrad)"
                  stroke="#7c6953"
                  strokeWidth="1.2"
                />

                {/* Wooden lattice cross ribs */}
                <line x1={cx + 2.5} y1={cy - 34} x2={cx + 16} y2={cy - 36} stroke="#7c6953" strokeWidth="0.8" />
                <line x1={cx + 2.5} y1={cy - 50} x2={cx + 15} y2={cy - 52} stroke="#7c6953" strokeWidth="0.8" />
                <line x1={cx + 2.5} y1={cy - 66} x2={cx + 14.5} y2={cy - 68} stroke="#7c6953" strokeWidth="0.8" />
                <line x1={cx + 2.5} y1={cy - 82} x2={cx + 14} y2={cy - 84} stroke="#7c6953" strokeWidth="0.8" />
              </g>
            ))}

            {/* Central Wooden Hub */}
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="#573e27"
              stroke="#3a2717"
              strokeWidth="2"
            />
            <circle
              cx={cx}
              cy={cy}
              r="4.5"
              fill="#c27d48"
            />
            <circle
              cx={cx}
              cy={cy}
              r="1.5"
              fill="#fefae0"
            />
          </g>
        </svg>

        {/* Selected Part Tooltip */}
        {selectedPart && (
          <div className="absolute bottom-2 inset-x-2 p-2.5 rounded-xl bg-[#fefae0]/95 dark:bg-[#1b2612]/95 border border-[#7a9a3b]/40 text-[#233217] dark:text-[#fefae0] text-xs flex items-center justify-between gap-2 shadow-md z-20">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#7a9a3b] shrink-0" />
              <p>{selectedPart}</p>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-[#7a9a3b] hover:text-[#557327] font-bold px-1.5"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes windFloat {
          0% { transform: translateX(-120px); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(450px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
