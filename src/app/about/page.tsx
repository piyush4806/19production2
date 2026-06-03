'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, Heart, Zap, Award } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { TIMELINE } from '@/lib/constants';

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <main className="pt-16 sm:pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-[#ff2d2d]/5 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px]" />
        <div className="container-custom relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">About Us</span>
            </div>
            <AnimatedText
              text="Our Story"
              tag="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            />
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              19production was born from a passion for music and a vision to create a space where
              artists can fully express their creativity. We believe every sound tells a story, and
              our mission is to help you tell yours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 lg:p-12 h-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#ff2d2d]/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#ff2d2d]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  To empower artists with world-class production facilities and creative expertise,
                  making premium music production accessible to every visionary creator. We strive
                  to bridge the gap between artistic ambition and sonic excellence.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 lg:p-12 h-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#ff2d2d]/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#ff2d2d]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  To become the leading music production brand trusted by artists worldwide. We
                  envision a future where every artist, regardless of their background, has access
                  to professional tools and guidance to realize their musical dreams.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-16">
            <AnimatedText
              text="Why Choose Us"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: Heart, title: 'Passion Driven', desc: 'Every project receives our undivided attention and creative passion.' },
              { icon: Zap, title: 'Cutting-edge Tech', desc: 'State-of-the-art equipment and software for pristine sound quality.' },
              { icon: Award, title: 'Industry Expertise', desc: 'Years of experience working with top-tier artists and labels.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 sm:p-8 text-center h-full">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-[#ff2d2d]/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#ff2d2d]" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-16">
            <AnimatedText
              text="Our Journey"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
            />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d2d] to-transparent" />

            {TIMELINE.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 pl-12 sm:pl-16 md:pl-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#ff2d2d]/10 text-[#ff2d2d] text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute left-6 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#ff2d2d] border-3 sm:border-4 border-[#0a0a0a] -translate-x-1/2 mt-1" />
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedText
            text="Ready to Work With Us?"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Join the growing family of artists who trust 19production with their creative journey.
          </p>
          <Button href="/contact" size="md" showArrow>
            Get in Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
