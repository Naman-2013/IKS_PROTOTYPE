import React from 'react';
import { Play, Square, RotateCcw, Sliders, PlusCircle, Wind } from 'lucide-react';

export default function SimulationControls({
  windSpeed,
  setWindSpeed,
  isSimulating,
  setIsSimulating,
  onReset,
  onAddObservation,
}) {
  const presets = [
    { label: 'Calm', value: 0, sub: '0 km/h' },
    { label: 'Breeze', value: 25, sub: '25 km/h' },
    { label: 'Windy', value: 60, sub: '60 km/h' },
    { label: 'Gale', value: 90, sub: '90 km/h' },
  ];

  return (
    <div className="bento-card p-3.5 sm:p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#7a9a3b]/15 text-[#557327] dark:text-[#a5c9be] border border-[#7a9a3b]/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#233217] dark:text-[#fefae0]">
              Wind Controls
            </h3>
            <p className="text-[11px] text-[#557327] dark:text-[#a5c9be]">
              Adjust velocity & experiment
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f4f8d3] dark:bg-[#28381c] text-[#3d5225] dark:text-[#d2e2c5] border border-[#7a9a3b]/20">
          Manual
        </span>
      </div>

      {/* Slider */}
      <div className="my-auto py-1">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="art-wind-slider"
            className="text-xs font-semibold text-[#233217] dark:text-[#fefae0] flex items-center gap-1 cursor-pointer"
          >
            <Wind className="w-3.5 h-3.5 text-[#7a9a3b]" />
            <span>Velocity</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min="0"
              max="100"
              value={windSpeed}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setWindSpeed(val);
              }}
              className="w-12 px-1 py-0.5 text-center text-xs font-mono font-bold rounded-md bg-[#fefae0] dark:bg-[#1b2612] border border-[#7a9a3b]/30 text-[#233217] dark:text-[#fefae0]"
            />
            <span className="text-[11px] font-mono text-[#557327] dark:text-[#a5c9be]">km/h</span>
          </div>
        </div>

        <input
          id="art-wind-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={windSpeed}
          onChange={(e) => setWindSpeed(Number(e.target.value))}
          className="w-full focus:outline-none"
        />

        <div className="flex justify-between text-[10px] font-mono text-[#557327] dark:text-[#a5c9be] mt-1 px-0.5">
          <span>0 (Calm)</span>
          <span>50 km/h</span>
          <span>100 (Gale)</span>
        </div>
      </div>

      {/* Presets */}
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-1.5">
          {presets.map((preset) => {
            const isActive = windSpeed === preset.value;
            return (
              <button
                key={preset.label}
                onClick={() => setWindSpeed(preset.value)}
                className={`py-1.5 px-1 rounded-xl text-center border transition-all ${
                  isActive
                    ? 'bg-[#7a9a3b] text-[#fefae0] border-[#7a9a3b] shadow-sm font-semibold'
                    : 'bg-[#f4f8d3]/60 dark:bg-[#1b2612]/60 border-[#7a9a3b]/20 text-[#3d5225] dark:text-[#d2e2c5] hover:border-[#7a9a3b]/50'
                }`}
              >
                <div className="text-[11px] leading-tight">{preset.label}</div>
                <div className={`text-[9px] font-mono ${isActive ? 'text-[#fefae0]/80' : 'text-stone-400'}`}>
                  {preset.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2.5 pt-2 border-t border-[#7a9a3b]/20">
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setIsSimulating(true)}
            disabled={isSimulating}
            className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl font-medium text-xs transition-all ${
              isSimulating
                ? 'bg-[#7a9a3b]/20 text-[#557327] dark:text-[#a5c9be] border border-[#7a9a3b]/30 opacity-70'
                : 'bg-[#7a9a3b] hover:bg-[#6c8b32] text-[#fefae0] shadow-sm'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Start</span>
          </button>

          <button
            onClick={() => setIsSimulating(false)}
            disabled={!isSimulating}
            className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl font-medium text-xs transition-all ${
              !isSimulating
                ? 'bg-[#b56743]/20 text-[#874323] border border-[#b56743]/30 opacity-70'
                : 'bg-[#b56743] hover:bg-[#9e5533] text-white shadow-sm'
            }`}
          >
            <Square className="w-3 h-3 fill-current" />
            <span>Stop</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl font-medium text-xs bg-[#f4f8d3]/80 hover:bg-[#eef3c8] dark:bg-[#28381c] border border-[#7a9a3b]/20 text-[#3d5225] dark:text-[#d2e2c5]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <button
          onClick={onAddObservation}
          className="w-full mt-1.5 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-medium text-xs bg-[#557327] hover:bg-[#46601f] text-[#fefae0] shadow-sm"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Save Reading to Table</span>
        </button>
      </div>
    </div>
  );
}
