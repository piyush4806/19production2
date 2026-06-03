'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import { HERO_WORDS } from '@/lib/constants';
import { Play } from 'lucide-react';

const StudioScene = dynamic(() => import('@/components/three/StudioScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111111]" />
  ),
});

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % HERO_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      <StudioScene />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />

      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#ff2d2d]/5 blur-[80px] sm:blur-[100px] md:blur-[120px] z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full bg-[#ff2d2d]/5 blur-[60px] sm:blur-[80px] md:blur-[100px] z-10" />

      <div className="relative z-20 container-custom text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ff2d2d] animate-pulse" />
          <span className="text-xs sm:text-sm text-white/70">Premium Music Production Studio</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tighter mb-2 leading-tight">
            <span className="text-gradient">19</span>
            <span className="text-white">production</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="h-12 sm:h-16 md:h-20 flex items-center justify-center mb-6 sm:mb-8"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/70 font-light">
            Creating sound that becomes{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 text-[#ff2d2d] font-semibold"
                >
                  {HERO_WORDS[currentWord]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible">{HERO_WORDS[0]}</span>
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button href="/contact" size="md" showArrow className="w-full sm:w-auto">
            Start Your Project
          </Button>
          <Button href="/services" variant="secondary" size="md" className="w-full sm:w-auto">
            <Play className="w-4 h-4" />
            Explore Services
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Scroll</span>
            <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-white/20 flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 h-1.5 sm:w-1 sm:h-2 rounded-full bg-[#ff2d2d]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
