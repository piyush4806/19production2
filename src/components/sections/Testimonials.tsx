'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="section-padding relative" id="testimonials">
      <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-[#ff2d2d]/5 rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px]" />

      <div className="container-custom" ref={ref}>
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Testimonials</span>
          </motion.div>
          <AnimatedText
            text="What Our Clients Say"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            Hear from artists who have trusted us with their creative vision
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-5 sm:p-6 md:p-8 relative group hover:border-[#ff2d2d]/30 transition-all duration-500"
            >
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#ff2d2d]/20">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>

              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#ff2d2d] text-[#ff2d2d]" />
                ))}
              </div>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ff2d2d] to-[#ff6b6b] flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-white/50 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
