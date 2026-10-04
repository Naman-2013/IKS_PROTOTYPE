import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

export default function Header({
  isDarkMode,
  setIsDarkMode,
  isAudioMuted,
  setIsAudioMuted,
  isSimulating,
  windSpeed,
  bladeRPM
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#fefae0]/85 dark:bg-[#1b2612]/90 border-b border-[#7a9a3b]/20 dark:border-[#90b348]/20 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand Text Only - Removed logo as requested */}
        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#233217] dark:text-[#fefae0]">
            Meadow Windmill
          </h1>
          <p className="text-xs text-[#557327] dark:text-[#a5c9be] hidden sm:block">
            Interactive Wind & Motion Simulation
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 px-3 py-1 rounded-full bg-[#f4f8d3]/80 dark:bg-[#28381c]/80 border border-[#7a9a3b]/25 dark:border-[#90b348]/25 text-xs font-mono text-[#3d5225] dark:text-[#d2e2c5]">
          <span className="flex items-center gap-1.5 font-sans font-medium">
            <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-[#7a9a3b]' : 'bg-stone-400'}`} />
            <span>{isSimulating ? 'Running' : 'Paused'}</span>
          </span>
          <span className="text-stone-300 dark:text-stone-600">/</span>
          <span>{windSpeed} km/h • {bladeRPM} RPM</span>
        </div>

        {/* Right Actions: Sound & Theme */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all flex items-center justify-center ${
              !isAudioMuted
                ? 'bg-[#7a9a3b] text-[#fefae0] border-[#7a9a3b]'
                : 'bg-[#fefae0] dark:bg-[#233217] border-[#7a9a3b]/30 text-[#557327] dark:text-[#d2e2c5]'
            }`}
            title={isAudioMuted ? 'Turn on gentle wind sound' : 'Mute sound'}
            aria-label="Toggle wind sound"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Mode */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 sm:p-2 rounded-xl border border-[#7a9a3b]/30 bg-[#fefae0] dark:bg-[#233217] text-[#3d5225] dark:text-[#fefae0] transition-all flex items-center justify-center"
            title={isDarkMode ? 'Switch to Day Light' : 'Switch to Evening Shade'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#557327]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
