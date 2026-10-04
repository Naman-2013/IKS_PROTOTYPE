import React, { useState } from 'react';
import { Scale, Zap } from 'lucide-react';

export default function ComparisonTable() {
  const [activeTab, setActiveTab] = useState('all');

  const comparisonData = [
    {
      attribute: 'Main Purpose',
      traditional: 'Grinding flour, sawing timber, and pumping water from low fields.',
      modern: 'Generating electricity for thousands of homes and regional power networks.',
    },
    {
      attribute: 'Building Materials',
      traditional: 'Oak timbers, brick foundations, forged iron nails, and cotton sailcloth.',
      modern: 'High-strength steel towers, fiberglass composites, and copper windings.',
    },
    {
      attribute: 'Size & Height',
      traditional: 'Usually 10 to 20 meters tall; blades sweep a small courtyard area.',
      modern: 'Often 100 to 150 meters tall; blade diameter can exceed a football field.',
    },
    {
      attribute: 'Energy Output',
      traditional: 'Roughly 5 to 30 kilowatts of direct mechanical turning power.',
      modern: 'Up to 2,000 to 8,000 kilowatts (2 to 8 MW) of clean electricity.',
    },
    {
      attribute: 'Blade Design',
      traditional: 'Four wide wooden lattice arms covered in unfurled canvas cloth.',
      modern: 'Three aerodynamically shaped blades designed like glider wings.',
    },
    {
      attribute: 'Facing the Wind',
      traditional: 'Turned by hand or with a rear fantail wheel as wind direction shifted.',
      modern: 'Computerized wind sensors automatically swivel the turbine into the breeze.',
    },
  ];

  return (
    <section className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#557327] dark:text-[#a5c9be] mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Comparison</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#233217] dark:text-[#fefae0]">
            Traditional Windmills vs. Modern Turbines
          </h2>
          <p className="text-xs sm:text-sm text-[#557327] dark:text-[#a5c9be] mt-0.5">
            How windmill engineering evolved from historic flour mills to modern clean power generators.
          </p>
        </div>

        {/* Mobile View Selector */}
        <div className="flex sm:hidden items-center p-1 rounded-xl bg-[#f4f8d3] dark:bg-[#1b2612] border border-[#7a9a3b]/20 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-[#7a9a3b] text-[#fefae0]'
                : 'text-[#557327] dark:text-[#a5c9be]'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'traditional'
                ? 'bg-[#7a9a3b] text-[#fefae0]'
                : 'text-[#557327] dark:text-[#a5c9be]'
            }`}
          >
            Traditional
          </button>
          <button
            onClick={() => setActiveTab('modern')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'modern'
                ? 'bg-[#7a9a3b] text-[#fefae0]'
                : 'text-[#557327] dark:text-[#a5c9be]'
            }`}
          >
            Modern
          </button>
        </div>
      </div>

      {/* Comparison Bento Card */}
      <div className="bento-card p-0 sm:p-2">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-[#7a9a3b]/20">
                <th className="py-4 px-4 sm:px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#557327] dark:text-[#a5c9be] w-1/4">
                  Feature
                </th>
                <th className={`py-4 px-4 sm:px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#3d5225] dark:text-[#d2e2c5] w-[37.5%] ${
                  activeTab === 'modern' ? 'hidden sm:table-cell' : ''
                }`}>
                  Traditional Windmill
                </th>
                <th className={`py-4 px-4 sm:px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#233217] dark:text-[#fefae0] w-[37.5%] bg-[#7a9a3b]/10 dark:bg-[#7a9a3b]/15 border-l border-r border-[#7a9a3b]/20 ${
                  activeTab === 'traditional' ? 'hidden sm:table-cell' : ''
                }`}>
                  Modern Wind Turbine
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7a9a3b]/10 text-xs sm:text-sm">
              {comparisonData.map((row) => (
                <tr
                  key={row.attribute}
                  className="hover:bg-[#7a9a3b]/5 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#233217] dark:text-[#fefae0] text-xs font-mono">
                    {row.attribute}
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-[#3d5225] dark:text-[#d2e2c5] leading-relaxed ${
                    activeTab === 'modern' ? 'hidden sm:table-cell' : ''
                  }`}>
                    {row.traditional}
                  </td>
                  <td className={`py-3.5 px-4 sm:px-6 text-[#233217] dark:text-[#fefae0] font-medium leading-relaxed bg-[#7a9a3b]/10 dark:bg-[#7a9a3b]/15 border-l border-r border-[#7a9a3b]/20 ${
                    activeTab === 'traditional' ? 'hidden sm:table-cell' : ''
                  }`}>
                    <div className="flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#7a9a3b] shrink-0 mt-0.5" />
                      <span>{row.modern}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
