"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PostMeta } from "@/types/post";

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  "microsoft-365": "#0077A8",
  "soc-monitoring": "#007391",
  compliance: "#1E7A45",
  "incident-response": "#B04215",
  "managed-security": "#005F73",
  "tool-comparisons": "#7B5EA7",
};

const categoryNames: Record<string, string> = {
  "microsoft-365": "Microsoft 365",
  "soc-monitoring": "SOC & Monitoring",
  compliance: "Compliance",
  "incident-response": "Incident Response",
  "managed-security": "Managed Security",
  "tool-comparisons": "Tool Comparisons",
};

interface StartHereProps {
  posts?: PostMeta[];
}

export function StartHere({ posts: propPosts }: StartHereProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const sorted = [...(propPosts ?? [])].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const displayPosts = sorted.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sh-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".sh-header", start: "top 85%", once: true } }
      );
      gsap.fromTo(
        ".sh-card",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".sh-grid", start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="start-here" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="sh-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)] mb-3">
              Start here
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--fg)]">
              New to CyberSubmarine?
              <br />Read these first.
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--accent-text)] hover:gap-3 transition-all duration-200"
          >
            All guides
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {displayPosts.length === 0 ? (
          <p className="text-[var(--muted)] text-center py-12">No posts published yet.</p>
        ) : (
          <div className="sh-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post) => {
              const color = categoryColors[post.category] ?? "#00B4D8";
              const catName = categoryNames[post.category] ?? post.category;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="sh-card group block p-7 bg-[var(--card)] border border-[var(--border)] rounded-[12px] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] rounded-[4px]"
                        style={{ color, backgroundColor: `${color}18` }}
                      >
                        {catName}
                      </span>
                      <span className="text-[12px] text-[var(--muted)]">{post.readingTime} min read</span>
                    </div>
                    <h3 className="text-[1.125rem] font-bold text-[var(--fg)] tracking-[-0.01em] mb-3 group-hover:text-[var(--accent-text)] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-[0.9375rem] text-[var(--muted)] leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-[var(--accent-text)] text-[13px] font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                      Read guide
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
