"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { categories as staticCategories } from "@/data/categories";
import { posts as staticPosts } from "@/data/posts";
import type { PostMeta } from "@/types/post";
import type { Category } from "@/data/categories";

const CircularGallery = dynamic(
  () => import("@/components/ui/CircularGallery"),
  { ssr: false }
);

// SVG path data for category icons
const iconPaths: Record<string, string[]> = {
  design: [
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    "M8 12a4 4 0 108 0 4 4 0 00-8 0z",
  ],
  development: [
    "M16 18l6-6-6-6",
    "M8 6l-6 6 6 6",
  ],
  creativity: [
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  ],
  productivity: [
    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  ],
  writing: [
    "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
  ],
};

const categoryIcons: Record<string, React.ReactNode> = {
  design: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="17" r="2" /><circle cx="6" cy="12" r="3" />
    </svg>
  ),
  development: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  creativity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  productivity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  writing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 200, g: 200, b: 200 };
}

function generateCardImage(
  name: string,
  description: string,
  color: string,
  count: number,
  slug: string
): string {
  const W = 800;
  const H = 1000;
  const pad = 60;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const rgb = hexToRgb(color);

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 24);
  ctx.fill();

  const grad = ctx.createRadialGradient(W - 100, 100, 0, W - 100, 100, 300);
  grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const iconSize = 96;
  ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`;
  ctx.beginPath();
  ctx.roundRect(pad, 60, iconSize, iconSize, 20);
  ctx.fill();

  ctx.save();
  ctx.translate(pad + iconSize / 2 - 18, 60 + iconSize / 2 - 18);
  ctx.scale(1.5, 1.5);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = "transparent";
  const paths = iconPaths[slug] || iconPaths.design;
  paths.forEach((d) => {
    const p = new Path2D(d);
    ctx.stroke(p);
  });
  ctx.restore();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px 'Georgia', serif";
  ctx.textBaseline = "top";
  ctx.fillText(name, pad, 200);

  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "28px 'Helvetica Neue', sans-serif";
  const words = description.split(" ");
  let line = "";
  let y = 290;
  const maxWidth = W - pad * 2;
  for (const word of words) {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line.trim(), pad, y);
      line = word + " ";
      y += 40;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), pad, y);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, H - 220);
  ctx.lineTo(W - pad, H - 220);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = "bold 90px 'Georgia', serif";
  ctx.textBaseline = "top";
  ctx.fillText(String(count).padStart(2, "0"), pad, H - 200);

  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.font = "26px 'Helvetica Neue', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(count === 1 ? "article" : "articles", pad, H - 90);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W - 140, H - 100);
  ctx.lineTo(W - 80, H - 100);
  ctx.moveTo(W - 105, H - 125);
  ctx.lineTo(W - 80, H - 100);
  ctx.lineTo(W - 105, H - 75);
  ctx.stroke();

  return canvas.toDataURL("image/png");
}

interface GallerySectionProps {
  posts?: PostMeta[];
  categories?: Category[];
}

export function GallerySection({ posts: propPosts, categories: propCategories }: GallerySectionProps) {
  const posts = propPosts ?? staticPosts;
  const categories = propCategories ?? staticCategories;
  const [cardImages, setCardImages] = useState<{ image: string; text: string }[]>([]);

  useEffect(() => {
    const items = categories.map((cat) => {
      const count = posts.filter((p) => p.category === cat.slug).length;
      const dataUrl = generateCardImage(cat.name, cat.description, cat.color, count, cat.slug);
      return { image: dataUrl, text: "" };
    });
    setCardImages(items);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--fg)" }}>
      {/* Header */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-20 md:pt-28 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
          Explore
        </span>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
          Browse by Topic
        </h2>
      </div>

      {/* Mobile: simple card slider */}
      <div className="md:hidden px-5 pt-10 pb-16">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex-shrink-0 snap-start w-[260px]"
              >
                <div
                  className="flex flex-col rounded-xl p-6 h-full transition-transform duration-300 active:scale-[0.97]"
                  style={{ backgroundColor: "#1E1E1E" }}
                >
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                  >
                    {categoryIcons[cat.slug] || (
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: cat.color }} />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="mb-1.5 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-white/50 line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Bottom row */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      {String(count).padStart(2, "0")} {count === 1 ? "article" : "articles"}
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="text-white/30 transition-colors group-hover:text-white/60"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: WebGL circular gallery */}
      <div className="hidden md:block h-[600px] relative">
        {cardImages.length > 0 && (
          <CircularGallery
            items={cardImages}
            bend={4}
            textColor="#ffffff"
            borderRadius={0}
            scrollSpeed={0.6}
            scrollEase={0.02}
            font="bold 1px sans-serif"
          />
        )}
      </div>
    </section>
  );
}
