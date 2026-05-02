import type { TocHeading } from "@/components/blog/AutoTOC";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableBlock = { _type: string; style?: string; children?: { text: string }[] }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function extractHeadings(body: unknown[]): TocHeading[] {
  if (!body) return [];
  const headings: TocHeading[] = [];

  for (const block of body as PortableBlock[]) {
    if (block._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;

    const text = (block.children ?? []).map((c) => c.text).join("").trim();
    if (!text) continue;

    headings.push({
      id: slugify(text),
      text,
      level: block.style === "h2" ? 2 : 3,
    });
  }

  return headings;
}
