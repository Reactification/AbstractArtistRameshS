'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const flowers3Ref = useRef<HTMLDivElement>(null);
  const flowers2Ref = useRef<HTMLDivElement>(null);
  const flowers1Ref = useRef<HTMLDivElement>(null);
  const birdsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [birdsScale, setBirdsScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) {
        setBirdsScale(1.575);
      } else if (width < 768) {
        setBirdsScale(1.365);
      } else if (width < 1024) {
        setBirdsScale(1.2075);
      } else {
        setBirdsScale(1.155);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.out' } });

    if (stageRef.current) {
      tlRef.current.to(stageRef.current, {
        rotateY: xVal * 3,
        rotateX: -yVal * 3,
        perspective: 1200,
      }, 0);
    }

    if (flowers3Ref.current) {
      tlRef.current.to(flowers3Ref.current, { x: xVal * -10, y: yVal * -10 }, 0);
    }
    if (flowers2Ref.current) {
      tlRef.current.to(flowers2Ref.current, { x: xVal * -15, y: yVal * -15 }, 0);
    }
    if (flowers1Ref.current) {
      tlRef.current.to(flowers1Ref.current, { x: xVal * 15, y: yVal * 15 }, 0);
    }
    if (birdsRef.current) {
      tlRef.current.to(birdsRef.current, { x: xVal * 30, y: yVal * 30 }, 0);
    }
    if (textRef.current) {
      tlRef.current.to(textRef.current, { x: 0, y: yVal * 40 }, 0);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    if (tlRef.current) tlRef.current.kill();
    tlRef.current = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });
    if (stageRef.current) tlRef.current.to(stageRef.current, { rotateY: 0, rotateX: 0 }, 0);
    if (flowers3Ref.current) tlRef.current.to(flowers3Ref.current, { x: 0, y: 0 }, 0);
    if (flowers2Ref.current) tlRef.current.to(flowers2Ref.current, { x: 0, y: 0 }, 0);
    if (flowers1Ref.current) tlRef.current.to(flowers1Ref.current, { x: 0, y: 0 }, 0);
    if (birdsRef.current) tlRef.current.to(birdsRef.current, { x: 0, y: 0 }, 0);
    if (textRef.current) tlRef.current.to(textRef.current, { x: 0, y: 0 }, 0);
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      tl.fromTo([bgRef.current, flowers3Ref.current, flowers2Ref.current, flowers1Ref.current], 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2 }
      )
      .fromTo(birdsRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.8'
      )
      .fromTo(textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      );

      gsap.to(textRef.current, {
        y: '+=10',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      });
    });

    return () => ctx.revert();
  }, []);

  const layerClass = "absolute inset-0 w-full h-full [will-change:transform]";
  const imageClass = "w-full h-full object-cover";

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={stageRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div ref={bgRef} className={`${layerClass} z-0`} style={{ zIndex: 0 }}>
          <Image src="/assets/background.png" alt="" fill className={imageClass} priority />
        </div>

        <div ref={flowers3Ref} className={`${layerClass} z-10`} style={{ zIndex: 10 }}>
          <Image src="/assets/flowers3.png" alt="" fill className={imageClass} />
        </div>

        <div ref={flowers2Ref} className={`${layerClass} z-20`} style={{ zIndex: 20 }}>
          <Image src="/assets/flowers2.png" alt="" fill className={imageClass} />
        </div>

        <div ref={flowers1Ref} className={`${layerClass} z-30`} style={{ zIndex: 30 }}>
          <Image src="/assets/flowers1.png" alt="" fill className={imageClass} />
        </div>

        <div
          ref={birdsRef}
          className={`${layerClass} z-40 flex items-center justify-center`}
          style={{ zIndex: 40 }}
        >
          <div className="relative w-full h-full" style={{ transform: `scale(${birdsScale})`, transformOrigin: 'center center' }}>
            <Image src="/assets/birds.png" alt="" fill className="object-contain" />
          </div>
        </div>

        <div
          ref={textRef}
          className={`${layerClass} z-50 flex items-center justify-center`}
          style={{ zIndex: 50 }}
        >
          <div className="text-center" style={{ marginTop: '-5%' }}>
            <h1 className="text-hero font-bold tracking-wider" style={{ fontFamily: "var(--font-space, sans-serif)", color: "rgba(255, 255, 255, 0.7)", textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              Ramesh Sunkoju
            </h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl font-light tracking-wide" style={{ fontFamily: "var(--font-space, sans-serif)", color: "rgba(255, 255, 255, 0.5)", textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              Exploring nature's depths through abstract art
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
