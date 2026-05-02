"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--fg)" }}
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[25%] -bottom-[25%]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--fg)] via-transparent to-[var(--fg)]" style={{ opacity: 0.6 }} />

      {/* Dot-grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dot-grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-32 text-center sm:px-16 lg:py-40 max-w-5xl mx-auto">
        <h2
          ref={headlineRef}
          className="mb-6 font-[family-name:var(--font-display)] text-5xl font-bold text-white opacity-0 sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight"
        >
          Ready to start
          <br />
          writing?
        </h2>
        <p
          ref={subtitleRef}
          className="mx-auto mb-12 max-w-lg text-lg sm:text-xl opacity-0 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Your words deserve a beautiful home. Inkwell is the fastest way to
          launch a blog that looks incredible and loads instantly.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col items-center gap-5 opacity-0 sm:flex-row sm:justify-center"
        >
          <ButtonLink href="/blog" variant="primary" on="dark" arrow>
            Explore the Blog
          </ButtonLink>
          <ButtonLink href="#newsletter" variant="secondary" on="dark">
            Subscribe
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
