"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/formatDate";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

const POSTS_PER_PAGE = 6;

interface BlogListClientProps {
  posts: PostMeta[];
  categories: Category[];
}

export default function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current.querySelectorAll(".reveal-item"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );
  }, []);

  const searchedPosts = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : posts;

  let filtered = searchedPosts;
  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const getCategoryColor = (slug: string) =>
    categories.find((c) => c.slug === slug)?.color ?? "var(--accent)";

  const getCategoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pt-20 pb-24 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div ref={headerRef} className="mb-16 max-w-2xl">
              <div className="reveal-item mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                The Blog
              </div>
              <h1 className="reveal-item mb-5 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                All Articles
              </h1>
              <p className="reveal-item text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                Thoughts on design, development, creativity, and the craft of writing for the web.
              </p>
            </div>

            <div className="mb-8 max-w-md">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search articles..."
                  className="w-full border bg-transparent py-3.5 pl-11 pr-4 text-base focus:outline-none"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>
            </div>

            <div className="mb-14 flex flex-wrap gap-1 border-b" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => { setActiveCategory("all"); setCurrentPage(1); }}
                className="relative pb-3 px-4 text-[0.875rem] font-semibold transition-colors"
                style={{ color: activeCategory === "all" ? "var(--fg)" : "var(--muted)" }}
              >
                All
                {activeCategory === "all" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--accent)" }} />
                )}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveCategory(cat.slug); setCurrentPage(1); }}
                  className="relative pb-3 px-4 text-[0.875rem] font-semibold transition-colors"
                  style={{ color: activeCategory === cat.slug ? "var(--fg)" : "var(--muted)" }}
                >
                  {cat.name}
                  {activeCategory === cat.slug && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--accent)" }} />
                  )}
                </button>
              ))}
            </div>

            {paged.length > 0 ? (
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((post) => (
                  <article key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="relative mb-4 aspect-[3/2] overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                      </div>
                      <div className="mb-2.5 flex items-center gap-3">
                        <span className="text-[0.875rem] font-semibold uppercase tracking-wider" style={{ color: getCategoryColor(post.category) }}>
                          {getCategoryName(post.category)}
                        </span>
                        <span className="text-[0.875rem]" style={{ color: "var(--muted)" }}>{post.readingTime} min</span>
                      </div>
                      <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-bold leading-[1.2] tracking-tight transition-colors duration-300 group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mb-3 text-base leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                        {post.excerpt}
                      </p>
                      <time className="text-base" style={{ color: "var(--muted)", opacity: 0.6 }}>{formatDate(post.date)}</time>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-lg" style={{ color: "var(--muted)" }}>No articles found.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="flex h-11 w-11 items-center justify-center text-[0.875rem] font-semibold transition-colors"
                    style={{
                      backgroundColor: page === currentPage ? "var(--fg)" : "transparent",
                      color: page === currentPage ? "var(--bg)" : "var(--muted)",
                      border: page === currentPage ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
