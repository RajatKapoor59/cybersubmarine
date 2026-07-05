import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { AutoTOC } from "@/components/blog/AutoTOC";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { FAQAccordion } from "@/components/blog/FAQAccordion";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getPostBySlug as getMdxPost, getPostSlugs } from "@/lib/mdx";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
} from "@/lib/sanity.queries";
import { getAuthor } from "@/data/authors";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/formatDate";
import { extractHeadings } from "@/lib/toc";

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
      images: [{ url: sanityPost?.coverImage?.asset?.url ?? (typeof mdxPost?.coverImage === "string" ? mdxPost.coverImage : ""), width: 1200, height: 630, alt: post.title }],
      publishedTime: "date" in post ? post.date : sanityPost?.publishedAt ?? "",
      authors: [authorName],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@cybersubmarine",
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

const categoryNames: Record<string, string> = {
  "microsoft-365": "Microsoft 365 Security",
  "soc-monitoring": "SOC & Monitoring",
  compliance: "Compliance & Certification",
  "incident-response": "Incident Response",
  "managed-security": "Managed Security",
  "tool-comparisons": "Tool Comparisons",
};

// Accessible text on light backgrounds (≥4.5:1 on white)
const categoryColors: Record<string, string> = {
  "microsoft-365": "#0077A8",
  "soc-monitoring": "#007391",
  compliance: "#1E7A45",
  "incident-response": "#B04215",
  "managed-security": "#005F73",
  "tool-comparisons": "#7B5EA7",
};

