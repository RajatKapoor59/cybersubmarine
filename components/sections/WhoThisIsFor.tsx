"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "IT Managers & MSPs",
    description: "You're the one-person security team for 50–500 users. You need clear answers, not another 300-page framework.",
    tags: ["SOC setup", "M365 hardening", "Vendor selection"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Small Business Owners",
    description: "Security isn't your job, but a breach would be your problem. These guides help you ask the right questions and make smarter decisions.",
    tags: ["Compliance basics", "Cyber insurance", "Incident response"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Compliance Leads",
    description: "Chasing SOC 2, ISO 27001, or Cyber Essentials? We break down what each framework actually requires — and what you can skip.",
    tags: ["SOC 2", "ISO 27001", "Cyber Essentials"],
  },
];

export function WhoThisIsFor() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wtif-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".wtif-header", start: "top 85%", once: true } }
      );
      gsap.fromTo(
        ".wtif-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".wtif-grid", start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="wtif-header max-w-[580px] mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)] mb-3">
            Who this is for
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--fg)] mb-4">
            Built for the people
            <br />running security without a CISO.
          </h2>
          <p className="text-[1rem] text-[var(--muted)] leading-relaxed">
            Most security content is written for enterprise teams with dedicated analysts. This isn&apos;t. It&apos;s for the rest of us.
          </p>
        </div>

        <div className="wtif-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="wtif-card p-8 bg-[var(--card)] border border-[var(--border)] rounded-[12px] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[var(--accent-soft)] text-[var(--accent-text)] mb-6">
                {a.icon}
              </div>
              <h3 className="text-[1.125rem] font-bold text-[var(--fg)] mb-3 tracking-[-0.01em]">
                {a.title}
              </h3>
              <p className="text-[0.9375rem] text-[var(--muted)] leading-relaxed mb-5">
                {a.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-text)] bg-[var(--accent-soft)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
