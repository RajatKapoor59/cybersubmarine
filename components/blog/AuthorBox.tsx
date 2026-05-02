import Image from "next/image";
import { Author } from "@/types/author";

interface AuthorBoxProps {
  author: Author & { role?: string };
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="mt-14 p-7 border border-[var(--border)] rounded-[12px] bg-[var(--card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] mb-5">
        About the author
      </p>
      <div className="flex items-start gap-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[var(--surface)]">
          <Image
            src={author.avatar || "/authors/author-1.jpg"}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h4 className="text-[1.0625rem] font-bold text-[var(--fg)] tracking-[-0.01em]">
              {author.name}
            </h4>
            {author.role && (
              <span className="text-[12px] font-semibold text-[var(--accent-text)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-[4px]">
                {author.role}
              </span>
            )}
          </div>
          <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)] mb-4">
            {author.bio}
          </p>
          <div className="flex items-center gap-4">
            {author.twitter && (
              <a
                href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {author.twitter}
              </a>
            )}
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
