"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    slug: "soc-monitoring",
    name: "SOC & Monitoring",
    count: "12 guides",
    color: "#00B4D8",
    description: "Set up threat detection, respond to alerts, and build a monitoring stack that doesn't require a full team.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365 Security",
    count: "14 guides",
    color: "#0077A8",
    description: "Lock down email, SharePoint, and Teams. Configure Defender, Conditional Access, and MFA the right way.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    slug: "managed-security",
    name: "Managed Security",
    count: "8 guides",
    color: "#005F73",
    description: "Everything you need to know before signing with an MSSP or MDR provider — questions to ask, red flags to spot.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    slug: "compliance",
    name: "Compliance & Certification",
    count: "10 guides",
    color: "#2E8B57",
    description: "SOC 2, ISO 27001, Cyber Essentials — broken down into what you actually need to do, not what sounds impressive.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    slug: "incident-response",
    name: "Incident Response",
    count: "7 guides",
    color: "#C9541A",
    description: "Build an incident response plan before you need one. Know exactly what to do when ransomware hits or data leaks.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    slug: "tool-comparisons",
    name: "Tool Comparisons",
    count: "9 guides",
    color: "#7B5EA7",
    description: "Honest head-to-head reviews of EDR, SIEM, password managers, and more — written for SMB budgets and requirements.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export function TopicPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tp-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".tp-header", start: "top 85%", once: true } }
      );
      gsap.fromTo(
        ".tp-card",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power2.out", scrollTrigger: { trigger: ".tp-grid", start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="tp-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)] mb-3">
              Topic areas
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--fg)]">
              Six areas. One goal: keep
              <br />your business protected.
            </h2>
          </div>
          <Link
            href="/categories"
            className="shrink-0 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--accent-text)] hover:gap-3 transition-all duration-200"
          >
            View all topics
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="tp-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              href={`/categories/${p.slug}`}
              className="tp-card group block p-7 bg-[var(--card)] border border-[var(--border)] rounded-[12px] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              {/* Color top strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: p.color }} />

              <div
                className="flex items-center justify-center w-11 h-11 rounded-[10px] mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${p.color}18`, color: p.color }}
              >
                {p.icon}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-[1rem] font-bold text-[var(--fg)] tracking-[-0.01em]">{p.name}</h3>
                <span className="text-[11px] font-semibold text-[var(--muted)] ml-2 shrink-0">{p.count}</span>
              </div>

              <p className="text-[0.875rem] text-[var(--muted)] leading-relaxed mb-5">{p.description}</p>

              <div className="flex items-center gap-1.5 text-[var(--accent-text)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[13px] font-semibold">
                Browse guides
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
