export default function Loading() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Navbar placeholder */}
      <div className="h-[72px]" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        {/* Hero skeleton */}
        <div className="mb-6 h-4 w-32 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
        <div className="mb-4 h-12 w-3/4 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
        <div className="mb-16 h-6 w-1/2 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />

        {/* Grid skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="mb-4 aspect-[3/2] animate-pulse rounded-[var(--radius)]" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mb-2 h-4 w-24 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mb-2 h-6 w-full animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
              <div className="h-4 w-2/3 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
