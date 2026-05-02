export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readingTime: number;
}

export type PostMeta = Omit<Post, "content">;
