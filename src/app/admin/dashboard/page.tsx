'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Video,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Upload,
  FileVideo,
  Link as LinkIcon,
  Play,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'videos'>('submissions');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [addMode, setAddMode] = useState<'upload' | 'url'>('upload');
  const [newVideo, setNewVideo] = useState({ title: '', url: '', category: 'Music Video' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    loadData();
  }, [router]);

  const loadData = () => {
    const savedSubmissions = localStorage.getItem('submissions');
    const savedVideos = localStorage.getItem('videos');

    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    } else {
      const mockSubmissions: Submission[] = [
        {
          id: '1',
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
          phone: '+91 9876543210',
          service: 'Music Recording',
          message: 'Looking to record a hip-hop track. Need studio time for 2 days.',
          date: '2024-01-15',
          read: false,
        },
      ];
      setSubmissions(mockSubmissions);
      localStorage.setItem('submissions', JSON.stringify(mockSubmissions));
    }

    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      const mockVideos: VideoItem[] = [
        {
          id: '1',
          title: 'Studio Session Highlights',
          url: 'https://youtu.be/tl4qmWOXYfo?si=_2vES61ZhVsUeDNm',
          category: 'Music Video',
          date: '2024-01-10',
          type: 'url',
        },
      ];
      setVideos(mockVideos);
      localStorage.setItem('videos', JSON.stringify(mockVideos));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const toggleRead = (id: string) => {
    const updated = submissions.map((s) =>
      s.id === id ? { ...s, read: !s.read } : s
    );
    setSubmissions(updated);
    localStorage.setItem('submissions', JSON.stringify(updated));
  };

  const deleteSubmission = (id: string) => {
    const updated = submissions.filter((s) => s.id !== id);
    setSubmissions(updated);
    localStorage.setItem('submissions', JSON.stringify(updated));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      setSelectedFile(file);
      if (!newVideo.title) {
        setNewVideo({ ...newVideo, title: file.name.replace(/\.[^/.]+$/, '') });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newVideo.title) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', newVideo.title);
    formData.append('category', newVideo.category);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      const data = await res.json();
      if (data.success) {
        setUploadProgress(100);
        const updated = [...videos, data.video];
        setVideos(updated);
        localStorage.setItem('videos', JSON.stringify(updated));
        setNewVideo({ title: '', url: '', category: 'Music Video' });
        setSelectedFile(null);
        setShowAddVideo(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const addUrlVideo = () => {
    if (!newVideo.title || !newVideo.url) return;
    const video: VideoItem = {
      id: Date.now().toString(),
      title: newVideo.title,
      url: newVideo.url,
      category: newVideo.category,
      date: new Date().toISOString().split('T')[0],
      type: 'url',
    };
    const updated = [...videos, video];
    setVideos(updated);
    localStorage.setItem('videos', JSON.stringify(updated));
    setNewVideo({ title: '', url: '', category: 'Music Video' });
    setShowAddVideo(false);
  };

  const deleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    localStorage.setItem('videos', JSON.stringify(updated));
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom flex items-center justify-between h-14 sm:h-16">
          <Logo size="sm" />
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-white/50 text-sm">Admin Dashboard</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/60 hover:text-[#ff2d2d] text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#111111] border-b border-white/5 overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-3">
              <span className="text-white/50 text-sm">Admin Dashboard</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white/60 hover:text-[#ff2d2d] text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom py-6 sm:py-8">
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-[#ff2d2d] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'videos'
                ? 'bg-[#ff2d2d] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos ({videos.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <GlassCard className="p-4 sm:p-5">
            <p className="text-white/50 text-xs sm:text-sm mb-1">Total Submissions</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#ff2d2d]">{submissions.length}</p>
          </GlassCard>
          <GlassCard className="p-4 sm:p-5">
            <p className="text-white/50 text-xs sm:text-sm mb-1">Unread</p>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-500">
              {submissions.filter((s) => !s.read).length}
            </p>
          </GlassCard>
          <GlassCard className="p-4 sm:p-5 col-span-2 sm:col-span-1">
            <p className="text-white/50 text-xs sm:text-sm mb-1">Videos</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-500">{videos.length}</p>
          </GlassCard>
        </div>

        {activeTab === 'submissions' && (
          <div className="space-y-3 sm:space-y-4">
            {submissions.length === 0 ? (
              <GlassCard className="p-8 sm:p-12 text-center">
                <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">No submissions yet</p>
              </GlassCard>
            ) : (
              submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className={`p-4 sm:p-6 ${!submission.read ? 'border-l-2 border-l-[#ff2d2d]' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold text-sm sm:text-base">{submission.name}</h3>
                          {!submission.read && (
                            <span className="px-2 py-0.5 rounded-full bg-[#ff2d2d]/20 text-[#ff2d2d] text-[10px] sm:text-xs">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-white/50 mb-2">
                          <span>{submission.email}</span>
                          <span>{submission.phone}</span>
                          <span className="text-[#ff2d2d]">{submission.service}</span>
                        </div>
                        <p className="text-white/70 text-xs sm:text-sm">{submission.message}</p>
                        <p className="text-white/30 text-xs mt-2">{submission.date}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleRead(submission.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {submission.read ? (
                            <EyeOff className="w-4 h-4 text-white/50" />
                          ) : (
                            <Eye className="w-4 h-4 text-white/50" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteSubmission(submission.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-[#ff2d2d]/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-white/50 hover:text-[#ff2d2d]" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setShowAddVideo(!showAddVideo)} size="sm">
                <Plus className="w-4 h-4" />
                Add Video
              </Button>
            </div>

            <AnimatePresence>
              {showAddVideo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <GlassCard className="p-4 sm:p-6">
                    <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Add New Video</h3>

                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setAddMode('upload')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          addMode === 'upload'
                            ? 'bg-[#ff2d2d] text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload File
                      </button>
                      <button
                        onClick={() => setAddMode('url')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          addMode === 'url'
                            ? 'bg-[#ff2d2d] text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <LinkIcon className="w-4 h-4" />
                        Add URL
                      </button>
                    </div>

                    {addMode === 'upload' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Video Title *</label>
                          <input
                            type="text"
                            placeholder="Enter video title"
                            value={newVideo.title}
                            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Category</label>
                          <select
                            value={newVideo.category}
                            onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-[#ff2d2d]"
                          >
                            <option value="Music Video" className="bg-[#1a1a1a]">Music Video</option>
                            <option value="Reels" className="bg-[#1a1a1a]">Reels</option>
                            <option value="Behind the Scenes" className="bg-[#1a1a1a]">Behind the Scenes</option>
                            <option value="Cinematic" className="bg-[#1a1a1a]">Cinematic</option>
                            <option value="Beat Production" className="bg-[#1a1a1a]">Beat Production</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Video File *</label>
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-[#ff2d2d]/50 transition-colors"
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="video/*"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                            {selectedFile ? (
                              <div className="flex items-center justify-center gap-3">
                                <FileVideo className="w-8 h-8 text-[#ff2d2d]" />
                                <div className="text-left">
                                  <p className="text-white text-sm font-medium">{selectedFile.name}</p>
                                  <p className="text-white/50 text-xs">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 text-white/30 mx-auto mb-3" />
                                <p className="text-white/60 text-sm mb-1">Click to select video file</p>
                                <p className="text-white/40 text-xs">MP4, MOV, AVI, MKV (Max 100MB)</p>
                              </>
                            )}
                          </div>
                        </div>

                        {uploading && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#ff2d2d] rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button onClick={handleUpload} size="sm" className="flex-1" disabled={!selectedFile || !newVideo.title || uploading}>
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : 'Upload Video'}
                          </Button>
                          <button
                            onClick={() => {
                              setShowAddVideo(false);
                              setSelectedFile(null);
                              setNewVideo({ title: '', url: '', category: 'Music Video' });
                            }}
                            className="px-4 py-2 text-white/50 hover:text-white text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Video Title *</label>
                          <input
                            type="text"
                            placeholder="Enter video title"
                            value={newVideo.title}
                            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Video URL *</label>
                          <input
                            type="url"
                            placeholder="https://youtube.com/watch?v=..."
                            value={newVideo.url}
                            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ff2d2d]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm text-white/60 mb-1.5">Category</label>
                          <select
                            value={newVideo.category}
                            onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-[#ff2d2d]"
                          >
                            <option value="Music Video" className="bg-[#1a1a1a]">Music Video</option>
                            <option value="Reels" className="bg-[#1a1a1a]">Reels</option>
                            <option value="Behind the Scenes" className="bg-[#1a1a1a]">Behind the Scenes</option>
                            <option value="Cinematic" className="bg-[#1a1a1a]">Cinematic</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={addUrlVideo} size="sm" className="flex-1" disabled={!newVideo.title || !newVideo.url}>
                            <LinkIcon className="w-4 h-4" />
                            Add URL
                          </Button>
                          <button
                            onClick={() => {
                              setShowAddVideo(false);
                              setNewVideo({ title: '', url: '', category: 'Music Video' });
                            }}
                            className="px-4 py-2 text-white/50 hover:text-white text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {videos.length === 0 ? (
              <GlassCard className="p-8 sm:p-12 text-center">
                <Video className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">No videos yet</p>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <GlassCard className="overflow-hidden">
                      <div className="aspect-video relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
                        {video.type === 'upload' ? (
                          <video
                            src={video.url}
                            className="w-full h-full object-cover"
                            controls={false}
                            preload="metadata"
                          />
                        ) : video.url.includes('youtu') ? (
                          <iframe
                            src={video.url.includes('youtu.be')
                              ? `https://www.youtube.com/embed/${video.url.split('youtu.be/')[1]?.split('?')[0]}`
                              : `https://www.youtube.com/embed/${video.url.split('v=')[1]?.split('&')[0]}`
                            }
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
                        <h3 className="text-white font-semibold text-sm mb-1 truncate">{video.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px]">
                            {video.category}
                          </span>
                          <div className="flex gap-1">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                            </a>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#ff2d2d]/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-white/50 hover:text-[#ff2d2d]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
