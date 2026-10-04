import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Wind, Cog, Cpu, Zap, ChevronRight } from 'lucide-react';

export default function EducationalTimeline() {
  const steps = [
    {
      phase: '01',
      title: 'Catching the Breeze',
      icon: Wind,
      badge: 'Wind to Motion',
      summary:
        'Moving air flows over the angled blades. Just like an airplane wing, the airflow creates a pressure difference that gently lifts and pushes the blades into a steady circular spin.',
      points: [
        'Angled blade profile captures wind energy efficiently.',
        'Sails are oriented directly facing the oncoming breeze.',
        'Even a light 15 km/h breeze is enough to begin turning.',
      ],
    },
    {
      phase: '02',
      title: 'Turning the Gears',
      icon: Cog,
      badge: 'Mechanical Drive',
      summary:
        'The spinning rotor turns a heavy main shaft. Connected gears and cogwheels speed up the rotation so it can do useful mechanical work or spin a generator smoothly.',
      points: [
        'Main axle carries steady rotational force from the blades.',
        'Gear systems multiply rotation speed to match generator needs.',
        'Mechanical brakes allow stopping the rotor safely when needed.',
      ],
    },
    {
      phase: '03',
      title: 'Generating Electricity',
      icon: Cpu,
      badge: 'Induction & Current',
      summary:
        'The high-speed shaft spins magnets inside copper coils. As magnetic fields cross the copper wires, an electric current flows naturally through the system.',
      points: [
        'Electromagnetic induction converts movement directly into electricity.',
        'No fossil fuels or emissions are produced in the process.',
        'Modern turbines use magnetic generators requiring minimal maintenance.',
      ],
    },
    {
      phase: '04',
      title: 'Delivering Clean Energy',
      icon: Zap,
      badge: 'Grid Delivery',
      summary:
        'The generated power is smoothed to standard frequency and voltage, ready to supply clean renewable electricity directly to homes, farms, and towns.',
      points: [
        'Transformers adjust the voltage for safe long-distance transmission.',
        'Powers communities quietly from natural, renewable wind.',
        'Zero carbon footprint during ongoing electricity production.',
      ],
    },
  ];

  return (
    <section className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#557327] dark:text-[#a5c9be] mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#233217] dark:text-[#fefae0]">
          How Windmills Convert Wind into Power
        </h2>
        <p className="text-xs sm:text-sm text-[#557327] dark:text-[#a5c9be] mt-0.5">
          A four-step walkthrough from the natural meadow breeze to clean electricity.
        </p>
      </div>

      {/* Stepped Cards */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bento-card p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#7a9a3b] text-[#fefae0] font-mono font-bold text-xs">
                    {step.phase}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#233217] dark:text-[#fefae0]">
                    {step.title}
                  </h3>
                </div>

                <span className="self-start sm:self-auto text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f4f8d3] dark:bg-[#28381c] text-[#3d5225] dark:text-[#d2e2c5] border border-[#7a9a3b]/20">
                  {step.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#3d5225] dark:text-[#d2e2c5] leading-relaxed mb-3">
                {step.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-3 border-t border-[#7a9a3b]/15">
                {step.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2.5 rounded-xl bg-[#f4f8d3]/50 dark:bg-[#1b2612]/50 border border-[#7a9a3b]/10 text-xs text-[#3d5225] dark:text-[#d2e2c5] flex items-start gap-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#7a9a3b] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
