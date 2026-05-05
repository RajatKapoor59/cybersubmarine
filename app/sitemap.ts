import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

export const revalidate = 3600; // rebuild sitemap every hour

const baseUrl = "https://cybersubmarine.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  const [posts, categories] = await Promise.all([
    client.fetch<{ slug: string; publishedAt: string; _updatedAt: string }[]>(
      `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, publishedAt, _updatedAt }`
    ),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "category"] | order(name asc) { "slug": slug.current, _updatedAt }`
    ),
  ]);

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...categoryPages];
}
