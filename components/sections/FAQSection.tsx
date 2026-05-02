"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How is Inkwell different from WordPress?",
    answer:
      "Inkwell loads 10x faster, requires zero maintenance, and has no plugins to update or security patches to worry about. It's built with modern web technology (Next.js) so your blog is fast, secure, and future-proof out of the box.",
  },
  {
    question: "Can I customize the design?",
    answer:
      "Absolutely. Everything from colors and fonts to layout and spacing is customizable. The design system uses CSS variables and Tailwind CSS, so changes cascade beautifully throughout the entire site.",
  },
  {
    question: "Is there an RSS feed?",
    answer:
      "Yes — Inkwell generates an RSS feed automatically. Your readers can subscribe with any RSS reader, and the feed updates whenever you publish a new post.",
  },
  {
    question: "How do I add new blog posts?",
    answer:
      "Posts are written in markdown or managed through a CMS dashboard (optional). Just write your content, add some metadata like title and category, and it's published. No complicated editor, no formatting struggles.",
  },
  {
    question: "Is Inkwell free to use?",
    answer:
      "The template is completely free and open source. You only pay for hosting, which is free on platforms like Vercel. No subscriptions, no premium tiers, no hidden costs.",
  },
  {
    question: "Does it support code syntax highlighting?",
    answer:
      "Yes, Inkwell supports syntax highlighting for code blocks with a copy button. Perfect for technical blogs, tutorials, and documentation-style posts.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className="pr-8 text-base font-bold sm:text-[1.0625rem]"
          style={{ color: "var(--fg)" }}
        >
          {question}
        </span>
        <span
          className="relative flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-300"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            color: isOpen ? "var(--accent)" : "var(--muted)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="9" y1="3" x2="9" y2="15" />
            <line x1="3" y1="9" x2="15" y2="9" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="pb-6 text-base leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span
            className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            FAQ
          </span>
          <h2
            className="mb-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Common Questions
          </h2>
          <p
            className="text-base"
            style={{ color: "var(--muted)" }}
          >
            Everything you need to know about Inkwell.
          </p>
        </div>

        {/* FAQ items with border-bottom only */}
        <div
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
