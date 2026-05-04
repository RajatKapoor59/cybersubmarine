import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/sanity.queries";

export const runtime = "edge";
export const alt = "CyberSubmarine Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0D1B2A";
const TEAL = "#00B4D8";
const BG = "#F5F7FA";
const MUTED = "#4A5568";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  const title = post?.title ?? "CyberSubmarine";
  const excerpt = post?.excerpt ?? "Plain-English cybersecurity guidance for SMBs.";
  const category = post?.category?.name?.toUpperCase() ?? "";

  const truncatedExcerpt =
    excerpt.length > 140 ? excerpt.slice(0, 137) + "…" : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: BG,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Submarine icon */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: TEAL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "20px", height: "12px", backgroundColor: "white", borderRadius: "6px", display: "flex" }} />
            </div>
            <span style={{ fontSize: "22px", fontWeight: 700, color: NAVY, letterSpacing: "-0.01em" }}>
              CyberSubmarine
            </span>
          </div>
          {category && (
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: TEAL,
                backgroundColor: "#E0F7FC",
                padding: "6px 14px",
                borderRadius: "100px",
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Center: title + excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Teal accent bar */}
          <div style={{ width: "48px", height: "4px", backgroundColor: TEAL, borderRadius: "2px", display: "flex" }} />

          <h1
            style={{
              fontSize: title.length > 55 ? "44px" : "52px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: NAVY,
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.5,
              color: MUTED,
              margin: 0,
              maxWidth: "820px",
            }}
          >
            {truncatedExcerpt}
          </p>
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "16px", color: MUTED }}>
            cybersubmarine.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: TEAL,
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Read the guide →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
