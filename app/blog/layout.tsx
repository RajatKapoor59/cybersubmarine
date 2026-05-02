import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on design, development, creativity, productivity, and the craft of writing for the web.",
  openGraph: {
    title: "Blog — Inkwell",
    description: "Articles on design, development, creativity, productivity, and the craft of writing for the web.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
