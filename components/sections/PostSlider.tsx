"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { posts as staticPosts } from "@/data/posts";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

interface PostSliderProps {
  posts?: PostMeta[];
  categories?: Category[];
}

gsap.registerPlugin(ScrollTrigger);

export function PostSlider({ posts: propPosts }: PostSliderProps) {
  const posts = propPosts ?? staticPosts;
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const hasDragged = useRef(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  // Custom cursor follow
  const handleCursorMove = useCallback((e: React.MouseEvent) => {
    if (!cursorRef.current) return;
    const rect = scrollRef.current?.getBoundingClientRect();
    if (!rect) return;
    gsap.to(cursorRef.current, {
      x: e.clientX - rect.left - 40,
      y: e.clientY - rect.top - 40,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    hasDragged.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: scrollRef.current.scrollLeft };
    // Scale down cursor on grab
    if (cursorInnerRef.current) {
      gsap.to(cursorInnerRef.current, { scale: 0.75, duration: 0.25, ease: "power2.out" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleCursorMove(e);
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (cursorInnerRef.current) {
      gsap.to(cursorInnerRef.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    }
    setTimeout(checkScroll, 50);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setCursorVisible(true);
    handleCursorMove(e);
    if (cursorRef.current) {
      gsap.fromTo(cursorRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" });
    }
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
    setIsDragging(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
    if (cursorInnerRef.current) {
      gsap.set(cursorInnerRef.current, { scale: 1 });
    }
  };

  // GSAP reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector(".slider-header");
      if (header) {
        gsap.fromTo(header, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".slider-card");
      gsap.fromTo(cards, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: scrollRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--fg)" }}
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="slider-header mb-14 flex items-end justify-between">
          <div>
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
              Discover
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
              More to explore
            </h2>
          </div>
          <div className="hidden gap-3 sm:flex items-center">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-all duration-300 hover:bg-white hover:text-[var(--fg)] hover:border-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white/70 disabled:hover:border-white/20"
              aria-label="Scroll left"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-all duration-300 hover:bg-white hover:text-[var(--fg)] hover:border-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white/70 disabled:hover:border-white/20"
              aria-label="Scroll right"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable row with custom cursor area */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="scrollbar-hide relative flex gap-7 overflow-x-auto px-6 pb-4 lg:px-10 select-none"
          style={{ cursor: "none" }}
        >
          {/* Left spacer */}
          <div className="w-[calc((100vw-1280px)/2)] shrink-0 max-xl:hidden" />

          {posts.map((post) => {
            const cat = getCategory(post.category);
            const readTime = post.readingTime;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="slider-card group w-[340px] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0,1)] hover:scale-[1.04] hover:z-10"
                style={{ cursor: "none" }}
                onClick={(e) => { if (hasDragged.current) e.preventDefault(); }}
                draggable={false}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-110"
                    sizes="340px"
                  />
                  {/* Hover overlay with read arrow */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/0 scale-75 opacity-0 transition-all duration-500 group-hover:bg-white/90 group-hover:scale-100 group-hover:opacity-100">
                      <svg className="h-5 w-5 text-[var(--fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="rounded-b-lg border border-t-0 border-white/10 bg-white/[0.05] p-5">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    {cat && (
                      <span className="text-[0.875rem] font-bold uppercase tracking-[0.15em]" style={{ color: cat.color }}>
                        {cat.name}
                      </span>
                    )}
                    <span className="text-base text-white/35">
                      {readTime} min read
                    </span>
                  </div>
                  <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-white/90 transition-colors duration-300 group-hover:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <time className="text-[0.875rem] text-white/30">
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            );
          })}

          {/* Right spacer */}
          <div className="w-6 shrink-0" />
        </div>

        {/* Custom cursor — follows mouse over the scroll area */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden md:flex items-center justify-center"
          style={{ width: 80, height: 80, opacity: 0, transform: "scale(0)" }}
        >
          <div ref={cursorInnerRef} className="relative flex items-center justify-center">
            {/* Outer ring with pulse */}
            <span
              className="absolute h-[72px] w-[72px] rounded-full border-[1.5px] border-white/30"
              style={{ animation: cursorVisible ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : "none" }}
            />
            {/* Middle ring */}
            <span className="absolute h-[52px] w-[52px] rounded-full border border-white/15" />
            {/* Center content */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white">
              {/* Drag arrows icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M8 9l-3 3 3 3" />
                <path d="M16 9l3 3-3 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16" style={{ background: "linear-gradient(to right, var(--fg), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16" style={{ background: "linear-gradient(to left, var(--fg), transparent)" }} />
    </section>
  );
}
