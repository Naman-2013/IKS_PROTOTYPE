import React from 'react';
import { Gauge, Wind, Zap, Compass } from 'lucide-react';

export default function TelemetryPanel({
  windSpeed,
  bladeRPM,
  isSimulating
}) {
  const getBreezeState = () => {
    if (!isSimulating) return { title: 'Paused', note: 'Brake applied; sails are resting.' };
    if (windSpeed === 0) return { title: 'Calm', note: 'No breeze; sails are motionless.' };
    if (windSpeed <= 30) return { title: 'Gentle Breeze', note: 'Light airflow slowly turning sails.' };
    if (windSpeed <= 70) return { title: 'Steady Wind', note: 'Ideal working wind with steady turning force.' };
    if (windSpeed <= 89) return { title: 'Fresh Gale', note: 'Strong wind turning blades briskly.' };
    return { title: 'High Wind', note: 'Fast rotation under strong wind.' };
  };

  const getMotionDescription = () => {
    if (!isSimulating) return 'Brake Engaged';
    if (windSpeed === 0) return 'Stationary';
    if (windSpeed <= 30) return 'Slow Rotation';
    if (windSpeed <= 70) return 'Smooth Working Spin';
    if (windSpeed <= 89) return 'Brisk Turning';
    return 'Rapid Rotation';
  };

  const powerOutputKW = !isSimulating || windSpeed === 0
    ? 0
    : Math.min(2400, Math.round(Math.pow(windSpeed / 100, 2.7) * 2400));

  const breeze = getBreezeState();
  const motionDesc = getMotionDescription();

  return (
    <div className="bento-card p-3.5 sm:p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#7a9a3b]/15 text-[#557327] dark:text-[#a5c9be] border border-[#7a9a3b]/20">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#233217] dark:text-[#fefae0]">
              Live Readings
            </h3>
            <p className="text-[11px] text-[#557327] dark:text-[#a5c9be]">
              Velocity & rotation telemetry
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#f4f8d3] dark:bg-[#28381c] text-[#3d5225] dark:text-[#d2e2c5] text-[10px] font-mono border border-[#7a9a3b]/20">
          Active
        </span>
      </div>

      {/* Dual Big Readouts */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#f4f8d3]/50 dark:bg-[#1b2612]/70 border border-[#7a9a3b]/20">
          <div className="flex items-center justify-between text-[#557327] dark:text-[#a5c9be] text-[11px] font-medium mb-0.5">
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              Wind
            </span>
            <span className="text-[10px] font-mono">{windSpeed}%</span>
          </div>

          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#233217] dark:text-[#fefae0]">
              {windSpeed}
            </span>
            <span className="text-xs font-mono text-[#557327] dark:text-[#a5c9be]">
              km/h
            </span>
          </div>

          <div className="w-full bg-[#d8e5c8] dark:bg-[#28381c] rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-[#7a9a3b] h-full rounded-full transition-all duration-200"
              style={{ width: `${windSpeed}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-[#f4f8d3]/50 dark:bg-[#1b2612]/70 border border-[#7a9a3b]/20">
          <div className="flex items-center justify-between text-[#557327] dark:text-[#a5c9be] text-[11px] font-medium mb-0.5">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3" />
              Blades
            </span>
            <span className="text-[10px] font-mono">{bladeRPM > 80 ? 'Fast' : bladeRPM > 30 ? 'Normal' : 'Slow'}</span>
          </div>

          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#7a9a3b] dark:text-[#90b348]">
              {bladeRPM}
            </span>
            <span className="text-xs font-mono text-[#557327] dark:text-[#a5c9be]">
              RPM
            </span>
          </div>

          <div className="w-full bg-[#d8e5c8] dark:bg-[#28381c] rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-[#90b348] h-full rounded-full transition-all duration-200"
              style={{ width: `${Math.min(100, Math.round((bladeRPM / 133) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Condition & Motion */}
      <div className="grid grid-cols-2 gap-2 mt-2.5">
        <div className="p-2 rounded-xl bg-[#fefae0]/70 dark:bg-[#172214]/70 border border-[#7a9a3b]/15">
          <div className="text-[10px] uppercase font-mono text-[#557327] dark:text-[#a5c9be]">Condition</div>
          <div className="text-xs font-bold text-[#233217] dark:text-[#fefae0] mt-0.5 truncate">{breeze.title}</div>
          <p className="text-[10px] text-[#557327] dark:text-[#a5c9be] truncate">{breeze.note}</p>
        </div>

        <div className="p-2 rounded-xl bg-[#fefae0]/70 dark:bg-[#172214]/70 border border-[#7a9a3b]/15">
          <div className="text-[10px] uppercase font-mono text-[#557327] dark:text-[#a5c9be]">Movement</div>
          <div className="text-xs font-bold text-[#233217] dark:text-[#fefae0] mt-0.5 truncate">{motionDesc}</div>
          <p className="text-[10px] text-[#557327] dark:text-[#a5c9be] truncate">
            {isSimulating && windSpeed > 0 ? `${(60 / bladeRPM).toFixed(1)}s per turn` : 'Motionless'}
          </p>
        </div>
      </div>

      {/* Power Generated */}
      <div className="mt-2.5 pt-2 border-t border-[#7a9a3b]/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#557327] dark:text-[#a5c9be]">
          <Zap className="w-3.5 h-3.5 text-[#7a9a3b]" />
          <span className="text-[11px]">Estimated Power:</span>
        </div>
        <div className="font-mono font-bold text-xs text-[#233217] dark:text-[#fefae0]">
          {powerOutputKW} <span className="text-[10px] font-normal text-stone-500">kW</span>
        </div>
      </div>
    </div>
  );
}
