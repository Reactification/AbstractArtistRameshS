"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CUSTOM_EASE = "cubic-bezier(0, .33, .07, 1.03)";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: <Award size={32} />, value: "3", label: "Solo Shows" },
  { icon: <Users size={32} />, value: "9", label: "Group Shows" },
  { icon: <Palette size={32} />, value: "3", label: "Art Camps" },
];

export default function AccoladesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLImageElement>(null);
  const rightImgRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftImgRef.current) {
        gsap.to(leftImgRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (rightImgRef.current) {
        gsap.to(rightImgRef.current, {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: CUSTOM_EASE,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !cardRef.current) return;

    const card = cardRef.current;
    const shimmer = card.querySelector('.shimmer-border') as HTMLElement;

    const handleMouseEnter = () => {
      if (shimmer) {
        gsap.fromTo(shimmer,
          { x: '-100%', opacity: 0.5 },
          { x: '100%', opacity: 0.5, duration: 1.5, ease: "power2.inOut" }
        );
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    return () => card.removeEventListener('mouseenter', handleMouseEnter);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="accolades"
      className="relative w-full py-32 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          ref={leftImgRef}
          src="/assets/s1@2x.jpg"
          alt=""
          className="absolute left-0 top-0 h-[120%] w-auto object-cover"
          style={{ opacity: 0.2, maxWidth: "50vw" }}
        />
        <img
          ref={rightImgRef}
          src="/assets/s2@2x.jpg"
          alt=""
          className="absolute right-0 top-0 h-[120%] w-auto object-cover"
          style={{ opacity: 0.2, maxWidth: "50vw" }}
        />
      </div>

      <div className="relative z-10 px-4">
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-16"
          style={{
            fontFamily: "var(--font-space, sans-serif)",
            color: "#8C7851",
            textShadow: "0 0 20px rgba(140, 120, 81, 0.3)",
          }}
        >
          Accolades
        </h2>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div
            ref={cardRef}
            className="relative p-8 md:p-12 rounded-2xl max-w-4xl w-full text-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid #8C7851",
            }}
          >
            <div
              className="shimmer-border absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(140, 120, 81, 0.4), transparent)",
                  width: "60%",
                }}
              />
            </div>

            <p
              className="text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              I have been recognised as an outstanding artist by the Art Society of India Mumbai and has participated in prestigious events like the Lalitha Kala Academy art camp and the 105 art group show in Chandigarh.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div
                    className="mx-auto w-16 h-16 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(140, 120, 81, 0.1)" }}
                  >
                    <div style={{ color: "#8C7851" }}>{stat.icon}</div>
                  </div>
                  <div
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: "#8C7851" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm md:text-base uppercase tracking-wider"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
