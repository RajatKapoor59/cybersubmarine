"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PostMeta } from "@/types/post";
import { posts as staticPosts } from "@/data/posts";

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

interface LatestGuidesProps {
  posts?: PostMeta[];
}

export function LatestGuides({ posts: propPosts }: LatestGuidesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const allPosts = propPosts ?? staticPosts;
  const latest = allPosts.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lg-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".lg-header", start: "top 85%", once: true } }
      );
      gsap.fromTo(
        ".lg-card",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".lg-grid", start: "top 80%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[var(--surface)]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="lg-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-text)] mb-3">
              Latest
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--fg)]">
              Recent guides
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

        <div className="lg-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((post) => {
            const color = categoryColors[post.category] ?? "#00B4D8";
            const catName = categoryNames[post.category] ?? post.category;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="lg-card group flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-[12px] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {post.coverImage && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] rounded-[4px]"
                      style={{ color, backgroundColor: `${color}18` }}
                    >
                      {catName}
                    </span>
                    <span className="text-[12px] text-[var(--muted)]">{post.readingTime} min</span>
                  </div>
                  <h3 className="text-[1rem] font-bold text-[var(--fg)] tracking-[-0.01em] mb-2 group-hover:text-[var(--accent-text)] transition-colors duration-200 leading-[1.35]">
                    {post.title}
                  </h3>
                  <p className="text-[0.875rem] text-[var(--muted)] leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[var(--accent-text)] text-[12px] font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    Read guide
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
