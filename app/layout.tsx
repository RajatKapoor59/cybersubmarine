import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrainOverlay } from "@/components/GrainOverlay";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inkwell.blog"),
  title: {
    default: "Inkwell — Stories Worth Reading",
    template: "%s — Inkwell",
  },
  description:
    "A modern editorial blog. Clean typography, bold visuals, and ideas that stay with you.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Inkwell",
    title: "Inkwell — Stories Worth Reading",
    description: "A modern editorial blog. Clean typography, bold visuals, and ideas that stay with you.",
    url: "https://inkwell.blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@inkwellblog",
    title: "Inkwell — Stories Worth Reading",
    description: "A modern editorial blog. Clean typography, bold visuals, and ideas that stay with you.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://inkwell.blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Inkwell RSS Feed"
          href="/feed.xml"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Inkwell",
              url: "https://inkwell.blog",
              description: "A modern editorial blog. Clean typography, bold visuals, and ideas that stay with you.",
              publisher: {
                "@type": "Organization",
                name: "Inkwell",
                url: "https://inkwell.blog",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-[family-name:var(--font-body)] antialiased`}
        style={{ "--font-display": "'Cormorant Garamond', serif" } as React.CSSProperties}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <GrainOverlay />
        <AgentationProvider />
      </body>
    </html>
  );
}
