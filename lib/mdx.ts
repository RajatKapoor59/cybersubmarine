import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content/posts");

function computeReadingTime(content: string): number {
  const wordsPerMinute = 238;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage,
    date: data.date,
    author: data.author,
    category: data.category,
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    readingTime: computeReadingTime(content),
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug)!)
    .filter(Boolean)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.tags.includes(tag));
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.featured);
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return getAllPostsMeta()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => current.tags.includes(t)).length * 2 +
        (p.category === current.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => p.post);
}

export function searchPosts(query: string): PostMeta[] {
  const q = query.toLowerCase();
  return getAllPostsMeta().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
