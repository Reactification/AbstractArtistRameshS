'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const arrows = containerRef.current.querySelectorAll('[data-arrow]');
    arrows.forEach((el, i) => {
      gsap.to(el, {
        y: i === 0 ? '-=8' : '+=8',
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollUp = () => {
    const target = Math.max(0, window.scrollY - window.innerHeight);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <span data-arrow="up" onClick={scrollUp} style={{ color: '#FFFFFF', fontSize: '16px', marginBottom: '2px' }}>▲</span>
      <span
        style={{
          fontFamily: 'var(--font-space, sans-serif)',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        scroll
      </span>
      <span data-arrow="down" onClick={scrollDown} style={{ color: '#FFFFFF', fontSize: '16px', marginTop: '2px' }}>▼</span>
    </div>
  );
}
