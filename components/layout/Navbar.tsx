"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const navInnerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navInnerRef.current) return;
    gsap.to(navInnerRef.current, {
      height: scrolled ? 56 : 68,
      boxShadow: scrolled ? "0 8px 24px -12px rgba(23, 25, 17, 0.18)" : "0 0px 0px 0px rgba(23, 25, 17, 0)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrolled]);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;
    if (mobileOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        mobileLinksRef.current.children,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -8, duration: 0.25, ease: "power2.in",
        onComplete: () => { if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: "none" }); },
      });
    }
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div ref={navInnerRef} className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--fg)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-[17px] font-medium font-[family-name:var(--font-display)] text-[var(--fg)] tracking-[-0.01em]">
              CyberSubmarine
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link relative text-[13px] font-medium py-1 transition-colors duration-200",
                    isActive ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-[2px] h-[1.5px] bg-[var(--fg)] transition-all duration-300",
                      isActive ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/#newsletter"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-[var(--bg)] bg-[var(--fg)] rounded-full hover:bg-[var(--teal)] transition-colors duration-200"
            >
              Get free guides
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label="Toggle menu"
            >
              <span className={cn("block w-5 h-[1.5px] bg-[var(--fg)] transition-all duration-300 origin-center", mobileOpen && "rotate-45 translate-y-[3.25px]")} />
              <span className={cn("block w-5 h-[1.5px] bg-[var(--fg)] transition-all duration-300 origin-center", mobileOpen && "-rotate-45 -translate-y-[3.25px]")} />
            </button>
          </div>
        </div>
      </div>

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
                  "py-3 text-[14px] font-medium border-b border-[var(--border)] last:border-b-0",
                  isActive ? "text-[var(--accent-text)]" : "text-[var(--muted)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#newsletter"
            className="mt-4 flex items-center justify-center px-5 py-3 text-[13px] font-semibold text-[var(--bg)] bg-[var(--fg)] rounded-full"
            onClick={() => setMobileOpen(false)}
          >
            Get free guides
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .nav-link:hover span { width: 100% !important; }
      `}</style>
    </nav>
  );
}
