"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CUSTOM_EASE = "cubic-bezier(0, .33, .07, 1.03)";

interface Distinction {
  id: string;
  img: string;
  title: string;
  organization: string;
  year: string;
}

const distinctions: Distinction[] = [
  {
    id: "1",
    img: "/assets/cert_1.jpg",
    title: "Best Landscape Artist Award",
    organization: "National Art Association",
    year: "2024"
  },
  {
    id: "2",
    img: "/assets/cert_2.jpg",
    title: "Excellence in Watercolor",
    organization: "International Art Institute",
    year: "2023"
  },
  {
    id: "3",
    img: "/assets/esb_1.jpg",
    title: "Featured Artist",
    organization: "Nature Art Magazine",
    year: "2023"
  },
  {
    id: "4",
    img: "/assets/exb_2.jpg",
    title: "Environmental Art Prize",
    organization: "Green Earth Foundation",
    year: "2022"
  },
  {
    id: "5",
    img: "/assets/exb_3.jpg",
    title: "Solo Exhibition Grant",
    organization: "Ministry of Culture",
    year: "2021"
  },
  {
    id: "6",
    img: "/assets/exb_4.jpg",
    title: "Masterpiece Award",
    organization: "Global Art Council",
    year: "2021"
  }
];

export default function Distinctions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: CUSTOM_EASE,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: CUSTOM_EASE,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.distinction-card');

    cards.forEach((card) => {
      const img = card.querySelector('.card-image') as HTMLElement;
      const border = card.querySelector('.card-border') as HTMLElement;
      const shimmer = card.querySelector('.shimmer-effect') as HTMLElement;

      card.addEventListener('mouseenter', () => {
        if (img) gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        if (border) gsap.to(border, { opacity: 1, duration: 0.3 });
        if (shimmer) gsap.fromTo(shimmer, { x: '-100%' }, { x: '100%', duration: 0.6, ease: "power2.inOut" });
      });

      card.addEventListener('mouseleave', () => {
        if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        if (border) gsap.to(border, { opacity: 0.4, duration: 0.3 });
        if (shimmer) gsap.set(shimmer, { x: '-100%' });
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', () => { });
        card.removeEventListener('mouseleave', () => { });
      });
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="distinctions"
      className="relative w-full py-20"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-semibold text-center mb-16"
          style={{
            fontFamily: "var(--font-space, sans-serif)",
            color: "#8C7851",
            textShadow: "0 0 20px rgba(140, 120, 81, 0.3)"
          }}
        >
          Distinctions
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distinctions.map((distinction) => (
            <div
              key={distinction.id}
              className="distinction-card relative rounded-xl overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div
                className="card-border absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  border: "1px solid #8C7851",
                  opacity: 0.4,
                  zIndex: 10
                }}
              />

              <div className="shimmer-effect absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(140, 120, 81, 0.2), transparent)",
                    width: "50%",
                    height: "100%"
                  }}
                />
              </div>

              <div className="relative w-full" style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img
                  src={distinction.img}
                  alt={distinction.title}
                  className="card-image w-full h-full object-cover"
                  style={{ transition: "transform 0.4s ease" }}
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base font-semibold flex-1" style={{ color: "#FFFFFF" }}>
                    {distinction.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded whitespace-nowrap"
                    style={{ backgroundColor: "#8C7851", color: "#000000" }}
                  >
                    {distinction.year}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "rgba(140, 120, 81, 0.8)" }}>
                  {distinction.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
