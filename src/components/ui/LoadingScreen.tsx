'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Logo from './Logo';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const bars = useMemo(() => {
    const heights = [77, 73, 58, 85, 42, 91, 35, 68, 50, 72, 45, 80];
    const durations = [0.83, 0.68, 0.98, 0.72, 0.88, 0.75, 0.92, 0.65, 0.81, 0.78, 0.86, 0.70];
    const opacities = [0.72, 0.96, 0.73, 0.88, 0.65, 0.91, 0.70, 0.82, 0.78, 0.69, 0.85, 0.75];
    return heights.map((h, i) => ({
      height: mounted ? `${h}%` : '50%',
      duration: durations[i],
      delay: i * 0.05,
      opacity: mounted ? opacities[i] : 0.7,
    }));
  }, [mounted]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a]"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 45, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mb-8 sm:mb-12">
        <Logo size="md" />
      </div>

      <div className="relative z-10 flex items-end gap-0.5 sm:gap-1 h-8 sm:h-10 md:h-12 mb-6 sm:mb-8">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-0.5 sm:w-1 bg-[#ff2d2d] rounded-full animate-waveform"
            style={{
              height: bar.height,
              opacity: bar.opacity,
              animationDuration: `${bar.duration}s`,
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-32 sm:w-40 md:w-48 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ff2d2d] to-[#ff6b6b] rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.03s linear' }}
        />
      </div>

      <p className="relative z-10 mt-3 sm:mt-4 text-[10px] sm:text-xs md:text-sm text-[#8a8a8a] font-medium tracking-widest uppercase">
        Loading Experience
      </p>
    </div>
  );
}
