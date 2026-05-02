"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const connectMethods = [
  {
    label: "Email",
    value: "hello@inkwell.blog",
    description: "For partnerships, press inquiries, or anything that needs a proper reply.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    accent: "#E54D2E",
  },
  {
    label: "Twitter / X",
    value: "@inkwellblog",
    description: "Quick questions, comments on posts, or just to say hi. DMs are open.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    accent: "#1C1917",
  },
  {
    label: "Newsletter",
    value: "2,000+ subscribers",
    description: "Join our weekly digest. One curated email — no spam, no fluff, just good writing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    accent: "#7C5CFC",
  },
  {
    label: "Response Time",
    value: "Within 48 hours",
    description: "We read every message. If it needs a reply, you'll hear back within two business days.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    accent: "#2E9E6B",
  },
];

const faqs = [
  {
    question: "Can I republish or translate your articles?",
    answer: "We're open to it on a case-by-case basis. Send us an email with the article you'd like to republish, where it would appear, and whether you plan to translate it. We usually say yes if proper attribution is given.",
  },
  {
    question: "Do you accept guest posts?",
    answer: "Occasionally. We look for original perspectives on design, development, creativity, or writing craft. No SEO pieces, no listicles, no AI-generated filler. Pitch us a topic with a brief outline and a sample of your writing.",
  },
  {
    question: "I found a typo / broken link. How do I report it?",
    answer: "We appreciate the sharp eyes! Just drop us a quick email or tweet with the page URL and what you found. We'll fix it and credit you in our changelog if you'd like.",
  },
  {
    question: "Are you available for consulting or speaking?",
    answer: "Selectively. Emma speaks at design conferences and runs occasional workshops on editorial design. Alex consults on web architecture. Reach out with details about your event or project and we'll let you know.",
  },
  {
    question: "What tools do you use to build Inkwell?",
    answer: "Next.js, Tailwind CSS, and a lot of care. Typography is set in Cormorant Garamond and DM Sans. Hosting is on Vercel. We write in plain markdown and keep things deliberately simple.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current.querySelectorAll(".c-reveal"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.querySelectorAll(".connect-card"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!faqRef.current) return;
    gsap.fromTo(
      faqRef.current.querySelectorAll(".faq-item"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero Section — Split layout */}
        <section className="relative overflow-hidden" style={{ backgroundColor: "var(--fg)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div ref={headerRef} className="grid min-h-[520px] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-0">
              {/* Left: Typography */}
              <div className="relative z-10">
                <div className="c-reveal mb-5 inline-flex items-center gap-2.5 border px-4 py-2" style={{ borderColor: "rgba(255,255,255,0.15)", borderRadius: "100px" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "var(--accent)" }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  </span>
                  <span className="text-[0.8125rem] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
                    We typically reply within 48 hours
                  </span>
                </div>

                <h1 className="c-reveal mb-6 font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight" style={{ color: "var(--bg)" }}>
                  Let&apos;s start a<br />
                  <span style={{ color: "var(--accent)" }}>conversation</span>
                </h1>

                <p className="c-reveal mb-10 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Whether it&apos;s a collaboration, a question about our work, or simply a hello — we&apos;d love to hear from you.
                </p>

                {/* Quick info pills */}
                <div className="c-reveal flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 border px-4 py-2.5" style={{ borderColor: "rgba(255,255,255,0.12)", borderRadius: "var(--radius)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="text-[0.875rem] font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>hello@inkwell.blog</span>
                  </div>
                  <div className="flex items-center gap-2 border px-4 py-2.5" style={{ borderColor: "rgba(255,255,255,0.12)", borderRadius: "var(--radius)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-[0.875rem] font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>@inkwellblog</span>
                  </div>
                </div>
              </div>

              {/* Right: Decorative geometric pattern */}
              <div className="c-reveal relative hidden h-full min-h-[420px] items-center justify-center lg:flex">
                {/* Large accent circle */}
                <div
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  style={{
                    width: "380px",
                    height: "380px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 30% 30%, var(--accent), #C4351C)",
                    opacity: 0.9,
                  }}
                />
                {/* Floating decorative elements */}
                <div className="absolute right-[50px] top-[60px] h-20 w-20 border-2" style={{ borderColor: "rgba(255,255,255,0.15)", borderRadius: "var(--radius)", transform: "rotate(12deg)" }} />
                <div className="absolute right-[280px] bottom-[80px] h-14 w-14 border-2" style={{ borderColor: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
                <div className="absolute right-[160px] top-[40px] h-3 w-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
                <div className="absolute right-[60px] bottom-[120px] h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                {/* Quote overlay on the circle */}
                <div className="absolute right-[60px] top-1/2 z-10 -translate-y-1/2 max-w-[280px]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)" className="mb-3">
                    <path d="M11 7H7a4 4 0 0 0-4 4v1a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 1 8 7.5V7h3V7zm10 0h-4a4 4 0 0 0-4 4v1a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.5A2.5 2.5 0 0 1 18 7.5V7h3V7z" />
                  </svg>
                  <p className="text-lg font-medium leading-snug italic" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Every great collaboration starts with a single message.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom edge gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
        </section>

        {/* Form Section */}
        <section className="px-6 py-14 lg:py-24 lg:px-10">
          <div className="mx-auto max-w-xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
                Send us a message
              </h2>
              <p className="text-base" style={{ color: "var(--muted)" }}>
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: "#dcfce7", borderRadius: "var(--radius)" }}>
                  <svg className="h-7 w-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold">Message sent</h2>
                <p style={{ color: "var(--muted)" }}>We&apos;ll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-base font-semibold">Name</label>
                    <input id="contact-name" type="text" required className="w-full border bg-transparent px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-base font-semibold">Email</label>
                    <input id="contact-email" type="email" required className="w-full border bg-transparent px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-base font-semibold">Subject</label>
                  <input id="contact-subject" type="text" required className="w-full border bg-transparent px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }} placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-base font-semibold">Message</label>
                  <textarea id="contact-message" required rows={6} className="w-full resize-none border bg-transparent px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] transition-colors" style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }} placeholder="Your message..." />
                </div>
                <button type="submit" className="w-full py-4 text-[0.875rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--fg)", color: "var(--bg)", borderRadius: "var(--radius)" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Ways to Connect Section */}
        <section className="px-6 py-14 lg:py-24 lg:px-10" style={{ backgroundColor: "var(--surface)" }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-lg">
              <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Other ways
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                More ways to reach us
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                Pick whatever feels most comfortable. We&apos;re real people who actually read and reply.
              </p>
            </div>

            <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {connectMethods.map((method) => (
                <div
                  key={method.label}
                  className="connect-card group border p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${method.accent}12`,
                      borderRadius: "10px",
                      color: method.accent,
                    }}
                  >
                    {method.icon}
                  </div>

                  {/* Label */}
                  <div className="mb-1 text-[0.8125rem] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    {method.label}
                  </div>

                  {/* Value */}
                  <div className="mb-3 text-lg font-bold" style={{ color: "var(--fg)" }}>
                    {method.value}
                  </div>

                  {/* Description */}
                  <p className="text-[0.875rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-14 lg:py-24 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-14 text-center">
              <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                FAQ
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                Common questions
              </h2>
              <p className="mx-auto max-w-lg text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                Before you write, the answer might already be here.
              </p>
            </div>

            <div ref={faqRef} className="divide-y" style={{ borderColor: "var(--border)" }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span className="pr-8 text-lg font-semibold leading-snug" style={{ color: "var(--fg)" }}>
                      {faq.question}
                    </span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: openFaq === i ? "var(--accent)" : "var(--surface)",
                        borderRadius: "50%",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke={openFaq === i ? "white" : "var(--fg)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="7" y1="1" x2="7" y2="13" />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0,1)]"
                    style={{
                      maxHeight: openFaq === i ? "300px" : "0px",
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <p className="pb-6 text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
