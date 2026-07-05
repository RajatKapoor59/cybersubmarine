"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export function CyberHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-label", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-h1 .line", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.3")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-trust", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2")
        .fromTo(".hero-stat", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-[var(--bg)]"
    >
      <div className="relative mx-auto max-w-[860px] px-6 md:px-10 w-full text-center">
        {/* Label */}
        <div className="hero-label flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-text)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)]">
              For SMBs & IT teams
            </span>
          </div>
        </div>

        {/* H1 */}
        <h1 className="hero-h1 mb-6">
          <span className="line block font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
            Effortless cybersecurity
          </span>
          <span className="line block font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-[var(--accent-text)]">
            for small business.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-[1.0625rem] md:text-[1.1875rem] text-[var(--muted)] leading-[1.65] max-w-[520px] mx-auto mb-10">
          Practical, plain-English security guides — no jargon, no fear-mongering. Just advice that works, written for teams without a full security department.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-semibold text-[var(--bg)] bg-[var(--fg)] rounded-full hover:bg-[var(--teal)] transition-colors duration-200"
          >
            Browse the guides
          </Link>
          <Link
            href="/#start-here"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-semibold text-[var(--fg)] bg-transparent border border-[var(--border)] rounded-full hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-colors duration-200"
          >
            Start here
          </Link>
        </div>

        {/* Blob illustration frame */}
        <div className="hero-blob relative mx-auto w-full max-w-[480px] aspect-[4/3]">
          <div
            className="absolute inset-0 bg-[var(--surface)] border border-[var(--border)]"
            style={{ borderRadius: "42% 58% 63% 37% / 47% 43% 57% 53%" }}
          />
          <svg
            className="absolute inset-0 w-full h-full p-16"
            viewBox="0 0 200 200"
            fill="none"
          >
            {/* concentric radar rings */}
            {[80, 62, 44, 26].map((r) => (
              <circle key={r} cx="100" cy="100" r={r} stroke="var(--fg)" strokeWidth="0.6" opacity="0.35" />
            ))}
            {/* radial ticks */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const x1 = 100 + Math.cos(angle) * 82;
              const y1 = 100 + Math.sin(angle) * 82;
              const x2 = 100 + Math.cos(angle) * 90;
              const y2 = 100 + Math.sin(angle) * 90;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fg)" strokeWidth="0.6" opacity="0.35" />;
            })}
            {/* shield mark, centered */}
            <path
              d="M100 62 L128 74 V104 C128 124 116 138 100 146 C84 138 72 124 72 104 V74 Z"
              stroke="var(--fg)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path d="M88 100 L97 109 L114 90" stroke="var(--fg)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Trust bar */}
        <div className="hero-trust mt-16 pt-8 border-t border-[var(--border)]">
          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[var(--muted)] mb-5">
            Trusted by IT teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {["Law firms", "Accountancy practices", "Healthcare clinics", "Financial advisers", "Managed service providers"].map((name) => (
              <span key={name} className="hero-stat text-[13px] font-medium text-[var(--muted)]">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
