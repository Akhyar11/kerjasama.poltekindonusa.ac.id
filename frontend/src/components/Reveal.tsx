"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  animation?: "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.7,
  threshold = 0.1,
  once = true,
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, threshold]);

  const styles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? "translate(0, 0)" 
      : animation === "fadeInUp" 
        ? "translateY(40px)" 
        : animation === "slideInLeft"
          ? "translateX(-40px)"
          : animation === "slideInRight"
            ? "translateX(40px)"
            : "none",
    transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
    willChange: "transform, opacity",
  };

  return (
    <div ref={ref} style={styles}>
      {children}
    </div>
  );
}
