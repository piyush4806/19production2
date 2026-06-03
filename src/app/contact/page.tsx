'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle, Calendar } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<'contact' | 'booking'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: '',
    date: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submission = {
      ...formData,
      type: activeForm,
    };

    const saved = localStorage.getItem('submissions');
    const submissions = saved ? JSON.parse(saved) : [];
    submissions.push({
      id: Date.now().toString(),
      ...submission,
      date: new Date().toISOString().split('T')[0],
      read: false,
    });
    localStorage.setItem('submissions', JSON.stringify(submissions));

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '', budget: '', date: '' });
  };

  return (
    <main className="pt-16 sm:pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-[#ff2d2d]/5 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px]" />
        <div className="container-custom relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Contact</span>
            </div>
            <AnimatedText
              text="Let's Create Together"
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            />
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Ready to start your project? Get in touch or book a session with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          {/* Form Toggle */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setActiveForm('contact')}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeForm === 'contact'
                    ? 'bg-[#ff2d2d] text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => setActiveForm('booking')}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                  activeForm === 'booking'
                    ? 'bg-[#ff2d2d] text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Book a Session
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">
                  {activeForm === 'contact' ? 'Send us a Message' : 'Book a Session'}
                </h2>
                <p className="text-white/50 text-xs sm:text-sm mb-6">
                  {activeForm === 'booking'
                    ? 'Fill out the form below and we\'ll get back to you with a custom quote.'
                    : ''}
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#ff2d2d] mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      {activeForm === 'booking' ? 'Booking Request Sent!' : 'Message Sent!'}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d] transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d] transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d] transition-colors"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Service *</label>
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-[#ff2d2d] transition-colors"
                        >
                          <option value="" className="bg-[#1a1a1a]">Select a service</option>
                          <option value="Beat Production" className="bg-[#1a1a1a]">Beat Production</option>
                          <option value="Mixing & Mastering" className="bg-[#1a1a1a]">Mixing & Mastering</option>
                          <option value="Music Recording" className="bg-[#1a1a1a]">Music Recording</option>
                          <option value="Video Shoots" className="bg-[#1a1a1a]">Video Shoots</option>
                          <option value="Music Video Editing" className="bg-[#1a1a1a]">Music Video Editing</option>
                          <option value="Reels Editing" className="bg-[#1a1a1a]">Reels Editing</option>
                          <option value="Cinematic Editing" className="bg-[#1a1a1a]">Cinematic Editing</option>
                          <option value="Cover Art/Visuals" className="bg-[#1a1a1a]">Cover Art / Visuals</option>
                        </select>
                      </div>
                    </div>

                    {activeForm === 'booking' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Preferred Date</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-[#ff2d2d] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Budget Range</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-[#ff2d2d] transition-colors"
                          >
                            <option value="" className="bg-[#1a1a1a]">Select budget</option>
                            <option value="5000-10000" className="bg-[#1a1a1a]">₹5,000 - ₹10,000</option>
                            <option value="10000-25000" className="bg-[#1a1a1a]">₹10,000 - ₹25,000</option>
                            <option value="25000-50000" className="bg-[#1a1a1a]">₹25,000 - ₹50,000</option>
                            <option value="50000+" className="bg-[#1a1a1a]">₹50,000+</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d] transition-colors resize-none"
                        placeholder={activeForm === 'booking' ? 'Tell us about your project...' : 'How can we help you?'}
                      />
                    </div>

                    <Button type="submit" size="md" className="w-full">
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                      {activeForm === 'booking' ? 'Request Custom Quote' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {[
                { icon: Phone, label: 'Call Us', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phoneRaw}` },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: SITE_CONFIG.social.whatsapp },
                { icon: Mail, label: 'Email Us', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: MapPin, label: 'Visit Us', value: SITE_CONFIG.address, href: '#map' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <GlassCard className="p-4 sm:p-5 md:p-6 flex items-center gap-3 sm:gap-4 group cursor-pointer">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#ff2d2d]/10 flex items-center justify-center text-[#ff2d2d] group-hover:bg-[#ff2d2d]/20 transition-colors flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-white/50">{item.label}</p>
                      <p className="text-white font-medium text-sm sm:text-base truncate">{item.value}</p>
                    </div>
                  </GlassCard>
                </motion.a>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-4 sm:p-5 md:p-6 flex items-center justify-center gap-2 sm:gap-3 group cursor-pointer">
                    <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff2d2d]" />
                    <span className="text-white/70 group-hover:text-white transition-colors text-xs sm:text-sm">Instagram</span>
                  </GlassCard>
                </a>
                <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-4 sm:p-5 md:p-6 flex items-center justify-center gap-2 sm:gap-3 group cursor-pointer">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff2d2d]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-white/70 group-hover:text-white transition-colors text-xs sm:text-sm">YouTube</span>
                  </GlassCard>
                </a>
              </div>

              <div id="map" className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="19production location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
