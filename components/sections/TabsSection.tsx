"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts as staticPosts } from "@/data/posts";
import { categories as staticCategories, getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/Badge";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

interface TabsSectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function TabsSection({ posts: propPosts, categories: propCategories }: TabsSectionProps) {
  const posts = propPosts ?? staticPosts;
  const categories = propCategories ?? staticCategories;
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.slug, label: c.name })),
  ];

  const filtered =
    activeTab === "all"
      ? posts.slice(0, 6)
      : posts.filter((p) => p.category === activeTab).slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5">
        {/* ── Section Header ── */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Latest
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-fg">
            Fresh from the blog
          </h2>
        </div>

        {/* ── Tabs ── */}
        <div className="mb-12 flex flex-wrap justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-2.5 text-base font-medium transition-colors duration-200
                ${
                  activeTab === tab.id
                    ? "text-fg"
                    : "text-muted hover:text-fg"
                }
              `}
            >
              {tab.label}
              {/* Underline indicator */}
              <span
                className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent rounded-full
                  transition-all duration-300 ease-out
                  ${activeTab === tab.id ? "w-6" : "w-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* ── Posts Grid ── */}
        <div
          key={activeTab}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            animation: "tabFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          {filtered.map((post) => {
            const cat = getCategory(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card transition-all duration-300 hover:shadow-md hover:border-border"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover img-scale group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-2.5">
                    {cat && <Badge color={cat.color}>{cat.name}</Badge>}
                    <span className="text-[0.875rem] text-muted">
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h3 className="mb-2 flex-1 font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>

                  <time className="mt-auto text-[0.9375rem] text-muted/60">
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Inline keyframes for tab fade-in */}
        <style>{`
          @keyframes tabFadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
