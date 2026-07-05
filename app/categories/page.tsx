import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllCategories, getAllPosts } from "@/lib/sanity.queries";

export const revalidate = 60;

export const metadata = {
  title: "Browse by Topic — CyberSubmarine",
  description:
    "Browse cybersecurity guides by topic: SOC & Monitoring, Microsoft 365 Security, Managed Security, Compliance, Incident Response, and Tool Comparisons.",
  openGraph: {
    title: "Browse by Topic — CyberSubmarine",
    description:
      "Browse cybersecurity guides by topic: SOC & Monitoring, Microsoft 365 Security, Managed Security, Compliance, Incident Response, and Tool Comparisons.",
    url: "/categories",
  },
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getAllCategories().catch(() => []),
    getAllPosts().catch(() => []),
  ]);

  const countByCategory = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="px-6 pt-20 pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h1
                className="mb-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: "var(--fg)" }}
              >
                Browse by topic
              </h1>
              <p className="mx-auto max-w-lg text-lg" style={{ color: "var(--muted)" }}>
                Every guide, organized by what you're actually trying to solve.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const count = countByCategory[category.slug] ?? 0;
                return (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="group flex flex-col rounded-[12px] border p-6 transition-all duration-200 hover:shadow-md"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
                  >
                    <div className="mb-4 h-[3px] w-10" style={{ backgroundColor: category.color }} />
                    <h2
                      className="mb-2 text-lg font-bold tracking-tight group-hover:opacity-80"
                      style={{ color: "var(--fg)" }}
                    >
                      {category.name}
                    </h2>
                    <p className="mb-4 flex-1 text-[0.9375rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {category.description}
                    </p>
                    <p className="text-[13px] font-medium" style={{ color: "var(--muted)", opacity: 0.7 }}>
                      {count} {count === 1 ? "article" : "articles"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
