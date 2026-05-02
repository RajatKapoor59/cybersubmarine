"use client";

import { useState } from "react";
import Link from "next/link";

const guideLinks = [
  { label: "All Guides", href: "/blog" },
  { label: "Topics", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const topicLinks = [
  { label: "SOC & Monitoring", href: "/categories/soc-monitoring" },
  { label: "Microsoft 365 Security", href: "/categories/microsoft-365" },
  { label: "Managed Security", href: "/categories/managed-security" },
  { label: "Compliance", href: "/categories/compliance" },
  { label: "Incident Response", href: "/categories/incident-response" },
  { label: "Tool Comparisons", href: "/categories/tool-comparisons" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Disclosure", href: "#" },
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
    <footer id="newsletter" className="bg-[var(--navy)] text-white">
      {/* Newsletter section */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
          <div className="max-w-[520px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)] mb-3">
              Free weekly guides
            </p>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              Cybersecurity made
              <br />
              <span className="text-[var(--teal)]">simple for your team.</span>
            </h2>
          </div>

          <div className="max-w-md w-full">
            <p className="mb-4 text-[0.9375rem] text-white/50 leading-relaxed">
              One practical guide per week. No jargon, no scare tactics. Unsubscribe anytime.
            </p>
            {submitted ? (
              <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-[8px] bg-white/10">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22c55e]">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[0.9375rem] font-semibold text-white">You&apos;re in. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email address"
                  required
                  className="flex-1 border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white placeholder:text-white/30 outline-none rounded-[6px] transition-colors focus:border-[var(--teal)]/60"
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 py-3.5 text-[0.8125rem] font-bold text-[var(--navy)] bg-[var(--teal)] rounded-[6px] hover:bg-[#00c9f0] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-3 text-[0.75rem] text-white/30">
              No spam. No upsells. Just useful security content.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="h-[1px] bg-white/10" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[var(--teal)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-[15px] font-bold text-white tracking-[-0.01em]">CyberSubmarine</span>
            </div>
            <p className="text-[14px] leading-[1.7] text-white/50 max-w-[240px]">
              Practical cybersecurity for small business — without the jargon or the consultant fee.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-5">
              Navigate
            </h3>
            <ul className="flex flex-col gap-1">
              {guideLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors duration-200 inline-block py-1.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-5">
              Topics
            </h3>
            <ul className="flex flex-col gap-1">
              {topicLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors duration-200 inline-block py-1.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-5">
              Legal
            </h3>
            <ul className="flex flex-col gap-1">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors duration-200 inline-block py-1.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-[11px] text-white/30 leading-relaxed">
                CyberSubmarine may earn affiliate revenue from some tool links. We only recommend tools we&apos;d use ourselves.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="h-[1px] bg-white/10" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12px] text-white/30">
            &copy; {currentYear} CyberSubmarine. All rights reserved.
          </p>
          <p className="text-[12px] text-white/30">
            Plain-English security guides for the teams that need them most.
          </p>
        </div>
      </div>
    </footer>
  );
}
