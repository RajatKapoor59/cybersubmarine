import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="flex flex-col items-center justify-center px-6 py-40 text-center">
          <span className="font-[family-name:var(--font-display)] text-[clamp(4rem,15vw,8rem)] font-bold leading-none" style={{ color: "var(--surface)" }}>
            404
          </span>
          <h1 className="mt-4 mb-4 font-[family-name:var(--font-display)] text-3xl font-bold">
            Page not found
          </h1>
          <p className="mb-8 max-w-md text-base" style={{ color: "var(--muted)" }}>
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to reading.
          </p>
          <Link href="/" className="px-8 py-3.5 text-[0.875rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}>
            Go Home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
