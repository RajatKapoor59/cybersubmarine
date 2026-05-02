"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";


gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Words First",
    text: "Design serves the writing, never the other way around. Every element earns its place.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Respect Time",
    text: "Fast loading, easy scanning, clear structure. Your readers' attention is a gift — treat it that way.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "No Noise",
    text: "No pop-ups, no cookie walls, no auto-play. Just content worth your time, presented cleanly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    title: "Made With Care",
    text: "Every detail considered — from paragraph spacing to the curve of a quote mark to the scroll rhythm.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Emma Chen",
    role: "Writer & Design Lead",
    bio: "Writer, thinker, and maker of things. Obsessed with typography, minimalism, and the craft of putting words together well.",
    avatar: "/authors/author-1.jpg",
    twitter: "@emmachen",
  },
  {
    name: "Alex Rivers",
    role: "Developer & Technical Writer",
    bio: "Builds things for the web. Passionate about clean code, clear communication, and the intersection of technology and humanity.",
    avatar: "/blog/editorial-portrait.webp",
    twitter: "@alexrivers",
  },
];

const timeline = [
  { year: "2024", event: "First blog post published. Just words, a typeface, and a lot of whitespace." },
  { year: "2025", event: "Reached 1,000 subscribers. Redesigned with Cormorant Garamond and editorial layout." },
  { year: "2026", event: "Full rewrite in Next.js. Added smooth scrolling, GSAP animations, and this about page." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll(".about-reveal"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!storyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        storyRef.current!.querySelectorAll(".story-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: storyRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!valuesRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        valuesRef.current!.querySelectorAll(".value-card"),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: valuesRef.current, start: "top 82%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!teamRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        teamRef.current!.querySelectorAll(".team-card"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: teamRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineRef.current!.querySelectorAll(".tl-item"),
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero — Dark with asymmetric image */}
        <section className="relative overflow-hidden" style={{ backgroundColor: "var(--fg)" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div ref={heroRef} className="grid min-h-[560px] grid-cols-1 items-center gap-10 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-0">
              {/* Left: Text */}
              <div className="relative z-10">
                <div className="about-reveal mb-5 inline-flex items-center gap-2 border px-4 py-2" style={{ borderColor: "rgba(255,255,255,0.15)", borderRadius: "100px" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="text-[0.8125rem] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Est. 2024
                  </span>
                </div>

                <h1 className="about-reveal mb-6 font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-tight" style={{ color: "var(--bg)" }}>
                  A blog that gets<br />
                  out of <span style={{ color: "var(--accent)" }}>the way</span>
                </h1>

                <p className="about-reveal mb-10 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Inkwell is a minimal editorial space for people who believe great writing doesn&apos;t need great decoration. Just great typography.
                </p>

                <div className="about-reveal flex items-center gap-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.875rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--accent)", color: "white", borderRadius: "var(--radius)" }}
                  >
                    Read the blog
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[0.875rem] font-semibold uppercase tracking-wider transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Get in touch
                  </Link>
                </div>
              </div>

              {/* Right: Image with clip treatment */}
              <div className="about-reveal relative hidden lg:block">
                <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden" style={{ borderRadius: "var(--radius)", clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
                  <Image
                    src="/blog/about-hero.webp"
                    alt="Editorial workspace"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,20,0.4) 0%, transparent 50%)" }} />
                </div>
                {/* Floating stat card */}
                <div
                  className="absolute -bottom-6 -left-8 border px-6 py-4"
                  style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
                >
                  <div className="text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: "var(--fg)" }}>2,000+</div>
                  <div className="text-[0.8125rem]" style={{ color: "var(--muted)" }}>Weekly readers</div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
        </section>

        {/* Story Section — Asymmetric with pull quote */}
        <section className="px-6 py-16 lg:py-28 lg:px-10" ref={storyRef}>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              {/* Left: Pull quote */}
              <div className="story-reveal lg:sticky lg:top-[120px]">
                <div className="mb-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ color: "var(--accent)", opacity: 0.3 }}>
                    <path d="M11 7H7a4 4 0 0 0-4 4v1a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 1 8 7.5V7h3V7zm10 0h-4a4 4 0 0 0-4 4v1a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.5A2.5 2.5 0 0 1 18 7.5V7h3V7z" fill="currentColor" />
                  </svg>
                </div>
                <blockquote className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug tracking-tight sm:text-3xl" style={{ color: "var(--fg)" }}>
                  We started with a beautiful reading experience and only added what makes it better.
                </blockquote>
                <div className="mt-6 h-px w-16" style={{ backgroundColor: "var(--accent)" }} />
              </div>

              {/* Right: Story body */}
              <div className="space-y-6">
                <p className="story-reveal text-lg leading-[1.85]" style={{ color: "var(--fg)", opacity: 0.85 }}>
                  We built Inkwell because most blog platforms try too hard. They pile on features,
                  widgets, and visual noise until the writing — the entire reason the blog exists — gets lost in the machinery of publishing.
                </p>
                <p className="story-reveal text-lg leading-[1.85]" style={{ color: "var(--fg)", opacity: 0.85 }}>
                  Inkwell takes the opposite approach. Comfortable typography. Smart navigation. A
                  reading time estimate so you know what you&apos;re getting into. Smooth scrolling so long reads feel effortless. And nothing else.
                </p>
                <p className="story-reveal text-lg leading-[1.85]" style={{ color: "var(--fg)", opacity: 0.85 }}>
                  The result is a blog that loads instantly, reads beautifully on any device, and puts
                  your words exactly where they belong — front and center. No distractions. No compromises. Just the work.
                </p>
                <p className="story-reveal text-lg leading-[1.85]" style={{ color: "var(--fg)", opacity: 0.85 }}>
                  Every typographic decision, every whitespace choice, every animation timing has been deliberated over. We believe that when the container is invisible, the content shines brightest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values — Card grid with icons */}
        <section className="px-6 py-14 lg:py-24 lg:px-10" style={{ backgroundColor: "var(--surface)" }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-lg">
              <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Principles
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                What we believe in
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                Four principles that guide every decision we make — from choosing a font to shipping a feature.
              </p>
            </div>

            <div ref={valuesRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="value-card group border p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", borderRadius: "var(--radius)" }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "var(--accent-soft)", borderRadius: "10px", color: "var(--accent)" }}
                  >
                    {v.icon}
                  </div>
                  <span className="mb-3 block text-[0.75rem] font-semibold tabular-nums" style={{ color: "var(--muted)", opacity: 0.5 }}>
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-bold" style={{ color: "var(--fg)" }}>{v.title}</h3>
                  <p className="text-[0.938rem] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats — Horizontal strip */}
        <section className="border-b px-6 py-16 lg:px-10" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { num: "10x", label: "Faster than WordPress" },
              { num: "100", label: "Lighthouse score" },
              { num: "0", label: "Plugins needed" },
              { num: "8+", label: "Articles published" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>{stat.num}</p>
                <p className="mt-2 text-[0.875rem]" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-16 lg:py-28 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                The Team
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                The people behind the words
              </h2>
              <p className="mx-auto max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                A small team with strong opinions about typography, whitespace, and the Oxford comma.
              </p>
            </div>

            <div ref={teamRef} className="grid gap-8 sm:grid-cols-2">
              {team.map((person) => (
                <div
                  key={person.name}
                  className="team-card group border p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
                >
                  <div className="mb-6 flex items-center gap-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden" style={{ borderRadius: "var(--radius)" }}>
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-[family-name:var(--font-display)]" style={{ color: "var(--fg)" }}>
                        {person.name}
                      </h3>
                      <p className="text-[0.875rem] font-medium" style={{ color: "var(--accent)" }}>
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                    {person.bio}
                  </p>
                  <a
                    href={`https://twitter.com/${person.twitter.replace("@", "")}`}
                    className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--muted)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {person.twitter}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 py-14 lg:py-24 lg:px-10" style={{ backgroundColor: "var(--surface)" }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-14 text-center">
              <div className="mb-3 text-[0.875rem] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Journey
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                How we got here
              </h2>
            </div>

            <div ref={timelineRef} className="relative">
              {/* Vertical line */}
              <div className="absolute left-[27px] top-2 bottom-2 w-px" style={{ backgroundColor: "var(--border)" }} />

              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <div key={item.year} className="tl-item flex gap-6">
                    {/* Dot */}
                    <div className="relative z-10 mt-1.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center">
                      <div className="absolute h-[14px] w-[14px] rounded-full border-2" style={{ borderColor: i === timeline.length - 1 ? "var(--accent)" : "var(--border)", backgroundColor: i === timeline.length - 1 ? "var(--accent-soft)" : "var(--card)" }} />
                      {i === timeline.length - 1 && (
                        <div className="absolute h-[6px] w-[6px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="mb-1.5 text-[0.8125rem] font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                        {item.year}
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                        {item.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-14 lg:py-24 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Like what you see?
            </h2>
            <p className="mb-10 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Subscribe for weekly articles on design, development, and the craft of building for the web.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-4 text-[0.875rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--fg)", color: "var(--bg)", borderRadius: "var(--radius)" }}
              >
                Start reading
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border px-7 py-4 text-[0.875rem] font-semibold uppercase tracking-wider transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: "var(--border)", color: "var(--fg)", borderRadius: "var(--radius)" }}
              >
                Say hello
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
