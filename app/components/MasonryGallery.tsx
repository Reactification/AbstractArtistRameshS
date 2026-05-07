"use client";

import { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMedia } from "@/hooks/useMedia";
import { X } from "lucide-react";

interface Project {
  id: string;
  img: string;
  url?: string;
  size?: "standard" | "featured";
}

interface MasonryGalleryProps {
  projects: Project[];
  scaleOnHover?: boolean;
  hoverScale?: number;
  colorShiftOnHover?: boolean;
}

export default function MasonryGallery({
  projects = [],
  scaleOnHover = true,
  hoverScale = 0.98,
  colorShiftOnHover = true,
}: MasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const columns = useMedia();
  const [containerWidth, setContainerWidth] = useState(1200);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerWidth(w > 0 ? w : 1200);
      }
    };
    updateWidth();
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, []);

  const { items, totalHeight } = useMemo(() => {
    if (containerWidth === 0) return { items: [], totalHeight: 0 };

    const columnHeights = new Array(columns).fill(0);
    const columnWidth = containerWidth / columns;

    const items = projects.map((project) => {
      const isFeatured = project.size === "featured";
      const col = columnHeights.indexOf(Math.min(...columnHeights));
      const x = columnWidth * col;

      const h = isFeatured ? columnWidth * 1.125 : columnWidth * 0.75;

      const y = columnHeights[col];
      columnHeights[col] += h;

      return {
        ...project,
        x,
        y,
        width: columnWidth,
        height: h,
      };
    });

    const totalHeight = Math.max(...columnHeights);
    return { items, totalHeight };
  }, [projects, containerWidth, columns]);

  useLayoutEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".item-wrapper");
      if (wrappers.length === 0) return;

      gsap.fromTo(
        wrappers,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [items.length, columns, containerWidth]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (!scaleOnHover && !colorShiftOnHover) return;

      const wrappers = gsap.utils.toArray<HTMLElement>(".item-wrapper");
      if (wrappers.length === 0) return;

      wrappers.forEach((wrapper) => {
        const overlay = wrapper.querySelector(".color-overlay");

        wrapper.addEventListener("mouseenter", () => {
          if (scaleOnHover) {
            gsap.to(wrapper, { scale: hoverScale, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          }
          if (colorShiftOnHover && overlay) {
            gsap.to(overlay, { opacity: 0.4, duration: 0.3, ease: "power2.out" });
          }
        });

        wrapper.addEventListener("mouseleave", () => {
          if (scaleOnHover) {
            gsap.to(wrapper, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          }
          if (colorShiftOnHover && overlay) {
            gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      className="relative w-full py-16"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-12 "
          style={{ color: "#8C7851" }}
        >
          My Works
        </h2>

        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            height: `${totalHeight}px`,
          }}
        >
           {items.map((item) => (
            <div
              key={item.id}
              className={`item-wrapper ${item.size === "featured" ? "featured" : ""} cursor-pointer`}
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
              }}
              onClick={() => setSelectedImage(item.img)}
            >
              <div className="item-img">
                <img
                  src={item.img}
                  alt={item.id}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", outline: "1px solid #8C7851", outlineOffset: "-1px" }}
                />
                <div className="color-overlay" />
              </div>
            </div>
          ))}

          {selectedImage && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt=""
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    </section >
  );
}