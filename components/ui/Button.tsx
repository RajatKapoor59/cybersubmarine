"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary";
  /** "dark" when button sits on a dark background */
  on?: "light" | "dark";
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  on = "light",
  children,
  arrow = false,
  className,
}: ButtonLinkProps) {
  const onDark = on === "dark";
  const isPrimary = variant === "primary";

  /* Colours depend on surface */
  const borderColor = onDark ? "rgba(255,255,255,0.3)" : "var(--fg)";
  const textColor = onDark ? "#FFFFFF" : "var(--fg)";
  const fillColor = onDark ? "#FFFFFF" : "var(--fg)";
  const hoverText = onDark ? "var(--fg)" : "var(--bg)";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-[13px] border px-8 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-all duration-500",
        className
      )}
      style={{ borderColor, color: textColor }}
    >
      {/* Sweep fill on hover */}
      <span
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-x-100"
        style={{ backgroundColor: fillColor }}
      />
      <span
        className="relative z-10 transition-colors duration-500"
        style={{ "--hover-color": hoverText } as React.CSSProperties}
      >
        <span className="group-hover:text-[var(--hover-color)]">{children}</span>
      </span>
      {arrow && (
        <svg
          className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  );
}
