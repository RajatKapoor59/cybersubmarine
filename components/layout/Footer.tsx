"use client";

import { useState } from "react";
import Link from "next/link";

const navigateLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const topicLinks = [
  { label: "Design", href: "/categories/design" },
  { label: "Development", href: "/categories/development" },
  { label: "Creativity", href: "/categories/creativity" },
  { label: "Productivity", href: "/categories/productivity" },
  { label: "Writing", href: "/categories/writing" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
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
    <footer id="newsletter" className="bg-[var(--fg)] text-[var(--bg)]">
      {/* Top section — headline + newsletter */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.02em] max-w-[600px] shrink-0">
            Stories worth
            <br />
            your time.
          </h2>

          {/* Newsletter form */}
          <div className="max-w-md w-full">
            <p className="mb-4 text-[0.9375rem] text-white/50 leading-relaxed">
              Join 2,000+ readers. One thoughtful email per week — no spam, no fluff.
            </p>
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-[13px] bg-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[0.9375rem] font-semibold text-white">You&apos;re in! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white placeholder:text-white/30 outline-none rounded-[13px] transition-colors focus:border-white/40"
                />
                <button
                  type="submit"
                  className="shrink-0 px-7 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-white rounded-[13px] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3 text-[0.75rem] text-white/30">
              Unsubscribe anytime. No hard feelings.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="h-[1px] bg-white/15" />
      </div>

      {/* 4-column grid */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <span className="font-[family-name:var(--font-display)] text-[23px] italic tracking-[-0.02em]">
                Inkwell
              </span>
              <span className="inline-block w-[5px] h-[5px] bg-[var(--accent)] ml-[2px] mb-[6px] align-top" />
            </div>
            <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.7] text-white/50 max-w-[260px]">
              A home for considered writing, sharp perspectives, and visual
              stories that linger. Published from wherever the light is good.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-[family-name:var(--font-body)] text-[12px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Navigate
            </h3>
            <ul className="flex flex-col gap-1">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors duration-200 inline-block py-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-[family-name:var(--font-body)] text-[12px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Topics
            </h3>
            <ul className="flex flex-col gap-1">
              {topicLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors duration-200 inline-block py-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-[family-name:var(--font-body)] text-[12px] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
              Legal
            </h3>
            <ul className="flex flex-col gap-1">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors duration-200 inline-block py-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="h-[1px] bg-white/15" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-white/35 tracking-[0.02em]">
            &copy; {currentYear} Inkwell. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[12px] text-white/35 tracking-[0.02em]">
            Designed with intent. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
