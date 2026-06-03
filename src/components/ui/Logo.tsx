'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 100, height: 30 },
    md: { width: 140, height: 42 },
    lg: { width: 200, height: 60 },
  };

  const textColor = variant === 'dark' ? '#ffffff' : '#0a0a0a';
  const { width, height } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="19production logo"
    >
      <text
        x="0"
        y="52"
        fontFamily="Space Grotesk, Inter, system-ui, sans-serif"
        fontSize="52"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-2"
      >
        19
      </text>

      <g transform="translate(80, 14)">
        <rect x="0" y="12" width="3" height="16" rx="1.5" fill="#ff2d2d" opacity="0.6">
          <animate attributeName="height" values="16;24;16" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="y" values="12;8;12" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="6" y="6" width="3" height="28" rx="1.5" fill="#ff2d2d" opacity="0.8">
          <animate attributeName="height" values="28;18;28" dur="1s" repeatCount="indefinite" />
          <animate attributeName="y" values="6;11;6" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="12" y="2" width="3" height="36" rx="1.5" fill="#ff2d2d">
          <animate attributeName="height" values="36;22;36" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="y" values="2;9;2" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="18" y="8" width="3" height="24" rx="1.5" fill="#ff2d2d" opacity="0.8">
          <animate attributeName="height" values="24;32;24" dur="1.1s" repeatCount="indefinite" />
          <animate attributeName="y" values="8;4;8" dur="1.1s" repeatCount="indefinite" />
        </rect>
        <rect x="24" y="14" width="3" height="12" rx="1.5" fill="#ff2d2d" opacity="0.6">
          <animate attributeName="height" values="12;20;12" dur="0.9s" repeatCount="indefinite" />
          <animate attributeName="y" values="14;10;14" dur="0.9s" repeatCount="indefinite" />
        </rect>
      </g>

      <text
        x="118"
        y="52"
        fontFamily="Space Grotesk, Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="400"
        fill={textColor}
        letterSpacing="1"
      >
        production
      </text>
    </svg>
  );
}
