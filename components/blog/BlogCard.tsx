"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PostMeta } from "@/types/post";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";

gsap.registerPlugin(ScrollTrigger);

interface BlogCardProps {
  post: PostMeta;
  index?: number;
  layout?: "vertical" | "horizontal";
}

export function BlogCard({ post, index = 0, layout = "vertical" }: BlogCardProps) {
  const category = getCategory(post.category);
  const readTime = post.readingTime;
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, [index]);

  if (layout === "horizontal") {
    return (
      <article ref={cardRef}>
        <Link href={`/blog/${post.slug}`} className="group grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-3">
              {category && (
                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                  {category.name}
                </span>
              )}
              <span className="text-[0.875rem] text-muted">{readTime} min read</span>
            </div>
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-accent md:text-4xl">
              {post.title}
            </h3>
            <p className="mb-4 text-base leading-relaxed text-muted line-clamp-3">
              {post.excerpt}
            </p>
            <time className="text-base text-muted/60">{formatDate(post.date)}</time>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article ref={cardRef}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-[var(--radius)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </div>
        <div className="mb-2.5 flex items-center gap-3">
          {category && (
            <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
              {category.name}
            </span>
          )}
          <span className="text-[0.875rem] text-muted">{readTime} min</span>
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mb-3 text-base leading-relaxed text-muted line-clamp-2">
          {post.excerpt}
        </p>
        <time className="text-base text-muted/60">{formatDate(post.date)}</time>
      </Link>
    </article>
  );
}
