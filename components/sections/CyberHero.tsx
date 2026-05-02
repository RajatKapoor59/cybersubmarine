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
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D1B2A 0%, #0f2235 60%, #0D1B2A 100%)" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent orb */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)",
          transform: "translate(30%, -20%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 w-full">
        <div className="max-w-[820px]">
          {/* Label */}
          <div className="hero-label flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--teal)]/30 bg-[var(--teal)]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                For SMBs & IT teams
              </span>
            </div>
          </div>

          {/* H1 */}
          <h1 className="hero-h1 mb-6">
            <span className="line block text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Cybersecurity Guides
            </span>
            <span className="line block text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              for Small Business —
            </span>
            <span className="line block text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--teal)]">
              Without the Jargon.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-[1.125rem] md:text-[1.25rem] text-white/60 leading-[1.65] max-w-[600px] mb-10">
            Practical, plain-English security guides written for the teams running Microsoft 365, managing compliance, and making real decisions without a full security department.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-wrap gap-4 mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-[var(--navy)] bg-[var(--teal)] rounded-[8px] hover:bg-[#00c9f0] transition-colors duration-200"
            >
              Browse the guides
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/#start-here"
              className="inline-flex items-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-white border border-white/20 rounded-[8px] hover:border-white/40 hover:bg-white/5 transition-colors duration-200"
            >
              Start here
            </Link>
          </div>

          {/* Trust bar */}
          <div className="hero-trust border-t border-white/10 pt-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/30 mb-5">
              Trusted by IT teams at
            </p>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {["Law firms", "Accountancy practices", "Healthcare clinics", "Financial advisers", "Managed service providers"].map((name) => (
                <span key={name} className="hero-stat text-[13px] font-medium text-white/55">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
    </section>
  );
}
