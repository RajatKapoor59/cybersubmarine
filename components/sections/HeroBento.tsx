"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { posts as staticPosts } from "@/data/posts";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

interface HeroBentoProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function HeroBento({ posts: propPosts }: HeroBentoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const posts = propPosts ?? staticPosts;

  // Take up to 8 posts for the bento
  const bentoItems = posts.slice(0, 8);
  const hero = bentoItems[0];
  const secondary = bentoItems.slice(1, 3);
  const tertiary = bentoItems.slice(3, 5);
  const compact = bentoItems.slice(5, 8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image clip-path reveal
      const heroImg = sectionRef.current?.querySelector(".bento-hero-img");
      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // Stagger all cards
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      // Header reveal
      const header = sectionRef.current?.querySelector(".bento-header");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-6 md:pt-16 md:pb-10">
        {/* Section header */}
        <div className="bento-header mb-8 md:mb-12 flex items-end justify-between">
          <div>
            <span className="text-base font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
              Issue No. 08 &mdash; April 2026
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]" style={{ color: "var(--fg)" }}>
              Stories worth
              <br />
              reading.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-base font-semibold transition-colors hover:opacity-70"
            style={{ color: "var(--fg)" }}
          >
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* ── ROW 1: Hero (8 cols) + 2 stacked secondary (4 cols) ── */}
          {/* Hero card — large */}
          <Link
            href={`/blog/${hero.slug}`}
            className="bento-card group md:col-span-8 md:row-span-2 relative overflow-hidden"
            style={{ borderRadius: "var(--radius)" }}
          >
            <div className="bento-hero-img relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[540px] overflow-hidden" style={{ clipPath: "inset(0 0 100% 0)" }}>
              <Image
                src={hero.coverImage}
                alt={hero.title}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const cat = getCategory(hero.category);
                    return cat ? (
                      <span className="text-base font-bold uppercase tracking-[0.15em]" style={{ color: cat.color }}>
                        {cat.name}
                      </span>
                    ) : null;
                  })()}
                  <span className="text-[0.875rem] text-white/60">
                    {hero.readingTime} min read
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white mb-2 md:mb-3 group-hover:text-white/90 transition-colors line-clamp-2 sm:line-clamp-3">
                  {hero.title}
                </h2>
                <p className="hidden md:block text-lg leading-relaxed text-white/70 max-w-lg mb-4 line-clamp-2">
                  {hero.excerpt}
                </p>
                <time className="text-[0.875rem] text-white/50">{formatDate(hero.date)}</time>
              </div>
            </div>
          </Link>

          {/* Secondary cards — stacked right */}
          {secondary.map((post) => {
            const cat = getCategory(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bento-card group md:col-span-4 relative overflow-hidden"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[258px] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {cat && (
                        <span className="text-[0.875rem] font-bold uppercase tracking-[0.15em]" style={{ color: cat.color }}>
                          {cat.name}
                        </span>
                      )}
                      <span className="text-base text-white/50">
                        {post.readingTime} min
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold leading-snug text-white group-hover:text-white/90 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* ── ROW 2: Two medium cards ── */}
          {tertiary.map((post) => {
            const cat = getCategory(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bento-card group md:col-span-6 overflow-hidden border"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--card)" }}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative sm:w-[45%] aspect-[16/10] sm:aspect-auto overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 md:p-6 sm:w-[55%]">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      {cat && (
                        <span className="text-[0.875rem] font-bold uppercase tracking-[0.15em]" style={{ color: cat.color }}>
                          {cat.name}
                        </span>
                      )}
                      <span className="text-base" style={{ color: "var(--muted)" }}>
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2" style={{ color: "var(--fg)" }}>
                      {post.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed line-clamp-2 hidden sm:block" style={{ color: "var(--muted)" }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* ── ROW 3: Three compact cards ── */}
          {compact.map((post) => {
            const cat = getCategory(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bento-card group md:col-span-4 overflow-hidden border"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--card)" }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {cat && (
                      <span className="text-[0.875rem] font-bold uppercase tracking-[0.12em]" style={{ color: cat.color }}>
                        {cat.name}
                      </span>
                    )}
                    <span className="text-base" style={{ color: "var(--muted)" }}>
                      {post.readingTime} min
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2" style={{ color: "var(--fg)" }}>
                    {post.title}
                  </h3>
                  <time className="mt-2 block text-base" style={{ color: "var(--muted)", opacity: 0.7 }}>
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
