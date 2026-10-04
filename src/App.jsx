import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WindmillCanvas from './components/WindmillCanvas';
import TelemetryPanel from './components/TelemetryPanel';
import SimulationControls from './components/SimulationControls';
import ObservationSection from './components/ObservationSection';
import EducationalTimeline from './components/EducationalTimeline';
import ComparisonTable from './components/ComparisonTable';
import { windAudio } from './utils/audio';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('meadow_theme');
    if (saved !== null) return saved === 'dark';
    return false;
  });

  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [windSpeed, setWindSpeed] = useState(60);
  const [isSimulating, setIsSimulating] = useState(true);

  // Derived Blade RPM (e.g. 60 km/h -> 80 RPM)
  const bladeRPM = isSimulating && windSpeed > 0 ? Math.round((windSpeed / 60) * 80) : 0;

  const [observations, setObservations] = useState([
    {
      id: 'Run 1',
      source: 'Calm',
      speed: 0,
      rpm: 0,
      observation: 'No wind. Sails are at rest.',
    },
    {
      id: 'Run 2',
      source: 'Breeze',
      speed: 25,
      rpm: 33,
      observation: 'Gentle breeze begins turning the sails slowly.',
    },
    {
      id: 'Run 3',
      source: 'Windy',
      speed: 60,
      rpm: 80,
      observation: 'Smooth, steady rotation under continuous wind.',
    },
    {
      id: 'Run 4',
      source: 'Gale',
      speed: 90,
      rpm: 120,
      observation: 'Fast rotation with full wind force across the sails.',
    },
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('meadow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('meadow_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isAudioMuted) {
      windAudio.init();
    }
    windAudio.update(windSpeed, isSimulating, isAudioMuted);
  }, [windSpeed, isSimulating, isAudioMuted]);

  const handleReset = () => {
    setWindSpeed(60);
    setIsSimulating(true);
  };

  const handleAddObservation = () => {
    const nextNum = observations.length + 1;
    const testId = `Run ${nextNum}`;
    
    let sourceName = 'Custom Speed';
    if (windSpeed === 0) sourceName = 'Calm';
    else if (windSpeed === 25) sourceName = 'Breeze';
    else if (windSpeed === 60) sourceName = 'Windy';
    else if (windSpeed === 90) sourceName = 'Gale';
    else if (windSpeed > 80) sourceName = 'Strong Wind';
    else if (windSpeed > 45) sourceName = 'Moderate Breeze';
    else sourceName = 'Light Air';

    let obsText = '';
    if (!isSimulating) {
      obsText = 'Brake applied; blades stopped.';
    } else if (windSpeed === 0) {
      obsText = 'No wind movement. Rotor remains still.';
    } else if (windSpeed < 20) {
      obsText = 'Light breeze; blades turn with slow, quiet rotation.';
    } else if (windSpeed <= 65) {
      obsText = `Steady working pace at ${bladeRPM} RPM with smooth mechanical motion.`;
    } else if (windSpeed <= 85) {
      obsText = `Strong wind turning sails briskly at ${bladeRPM} RPM.`;
    } else {
      obsText = `High wind speed; sails turning rapidly at ${bladeRPM} RPM.`;
    }

    setObservations((prev) => [
      ...prev,
      {
        id: testId,
        source: sourceName,
        speed: windSpeed,
        rpm: bladeRPM,
        observation: obsText,
      },
    ]);
  };

  return (
    <div className="min-h-screen relative art-bg-wallpaper text-[#24331d] dark:text-[#fefae0] transition-colors duration-300">
      {/* Background soft wash for readability */}
      <div className="fixed inset-0 pointer-events-none bg-[#8eb5a8]/40 dark:bg-[#131d10]/75 transition-colors duration-300 backdrop-blur-[1px]" />

      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isAudioMuted={isAudioMuted}
        setIsAudioMuted={setIsAudioMuted}
        isSimulating={isSimulating}
        windSpeed={windSpeed}
        bladeRPM={bladeRPM}
      />

      {/* Main Container - compact bottom padding, no extra empty gap */}
      <main className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-6 sm:space-y-8 pb-6">
        
        {/* HERO SECTION: Fits in same viewport on desktop, cleanly stacks on mobile
                   animation
          readings   |   controls
        */}
        <section className="flex flex-col gap-2.5 sm:gap-3 lg:min-h-[calc(100vh-5.5rem)] justify-center">
          {/* Top: Animation */}
          <div className="w-full">
            <WindmillCanvas
              windSpeed={windSpeed}
              bladeRPM={bladeRPM}
              isSimulating={isSimulating}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Bottom: Readings (Left) | Controls (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 w-full">
            <div className="h-full">
              <TelemetryPanel
                windSpeed={windSpeed}
                bladeRPM={bladeRPM}
                isSimulating={isSimulating}
              />
            </div>

            <div className="h-full">
              <SimulationControls
                windSpeed={windSpeed}
                setWindSpeed={setWindSpeed}
                isSimulating={isSimulating}
                setIsSimulating={setIsSimulating}
                onReset={handleReset}
                onAddObservation={handleAddObservation}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Observation Table & Speed Curve */}
        <ObservationSection
          observations={observations}
          setObservations={setObservations}
          windSpeed={windSpeed}
          bladeRPM={bladeRPM}
          isDarkMode={isDarkMode}
        />

        {/* Section 4A: Educational Timeline */}
        <EducationalTimeline />

        {/* Section 4B: Comparison Table */}
        <ComparisonTable />
      </main>
    </div>
  );
}
