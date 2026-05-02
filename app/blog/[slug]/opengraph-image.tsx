import { ImageResponse } from "next/og";
import { posts } from "@/data/posts";

export const runtime = "edge";
export const alt = "Inkwell Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title ?? "Inkwell";
  const category = post?.category?.toUpperCase() ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#F8F6F3",
          fontFamily: "serif",
        }}
      >
        {/* Top: category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {category && (
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#E54D2E",
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Center: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? "48px" : "60px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#141414",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "28px",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#141414",
              }}
            >
              Inkwell
            </span>
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#E54D2E",
                borderRadius: "50%",
              }}
            />
          </div>
          <span style={{ fontSize: "16px", color: "#7A7A7A" }}>
            inkwell.blog
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
