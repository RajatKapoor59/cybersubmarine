"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PostMeta } from "@/types/post";
import { posts as staticPosts } from "@/data/posts";

gsap.registerPlugin(ScrollTrigger);

const startHereSlugs = [
  "microsoft-365-security-checklist",
  "soc-for-small-business",
  "cyber-essentials-guide",
  "incident-response-plan-template",
];

const fallbackStartHere = [
  {
    slug: "microsoft-365-security-checklist",
    title: "The Microsoft 365 Security Checklist for SMBs",
    excerpt: "43 settings to review across Exchange, SharePoint, Teams, and Entra ID. Start here if your team uses M365.",
    category: "microsoft-365",
    tags: [],
    date: "2026-05-01",
    readingTime: 8,
    featured: true,
    coverImage: "/blog/design-product.webp",
    author: "emma-chen",
  },
  {
    slug: "soc-for-small-business",
    title: "How to Build a SOC on a Small Business Budget",
    excerpt: "You don't need a $2M SIEM. Here's a practical monitoring stack using free and low-cost tools that actually detect real threats.",
    category: "soc-monitoring",
    tags: [],
    date: "2026-05-01",
    readingTime: 10,
    featured: false,
    coverImage: "/blog/forest.jpg",
    author: "emma-chen",
  },
  {
    slug: "cyber-essentials-guide",
    title: "Cyber Essentials: A Plain-English Guide for Small Business",
    excerpt: "What it covers, what it costs, and whether it's worth pursuing for your business. The no-hype breakdown.",
    category: "compliance",
    tags: [],
    date: "2026-05-01",
    readingTime: 7,
    featured: false,
    coverImage: "/blog/sunlit-trees.jpg",
    author: "emma-chen",
  },
  {
    slug: "incident-response-plan-template",
    title: "Incident Response Plan Template (Free Download)",
    excerpt: "A one-page IR plan you can fill in and actually use — not a 40-page document that lives in a drawer.",
    category: "incident-response",
    tags: [],
    date: "2026-05-01",
    readingTime: 5,
    featured: false,
    coverImage: "/blog/editorial-portrait.webp",
    author: "emma-chen",
  },
];

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

  const allPosts = propPosts ?? staticPosts;
  const startHerePosts = startHereSlugs
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter(Boolean) as PostMeta[];
  const displayPosts = startHerePosts.length >= 4 ? startHerePosts : fallbackStartHere;

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

        <div className="sh-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayPosts.map((post, i) => {
            const color = categoryColors[post.category] ?? "#00B4D8";
            const catName = categoryNames[post.category] ?? post.category;
            const isLarge = i === 0;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`sh-card group block p-7 bg-[var(--card)] border border-[var(--border)] rounded-[12px] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-300 ${isLarge ? "md:col-span-2" : ""}`}
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
                  <h3 className={`font-bold text-[var(--fg)] tracking-[-0.01em] mb-3 group-hover:text-[var(--accent-text)] transition-colors duration-200 ${isLarge ? "text-[1.375rem]" : "text-[1.125rem]"}`}>
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
      </div>
    </section>
  );
}
