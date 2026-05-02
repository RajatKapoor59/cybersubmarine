"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-based background and border
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate border and background on scroll state change
  useEffect(() => {
    if (!navRef.current || !borderRef.current) return;

    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(248, 246, 243, 0.92)",
        backdropFilter: "blur(12px)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(borderRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(248, 246, 243, 0)",
        backdropFilter: "blur(0px)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(borderRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [scrolled]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;

    if (mobileOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      // Stagger links in
      const links = mobileLinksRef.current.children;
      gsap.fromTo(
        links,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { display: "none" });
          }
        },
      });
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "rgba(248, 246, 243, 0)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="font-[family-name:var(--font-display)] text-[25px] italic text-[var(--fg)] tracking-[-0.02em]">
              Inkwell
            </span>
            <span className="inline-block w-[6px] h-[6px] bg-[var(--accent)] ml-[2px] mb-[7px] align-top" />
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link relative text-[11px] font-[family-name:var(--font-body)] font-medium uppercase tracking-[0.14em] py-1",
                    "transition-colors duration-200",
                    isActive
                      ? "text-[var(--fg)]"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {item.label}
                  {/* Underline indicator */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-[2px] h-[1.5px] bg-[var(--fg)] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0,1)]",
                      isActive ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <span className="hidden md:inline-flex">
              <ButtonLink href="/#newsletter" variant="primary" className="!px-6 !py-2.5 !text-[0.6875rem]">
                Subscribe
              </ButtonLink>
            </span>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "block w-5 h-[1.5px] bg-[var(--fg)] transition-all duration-300 origin-center",
                  mobileOpen && "rotate-45 translate-y-[3.25px]"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-[1.5px] bg-[var(--fg)] transition-all duration-300 origin-center",
                  mobileOpen && "-rotate-45 -translate-y-[3.25px]"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border — animates in on scroll */}
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border)] origin-left"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden flex-col bg-[var(--bg)] border-b border-[var(--border)]"
        style={{ display: "none" }}
      >
        <div ref={mobileLinksRef} className="flex flex-col px-6 py-6 gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 text-[13px] font-[family-name:var(--font-body)] font-medium uppercase tracking-[0.12em]",
                  "border-b border-[var(--border)] last:border-b-0",
                  isActive ? "text-[var(--fg)]" : "text-[var(--muted)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ButtonLink href="/#newsletter" variant="primary" className="mt-4 w-full justify-center !py-3">
            Subscribe
          </ButtonLink>
        </div>
      </div>

      {/* Hover underline style for nav links */}
      <style jsx global>{`
        .nav-link:hover span {
          width: 100% !important;
        }
      `}</style>
    </nav>
  );
}
