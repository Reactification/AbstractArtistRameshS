"use client";

/**
 * AboutMeSection Component
 * 
 * A scroll-triggered animation section displaying "About Me" content
 * with GSAP animations. Features a pinned scroll effect where text
 * and image animate into position as the user scrolls.
 * 
 * Animations differ between desktop and mobile views:
 * - Desktop: "About" moves top-left, "Me" moves bottom-right
 * - Mobile: Vertical separation only (About up, Me down)
 */

// React hooks for refs, lifecycle management, and state
import React, { useRef, useEffect, useState } from "react";

// GSAP animation library for high-performance animations
import gsap from "gsap";

// GSAP plugin for scroll-triggered animations
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin to enable scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONFIGURATION CONSTANTS
// ============================================

// Image display dimensions in pixels
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 550;

// Path to the artist/owner image asset
const IMAGE_URL = "/assets/ramesh_s.png";

// Custom cubic-bezier easing function
// Creates a slight bounce effect at the end of transitions for natural motion
const CUSTOM_EASE = "cubic-bezier(0, .33, .07, 1.03)";

// ============================================
// MAIN COMPONENT
// ============================================

export default function AboutMeSection() {
  // --------------------------------------------
  // REF DECLARATIONS
  // Used to reference DOM elements for GSAP animations
  // --------------------------------------------

  // Main section container (outer wrapper for the entire section)
  const sectionRef = useRef<HTMLElement>(null);

  // Pinned container (stays fixed during scroll animation)
  const pinnedRef = useRef<HTMLDivElement>(null);

  // Wrapper for "About Me" heading text
  const wordWrapperRef = useRef<HTMLDivElement>(null);

  // "About" heading element (animates to top-left on desktop)
  const aboutTextRef = useRef<HTMLHeadingElement>(null);

  // "Me" heading element (animates to bottom-right on desktop)
  const meTextRef = useRef<HTMLHeadingElement>(null);

  // Container div for the main image
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Main image element
  const imageRef = useRef<HTMLImageElement>(null);

  // Bio text positioned at bottom-left of image
  const bioBottomLeftRef = useRef<HTMLDivElement>(null);

  // Bio text positioned at top-right of image
  const bioTopRightRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------

  // Tracks if viewport is mobile (< 768px width)
  // Determines which animation variant to use
  const [isMobile, setIsMobile] = useState(false);

  // Tracks if component has mounted on client-side
  // Required because GSAP needs DOM elements to be present
  const [mounted, setMounted] = useState(false);

  // --------------------------------------------
  // MOUNTING EFFECT
  // Initializes state after component mounts on client
  // --------------------------------------------

  useEffect(() => {
    // Mark component as mounted (client-side hydration complete)
    setMounted(true);

    // Check if screen width is less than 768px (mobile breakpoint)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on initial mount

    // Add resize listener to update mobile state when window is resized
    window.addEventListener("resize", checkMobile);

    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener("resize", checkMobile);
  }, []); // Empty dependency array: runs once on mount

  // --------------------------------------------
  // GSAP ANIMATION EFFECT
  // Sets up scroll-triggered animations for the section
  // Animations run when user scrolls through the section
  // --------------------------------------------

  useEffect(() => {
    // Exit early if:
    // - Component hasn't mounted (no client-side hydration)
    // - Required refs are not available (DOM not ready)
    if (!mounted || !sectionRef.current || !pinnedRef.current) return;

    // Create GSAP context for proper cleanup of all animations
    // This prevents memory leaks and conflicts with React's rendering
    const ctx = gsap.context(() => {
      // Get references to DOM elements from refs
      const wordWrapper = wordWrapperRef.current;
      const aboutText = aboutTextRef.current;
      const meText = meTextRef.current;
      const bioTopRight = bioTopRightRef.current;
      const bioBottomLeft = bioBottomLeftRef.current;
      const imageEl = imageRef.current;
      const imageContainer = imageContainerRef.current;

      // Validate all required elements exist before animating
      if (!wordWrapper || !aboutText || !meText || !imageContainer || !imageEl) return;

      // --------------------------------------------
      // SET INITIAL STATES
      // Configure starting positions and properties for all animated elements
      // --------------------------------------------

      // Center the word wrapper and set initial opacity
      gsap.set(wordWrapper, {
        left: "50%",
        top: "50%",
        xPercent: -50,  // Center horizontally using percentage
        yPercent: -50,  // Center vertically using percentage
        opacity: 1,
        force3D: true,  // Force GPU acceleration for smoother animations
      });

      // Set initial state for "About" text
      gsap.set(aboutText, {
        x: 0,           // Start at original horizontal position
        opacity: 1,
        force3D: true,
      });

      // Set initial state for "Me" text
      gsap.set(meText, {
        x: 0,
        opacity: 1,
        force3D: true,
      });

      // Set initial state for bio text (hidden, unlinked - can edit individually)
      gsap.set(bioTopRight, {
        opacity: 0,
        x: 50,
        y: 0,
      });
      gsap.set(bioBottomLeft, {
        opacity: 0,
        x: -50,
        y: 0,
      });

      // Set initial state for main image (scaled to 0, invisible)
      gsap.set(imageEl, {
        scale: 0,       // Start at 0 scale (invisible)
        opacity: 0,     // Start invisible
      });

      // --------------------------------------------
      // TIMELINE SETUP
      // Create scroll-triggered timeline that pins the section
      // --------------------------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedRef.current,    // Element that triggers the pin (scrolling starts here)
          start: "top top",             // Start pinning when section top reaches viewport top
          end: "+=150%",                // Pin for 150% of viewport height (scroll distance)
          scrub: 1.2,                   // Smooth scrubbing with 1.2s delay (animation lags behind scroll)
          pin: true,                    // Enable pinning (section stays fixed during scroll)
          anticipatePin: 1,             // Anticipate pin for smooth transition
        },
      });

      // --------------------------------------------
      // DESKTOP ANIMATIONS (screen width >= 768px)
      // "About" moves to top-left, "Me" moves to bottom-right
      // --------------------------------------------

      if (!isMobile) {
        // Animate "About" text to top-left of image
        tl.to(aboutText, {
          x: -265,              // Move 246px left from center
          y: -220,              // Move 210px up from center
          duration: 1,          // Animation duration in seconds
          ease: CUSTOM_EASE,    // Custom easing with bounce effect
        }, 0);                  // Start at timeline position 0

        // Animate "Me" text to bottom-right of image
        tl.to(meText, {
          x: 155,               // Move 180px right from center
          y: 220,               // Move 270px down from center
          duration: 1,
          ease: CUSTOM_EASE,
        }, 0);

        // Scale up and fade in the main image
        tl.to(imageEl, {
          scale: 1,             // Scale from 0 to 1 (full size)
          opacity: 1,           // Fade in from 0 to 1
          duration: 1,
          ease: CUSTOM_EASE,
        }, 0);

        // Fade in bio text (top-right position - unlinked, editable)
        tl.to(bioTopRight, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: CUSTOM_EASE,
        }, 0.6);

        // Fade in bio text (bottom-left position - unlinked, editable)
        tl.to(bioBottomLeft, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: CUSTOM_EASE,
        }, 0.6);
      }

      // --------------------------------------------
      // MOBILE ANIMATIONS (screen width < 768px)
      // Simpler animation: "About" moves up, "Me" moves down
      // Bio text repositions to stack vertically
      // --------------------------------------------

      else {
        // Reset word wrapper position for mobile
        gsap.set(wordWrapper, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
        });

        // Animate "About" text upward (vertical movement only)
        tl.to(aboutText, {
          x: 0,                 // No horizontal movement on mobile
          y: -180,              // Move 180px up from center
          duration: 1,
          ease: CUSTOM_EASE,
        }, 0);

        // Animate "Me" text downward (vertical movement only)
        tl.to(meText, {
          x: 0,
          y: 180,                // Move 180px down from center
          duration: 1,
          ease: CUSTOM_EASE,
        }, 0);

        // Reposition bio text elements for mobile layout
        // Bottom-left bio: centered at bottom
        gsap.set(bioBottomLeft, {
          left: "50%",
          top: "auto",
          bottom: "calc(5% + 70px)",
          xPercent: -50,
          x: 0,
        });

        // Top-right bio: centered at top
        gsap.set(bioTopRight, {
          left: "50%",
          top: "calc(5% + 70px)",
          xPercent: -50,
          x: 0,
        });

        // Scale up and fade in the main image
        tl.to(imageEl, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: CUSTOM_EASE,
        }, 0);

        // Mobile animations (unlinked - can edit individually)
        tl.to(bioTopRight, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
        }, 0.5);
        tl.to(bioBottomLeft, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
        }, 0.5);
      }
    }, sectionRef); // Scope animations to sectionRef element

    // Clean up GSAP animations when component unmounts
    // Prevents animations from running on unmounted components
    return () => ctx.revert();
  }, [mounted, isMobile]); // Re-run animation setup when mounted state or mobile state changes

  // --------------------------------------------
  // RENDER
  // Returns the JSX structure for the About Me section
  // --------------------------------------------

  return (
    // Main section container with black background
    <section
      ref={sectionRef}
      id="about"                                    // Section ID for navigation links
      className="relative w-full"                   // Full width, position relative
      style={{ backgroundColor: "#000000", minHeight: "100vh" }}  // Black background, min full viewport height
    >
      {/* Pinned container - stays fixed during scroll animation */}
      <div
        ref={pinnedRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* ========================================== */}
        {/* BIO TEXT - top right */}
        {/* Positioned relative to image center */}
        {/* ========================================== */}
        {/* ========================================== */}
        {/* BIO TEXT - LEFT SIDE (Near "About" headline) */}
        {/* ========================================== */}
        <div
          ref={bioBottomLeftRef}
          className="absolute"
          style={{
            // Position: left of About text (aligned with About headline)
            left: "calc(50% - 433px)",
            // Position: below About headline
            top: "calc(50% - 180px)",
            maxWidth: "220px",
          }}
        >
          <p
            className="text-xs leading-relaxed text-justify"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-space, sans-serif)",
              textAlign: "justify",
            }}
          >
            Hello everyone, this is Ramesh, I am an ardent nature lover. My biggest inspiration comes from nature...
            A Little About Me..
            According to me nature is painting for us day after day,my pictuers of infinite beauty, fresh and vibrant colours give positive vibes and motivatesme to paint the colour of nature. I would like to transform the richness of nature with with a focus on environmental sceneries as my principal subject matter.
          </p>
        </div>

        {/* ========================================== */}
        {/* BIO TEXT - RIGHT SIDE (Near "Me" headline) */}
        {/* ========================================== */}
        <div
          ref={bioTopRightRef}
          className="absolute"
          style={{
            // Position: right of Me text
            left: "calc(50% + 210px)",
            // Position: above Me headline
            top: "calc(50% + 90px)",
            maxWidth: "220px",
            zIndex: 20, // Ensures it is never behind the image
          }}
        >
          <p
            className="text-xs leading-relaxed text-justify"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-space, sans-serif)",
              textAlign: "justify",
            }}
          >
            My Work reflects
            Nature in several forms
            Mainly in Landscape Art
            Photorealistic Paintings
            Abstract Nature Paintings
            Nature Paintings in water colours
            Digital art
          </p>
        </div>

        {/* ========================================== */}
        {/* MAIN IMAGE CONTAINER */}
        {/* Displays the artist's photo with fixed dimensions */}
        {/* ========================================== */}
        <div
          ref={imageContainerRef}
          className="relative"
          style={{
            width: `${IMAGE_WIDTH}px`,   // 400px width
            height: `${IMAGE_HEIGHT}px`, // 550px height
          }}
        >
          {/* Overflow hidden wrapper for image */}
          <div className="absolute inset-0 overflow-hidden rounded-[20px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]">
            <img
              ref={imageRef}
              src={IMAGE_URL}
              alt="About Me"
              className="w-full h-full object-cover"
              style={{
                width: `${IMAGE_WIDTH}px`,
                height: `${IMAGE_HEIGHT}px`,
                outline: "1px solid #8C7851",
                outlineOffset: "-1px",
              }}
            />
          </div>
        </div>

        {/* ========================================== */}
        {/* TEXT WRAPPER - "ABOUT ME" */}
        {/* Contains the "About" and "Me" heading text */}
        {/* Positioned in center, animated apart during scroll */}
        {/* ========================================== */}
        <div
          ref={wordWrapperRef}
          className="absolute flex items-center justify-center"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* "ABOUT" heading - animated to top-left on desktop */}
          <h3
            ref={aboutTextRef}
            className="text-hero whitespace-nowrap z-10 pointer-events-none"
            style={{
              fontFamily: "var(--font-space, sans-serif)",  // Space font from CSS variables
              color: "#8C7851",                                      // White text color
            }}
          >
            About
          </h3>

          {/* "ME" heading - animated to bottom-right on desktop */}
          <h3
            ref={meTextRef}
            className="text-hero whitespace-nowrap z-10 pointer-events-none"
            style={{
              fontFamily: "var(--font-space, sans-serif)",
              color: "#8C7851",
            }}
          >
            Me
          </h3>
        </div>
      </div>
    </section>
  );
}
