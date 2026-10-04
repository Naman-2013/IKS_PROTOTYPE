import React from 'react';
import { Wind } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#7a9a3b]/20 py-8 text-xs font-mono text-[#557327] dark:text-[#a5c9be]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#7a9a3b]" />
          <span className="font-semibold text-[#233217] dark:text-[#fefae0] font-sans">
            Meadow Windmill
          </span>
          <span>• Interactive Educational Simulation</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <span>Clean Kinetic Energy</span>
          <span>•</span>
          <span>Zero Emissions</span>
          <span>•</span>
          <span>Renewable Wind Power</span>
        </div>
      </div>
    </footer>
  );
}
