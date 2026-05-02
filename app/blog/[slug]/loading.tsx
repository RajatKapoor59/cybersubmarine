export default function BlogPostLoading() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Navbar placeholder */}
      <div className="h-[72px]" />

      {/* Cover image skeleton */}
      <div className="w-full animate-pulse" style={{ aspectRatio: "21/9", maxHeight: "480px", backgroundColor: "var(--surface)" }} />

      <div className="px-6 pt-12 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
            {/* Article skeleton */}
            <div className="max-w-[680px]">
              <div className="mb-6 h-5 w-24 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mb-4 h-10 w-full animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mb-4 h-10 w-3/4 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mb-12 h-6 w-2/3 animate-pulse rounded" style={{ backgroundColor: "var(--surface)" }} />

              {/* Body lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-4 h-5 animate-pulse rounded"
                  style={{ backgroundColor: "var(--surface)", width: `${85 + Math.random() * 15}%` }}
                />
              ))}
            </div>

            {/* Sidebar skeleton */}
            <div className="hidden lg:block">
              <div className="h-48 animate-pulse rounded-[var(--radius)]" style={{ backgroundColor: "var(--surface)" }} />
              <div className="mt-6 h-64 animate-pulse rounded-[var(--radius)]" style={{ backgroundColor: "var(--surface)" }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
