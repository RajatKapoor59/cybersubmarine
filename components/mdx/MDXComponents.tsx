import type { MDXComponents as MDXComponentsType } from "mdx/types";
import Image from "next/image";
import React from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const mdxComponents: MDXComponentsType = {
  h2: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h2
        id={id}
        className="mb-4 mt-14 scroll-mt-24 font-[family-name:var(--font-display)] text-2xl font-bold leading-snug sm:text-3xl"
        style={{ color: "var(--fg)" }}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h3
        id={id}
        className="mb-3 mt-10 scroll-mt-24 font-[family-name:var(--font-display)] text-xl font-bold leading-snug"
        style={{ color: "var(--fg)" }}
      >
        {children}
      </h3>
    );
  },

  p: ({ children }) => (
    <p
      className="mb-6 text-lg leading-[1.85]"
      style={{ color: "var(--fg)", opacity: 0.85 }}
    >
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="mb-6 list-disc pl-6">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="mb-6 list-decimal pl-6">{children}</ol>
  ),

  li: ({ children }) => (
    <li
      className="mb-2 text-lg leading-[1.85]"
      style={{ color: "var(--muted)" }}
    >
      {children}
    </li>
  ),

  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="underline decoration-[var(--accent)] decoration-1 underline-offset-2 transition-colors hover:text-[var(--accent)]"
        style={{ color: "var(--fg)" }}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },

  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: "var(--fg)" }}>
      {children}
    </strong>
  ),

  em: ({ children }) => <em className="italic">{children}</em>,

  blockquote: ({ children }) => (
    <blockquote
      className="my-8 border-l-[3px] border-[var(--accent)] pl-5 italic"
      style={{ color: "var(--muted)" }}
    >
      {children}
    </blockquote>
  ),

  pre: ({ children }) => (
    <pre
      className="my-8 overflow-x-auto border p-5"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius)",
      }}
    >
      {children}
    </pre>
  ),

  code: ({ children, className }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return (
        <code
          className="text-base leading-relaxed font-mono"
          style={{ color: "var(--fg)" }}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded px-1.5 py-0.5 text-[0.875em] font-mono"
        style={{ backgroundColor: "var(--surface)", color: "var(--accent)" }}
      >
        {children}
      </code>
    );
  },

  hr: () => (
    <hr
      className="my-10 border-0"
      style={{ height: "1px", backgroundColor: "var(--border)" }}
    />
  ),

  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    if (src.startsWith("/")) {
      return (
        <span className="my-8 block overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
          <Image
            src={src}
            alt={alt ?? ""}
            width={720}
            height={405}
            className="w-full h-auto"
          />
        </span>
      );
    }
    return (
      <span className="my-8 block overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="w-full h-auto" loading="lazy" />
      </span>
    );
  },

  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full border-collapse text-base"
        style={{ color: "var(--fg)" }}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th
      className="border-b-2 px-4 py-3 text-left text-[0.875rem] font-semibold uppercase tracking-wider"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td
      className="border-b px-4 py-3"
      style={{ borderColor: "var(--border)" }}
    >
      {children}
    </td>
  ),
};
