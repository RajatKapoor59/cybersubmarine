"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { posts as staticPosts } from "@/data/posts";
import { getCategory } from "@/data/categories";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";
import { CircularText } from "@/components/ui/CircularText";

interface HeroSectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function HeroSection({ posts: propPosts }: HeroSectionProps) {
  const posts = propPosts ?? staticPosts;
  const heroSlides = posts.slice(0, 3).map((post) => {
    const cat = getCategory(post.category);
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.coverImage,
      category: cat?.name ?? post.category,
      categoryColor: cat?.color ?? "#E54D2E",
      readTime: post.readingTime,
    };
  });

  const sectionRef = useRef<HTMLElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

      const textEls = sectionRef.current?.querySelectorAll(".hero-anim");
      if (textEls) {
        tl.fromTo(textEls, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0);
      }

      if (swiperContainerRef.current) {
        tl.fromTo(
          swiperContainerRef.current,
          { opacity: 0, x: 60, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power4.out" },
          0.15
        );
      }

      const sidebar = sectionRef.current?.querySelector(".hero-sidebar");
      if (sidebar) {
        tl.fromTo(sidebar, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.6);
      }

      const circ = sectionRef.current?.querySelector(".hero-circular");
      if (circ) {
        tl.fromTo(circ, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.5);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-[72px]"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Left sidebar — fraction + dots + vertical line */}
      <div
        className="hero-sidebar pointer-events-none absolute left-4 xl:left-8 top-[72px] bottom-0 z-20 hidden xl:flex flex-col items-center"
        style={{ opacity: 0, width: "40px" }}
      >
        {/* Fraction number */}
        <div className="mt-auto mb-auto flex flex-col items-center">
          <span
            className="font-[family-name:var(--font-display)] text-[4.5rem] font-bold leading-none"
            style={{ color: "var(--fg)", opacity: 0.06 }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <div className="my-4 h-12 w-[1px]" style={{ backgroundColor: "var(--border)" }} />

          <span
            className="text-base font-semibold tracking-widest mb-6"
            style={{ color: "var(--muted)", writingMode: "vertical-lr" }}
          >
            INKWELL
          </span>

          {/* Vertical dots */}
          <div className="pointer-events-auto flex flex-col items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className="relative h-3 w-3 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === activeIndex ? "var(--fg)" : "transparent",
                  border: `1.5px solid ${i === activeIndex ? "var(--fg)" : "var(--border)"}`,
                }}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === activeIndex && (
                  <span
                    className="absolute -inset-1.5 rounded-full border animate-ping"
                    style={{ borderColor: "var(--fg)", animationDuration: "2s", opacity: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Fraction text under dots */}
          <span className="mt-4 text-base tabular-nums font-medium" style={{ color: "var(--muted)" }}>
            {String(activeIndex + 1).padStart(2, "0")}/{String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Circular text — bottom center, links to next section */}
      <div className="hero-circular absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:block" style={{ opacity: 0 }}>
        <a href="#marquee" className="relative block">
          <CircularText
            text="STORIES WORTH READING • INKWELL BLOG • "
            size={130}
            className="text-[var(--fg)] opacity-[0.12]"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
          </div>
        </a>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 xl:pl-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center lg:min-h-[calc(88vh-72px)]">

          {/* Text column — static, does NOT change with slide */}
          <div className="order-2 lg:order-1 lg:col-span-5 py-10 lg:py-20">
            {/* Category + read time */}
            <div className="hero-anim mb-5 flex items-center gap-3">
              <span
                className="text-[0.875rem] font-bold uppercase tracking-[0.2em]"
                style={{ color: heroSlides[0].categoryColor }}
              >
                {heroSlides[0].category}
              </span>
              <span className="h-[3px] w-[3px] rounded-full" style={{ backgroundColor: "var(--border)" }} />
              <span className="text-[0.875rem]" style={{ color: "var(--muted)" }}>
                {heroSlides[0].readTime} min read
              </span>
            </div>

            {/* Static h1 */}
            <h1
              className="hero-anim mb-6 font-[family-name:var(--font-display)] text-[3rem] font-bold leading-[1.06] tracking-tight sm:text-[4rem] lg:text-[4.5rem]"
              style={{ color: "var(--fg)" }}
            >
              {heroSlides[0].title}
            </h1>

            {/* Static excerpt */}
            <p
              className="hero-anim mb-10 max-w-md text-xl leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {heroSlides[0].excerpt}
            </p>

            {/* CTA */}
            <div className="hero-anim">
              <ButtonLink href={`/blog/${heroSlides[0].slug}`} variant="primary" arrow>
                Read Article
              </ButtonLink>
            </div>

            {/* Mobile dots — only on small screens */}
            <div className="hero-anim mt-10 flex items-center gap-3 xl:hidden">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className="relative h-3 w-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i === activeIndex ? "var(--fg)" : "transparent",
                    border: `1.5px solid ${i === activeIndex ? "var(--fg)" : "var(--border)"}`,
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  {i === activeIndex && (
                    <span
                      className="absolute -inset-1.5 rounded-full border animate-ping"
                      style={{ borderColor: "var(--fg)", animationDuration: "2s", opacity: 0.3 }}
                    />
                  )}
                </button>
              ))}
              <span className="ml-2 text-[0.875rem] tabular-nums font-medium" style={{ color: "var(--muted)" }}>
                {String(activeIndex + 1).padStart(2, "0")}/{String(heroSlides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Swiper column — cards change, text on cards */}
          <div
            ref={swiperContainerRef}
            className="order-1 lg:order-2 lg:col-span-7 flex items-center justify-center lg:justify-end py-8 lg:py-16 overflow-hidden"
          >
            <div className="w-[72vw] max-w-[320px] sm:max-w-[400px] lg:max-w-[500px]">
              <Swiper
                modules={[EffectCards, Autoplay]}
                effect="cards"
                grabCursor
                cardsEffect={{
                  perSlideOffset: 6,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={800}
                loop
                onSwiper={(swiper) => { swiperRef.current = swiper; setTimeout(() => swiper.slideNext(800), 100); }}
                onSlideChange={handleSlideChange}
                className="hero-swiper"
              >
                {heroSlides.map((s, i) => (
                  <SwiperSlide key={s.slug}>
                    <Link href={`/blog/${s.slug}`} className="group block">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          priority={i === 0}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 560px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                          <span
                            className="mb-2 inline-block text-[0.875rem] font-bold uppercase tracking-[0.2em]"
                            style={{ color: s.categoryColor }}
                          >
                            {s.category}
                          </span>
                          <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-white line-clamp-2">
                            {s.title}
                          </h2>
                          <p className="mt-2 text-base lg:text-lg text-white/50">
                            {s.readTime} min read
                          </p>
                        </div>

                        <div className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/0 opacity-0 scale-75 transition-all duration-500 group-hover:bg-white/90 group-hover:opacity-100 group-hover:scale-100">
                          <svg className="h-4 w-4" style={{ color: "var(--fg)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-swiper,
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          width: 100% !important;
          height: auto !important;
        }
        .hero-swiper .swiper-slide {
          border-radius: 16px;
          overflow: hidden;
        }
        .hero-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: brightness(0.6) saturate(0.7);
        }
      `}</style>
    </section>
  );
}
