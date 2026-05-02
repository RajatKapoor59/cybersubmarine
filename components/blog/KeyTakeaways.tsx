interface KeyTakeawaysProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 rounded-[12px] border border-[var(--accent)]/30 bg-[var(--accent-soft)] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--accent)]/20">
        <div className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-[var(--accent)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--accent-text)]">
          Key Takeaways
        </span>
      </div>
      <ul className="px-6 py-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <span className="text-[0.9375rem] text-[var(--fg)] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
