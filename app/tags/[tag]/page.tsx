import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getAllPosts, getPostsByTag } from "@/lib/sanity.queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => []);
  const tags = [...new Set(posts.flatMap((p) => p.tags))];
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const label = decoded.replace(/-/g, " ");
  return {
    title: `${label} — Inkwell`,
    description: `Articles tagged with "${label}"`,
    openGraph: {
      title: `${label} — Inkwell`,
      description: `Articles tagged with "${label}"`,
      url: `/tags/${tag}`,
    },
    alternates: { canonical: `/tags/${tag}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const tagPosts = await getPostsByTag(decoded).catch(() => []);

  if (tagPosts.length === 0) notFound();

  const label = decoded.replace(/-/g, " ");

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="px-6 pt-20 pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span
                className="mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-medium capitalize"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                #{label}
              </span>
              <h1
                className="mb-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl capitalize"
                style={{ color: "var(--fg)" }}
              >
                {label}
              </h1>
              <p className="mt-2 text-base" style={{ color: "var(--muted)", opacity: 0.6 }}>
                {tagPosts.length} {tagPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <BlogGrid posts={tagPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
