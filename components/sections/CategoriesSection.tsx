"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories as staticCategories } from "@/data/categories";
import { posts as staticPosts } from "@/data/posts";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, React.ReactNode> = {
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="19" cy="17" r="2" />
      <circle cx="6" cy="12" r="3" />
    </svg>
  ),
  development: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  creativity: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  productivity: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  writing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

interface CategoriesSectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function CategoriesSection({ posts: propPosts, categories: propCategories }: CategoriesSectionProps) {
  const posts = propPosts ?? staticPosts;
  const categories = propCategories ?? staticCategories;
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const header = sectionRef.current?.querySelector(".cat-header");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Stagger reveal for category cards
      const cards = gsap.utils.toArray<HTMLElement>(".cat-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5">
        {/* ── Section Header ── */}
        <div className="cat-header mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Explore
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-fg">
            Browse by Topic
          </h2>
        </div>

        {/* ── Horizontal Scroll Row ── */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-5 px-5"
        >
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="cat-card group flex-shrink-0 snap-start"
              >
                <div className="relative flex w-[220px] flex-col rounded-[var(--radius)] border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-1 overflow-hidden">
                  {/* Colored top strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: cat.color }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${cat.color}20`,
                      color: cat.color,
                    }}
                  >
                    {categoryIcons[cat.slug] || (
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 text-base font-bold text-fg">
                    {cat.name}
                  </h3>

                  {/* Post count */}
                  <p className="text-base text-muted">
                    {count} {count === 1 ? "article" : "articles"}
                  </p>

                  {/* Arrow on hover */}
                  <div className="mt-4 flex items-center text-accent opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
