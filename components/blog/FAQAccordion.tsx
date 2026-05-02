"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { SanityFaq } from "@/lib/sanity.queries";
import { cn } from "@/lib/cn";

interface FAQAccordionProps {
  faqs: SanityFaq[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="my-14">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[1.5rem] font-bold text-[var(--fg)] tracking-[-0.01em]">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="flex flex-col divide-y divide-[var(--border)] border border-[var(--border)] rounded-[12px] overflow-hidden">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq._id}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-[var(--surface)] transition-colors duration-150"
                aria-expanded={isOpen}
              >
                <span className="text-[1rem] font-semibold text-[var(--fg)] leading-[1.4]">
                  {faq.question}
                </span>
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-[var(--border)] transition-all duration-300 mt-[1px]",
                    isOpen ? "bg-[var(--accent)] border-[var(--accent)] rotate-45" : "bg-transparent"
                  )}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? "white" : "currentColor"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--muted)]"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? "800px" : "0px" }}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="prose-editorial text-[0.9375rem] text-[var(--muted)]">
                    <PortableText value={faq.answer as Parameters<typeof PortableText>[0]["value"]} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
