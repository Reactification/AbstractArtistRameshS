"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
}
