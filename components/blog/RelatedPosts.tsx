"use client";

import { PostMeta } from "@/types/post";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest text-accent">
        Continue Reading
      </div>
      <h2 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
        You might also enjoy
      </h2>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
