"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PostMeta } from "@/types/post";
import { Badge } from "@/components/ui/Badge";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";

interface FeaturedPostProps {
  post: PostMeta;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const category = getCategory(post.category);
  const readTime = post.readingTime;

  return (
    <motion.article
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[0.875rem] font-bold uppercase tracking-widest text-accent">
                Featured
              </span>
              {category && <Badge color={category.color}>{category.name}</Badge>}
            </div>
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-bold leading-snug transition-colors group-hover:text-accent sm:text-3xl">
              {post.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted sm:text-lg">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[0.875rem] text-muted">
              <time>{formatDate(post.date)}</time>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
