import { NavItem, Service, Project, Testimonial, Stat, TimelineItem } from '@/types';

export const SITE_CONFIG = {
  name: '19production',
  title: '19production - Premium Music Production Studio',
  description:
    '19production is a premium music production brand offering beat production, mixing & mastering, music recording, video shoots, music video editing, reels editing, cinematic editing, and cover art/visuals for artists, singers, rappers, and content creators.',
  url: 'https://19production.com',
  email: 'hello@19production.com',
  phone: '+917021237875',
  phoneRaw: '917021237875',
  address: 'Mumbai, India',
  social: {
    instagram: 'https://www.instagram.com/19production?igsh=NXJwMnN3MjBqMzEx',
    youtube: 'https://youtu.be/tl4qmWOXYfo?si=_2vES61ZhVsUeDNm',
    whatsapp: 'https://wa.me/p/26329573893351458/918355968455',
  },
};

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '19productionn',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'beat-production',
    title: 'Beat Production',
    description:
      'Custom beats crafted to match your unique style and vision. From trap to R&B, hip-hop to pop, we create original instrumentals that elevate your music.',
    icon: 'music',
    features: [
      'Custom Beat Creation',
      'Genre-Specific Production',
      'Track Arrangement',
      'Sound Design',
      'Beat Mixing',
    ],
  },
  {
    id: 'mixing-mastering',
    title: 'Mixing & Mastering',
    description:
      'Professional mixing and mastering to give your music that polished, radio-ready sound. Industry-standard processing with meticulous attention to detail.',
    icon: 'sliders',
    features: [
      'Stereo Mixing',
      'Mastering',
      'Stem Mastering',
      'Loudness Optimization',
      'Final Mastering',
    ],
  },
  {
    id: 'music-recording',
    title: 'Music Recording',
    description:
      'State-of-the-art recording studios with professional-grade equipment. From vocals to full band sessions, we capture every nuance of your sound.',
    icon: 'mic',
    features: [
      'Vocal Recording',
      'Instrument Tracking',
      'Voice-over Sessions',
      'Multi-track Recording',
      'Session Production',
    ],
  },
  {
    id: 'video-shoots',
    title: 'Video Shoots',
    description:
      'Cinematic video production with creative direction, professional lighting, and post-production that brings your vision to life.',
    icon: 'camera',
    features: [
      'Music Video Production',
      'Promotional Content',
      'Behind the Scenes',
      'Live Performance Recording',
      'Creative Direction',
    ],
  },
  {
    id: 'music-video-editing',
    title: 'Music Video Editing',
    description:
      'Expert video editing services with color grading, visual effects, and seamless post-production workflows for music videos.',
    icon: 'film',
    features: [
      'Color Grading',
      'VFX & Motion Graphics',
      'Multi-platform Delivery',
      'Sync & Timing',
      'Visual Storytelling',
    ],
  },
  {
    id: 'reels-editing',
    title: 'Reels Editing',
    description:
      'Short-form content editing optimized for Instagram Reels, YouTube Shorts, and TikTok. Trending formats that maximize engagement.',
    icon: 'sparkles',
    features: [
      'Reels Editing',
      'Short-form Content',
      'Trending Formats',
      'Caption & Effects',
      'Platform Optimization',
    ],
  },
  {
    id: 'cinematic-editing',
    title: 'Cinematic Editing',
    description:
      'High-end cinematic post-production for music videos, documentaries, and visual projects. Film-quality editing and grading.',
    icon: 'clapperboard',
    features: [
      'Cinematic Color Grading',
      'Film-style Editing',
      'Sound Design',
      'Visual Effects',
      'HDR Delivery',
    ],
  },
  {
    id: 'cover-art-visuals',
    title: 'Cover Art & Visuals',
    description:
      'Stunning cover art and visual assets that capture the essence of your music. Album art, single covers, and promotional visuals.',
    icon: 'palette',
    features: [
      'Album Cover Design',
      'Single Artwork',
      'Promotional Graphics',
      'Social Media Visuals',
      'Brand Identity',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Studio Session Highlights',
    category: 'Music Video',
    image: '/projects/project1.jpg',
    description: 'Behind-the-scenes from our latest studio recording session',
    videoUrl: 'https://youtu.be/tl4qmWOXYfo?si=_2vES61ZhVsUeDNm',
  },
  {
    id: '2',
    title: 'Beat Production Showcase',
    category: 'Beat Production',
    image: '/projects/project2.jpg',
    description: 'Custom beat creation process from concept to final product',
  },
  {
    id: '3',
    title: 'Mixing & Mastering Workflow',
    category: 'Mixing & Mastering',
    image: '/projects/project3.jpg',
    description: 'Professional mixing session for chart-topping single',
  },
  {
    id: '4',
    title: 'Cinematic Music Video',
    category: 'Cinematic Editing',
    image: '/projects/project4.jpg',
    description: 'High-end cinematic post-production with advanced VFX',
  },
  {
    id: '5',
    title: 'Social Media Reels',
    category: 'Reels Editing',
    image: '/projects/project5.jpg',
    description: 'Trending short-form content for maximum engagement',
  },
  {
    id: '6',
    title: 'Cover Art Collection',
    category: 'Cover Art/Visuals',
    image: '/projects/project6.jpg',
    description: 'Album artwork and promotional visual design',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Luna Vox',
    role: 'Independent Artist',
    content:
      '19production transformed my sound completely. The beat production and mixing were top-notch. They understood my vision from day one.',
    avatar: '/avatars/avatar1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'DJ Nexus',
    role: 'Producer & DJ',
    content:
      'The studio environment is world-class. The recording quality and the team\'s expertise elevated my production to a whole new level.',
    avatar: '/avatars/avatar2.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Maya Chen',
    role: 'Singer-Songwriter',
    content:
      'From recording to the final master, every step was professional and creative. My debut EP sounds better than I ever imagined.',
    avatar: '/avatars/avatar3.jpg',
    rating: 5,
  },
];

export const STATS: Stat[] = [
  { label: 'Projects Completed', value: '200', suffix: '+' },
  { label: 'Happy Clients', value: '150', suffix: '+' },
  { label: 'Awards Won', value: '25', suffix: '' },
  { label: 'Years Experience', value: '5', suffix: '+' },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2020',
    title: 'The Beginning',
    description:
      '19production was founded with a vision to create a premium music production studio that serves independent artists.',
  },
  {
    year: '2021',
    title: 'Studio Expansion',
    description:
      'Expanded to a state-of-the-art facility with multiple recording studios and post-production suites.',
  },
  {
    year: '2022',
    title: 'Going Digital',
    description:
      'Launched online services, connecting with artists worldwide and delivering projects remotely.',
  },
  {
    year: '2023',
    title: 'Award Winning',
    description:
      'Recognized for outstanding production quality with multiple industry awards.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description:
      'Expanded services to include video production, content creation, and full artist development.',
  },
];

export const HERO_WORDS = [
  'Sound',
  'Emotion',
  'Vision',
  'Art',
  'Passion',
  'Rhythm',
];

export const FILTER_OPTIONS = [
  'All',
  'Beat Production',
  'Mixing & Mastering',
  'Music Video',
  'Cinematic Editing',
  'Reels Editing',
  'Cover Art/Visuals',
];
