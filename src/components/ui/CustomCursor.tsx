'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const mousePosition = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.clientX}px, ${mousePosition.clientY}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${mousePosition.clientX}px, ${mousePosition.clientY}px)`;
    }
  }, [mousePosition]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          marginLeft: isHovering ? '-30px' : '-20px',
          marginTop: isHovering ? '-30px' : '-20px',
          border: `2px solid ${isHovering ? '#ff2d2d' : 'rgba(255, 255, 255, 0.5)'}`,
          borderRadius: '50%',
          transition: 'width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: isClicking ? '8px' : '4px',
          height: isClicking ? '8px' : '4px',
          marginLeft: isClicking ? '-4px' : '-2px',
          marginTop: isClicking ? '-4px' : '-2px',
          backgroundColor: '#ff2d2d',
          borderRadius: '50%',
          transition: 'width 0.2s, height 0.2s, margin 0.2s',
        }}
      />
    </>
  );
}
