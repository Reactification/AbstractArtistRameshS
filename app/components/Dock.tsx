'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Home, User, Image, Award, Star, Mail } from 'lucide-react';

interface DockItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const dockItems: DockItem[] = [
  { icon: Home, label: 'Home', id: 'hero' },
  { icon: User, label: 'About', id: 'about' },
  { icon: Image, label: 'Gallery', id: 'work' },
  { icon: Award, label: 'Accolades', id: 'accolades' },
  { icon: Star, label: 'Distinctions', id: 'distinctions' },
  { icon: Mail, label: 'Contact', id: 'contact' },
];

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;

    const dockRect = dockRef.current.getBoundingClientRect();
    const mouseX = e.clientX;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(mouseX - itemCenterX);

      const maxDistance = 180;
      const scale = Math.max(1, 1.6 - (distance / maxDistance) * 0.6);

      gsap.to(item, {
        scaleX: scale,
        scaleY: scale,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    itemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (!element) {
      console.log(`Element with id "${id}" not found`);
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-2 px-3 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(140, 119, 81, 0.3)',
          borderRadius: '9999px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Clicked:', item.id);
                scrollToSection(item.id);
              }}
              className="flex flex-col-reverse items-center cursor-pointer group"
              style={{ transformOrigin: 'center bottom' }}
            >
              <div className="p-3 rounded-full transition-colors duration-200 hover:bg-white/10">
                <Icon
                  size={26}
                  color="#FF8C00"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: '#FF8C00', fontFamily: 'var(--font-outfit, sans-serif)' }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
