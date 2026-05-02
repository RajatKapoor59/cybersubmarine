import { client } from './sanity'
import type { PostMeta } from '@/types/post'
import type { Author } from '@/types/author'
import { Category } from '@/data/categories'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  coverImage?: { asset: { url: string }; alt?: string }
  publishedAt: string
  author: { name: string; slug: string; avatar?: { asset: { url: string } }; bio?: string; twitter?: string; website?: string }
  category: { name: string; slug: string; color?: string }
  tags: string[]
  featured?: boolean
  body?: unknown[]
}

// ─── Converters ───────────────────────────────────────────────────────────────

function toPostMeta(p: SanityPost): PostMeta {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage?.asset?.url ?? '/blog/design-product.webp',
    date: p.publishedAt ? p.publishedAt.split('T')[0] : '',
    author: p.author?.slug ?? 'emma-chen',
    category: p.category?.slug ?? 'design',
    tags: p.tags ?? [],
    featured: p.featured ?? false,
    readingTime: estimateReadingTime(p.body),
  }
}

function estimateReadingTime(body?: unknown[]): number {
  if (!body) return 3
  const text = JSON.stringify(body)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ─── Queries ──────────────────────────────────────────────────────────────────

const POST_FIELDS = `
  _id,
  "slug": slug.current,
  title,
  excerpt,
  coverImage { asset->{ url }, alt },
  publishedAt,
  author->{ name, "slug": slug.current, avatar { asset->{ url } }, bio, twitter, website },
  category->{ name, "slug": slug.current, color },
  tags,
  featured
`

const POST_FIELDS_WITH_BODY = `
  ${POST_FIELDS},
  body
`

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts: SanityPost[] = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`
  )
  return posts.map(toPostMeta)
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const posts: SanityPost[] = await client.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] { ${POST_FIELDS} }`
  )
  return posts.map(toPostMeta)
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS_WITH_BODY} }`,
    { slug }
  )
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  const posts: SanityPost[] = await client.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { categorySlug }
  )
  return posts.map(toPostMeta)
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: SanityPost[] = await (client.fetch as any)(
    `*[_type == "post" && $tag in tags] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { tag }
  )
  return posts.map(toPostMeta)
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<PostMeta[]> {
  const current = await getPostBySlug(currentSlug)
  if (!current) return []
  const posts: SanityPost[] = await client.fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...20] { ${POST_FIELDS} }`,
    { slug: currentSlug }
  )
  return posts
    .map((p) => ({
      post: toPostMeta(p),
      score:
        (p.tags ?? []).filter((t) => (current.tags ?? []).includes(t)).length * 2 +
        (p.category?.slug === current.category?.slug ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => p.post)
}

export async function searchPosts(query: string): Promise<PostMeta[]> {
  const q = `*${query}*`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: SanityPost[] = await (client.fetch as any)(
    `*[_type == "post" && (title match $q || excerpt match $q || $query in tags)] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { q, query }
  )
  return posts.map(toPostMeta)
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(name asc) { "slug": slug.current, name, description, color }`
  )
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const a = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0] { name, "id": slug.current, bio, avatar { asset->{ url } }, twitter, website }`,
    { slug }
  )
  if (!a) return null
  return {
    id: a.id,
    name: a.name,
    bio: a.bio ?? '',
    avatar: a.avatar?.asset?.url ?? '/authors/emma-chen.jpg',
    twitter: a.twitter,
    website: a.website,
  }
}

export async function getLatestPosts(limit = 6): Promise<PostMeta[]> {
  const posts: SanityPost[] = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] { ${POST_FIELDS} }`,
    { limit }
  )
  return posts.map(toPostMeta)
}
