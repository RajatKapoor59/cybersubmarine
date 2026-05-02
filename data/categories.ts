export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "design",
    name: "Design",
    description: "Thoughts on visual craft, typography, and the details that make things feel right.",
    color: "#E8B4B8",
  },
  {
    slug: "development",
    name: "Development",
    description: "Code, architecture, and the art of building software that lasts.",
    color: "#A8D8EA",
  },
  {
    slug: "creativity",
    name: "Creativity",
    description: "On making things, finding inspiration, and the creative process.",
    color: "#C3E6CB",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Working smarter, building habits, and getting the important things done.",
    color: "#F5D5A0",
  },
  {
    slug: "writing",
    name: "Writing",
    description: "The craft of putting words together. Style, clarity, and voice.",
    color: "#D4C5F9",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
