# Inkwell — Minimal Blog

> An editorial magazine-style blog built for readers who care about craft. Words first, always.

## Brand Identity

- **Personality**: Editorial, intentional, refined. Inspired by Monocle, The Outline, It's Nice That.
- **Colors**: Warm off-white background (#F8F6F3), near-black text (#141414), warm muted (#7A7A7A), burnt orange accent (#E54D2E), soft surface (#EFEDE8), warm border (#DBD8D0)
- **Fonts**: Playfair Display (serif, headlines/display) + Inter (sans-serif, body text) — classic editorial pairing
- **Design philosophy**: Sharp geometry, generous whitespace, asymmetric layouts. No rounded pills, no gradient backgrounds. Borders and underlines over fills.

## Pages

- **Homepage** (`/`) — Editorial hero with GSAP clip-path reveal, topic marquee, featured posts (asymmetric layout), tabbed latest articles, categories horizontal scroll, post slider, FAQ accordion, dark CTA section, newsletter signup
- **Blog Listing** (`/blog`) — Search bar, category underline tabs, paginated 3-column grid with GSAP scroll reveals
- **Single Post** (`/blog/[slug]`) — Full-width cover image, two-column layout with article body (editorial typography, table of contents, reading time, author box, tags) and a sticky sidebar (about blurb, subscribe form, recent posts, categories with counts, tag cloud, reading stats), related posts full-width below
- **Categories** (`/categories/[category]`) — Filtered posts by topic with color accent strip
- **About** (`/about`) — Dark hero with asymmetric clipped image and floating stat card, sticky pull-quote story section, values card grid with icons on surface background, horizontal stats strip, team cards with avatars, vertical timeline, dual-CTA section, newsletter bar
- **Contact** (`/contact`) — Dark hero with split layout (bold typography left, decorative accent circle with quote right), GSAP stagger reveal, status pill with ping animation, contact pills, separate form section below, "Ways to Connect" cards, FAQ accordion
- **404** — Clean not-found page with large translucent number

## Components

### Layout
- **Navbar** — Fixed position, GSAP scroll-based transparent-to-blur background, underline nav indicators, subscribe button links to #newsletter
- **Footer** — Dark inverted (bg uses --fg), large serif headline, 4-column grid (Brand, Navigate, Topics, Legal), links to actual category pages
- **NewsletterBar** — Email signup with envelope icon, success state with green checkmark

### Blog
- **BlogCard** — GSAP scroll-triggered reveal, image hover scale, category color as inline text, vertical/horizontal layouts
- **BlogGrid** — Responsive 3-column grid
- **TableOfContents** — Collapsible with CSS max-height transition, IntersectionObserver scroll spy, accent underline for active heading
- **AuthorBox** — Real author image, border-top/bottom dividers, "Written by" uppercase label
- **RelatedPosts** — Border-top divider, accent label, serif heading
- **BlogSidebar** — Sticky sidebar with about blurb, compact subscribe form, recent posts (thumbnail + title), categories list with color dots and counts, tag cloud, reading stats grid

### Sections
- **HeroSection** — GSAP staggered headline reveal ("Stories / worth / reading."), clip-path image reveal, parallax on scroll
- **MarqueeSection** — Two rows with opposite CSS animation directions, colored dots, thin borders, edge fade gradients
- **FeaturedPostsSection** — Asymmetric layout (hero card 60/40 split + two vertical), GSAP clip-path reveal on hero image
- **TabsSection** — Bottom underline indicator (not pills), CSS keyframe fade animation on tab switch, 3-column card grid
- **CategoriesSection** — Horizontal snap scroll, 220px cards with colored top strip, icons, arrow on hover, GSAP stagger reveal
- **PostSlider** — Horizontal scroll carousel with arrow buttons, 320px cards
- **FAQSection** — Border-bottom accordion, plus-to-X rotation, CSS max-height transitions
- **CTASection** — Dark background with dot-grid SVG pattern, GSAP timeline reveal

### UI
- **Badge** — Simple colored text with uppercase tracking (no background)

## Data

All blog content in `data/posts.ts` with 8 sample articles. Categories in `data/categories.ts` (design, development, creativity, productivity, writing). Authors in `data/authors.ts`.

## Images

Using curated images from the ShipStudio images folder (no animal photos):
- `hero-runner.webp` — Runner silhouette on orange wall (hero)
- `editorial-portrait.webp` — Woman with glasses (about page, posts)
- `design-product.webp` — Handbag on stone (posts)
- `forest.jpg` — Pine forest (posts)
- `sunlit-trees.jpg` — Trees with sunlight (posts)
- `traveller.png` — Woman traveller (posts)
- `author-1.jpg` — Man portrait (author avatar)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- GSAP + ScrollTrigger (animations)
- @studio-freight/react-lenis (smooth scrolling)
- Grain texture overlay for print-like feel
- TypeScript
- **Sanity CMS** (project ID: `eucyejox`, dataset: `production`)

## Sanity CMS

All blog content is now managed in Sanity. The editing dashboard lives at `/studio` on your site.

### How to write a new post
1. Go to `your-domain.com/studio` and log in
2. Click **Blog Posts** → **New**
3. Fill in: title, excerpt, cover image, body, author, category, tags
4. Click **Publish** — it goes live within 60 seconds

### What's in Sanity
- **Blog Posts** — title, slug, excerpt, cover image, body (rich text), author, category, tags, featured flag
- **Authors** — name, bio, avatar, Twitter, website
- **Categories** — name, slug, description, color

### Data flow
- New posts: written 100% in Sanity Studio (rich text body)
- Existing posts: served from MDX files in `content/posts/` (body) with Sanity metadata
- All listing pages, homepage sections, and category/tag pages fetch live from Sanity
- Pages revalidate every 60 seconds after a publish

### Environment variables needed for deployment
```
NEXT_PUBLIC_SANITY_PROJECT_ID=eucyejox
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=<from .env.local>
```

## How to Customize

- **To change colors**: Edit the CSS variables in `app/globals.css` (--bg, --fg, --muted, --accent, --surface, --border, --card)
- **To change fonts**: Edit `app/layout.tsx` — swap the Inter import and the Playfair Display link tag
- **To add a blog post**: Add a new entry to the `posts` array in `data/posts.ts`
- **To add a category**: Add to the `categories` array in `data/categories.ts`
- **To add a page**: Create a new folder in `app/` with a `page.tsx` file
- **To change the accent color**: Update `--accent` in `globals.css` and `--accent-soft` accordingly

## Deployment

The site is deployed on Vercel. To deploy:
1. Push the repo to GitHub
2. Import in Vercel at vercel.com/new
3. Add the 4 environment variables from `.env.local`
4. Deploy — the Studio will be live at `your-domain.com/studio`
5. Add your custom domain in Vercel → Settings → Domains
6. Add the custom domain as a CORS origin in Sanity at sanity.io/manage → eucyejox → API → CORS

## Recent Changes

- May 2, 2026: Connected Sanity CMS — all content now managed from Studio at /studio. Seeded 2 authors, 5 categories, 8 posts. Updated all pages and homepage sections to fetch from Sanity with 60s revalidation.
- April 30, 2026: Full QA pass — SEO (sitemap, robots, OG/Twitter cards, metadata on all pages, canonical URLs), responsive fixes (mobile text sizing, touch targets, padding), content fixes (AuthorBox avatar, form accessibility, broken links, color consistency)
- April 30, 2026: Redesigned about page — dark hero with clipped image, pull-quote story layout, icon value cards, team section, timeline, dual CTA
- April 30, 2026: Enhanced contact page with "Ways to Connect" card grid and FAQ accordion section
- April 30, 2026: Added sidebar to single blog post page — two-column layout with sticky sidebar containing about section, subscribe form, recent posts, categories, tags cloud, and reading stats
- April 28, 2026: Complete editorial redesign — GSAP animations, Playfair Display + Inter fonts, Lenis smooth scroll, grain overlay, clip-path reveals, editorial magazine aesthetic
- April 27, 2026: Initial build with all pages and components
