"use client";

import { useState } from "react";

export function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      id="newsletter"
      className="px-6 py-14 lg:py-24 lg:px-10"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="mx-auto max-w-xl text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center"
            style={{
              backgroundColor: "var(--accent-soft)",
              borderRadius: "var(--radius)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h2
          className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--fg)" }}
        >
          Never miss a post
        </h2>

        {/* Description */}
        <p
          className="mb-8 text-base leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Join 2,000+ readers. One thoughtful email per week — no spam, no fluff.
        </p>

        {/* Form or success */}
        {submitted ? (
          <div
            className="inline-flex items-center gap-3 px-6 py-4"
            style={{
              backgroundColor: "#dcfce7",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22c55e]">
              <svg
                className="h-3.5 w-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-base font-semibold text-[#166534]">
              You&apos;re in! Check your inbox.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 border px-4 py-3.5 text-base outline-none transition-colors focus:border-[var(--accent)]"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--fg)",
                borderRadius: "var(--radius)",
              }}
            />
            <button
              type="submit"
              className="shrink-0 px-7 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                borderRadius: "var(--radius)",
              }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          className="mt-5 text-base"
          style={{ color: "var(--muted)", opacity: 0.6 }}
        >
          Unsubscribe anytime. No hard feelings.
        </p>
      </div>
    </section>
  );
}
