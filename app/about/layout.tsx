import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Inkwell is a minimal editorial space for people who believe great writing doesn't need great decoration. Meet the team behind the words.",
  openGraph: {
    title: "About — Inkwell",
    description: "Inkwell is a minimal editorial space for people who believe great writing doesn't need great decoration.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
