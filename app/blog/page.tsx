import { getAllPosts, getAllCategories } from "@/lib/sanity.queries";
import BlogListClient from "./BlogListClient";

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return <BlogListClient posts={posts} categories={categories} />;
}
