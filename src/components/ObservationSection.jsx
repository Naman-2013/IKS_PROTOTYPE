import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { Table, TrendingUp, Download, RefreshCw, Trash2 } from 'lucide-react';

export default function ObservationSection({
  observations,
  setObservations,
  windSpeed,
  bladeRPM,
  isDarkMode
}) {
  const chartData = [
    { windSpeed: 0, rpm: 0 },
    { windSpeed: 10, rpm: 13 },
    { windSpeed: 20, rpm: 27 },
    { windSpeed: 25, rpm: 33 },
    { windSpeed: 40, rpm: 53 },
    { windSpeed: 50, rpm: 67 },
    { windSpeed: 60, rpm: 80 },
    { windSpeed: 70, rpm: 93 },
    { windSpeed: 80, rpm: 107 },
    { windSpeed: 90, rpm: 120 },
    { windSpeed: 100, rpm: 133 },
  ];

  // Custom Warm Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-[#fefae0] dark:bg-[#1b2612] border border-[#7a9a3b]/40 text-[#233217] dark:text-[#fefae0] shadow-md font-mono text-xs">
          <div className="font-bold text-[#557327] dark:text-[#a5c9be] mb-1">
            Wind: {data.windSpeed} km/h
          </div>
          <div>Blade Speed: <span className="font-bold">{data.rpm} RPM</span></div>
        </div>
      );
    }
    return null;
  };

  const exportCSV = () => {
    const headers = 'Test No,Wind Level,Wind Speed (km/h),Blade Speed (RPM),Observation\n';
    const rows = observations
      .map(
        (o) =>
          `"${o.id}","${o.source}","${o.speed}","${o.rpm}","${o.observation.replace(/"/g, '""')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'windmill_observations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetDefaultObservations = () => {
    setObservations([
      { id: 'Run 1', source: 'Calm', speed: 0, rpm: 0, observation: 'No wind. Sails are at rest.' },
      { id: 'Run 2', source: 'Breeze', speed: 25, rpm: 33, observation: 'Gentle breeze begins turning the sails slowly.' },
      { id: 'Run 3', source: 'Windy', speed: 60, rpm: 80, observation: 'Smooth, steady rotation under continuous wind.' },
      { id: 'Run 4', source: 'Gale', speed: 90, rpm: 120, observation: 'Fast rotation with full wind force across the sails.' },
    ]);
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#557327] dark:text-[#a5c9be] mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Field Observations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#233217] dark:text-[#fefae0]">
            Wind Speed vs. Blade Rotation
          </h2>
          <p className="text-xs sm:text-sm text-[#557327] dark:text-[#a5c9be] mt-0.5">
            Recorded tests showing how wind velocity changes how fast the windmill turns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaultObservations}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-[#fefae0] dark:bg-[#1b2612] border border-[#7a9a3b]/30 text-[#3d5225] dark:text-[#d2e2c5] hover:border-[#7a9a3b] transition-all"
            title="Reset default runs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-[#7a9a3b] hover:bg-[#6c8b32] text-[#fefae0] transition-all shadow-sm"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Grid: Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Recharts Area Chart in Art Greens */}
        <div className="lg:col-span-5 bento-card p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#233217] dark:text-[#fefae0]">
                Wind Speed vs Blade Rotation
              </h3>
              <p className="text-[11px] font-mono text-[#557327] dark:text-[#a5c9be]">
                Wind (km/h) against Blade Speed (RPM)
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#7a9a3b]">
              Speed Curve
            </span>
          </div>

          <div className="w-full h-64 sm:h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 12, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="artGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7a9a3b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7a9a3b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDarkMode ? 'rgba(122, 154, 59, 0.15)' : 'rgba(122, 154, 59, 0.2)'}
                />

                <XAxis
                  dataKey="windSpeed"
                  tickLine={false}
                  stroke={isDarkMode ? '#8fae46' : '#557327'}
                  tick={{ fontSize: 10, fontFamily: 'Space Mono' }}
                  unit=" km/h"
                />

                <YAxis
                  tickLine={false}
                  stroke={isDarkMode ? '#8fae46' : '#557327'}
                  tick={{ fontSize: 10, fontFamily: 'Space Mono' }}
                  unit=" rpm"
                  domain={[0, 140]}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="rpm"
                  stroke="#7a9a3b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#artGreenGrad)"
                />

                <ReferenceDot
                  x={windSpeed}
                  y={bladeRPM}
                  r={5}
                  fill="#557327"
                  stroke="#fefae0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-[#7a9a3b]/20 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#557327] dark:text-[#a5c9be]">Current Point:</span>
            <span className="font-bold text-[#233217] dark:text-[#fefae0]">
              {windSpeed} km/h ➔ {bladeRPM} RPM
            </span>
          </div>
        </div>

        {/* Observation Table */}
        <div className="lg:col-span-7 bento-card p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#7a9a3b]/15 text-[#557327] dark:text-[#a5c9be]">
                <Table className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#233217] dark:text-[#fefae0]">
                  Observation Table
                </h3>
                <p className="text-[11px] font-mono text-[#557327] dark:text-[#a5c9be]">
                  Recorded test cases & observations
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#f4f8d3] dark:bg-[#28381c] text-[#3d5225] dark:text-[#d2e2c5] border border-[#7a9a3b]/20">
              {observations.length} rows
            </span>
          </div>

          <div className="w-full overflow-x-auto my-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#7a9a3b]/20 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#557327] dark:text-[#a5c9be]">
                  <th className="py-2.5 px-3 font-semibold">Test No.</th>
                  <th className="py-2.5 px-3 font-semibold">Wind Source</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Wind Speed</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Blade Rotation</th>
                  <th className="py-2.5 px-3 font-semibold">Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7a9a3b]/10 text-xs">
                {observations.map((item, idx) => (
                  <tr
                    key={item.id + idx}
                    className="hover:bg-[#7a9a3b]/10 transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#7a9a3b] whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-3 px-3 font-medium text-[#233217] dark:text-[#fefae0] whitespace-nowrap">
                      {item.source}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-[#557327] dark:text-[#a5c9be] whitespace-nowrap">
                      {item.speed} km/h
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#233217] dark:text-[#fefae0] whitespace-nowrap">
                      {item.rpm} RPM
                    </td>
                    <td className="py-3 px-3 text-[11px] sm:text-xs text-[#3d5225] dark:text-[#d2e2c5] leading-snug">
                      {item.observation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-3 border-t border-[#7a9a3b]/20 flex items-center justify-between text-[11px] text-[#557327] dark:text-[#a5c9be]">
            <span className="font-mono">Use "Save Current Reading" to add new rows.</span>
            {observations.length > 4 && (
              <button
                onClick={() => setObservations(observations.slice(0, 4))}
                className="text-[#b56743] hover:underline font-mono text-[10px] flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear Added
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
