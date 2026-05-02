"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedPosts } from "@/data/posts";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/Badge";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

interface FeaturedPostsSectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

gsap.registerPlugin(ScrollTrigger);

export function FeaturedPostsSection({ posts: propPosts }: FeaturedPostsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const featured = propPosts ? propPosts.filter((p) => p.featured) : getFeaturedPosts();
  const heroPost = featured[0];
  const secondaryPosts = featured.slice(1, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on hero image
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Stagger reveal for cards and header
      const revealEls = gsap.utils.toArray<HTMLElement>(".featured-reveal");
      revealEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!heroPost) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5">
        {/* ── Section Header ── */}
        <div className="mb-14 featured-reveal">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Featured
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-fg leading-[1.1]">
            Editor&rsquo;s Picks
          </h2>
        </div>

        {/* ── Hero Post — full-width horizontal card ── */}
        <Link
          href={`/blog/${heroPost.slug}`}
          className="group mb-10 block featured-reveal"
        >
          <div className="flex flex-col md:flex-row gap-0 rounded-[var(--radius)] bg-card overflow-hidden border border-border/60">
            {/* Image — 60% */}
            <div
              ref={heroImageRef}
              className="relative w-full md:w-[60%] aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden"
            >
              <Image
                src={heroPost.coverImage}
                alt={heroPost.title}
                fill
                className="object-cover img-scale group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Text — 40% */}
            <div className="flex flex-col justify-center w-full md:w-[40%] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const cat = getCategory(heroPost.category);
                  return cat ? (
                    <Badge color={cat.color}>{cat.name}</Badge>
                  ) : null;
                })()}
                <span className="text-xs text-muted">
                  {heroPost.readingTime} min read
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold leading-[1.15] tracking-tight text-fg mb-4 group-hover:text-accent transition-colors duration-300">
                {heroPost.title}
              </h3>

              <p className="text-[0.95rem] leading-relaxed text-muted mb-6 line-clamp-3">
                {heroPost.excerpt}
              </p>

              <time className="text-xs text-muted/70">
                {formatDate(heroPost.date)}
              </time>
            </div>
          </div>
        </Link>

        {/* ── Secondary Posts — two vertical cards side-by-side ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryPosts.map((post) => {
            const cat = getCategory(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group featured-reveal block"
              >
                <div className="rounded-[var(--radius)] bg-card overflow-hidden border border-border/60 transition-shadow hover:shadow-md">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover img-scale group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      {cat ? (
                        <Badge color={cat.color}>{cat.name}</Badge>
                      ) : null}
                      <span className="text-xs text-muted">
                        {post.readingTime} min read
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold leading-snug tracking-tight text-fg mb-3 group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <time className="text-xs text-muted/70">
                      {formatDate(post.date)}
                    </time>
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
