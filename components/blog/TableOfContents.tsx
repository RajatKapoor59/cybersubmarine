"use client";

import { useMemo, useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(() => {
    const items: TOCItem[] = [];
    const lines = content.split("\n");
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        items.push({ id, text, level });
      }
    }
    return items;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <div className="mb-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-t border-b px-1 py-4 text-left transition-colors"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-base font-semibold uppercase tracking-widest" style={{ color: "var(--fg)" }}>
          Table of Contents
        </span>
        <svg
          className="h-4 w-4 transition-transform duration-300"
          style={{
            color: "var(--muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0,1)]"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <nav className="py-4 pl-0">
          <ul className="space-y-0.5 border-l" style={{ borderColor: "var(--border)", marginLeft: "4px" }}>
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1.5 text-base transition-colors duration-200"
                  style={{
                    paddingLeft: level === 3 ? "2rem" : "1rem",
                    color: activeId === id ? "var(--fg)" : "var(--muted)",
                    fontWeight: activeId === id ? 600 : 400,
                    borderLeft: activeId === id ? "2px solid var(--accent)" : "2px solid transparent",
                    marginLeft: "-1px",
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
