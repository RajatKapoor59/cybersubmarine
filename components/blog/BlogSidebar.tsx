"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PostMeta } from "@/types/post";
import { posts as staticPosts } from "@/data/posts";
import { categories as staticCategories } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import type { Category } from "@/data/categories";

interface BlogSidebarProps {
  currentSlug: string;
  currentTags: string[];
  currentCategory: string;
  allPosts?: PostMeta[];
  allCategories?: Category[];
}

export function BlogSidebar({ currentSlug, currentTags, currentCategory, allPosts, allCategories }: BlogSidebarProps) {
  const posts = allPosts ?? staticPosts;
  const categories = allCategories ?? staticCategories;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  // Get recent posts excluding current
  const recentPosts = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  // Collect all unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  // Count posts per category
  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: posts.filter((p) => p.category === cat.slug).length,
  }));

  return (
    <aside className="space-y-10">
      {/* About the Blog */}
      <div
        className="border p-6"
        style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
      >
        <h3
          className="mb-3 font-[family-name:var(--font-display)] text-xl font-bold"
          style={{ color: "var(--fg)" }}
        >
          About Inkwell
        </h3>
        <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--muted)" }}>
          A space for thoughtful writing on design, development, creativity, and
          the craft of building for the web. Words first, always.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Subscribe */}
      <div
        className="p-6"
        style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius)" }}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center"
            style={{ backgroundColor: "var(--accent-soft)", borderRadius: "6px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3
            className="font-[family-name:var(--font-display)] text-lg font-bold"
            style={{ color: "var(--fg)" }}
          >
            Stay in the loop
          </h3>
        </div>
        <p className="mb-4 text-[0.9375rem] leading-relaxed" style={{ color: "var(--muted)" }}>
          One thoughtful email per week. No spam, no fluff.
        </p>

        {submitted ? (
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ backgroundColor: "#dcfce7", borderRadius: "var(--radius)" }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e]">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[0.9375rem] font-semibold text-[#166534]">You&apos;re in!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full border px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--fg)",
                borderRadius: "var(--radius)",
              }}
            />
            <button
              type="submit"
              className="w-full py-2.5 text-[0.9375rem] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* Recent Posts */}
      <div>
        <h3
          className="mb-5 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--fg)" }}
        >
          Recent Posts
        </h3>
        <div className="space-y-5">
          {recentPosts.map((post) => (
            <RecentPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        className="border p-6"
        style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
      >
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--fg)" }}
        >
          Categories
        </h3>
        <ul className="space-y-0">
          {categoryCounts.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group flex items-center justify-between border-b py-3 transition-colors last:border-b-0"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0"
                    style={{ backgroundColor: cat.color, borderRadius: "3px" }}
                  />
                  <span
                    className="text-[0.9375rem] font-medium transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--fg)" }}
                  >
                    {cat.name}
                  </span>
                </span>
                <span
                  className="text-sm tabular-nums"
                  style={{ color: "var(--muted)" }}
                >
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags Cloud */}
      <div>
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--fg)" }}
        >
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="border px-3 py-1 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: currentTags.includes(tag) ? "var(--accent)" : "var(--border)",
                color: currentTags.includes(tag) ? "var(--accent)" : "var(--muted)",
                borderRadius: "var(--radius)",
              }}
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>

      {/* Reading Stats */}
      <div
        className="p-6"
        style={{ backgroundColor: "var(--surface)", borderRadius: "var(--radius)" }}
      >
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--fg)" }}
        >
          By the Numbers
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div
              className="font-[family-name:var(--font-display)] text-2xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              {posts.length}
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Articles
            </div>
          </div>
          <div>
            <div
              className="font-[family-name:var(--font-display)] text-2xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              {categories.length}
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Topics
            </div>
          </div>
          <div>
            <div
              className="font-[family-name:var(--font-display)] text-2xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              {allTags.length}
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Tags
            </div>
          </div>
          <div>
            <div
              className="font-[family-name:var(--font-display)] text-2xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              2k+
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Readers
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function RecentPostCard({ post }: { post: PostMeta }) {
  const readTime = post.readingTime;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4"
    >
      <div
        className="relative h-[72px] w-[72px] shrink-0 overflow-hidden"
        style={{ borderRadius: "var(--radius)" }}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="mb-1 text-[0.9375rem] font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <time>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{readTime} min</span>
        </div>
      </div>
    </Link>
  );
}
