'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, Pause, ExternalLink, Volume2, Upload, Film } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { PROJECTS, FILTER_OPTIONS } from '@/lib/constants';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  fileName?: string;
  originalName?: string;
  category: string;
  date: string;
  type: 'url' | 'upload';
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<VideoItem[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    const saved = localStorage.getItem('videos');
    if (saved) {
      setUploadedVideos(JSON.parse(saved));
    }
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const filteredUploads =
    activeFilter === 'All'
      ? uploadedVideos
      : uploadedVideos.filter((v) => v.category === activeFilter);

  const allFilters = ['All', ...new Set([...FILTER_OPTIONS.slice(1), ...uploadedVideos.map((v) => v.category)])];

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]?.split('?')[0]}`;
    }
    return `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0]}`;
  };

  return (
    <main className="pt-16 sm:pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-[#ff2d2d]/5 rounded-full blur-[100px] sm:blur-[150px] md:blur-[200px]" />
        <div className="container-custom relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-[#ff2d2d] font-medium">Portfolio</span>
            </div>
            <AnimatedText
              text="Our Creative Work"
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            />
            <p className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Explore our collection of music production, video projects, and creative works.
            </p>
          </motion.div>
        </div>
      </section>

      {uploadedVideos.length > 0 && (
        <section className="section-padding bg-[#111111]">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="p-2 rounded-lg bg-[#ff2d2d]/10">
                <Film className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2d2d]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Uploaded Videos</h2>
                <p className="text-white/50 text-xs sm:text-sm">Videos uploaded from the admin panel</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredUploads.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden group">
                    <div className="aspect-video relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
                      {video.type === 'upload' ? (
                        <>
                          <video
                            src={video.url}
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-[#ff2d2d] flex items-center justify-center hover:scale-110 transition-transform"
                            >
                              <Play className="w-5 h-5 text-white ml-0.5" />
                            </a>
                          </div>
                        </>
                      ) : video.url.includes('youtu') ? (
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/30" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-[#ff2d2d]/80 text-white text-[10px] font-medium">
                        {video.type === 'upload' ? 'Uploaded' : 'URL'}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 truncate group-hover:text-[#ff2d2d] transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px]">
                          {video.category}
                        </span>
                        <span className="text-white/30 text-[10px]">{video.date}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-[#111111]">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 rounded-lg bg-[#ff2d2d]/10">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2d2d]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Featured Projects</h2>
              <p className="text-white/50 text-xs sm:text-sm">Curated collection of our best work</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {allFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#ff2d2d] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard className="overflow-hidden group" hover3D>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-[#ff2d2d]/20 border border-[#ff2d2d]/30 text-[10px] sm:text-xs text-[#ff2d2d] font-medium">
                        {project.category}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setPlayingId(playingId === project.id ? null : project.id)}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#ff2d2d] flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          {playingId === project.id ? (
                            <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          ) : (
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-[#ff2d2d] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>

                      <AnimatePresence>
                        {playingId === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-end gap-0.5 h-6 sm:h-7 md:h-8 pt-2">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-[#ff2d2d] rounded-t animate-waveform"
                                  style={{
                                    height: `${20 + ((i * 7 + 13) % 60)}%`,
                                    animationDuration: `${0.5 + ((i * 3) % 5) * 0.1}s`,
                                    animationDelay: `${i * 0.05}s`,
                                  }}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/40">
                              <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>Playing preview...</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && filteredUploads.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-white/40 text-sm sm:text-base">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedText
            text="Want to Be Featured?"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6"
          />
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Let us help you create your next masterpiece. Your project could be our next featured work.
          </p>
          <motion.a
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
        </div>
      </section>
    </main>
  );
}
