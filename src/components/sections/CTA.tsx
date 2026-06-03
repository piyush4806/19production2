'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import AnimatedText from '@/components/ui/AnimatedText';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="section-padding relative overflow-hidden" id="cta">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[500px] sm:h-[350px] md:w-[600px] md:h-[450px] lg:w-[800px] lg:h-[600px] bg-[#ff2d2d]/10 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px]" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-px bg-[#ff2d2d]" />
            <span className="text-[#ff2d2d] text-xs sm:text-sm font-medium tracking-wider uppercase">
              Ready to Start?
            </span>
            <div className="w-8 sm:w-12 h-px bg-[#ff2d2d]" />
          </div>

          <AnimatedText
            text="Let's Create Something Amazing Together"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-10"
          >
            Whether you&apos;re an emerging artist or an established name, we have the expertise and
            facilities to elevate your sound to the next level.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button href="/contact" size="md" showArrow className="w-full sm:w-auto">
              Start Your Project
            </Button>
            <Button href="/portfolio" variant="secondary" size="md" className="w-full sm:w-auto">
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/40 text-xs sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              Free Consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              Quick Turnaround
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
              100% Satisfaction
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
