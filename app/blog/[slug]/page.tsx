import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PortableText } from "@portabletext/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Badge } from "@/components/ui/Badge";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getPostBySlug as getMdxPost, getPostSlugs } from "@/lib/mdx";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
  getAllCategories,
  getAuthorBySlug,
} from "@/lib/sanity.queries";
import { getAuthor } from "@/data/authors";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";

export const revalidate = 60;

export async function generateStaticParams() {
  const mdxSlugs = getPostSlugs().map((slug) => ({ slug }));
  try {
    const sanityPosts = await getAllPosts();
    const sanitySlugs = sanityPosts.map((p) => ({ slug: p.slug }));
    const allSlugs = [...new Map([...mdxSlugs, ...sanitySlugs].map((s) => [s.slug, s])).values()];
    return allSlugs;
  } catch {
    return mdxSlugs;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const sanityPost = await getPostBySlug(slug).catch(() => null);
  const mdxPost = getMdxPost(slug);
  const post = sanityPost ?? mdxPost;

  if (!post) return { title: "Post Not Found" };

  const authorName = sanityPost?.author?.name ?? getAuthor(mdxPost?.author ?? "").name;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: authorName }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      images: [{ url: "coverImage" in post ? post.coverImage : (sanityPost?.coverImage?.asset?.url ?? ""), width: 1200, height: 630, alt: post.title }],
      publishedTime: "date" in post ? post.date : sanityPost?.publishedAt ?? "",
      authors: [authorName],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@inkwellblog",
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [sanityPost, mdxPost, relatedPosts, allPosts, allCategories] = await Promise.all([
    getPostBySlug(slug).catch(() => null),
    Promise.resolve(getMdxPost(slug)),
    getRelatedPosts(slug).catch(() => []),
    getAllPosts().catch(() => []),
    getAllCategories().catch(() => []),
  ]);

  if (!sanityPost && !mdxPost) notFound();

  const title = sanityPost?.title ?? mdxPost?.title ?? "";
  const excerpt = sanityPost?.excerpt ?? mdxPost?.excerpt ?? "";
  const coverImageUrl = sanityPost?.coverImage?.asset?.url ?? mdxPost?.coverImage ?? "";
  const publishedAt = sanityPost?.publishedAt?.split("T")[0] ?? mdxPost?.date ?? "";
  const tags = sanityPost?.tags ?? mdxPost?.tags ?? [];
  const featured = sanityPost?.featured ?? mdxPost?.featured ?? false;

  const sanityCategory = sanityPost?.category;
  const categorySlug = sanityCategory?.slug ?? mdxPost?.category ?? "";
  const category = sanityCategory ?? getCategory(categorySlug);

  const sanityAuthor = sanityPost?.author;
  const mdxAuthorId = mdxPost?.author ?? "emma-chen";
  const staticAuthor = getAuthor(mdxAuthorId);
  const authorName = sanityAuthor?.name ?? staticAuthor.name;
  const authorBio = sanityAuthor?.bio ?? staticAuthor.bio;
  const authorAvatar = sanityAuthor?.avatar?.asset?.url ?? staticAuthor.avatar;
  const authorTwitter = sanityAuthor?.twitter ?? staticAuthor.twitter;

  const authorForBox = {
    id: sanityAuthor?.slug ?? mdxAuthorId,
    name: authorName,
    bio: authorBio ?? "",
    avatar: authorAvatar ?? "",
    twitter: authorTwitter,
    website: sanityAuthor?.website ?? staticAuthor.website,
  };

  const readingTime = sanityPost?.body
    ? Math.max(1, Math.ceil(JSON.stringify(sanityPost.body).split(/\s+/).length / 200))
    : mdxPost?.readingTime ?? 3;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Inkwell", url: "https://inkwell.blog" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://inkwell.blog/blog/${slug}` },
    keywords: tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-[72px]">
        {coverImageUrl && (
          <div className="relative w-full" style={{ aspectRatio: "21/9", maxHeight: "480px" }}>
            <Image src={coverImageUrl} alt={title} fill className="object-cover" priority />
          </div>
        )}

        <div className="px-6 pt-12 pb-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] xl:gap-16">
              <article className="min-w-0">
                <div className="max-w-[680px]">
                  <header className="mb-12">
                    <div className="mb-6 flex items-center gap-3">
                      {category && (
                        <Badge color={category.color}>{category.name}</Badge>
                      )}
                      <span className="text-base" style={{ color: "var(--muted)" }}>
                        {readingTime} min read
                      </span>
                    </div>

                    <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]" style={{ color: "var(--fg)" }}>
                      {title}
                    </h1>

                    <p className="mb-8 text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                      {excerpt}
                    </p>

                    <div className="flex items-center gap-4 border-t border-b py-4" style={{ borderColor: "var(--border)" }}>
                      {authorAvatar ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "var(--surface)" }}>
                          <span className="text-[0.875rem] font-bold" style={{ color: "var(--muted)" }}>
                            {authorName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-base font-medium" style={{ color: "var(--fg)" }}>{authorName}</p>
                        <time className="text-base" style={{ color: "var(--muted)" }}>
                          {formatDate(publishedAt)}
                        </time>
                      </div>
                    </div>
                  </header>

                  {mdxPost?.content && (
                    <TableOfContents content={mdxPost.content} />
                  )}

                  <div className="prose-editorial">
                    {sanityPost?.body ? (
                      <PortableText value={sanityPost.body as Parameters<typeof PortableText>[0]["value"]} />
                    ) : mdxPost?.content ? (
                      <MDXRemote source={mdxPost.content} components={mdxComponents} />
                    ) : null}
                  </div>

                  <div className="mt-14 flex flex-wrap gap-2 border-t pt-8" style={{ borderColor: "var(--border)" }}>
                    {tags.map((tag) => (
                      <a
                        key={tag}
                        href={`/tags/${tag}`}
                        className="border px-3 py-1.5 text-base font-medium transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>

                  <div className="mt-12">
                    <AuthorBox author={authorForBox} />
                  </div>
                </div>
              </article>

              <div className="hidden lg:block">
                <div className="sticky top-[96px]">
                  <BlogSidebar
                    currentSlug={slug}
                    currentTags={tags}
                    currentCategory={categorySlug}
                    allPosts={allPosts}
                    allCategories={allCategories}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
