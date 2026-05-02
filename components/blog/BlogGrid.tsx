import { PostMeta } from "@/types/post";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
  posts: PostMeta[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
