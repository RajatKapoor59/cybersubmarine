import { Author } from "@/types/author";

export const authors: Record<string, Author> = {
  "emma-chen": {
    id: "emma-chen",
    name: "Emma Chen",
    bio: "Writer, thinker, and maker of things. I write about design, creativity, and the craft of building for the web.",
    avatar: "/authors/emma-chen.jpg",
    twitter: "@emmachen",
    website: "https://emmachen.com",
  },
  "alex-rivers": {
    id: "alex-rivers",
    name: "Alex Rivers",
    bio: "Developer and technical writer. Passionate about clean code, clear communication, and the intersection of technology and humanity.",
    avatar: "/authors/alex-rivers.jpg",
    twitter: "@alexrivers",
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors["emma-chen"];
}
