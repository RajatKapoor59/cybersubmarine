import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrainOverlay } from "@/components/GrainOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cybersubmarine.com"),
  title: {
    default: "CyberSubmarine — Cybersecurity Guides for Small Business",
    template: "%s — CyberSubmarine",
  },
  description:
    "Plain-English cybersecurity guides for small business owners and IT managers. No jargon, no fear-mongering. Just practical advice that actually works.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CyberSubmarine",
    title: "CyberSubmarine — Cybersecurity Guides for Small Business",
    description: "Plain-English cybersecurity guides for small business owners and IT managers.",
    url: "https://cybersubmarine.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cybersubmarine",
    title: "CyberSubmarine — Cybersecurity Guides for Small Business",
    description: "Plain-English cybersecurity guides for small business owners and IT managers.",
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
    canonical: "https://cybersubmarine.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="CyberSubmarine RSS Feed"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CyberSubmarine",
              url: "https://cybersubmarine.com",
              description: "Plain-English cybersecurity guides for small business owners and IT managers.",
              publisher: {
                "@type": "Organization",
                name: "CyberSubmarine",
                url: "https://cybersubmarine.com",
              },
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-body)] antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <GrainOverlay />
        <AgentationProvider />
      </body>
    </html>
  );
}
