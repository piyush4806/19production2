'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { PROJECTS } from '@/lib/constants';

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="section-padding relative bg-[#111111]" id="projects">
      <div className="container-custom" ref={ref}>
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Portfolio</span>
          </motion.div>
          <AnimatedText
            text="Featured Projects"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Showcasing our latest work and creative achievements
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-[#ff2d2d]/30 transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-[#ff2d2d]/20 border border-[#ff2d2d]/30 text-[10px] sm:text-xs text-[#ff2d2d] font-medium">
                  {project.category}
                </div>
                <div className="absolute inset-0 bg-[#ff2d2d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-[#ff2d2d] transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button href="/portfolio" variant="secondary" size="md" showArrow>
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
