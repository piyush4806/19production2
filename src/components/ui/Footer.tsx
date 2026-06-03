'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[600px] md:h-[300px] opacity-20">
        <div className="w-full h-full bg-gradient-radial from-[#ff2d2d]/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom py-10 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="sm" className="mb-4 sm:mb-6" />
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Premium music production studio dedicated to bringing your creative vision to life.
              From recording to mixing, we deliver excellence.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff2d2d]/20 hover:text-[#ff2d2d] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff2d2d]/20 hover:text-[#ff2d2d] transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff2d2d]/20 hover:text-[#ff2d2d] transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-xs sm:text-sm hover:text-[#ff2d2d] transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff2d2d]/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Music Recording', 'Mix & Mastering', 'Video Editing', 'Music Shoot', 'Audio Production', 'Creative Services'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-white/60 text-xs sm:text-sm hover:text-[#ff2d2d] transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff2d2d]/50" />
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-white/60 text-xs sm:text-sm hover:text-[#ff2d2d] transition-colors flex items-center gap-2 sm:gap-3"
                >
                  <Mail size={14} className="text-[#ff2d2d] sm:w-4 sm:h-4" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-white/60 text-xs sm:text-sm hover:text-[#ff2d2d] transition-colors flex items-center gap-2 sm:gap-3"
                >
                  <Phone size={14} className="text-[#ff2d2d] sm:w-4 sm:h-4" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="text-white/60 text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
                <MapPin size={14} className="text-[#ff2d2d] sm:w-4 sm:h-4" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/40 text-xs sm:text-sm">
            &copy; {currentYear} 19production. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-white/40 text-xs sm:text-sm hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 text-xs sm:text-sm hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
