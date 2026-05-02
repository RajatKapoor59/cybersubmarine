import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { slugify } from "@/lib/toc";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        id={slugify(extractText(children))}
        className="text-[1.625rem] font-bold text-[var(--fg)] tracking-[-0.02em] mt-12 mb-4 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(extractText(children))}
        className="text-[1.25rem] font-bold text-[var(--fg)] tracking-[-0.01em] mt-9 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[1.0625rem] font-bold text-[var(--fg)] mt-7 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-[1rem] text-[var(--muted)] leading-[1.8] mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-[var(--accent)] pl-5 my-7 italic text-[var(--muted)] text-[1rem] leading-[1.7]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none pl-0 mb-5 flex flex-col gap-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 flex flex-col gap-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-[1rem] text-[var(--muted)] leading-relaxed">
        <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[1rem] text-[var(--muted)] leading-relaxed pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[var(--fg)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-[0.875em] bg-[var(--surface)] px-1.5 py-0.5 rounded-[4px] text-[var(--fg)]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[var(--accent-text)] underline underline-offset-2 decoration-[var(--accent)]/40 hover:decoration-[var(--accent)] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url && !value?.asset?._ref) return null;
      const url = value.asset?.url ?? "";
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-[10px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {url && (
              <Image
                src={url}
                alt={value.alt ?? ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-[0.8125rem] text-[var(--muted)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

function extractText(children: React.ReactNode): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && children !== null) {
    const c = children as { props?: { children?: React.ReactNode } };
    return extractText(c.props?.children);
  }
  return "";
}

interface PortableTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
