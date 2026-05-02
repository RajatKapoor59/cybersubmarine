"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const signals = [
  {
    stat: "60+",
    label: "Guides published",
    description: "Covering every major threat vector facing SMBs today.",
  },
  {
    stat: "No ads",
    label: "Ever",
    description: "We don't sell ads. Revenue comes from transparent affiliate links and optional consulting.",
  },
  {
    stat: "Plain English",
    label: "Always",
    description: "If a concept needs a dictionary to understand, we haven't explained it properly yet.",
  },
  {
    stat: "Vendor-neutral",
    label: "By design",
    description: "When we recommend a tool, we tell you why — and what the alternatives are.",
  },
];

const principles = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Practical over theoretical",
    text: "Every guide ends with a checklist or next step. No filler, no padding.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Updated when things change",
    text: "We flag outdated content and update guides when tools or regulations change.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Written by practitioners",
    text: "Our authors have run IT at SMBs. They know the constraints, the budget pressure, the 2am pages.",
  },
];

export function TrustSignals() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ts-stat",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".ts-stats", start: "top 82%", once: true } }
      );
      gsap.fromTo(
        ".ts-principle",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".ts-principles", start: "top 82%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Stats row */}
        <div className="ts-stats grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pb-20 border-b border-[var(--border)]">
          {signals.map((s) => (
            <div key={s.stat} className="ts-stat">
              <div className="text-[2.5rem] font-bold text-[var(--fg)] tracking-[-0.03em] leading-none mb-1">
                {s.stat}
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)] mb-2">
                {s.label}
              </div>
              <p className="text-[0.875rem] text-[var(--muted)] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-[380px] shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)] mb-3">
              Our approach
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--fg)]">
              How we decide what to publish.
            </h2>
          </div>
          <div className="ts-principles flex flex-col gap-8 flex-1">
            {principles.map((p) => (
              <div key={p.title} className="ts-principle flex items-start gap-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[var(--accent-soft)] text-[var(--accent-text)] shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[1rem] font-bold text-[var(--fg)] mb-1.5">{p.title}</h3>
                  <p className="text-[0.9375rem] text-[var(--muted)] leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