// Bright originals for text on dark navy backgrounds (≥5:1 on #0D1B2A)
const categoryBrightColors: Record<string, string> = {
  "microsoft-365": "#3BACD4",
  "soc-monitoring": "#00B4D8",
  compliance: "#4DB87A",
  "incident-response": "#E07040",
  "managed-security": "#1DA8C0",
  "tool-comparisons": "#A98FD4",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [sanityPost, mdxPost, relatedPosts] = await Promise.all([
    getPostBySlug(slug).catch(() => null),
    Promise.resolve(getMdxPost(slug)),
    getRelatedPosts(slug).catch(() => []),
  ]);

  if (!sanityPost && !mdxPost) notFound();

  const title = sanityPost?.title ?? mdxPost?.title ?? "";
  const excerpt = sanityPost?.excerpt ?? mdxPost?.excerpt ?? "";
  const coverImageUrl = sanityPost?.coverImage?.asset?.url ?? mdxPost?.coverImage ?? "";
  const publishedAt = sanityPost?.publishedAt?.split("T")[0] ?? mdxPost?.date ?? "";
  const tags = sanityPost?.tags ?? mdxPost?.tags ?? [];
  const keyTakeaways = sanityPost?.keyTakeaways ?? [];
  const faqs = sanityPost?.faqs ?? [];

  const sanityCategory = sanityPost?.category;
  const categorySlug = sanityCategory?.slug ?? mdxPost?.category ?? "";
  const category = sanityCategory ?? getCategory(categorySlug);
  const categoryName = categoryNames[categorySlug] ?? category?.name ?? categorySlug;
  const categoryColor = categoryColors[categorySlug] ?? category?.color ?? "#00B4D8";

  const sanityAuthor = sanityPost?.author;
  const mdxAuthorId = mdxPost?.author ?? "emma-chen";
  const staticAuthor = getAuthor(mdxAuthorId);
  const authorName = sanityAuthor?.name ?? staticAuthor.name;
  const authorRole = sanityAuthor?.role ?? "";
  const authorBio = sanityAuthor?.bio ?? staticAuthor.bio;
  const authorAvatar = sanityAuthor?.avatar?.asset?.url ?? staticAuthor.avatar;
  const authorTwitter = sanityAuthor?.twitter ?? staticAuthor.twitter;

  const authorForBox = {
    id: sanityAuthor?.slug ?? mdxAuthorId,
    name: authorName,
    role: authorRole,
    bio: authorBio ?? "",
    avatar: authorAvatar ?? "",
    twitter: authorTwitter,
    website: sanityAuthor?.website ?? staticAuthor.website,
  };

  const readingTime = sanityPost?.body
    ? Math.max(1, Math.ceil(JSON.stringify(sanityPost.body).split(/\s+/).length / 200))
    : mdxPost?.readingTime ?? 3;

  const headings = sanityPost?.body ? extractHeadings(sanityPost.body as unknown[]) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "CyberSubmarine", url: "https://cybersubmarine.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://cybersubmarine.com/blog/${slug}` },
    keywords: tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* ── Article Header (dark navy) ───────────────────────────── */}
      <div className="bg-[var(--navy)] pt-[68px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/55 mb-8">
            <Link href="/blog" className="hover:text-white/70 transition-colors">All Guides</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            {categorySlug && (
              <>
                <Link href={`/categories/${categorySlug}`} className="hover:text-white/70 transition-colors">{categoryName}</Link>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
              </>
            )}
            <span className="text-white/60 truncate max-w-[200px]">{title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex items-center gap-4 flex-wrap mb-5">
            <span
              className="px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] rounded-[4px]"
              style={{ color: categoryBrightColors[categorySlug] ?? "#00B4D8", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {categoryName}
            </span>
            <span className="text-white/55 text-[13px]">{readingTime} min read</span>
            <span className="text-white/55 text-[13px]">·</span>
            <time className="text-white/55 text-[13px]">{formatDate(publishedAt)}</time>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-white leading-[1.15] tracking-[-0.025em] max-w-[800px] mb-6">
            {title}
          </h1>

          {/* Excerpt */}
          <p className="text-[1.0625rem] text-white/55 leading-relaxed max-w-[680px] mb-10">
            {excerpt}
          </p>

          {/* Author strip */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
              {authorAvatar ? (
                <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50 font-bold">
                  {authorName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-[14px] font-semibold text-white leading-none mb-0.5">{authorName}</p>
              {authorRole && <p className="text-[12px] text-white/55">{authorRole}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover image ─────────────────────────────────────────── */}
      {coverImageUrl && (
        <div className="relative w-full" style={{ height: "420px", maxHeight: "50vh" }}>
          <Image src={coverImageUrl} alt={title} fill className="object-cover" priority />
        </div>
      )}

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-16">

            {/* Article column */}
            <article className="min-w-0 max-w-[720px]">
              {/* Key Takeaways */}
              <KeyTakeaways items={keyTakeaways} />

              {/* Body */}
              <div className="article-body">
                {sanityPost?.body ? (
                  <PortableTextRenderer value={sanityPost.body as unknown[]} slug={slug} />
                ) : mdxPost?.content ? (
                  <div className="prose-editorial">
                    <MDXRemote source={mdxPost.content} components={mdxComponents} />
                  </div>
                ) : null}
              </div>

              {/* FAQs */}
              <FAQAccordion faqs={faqs} />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-10 mt-10 border-t border-[var(--border)]">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="px-3.5 py-1.5 text-[12px] font-medium bg-[var(--surface)] text-[var(--muted)] rounded-full hover:bg-[var(--accent-soft)] hover:text-[var(--accent-text)] transition-colors duration-150"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author box */}
              <AuthorBox author={authorForBox} />
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[84px] flex flex-col gap-6">
                {/* TOC */}
                <AutoTOC headings={headings} />

                {/* Subscribe nudge */}
                <div className="p-6 border border-[var(--border)] rounded-[10px] bg-[var(--navy)]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--teal)] mb-3">
                    Free weekly guides
                  </p>
                  <p className="text-[0.875rem] text-white/60 leading-relaxed mb-4">
                    One practical cybersecurity guide per week. No jargon, no scare tactics.
                  </p>
                  <Link
                    href="/#newsletter"
                    className="block w-full text-center px-4 py-3 text-[13px] font-bold text-[var(--navy)] bg-[var(--teal)] rounded-[6px] hover:bg-[#00c9f0] transition-colors duration-200"
                  >
                    Subscribe free
                  </Link>
                </div>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="border border-[var(--border)] rounded-[10px] overflow-hidden">
                    <div className="px-5 py-4 border-b border-[var(--border)]">
                      <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--fg)]">
                        Related Guides
                      </p>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                      {relatedPosts.slice(0, 3).map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="flex gap-3 p-4 hover:bg-[var(--surface)] transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[var(--fg)] leading-[1.4] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-[12px] text-[var(--muted)] mt-1">{post.readingTime} min read</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
