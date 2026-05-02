import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Inkwell team. Questions, collaborations, guest posts, or just a hello — we'd love to hear from you.",
  openGraph: {
    title: "Contact — Inkwell",
    description: "Get in touch with the Inkwell team. Questions, collaborations, or just a hello.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
