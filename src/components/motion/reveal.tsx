"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}

interface StaggerProps extends React.ComponentPropsWithoutRef<"div"> {
  selector?: string;
  stagger?: number;
  y?: number;
  start?: string;
}

export function Stagger({
  children,
  className,
  selector = ":scope > *",
  stagger = 0.09,
  y = 28,
  start = "top 82%",
  ...rest
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [selector, stagger, y, start]);

  return (
    <div ref={ref} data-stagger className={className} {...rest}>
      {children}
    </div>
  );
}
