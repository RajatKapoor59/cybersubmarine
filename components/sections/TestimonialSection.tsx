"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Inkwell changed how I think about publishing online. It feels like writing in a beautiful notebook — not shouting into the void.",
    name: "Sarah Chen",
    role: "Writer & Essayist",
  },
  {
    quote: "Finally, a blog that puts the reading experience first. Every detail feels considered, from the typography to the whitespace.",
    name: "Marcus Rivera",
    role: "Design Director",
  },
  {
    quote: "I moved my entire publication here. The editorial quality speaks for itself — readers actually stay and read.",
    name: "Anika Patel",
    role: "Editor-in-Chief, The Margin",
  },
];

export function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Section label */}
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Readers say
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
            Words from our community
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex flex-col justify-between border p-8 md:p-10"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                borderRadius: "var(--radius)",
              }}
            >
              {/* Quote mark */}
              <div>
                <svg
                  className="mb-5"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M9.352 21.202c-1.556 0-2.724-.506-3.504-1.518C5.068 18.674 4.68 17.35 4.68 15.716c0-2.028.584-3.874 1.752-5.538C7.6 8.514 9.196 7.234 11.224 6.338L12.508 8.32c-1.556.74-2.762 1.636-3.618 2.688-.856 1.052-1.35 2.17-1.48 3.354.364-.156.78-.234 1.248-.234 1.088 0 1.976.364 2.664 1.092.688.728 1.032 1.66 1.032 2.794 0 1.088-.376 2.002-1.126 2.742-.752.74-1.696 1.11-2.836 1.11l-.04.336zm13.546 0c-1.556 0-2.724-.506-3.504-1.518-.78-1.01-1.17-2.334-1.17-3.968 0-2.028.584-3.874 1.752-5.538 1.168-1.664 2.764-2.944 4.792-3.84L25.954 8.32c-1.556.74-2.762 1.636-3.618 2.688-.856 1.052-1.35 2.17-1.48 3.354.364-.156.78-.234 1.248-.234 1.088 0 1.976.364 2.664 1.092.688.728 1.032 1.66 1.032 2.794 0 1.088-.376 2.002-1.126 2.742-.752.74-1.696 1.11-2.836 1.11l-.04.336z"
                    style={{ fill: "var(--accent)", opacity: 0.25 }}
                  />
                </svg>
                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "var(--fg)" }}
                >
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="h-[1px] mb-5" style={{ backgroundColor: "var(--border)" }} />
                <p className="font-[family-name:var(--font-display)] text-base font-bold" style={{ color: "var(--fg)" }}>
                  {t.name}
                </p>
                <p className="text-[0.8125rem] mt-0.5" style={{ color: "var(--muted)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
