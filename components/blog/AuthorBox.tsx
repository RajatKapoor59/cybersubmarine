import Image from "next/image";
import { Author } from "@/types/author";

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="flex items-start gap-5 border-t border-b border-border py-8">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-surface">
        <Image
          src={author.avatar || "/authors/author-1.jpg"}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-[0.875rem] font-semibold uppercase tracking-wider text-muted/60 mb-1">
          Written by
        </p>
        <h4 className="font-[family-name:var(--font-display)] text-xl font-bold mb-1.5">
          {author.name}
        </h4>
        <p className="text-base leading-relaxed text-muted">
          {author.bio}
        </p>
        {author.twitter && (
          <a
            href={`https://twitter.com/${author.twitter.replace("@", "")}`}
            className="mt-2 inline-block text-[0.875rem] font-medium text-accent hover:underline"
          >
            {author.twitter}
          </a>
        )}
      </div>
    </div>
  );
}
