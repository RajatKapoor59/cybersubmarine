"use client";

import Link from "next/link";
import { posts as staticPosts } from "@/data/posts";
import { getCategory } from "@/data/categories";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

interface MarqueeSectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function MarqueeSection({ posts: propPosts }: MarqueeSectionProps) {
  const posts = propPosts ?? staticPosts;
  // Use all posts as headlines
  const headlines = posts.map((p) => {
    const cat = getCategory(p.category);
    return {
      slug: p.slug,
      title: p.title,
      category: cat?.name ?? p.category,
      color: cat?.color ?? "var(--accent)",
    };
  });

  const doubled = [...headlines, ...headlines];

  return (
    <section
      id="marquee"
      className="relative overflow-hidden border-t border-b"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--fg)" }}
    >
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center border-r px-5 md:px-7" style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "var(--fg)" }}>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="text-base font-bold uppercase tracking-[0.18em] text-white/60 whitespace-nowrap">
            Latest
          </span>
        </div>
      </div>

      {/* Scrolling headlines */}
      <div className="flex overflow-hidden pl-[120px] md:pl-[140px]">
        <div className="flex shrink-0 marquee-left">
          {doubled.map((h, i) => (
            <Link
              key={`${h.slug}-${i}`}
              href={`/blog/${h.slug}`}
              className="group inline-flex shrink-0 items-center gap-4 border-r px-7 py-4 transition-colors hover:bg-white/[0.04]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="shrink-0 text-base font-bold uppercase tracking-[0.12em]"
                style={{ color: h.color }}
              >
                {h.category}
              </span>
              <span className="shrink-0 text-base font-medium text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                {h.title}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 marquee-left" aria-hidden>
          {doubled.map((h, i) => (
            <Link
              key={`dup-${h.slug}-${i}`}
              href={`/blog/${h.slug}`}
              className="group inline-flex shrink-0 items-center gap-4 border-r px-7 py-4 transition-colors hover:bg-white/[0.04]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="shrink-0 text-base font-bold uppercase tracking-[0.12em]"
                style={{ color: h.color }}
              >
                {h.category}
              </span>
              <span className="shrink-0 text-base font-medium text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                {h.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, var(--fg), transparent)" }}
      />
    </section>
  );
}
