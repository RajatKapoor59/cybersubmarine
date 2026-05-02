import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-English cybersecurity guides for small business owners, IT managers, and compliance leads.",
  openGraph: {
    title: "Guides — CyberSubmarine",
    description: "Plain-English cybersecurity guides for small business owners, IT managers, and compliance leads.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
