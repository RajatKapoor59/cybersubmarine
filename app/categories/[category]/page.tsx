import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getAllCategories, getPostsByCategory } from "@/lib/sanity.queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getAllCategories().catch(() => []);
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const categories = await getAllCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} — Inkwell`,
      description: category.description,
      url: `/categories/${slug}`,
    },
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const [categories, categoryPosts] = await Promise.all([
    getAllCategories().catch(() => []),
    getPostsByCategory(slug).catch(() => []),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="px-6 pt-20 pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <div className="mx-auto mb-4 h-[3px] w-12" style={{ backgroundColor: category.color }} />
              <h1 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--fg)" }}>
                {category.name}
              </h1>
              <p className="mx-auto max-w-lg text-lg" style={{ color: "var(--muted)" }}>
                {category.description}
              </p>
              <p className="mt-2 text-base" style={{ color: "var(--muted)", opacity: 0.6 }}>
                {categoryPosts.length} {categoryPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {categoryPosts.length > 0 ? (
              <BlogGrid posts={categoryPosts} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg" style={{ color: "var(--muted)" }}>No articles in this category yet. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
