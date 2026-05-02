import type { PostMeta } from "@/types/post";

// Static metadata for client components — no fs dependency.
// For full post content (with MDX body), use lib/mdx.ts in server components.
export const posts: PostMeta[] = [
  {
    slug: "the-art-of-less",
    title: "The Art of Less: Why Minimalism Wins in Design",
    excerpt:
      "Every element on your page is a decision. The best designers know that what you leave out matters more than what you put in.",
    coverImage: "/blog/design-product.webp",
    date: "2026-04-20",
    author: "emma-chen",
    category: "design",
    tags: ["minimalism", "design-philosophy", "typography"],
    featured: true,
    readingTime: 2,
  },
  {
    slug: "writing-for-the-web",
    title: "Writing for the Web: A Guide for Humans",
    excerpt:
      "Online readers don't read — they scan. Here's how to write content that respects their time while still saying something meaningful.",
    coverImage: "/blog/editorial-portrait.webp",
    date: "2026-04-15",
    author: "emma-chen",
    category: "writing",
    tags: ["writing", "content-strategy", "ux-writing"],
    featured: true,
    readingTime: 2,
  },
  {
    slug: "building-with-nextjs",
    title: "Why Next.js Changed How I Think About the Web",
    excerpt:
      "After years of building websites, Next.js shifted my mental model. Here's what I learned and why it matters for every developer.",
    coverImage: "/blog/hero-runner.webp",
    date: "2026-04-10",
    author: "alex-rivers",
    category: "development",
    tags: ["nextjs", "react", "web-development"],
    featured: true,
    readingTime: 3,
  },
  {
    slug: "creative-routine",
    title: "Building a Creative Routine That Actually Works",
    excerpt:
      "Forget productivity hacks. The only system that works is one built around how your brain actually functions.",
    coverImage: "/blog/forest.jpg",
    date: "2026-04-05",
    author: "emma-chen",
    category: "creativity",
    tags: ["creativity", "routine", "productivity"],
    readingTime: 3,
  },
  {
    slug: "typography-on-screen",
    title: "Typography on Screen: Getting the Details Right",
    excerpt:
      "The difference between good and great digital typography comes down to a handful of decisions most people never think about.",
    coverImage: "/blog/sunlit-trees.jpg",
    date: "2026-03-28",
    author: "emma-chen",
    category: "design",
    tags: ["typography", "design", "ux"],
    readingTime: 3,
  },
  {
    slug: "digital-garden",
    title: "Your Blog is a Digital Garden, Not a Content Factory",
    excerpt:
      "Stop treating your blog like a publication schedule. Start treating it like a garden — something you tend, prune, and let grow naturally.",
    coverImage: "/blog/traveller.png",
    date: "2026-03-20",
    author: "emma-chen",
    category: "writing",
    tags: ["blogging", "digital-garden", "creativity"],
    readingTime: 2,
  },
  {
    slug: "color-theory-practical",
    title: "Color Theory for People Who Just Want Things to Look Good",
    excerpt:
      "You don't need to study color theory for years. You need five practical rules and the confidence to use them.",
    coverImage: "/blog/design-product.webp",
    date: "2026-03-15",
    author: "emma-chen",
    category: "design",
    tags: ["color", "design", "practical-tips"],
    readingTime: 3,
  },
  {
    slug: "focus-in-distraction-age",
    title: "Finding Focus in the Age of Distraction",
    excerpt:
      "Deep work isn't about willpower. It's about designing an environment where focus is the path of least resistance.",
    coverImage: "/blog/hero-runner.webp",
    date: "2026-03-10",
    author: "alex-rivers",
    category: "productivity",
    tags: ["focus", "productivity", "deep-work"],
    readingTime: 3,
  },
];

export function getPostBySlug(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return posts.filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return posts.filter((p) => p.tags.includes(tag));
}

export function getFeaturedPosts(): PostMeta[] {
  return posts.filter((p) => p.featured);
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return posts
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
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
