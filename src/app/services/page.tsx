'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, Sliders, Camera, Film, Music, Sparkles, Check, Clapperboard, Palette } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { SERVICES, SITE_CONFIG } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  mic: <Mic className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  sliders: <Sliders className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  camera: <Camera className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  film: <Film className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  music: <Music className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  sparkles: <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  clapperboard: <Clapperboard className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
  palette: <Palette className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
};

export default function ServicesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <main className="pt-16 sm:pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-[#ff2d2d]/5 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px]" />
        <div className="container-custom relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Services</span>
            </div>
            <AnimatedText
              text="Professional Music Production Services"
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            />
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              From beat production to cinematic editing — we offer comprehensive services to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center"
              >
                <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-[#ff2d2d]/10 flex items-center justify-center text-[#ff2d2d] mb-4 sm:mb-6">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{service.title}</h2>
                  <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">{service.description}</p>
                  <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 sm:gap-3 text-white/70 text-sm sm:text-base">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ff2d2d]/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff2d2d]" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <GlassCard className="aspect-square sm:aspect-[4/3] flex items-center justify-center">
                    <div className="text-[#ff2d2d]/20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center">
                      {iconMap[service.icon]}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedText
            text="Custom Quote Required?"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Every project is unique. Contact us for a personalized quote tailored to your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button href="/contact" size="md" showArrow className="w-full sm:w-auto">
              Request Custom Quote
            </Button>
            <a
              href={SITE_CONFIG.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

