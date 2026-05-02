"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span
        className="font-[family-name:var(--font-display)] text-[clamp(4rem,15vw,8rem)] font-bold leading-none"
        style={{ color: "var(--surface)" }}
      >
        500
      </span>
      <h1 className="mt-4 mb-4 font-[family-name:var(--font-display)] text-3xl font-bold">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-base" style={{ color: "var(--muted)" }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-8 py-3.5 text-[0.875rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--fg)", color: "var(--bg)" }}
      >
        Try Again
      </button>
    </main>
  );
}
