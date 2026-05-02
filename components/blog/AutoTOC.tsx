"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface AutoTOCProps {
  headings: TocHeading[];
}

export function AutoTOC({ headings }: AutoTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="border border-[var(--border)] rounded-[10px] overflow-hidden bg-[var(--card)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--fg)]">
          Table of Contents
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("text-[var(--muted)] transition-transform duration-300", open ? "rotate-180" : "")}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "800px" : "0px" }}
      >
        <div className="border-t border-[var(--border)] px-5 py-4">
          <ol className="flex flex-col gap-1">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(h.id);
                  }}
                  className={cn(
                    "block text-[13px] leading-[1.5] py-1 transition-colors duration-150",
                    h.level === 3 ? "pl-4" : "",
                    activeId === h.id
                      ? "text-[var(--accent-text)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {activeId === h.id && (
                    <span className="inline-block w-1 h-1 rounded-full bg-[var(--accent)] mr-1.5 mb-0.5 align-middle" />
                  )}
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
