'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mic, Sliders, Camera, Film, Music, Sparkles, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  mic: <Mic className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  sliders: <Sliders className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  camera: <Camera className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  film: <Film className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  music: <Music className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  sparkles: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="section-padding relative" id="services">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] bg-[#ff2d2d]/5 rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px]" />

      <div className="container-custom" ref={ref}>
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Our Services</span>
          </motion.div>
          <AnimatedText
            text="What We Offer"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Professional music production services tailored to bring your creative vision to life
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-5 sm:p-6 md:p-8 h-full group cursor-pointer" glowColor="rgba(255, 45, 45, 0.1)">
                <div className="text-[#ff2d2d] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-[#ff2d2d] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {service.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-white/40 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#ff2d2d] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-[#ff2d2d] text-xs sm:text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button href="/services" variant="secondary" size="md" showArrow>
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
