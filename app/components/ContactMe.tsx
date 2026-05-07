"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CUSTOM_EASE = "cubic-bezier(0, 0.33, 0.07, 1.03)";

export default function ContactMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: CUSTOM_EASE,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !buttonRef.current) return;

    const button = buttonRef.current;
    const shimmer = button.querySelector('.shimmer') as HTMLElement;

    const handleMouseEnter = () => {
      if (shimmer) {
        gsap.fromTo(shimmer,
          { x: '-100%' },
          { x: '100%', duration: 0.6, ease: "power2.inOut" }
        );
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    return () => button.removeEventListener('mouseenter', handleMouseEnter);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !inputRef.current) return;

    const input = inputRef.current;
    const container = input.closest('.input-container') as HTMLElement;

    const handleFocus = () => {
      if (container) {
        container.style.borderColor = "rgba(140, 120, 81, 1)";
        container.style.boxShadow = "0 0 15px rgba(140, 120, 81, 0.5)";
      }
    };

    const handleBlur = () => {
      if (container) {
        container.style.borderColor = "rgba(140, 120, 81, 0.4)";
        container.style.boxShadow = "none";
      }
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={containerRef}
          className="relative p-8 md:p-12 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(15px)",
            border: "1px solid #8C7851",
          }}
        >
          <div className="shimmer-border absolute inset-0 rounded-2xl pointer-events-none" style={{ opacity: 0.4 }}>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(140, 120, 81, 0.3), transparent)",
                width: "60%",
              }}
            />
          </div>

          <div className="space-y-4 relative z-10">
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{
                fontFamily: "var(--font-space, sans-serif)",
                color: "#8C7851",
              }}
            >
              Contact
            </h2>
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Questions? Reach out anytime
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: "#8C7851" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: "#8C7851" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: "#8C7851" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.17a4.83 4.83 0 0 1-2.57-.8 5.53 5.53 0 0 1-2.08-3.37 1.25 1.25 0 0 0-1.24-1h-3.79v12.86a3.32 3.32 0 0 1-2.59-1.14 3.34 3.34 0 0 1-.68-1.9 3.34 3.34 0 0 1 3.34-3.34 3.4 3.4 0 0 1 1.18.22v3.68a1.25 1.25 0 0 1-1.09 1.24 1.25 1.25 0 0 1-1.24-1.24 1.25 1.25 0 0 1 .36-.87 1.25 1.25 0 0 1 .88-.37 1.24 1.24 0 0 1 .87.36 1.25 1.25 0 0 1 .37.88v6.69a3.34 3.34 0 0 1-3.34 3.34 3.34 3.34 0 0 1-3.34-3.34 3.34 3.34 0 0 1 .98-2.37 3.34 3.34 0 0 1 2.36-.98 3.34 3.34 0 0 1 2.37.98 3.34 3.34 0 0 1 .98 2.37V8.38a5.53 5.53 0 0 0 3.24 1.08 5.53 5.53 0 0 0 3.37-2.08 5.53 5.53 0 0 0 .8-2.21z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: "#8C7851" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider" style={{ color: "rgba(140, 120, 81, 0.6)" }}>Email</h3>
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: "#8C7851" }} />
                <a href="mailto:ramesh@example.com" className="text-sm hover:underline" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  ramesh@example.com
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider" style={{ color: "rgba(140, 120, 81, 0.6)" }}>Phone</h3>
              <div className="flex items-center gap-2">
                <Phone size={16} style={{ color: "#8C7851" }} />
                <a href="tel:+911234567890" className="text-sm hover:underline" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  +91 12345 67890
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <h3 className="text-sm font-semibold" style={{ color: "#8C7851" }}>Your Email</h3>
            <div className="input-container" style={{ border: "1px solid rgba(140, 120, 81, 0.4)", borderRadius: "8px", padding: "2px" }}>
              <input
                ref={inputRef}
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                style={{ color: "#FFFFFF" }}
              />
            </div>
            <button
              ref={buttonRef}
              className="relative w-full py-3 rounded-lg font-semibold text-sm overflow-hidden cursor-pointer"
              style={{ backgroundColor: "#8C7851", color: "#FFFFFF" }}
            >
              <span className="shimmer absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    width: "50%",
                  }}
                />
              </span>
              <span className="relative z-10">Subscribe</span>
            </button>
          </div>

          <div className="md:col-span-3 relative z-10 mt-8 pt-6" style={{ borderTop: "1px solid rgba(140, 120, 81, 0.2)" }}>
            <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              © 2026. All rights reserved.
            </p>
          </div>

          <div
            ref={portraitRef}
            className="absolute -bottom-12 -right-12 md:-bottom-10 md:-right-10"
            style={{ zIndex: 50 }}
          >
            <div
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden"
              style={{
                border: "5px solid #F0F0F0",
              }}
            >
              <img
                src="/assets/ramesh_s.png"
                alt="Artist Portrait"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
