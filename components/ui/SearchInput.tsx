"use client";

import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchInput({
  onSearch,
  placeholder = "Search articles...",
}: SearchInputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full rounded-full border border-foreground/10 bg-transparent py-3 pl-11 pr-4 text-base text-foreground placeholder:text-muted focus:border-foreground/30 focus:outline-none"
      />
    </div>
  );
}
