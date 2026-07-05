# CyberSubmarine — Cybersecurity Guides for Small Business

> Practical, plain-English cybersecurity for SMBs and IT managers. No jargon. No fear-mongering. Just advice that works.

## Brand Identity

- **Personality**: Direct, calm, practical. The Economist meets cybersecurity consultancy. Trusted authority without condescension.
- **Colors**: Deep navy background (#F5F7FA light, #0D1B2A dark/nav), teal accent (#00B4D8), muted blue-grey text (#5A6A7A), light surface (#EEF2F7), border (#D1D9E6)
- **Fonts**: Inter (clean modern sans-serif, body + headings — no decorative serif)
- **Design philosophy**: Clean, confident, information-dense. Dark navy navbar on all pages. Teal as the sole accent color. Cards with subtle borders, no heavy shadows. Content-first.

## Pages

- **Homepage** (`/`) — Dark navy hero (H1: "Cybersecurity Guides for Small Business — Without the Jargon"), Who This Is For (3-column), Topic Pillars (6 category cards), Start Here (curated 4 articles), Latest Guides (3-col grid), Trust Signals, Newsletter (footer)
- **Blog Listing** (`/blog`) — Search bar, category underline tabs, paginated 3-column grid with GSAP scroll reveals
- **Single Post** (`/blog/[slug]`) — Full-width cover image, two-column layout with article body and sticky sidebar, related posts below
- **Categories** (`/categories/[category]`) — Filtered posts by topic with color accent strip
- **About** (`/about`) — *Needs rebuild for CyberSubmarine*
- **Contact** (`/contact`) — *Needs rebuild for CyberSubmarine*
- **404** — Clean not-found page

## Components

### Layout
- **Navbar** — Fixed, always dark navy (#0D1B2A), teal accent on active links, "Get free guides" CTA button, GSAP mobile menu, border fades in on scroll
- **Footer** — Dark navy, newsletter form, 4-column grid (Brand, Navigate, Topics, Legal), affiliate disclosure, teal accent

### Homepage Sections (all new for CyberSubmarine)
- **CyberHero** — Dark navy full-height hero, grid pattern background, teal orb, H1 in three staggered lines, two CTAs, trust bar with audience types
- **WhoThisIsFor** — 3-column card grid: IT Managers, Small Business Owners, Compliance Leads
- **TopicPillars** — 6-card grid: SOC & Monitoring, M365 Security, Managed Security, Compliance, Incident Response, Tool Comparisons — with colored top strips
- **StartHere** — 4 curated articles (first is full-width), pulls from Sanity or shows fallback cards
- **LatestGuides** — 3-column grid of most recent posts with cover images
- **TrustSignals** — Stats row (60+ guides, no ads, plain English, vendor-neutral) + principles list

### Blog (unchanged structure)
- **BlogCard**, **BlogGrid**, **TableOfContents**, **AuthorBox**, **RelatedPosts**, **BlogSidebar** — same as before but will pick up new color scheme

## Data

All blog content managed in Sanity CMS. Categories in `data/categories.ts` (6 CyberSubmarine topics: soc-monitoring, microsoft-365, managed-security, compliance, incident-response, tool-comparisons). Static fallback posts in `data/posts.ts` (Inkwell placeholder content — will be replaced as real articles are published in Sanity).

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

## Blog Thumbnails — `/blog-thumbnail` skill

Rebuilt July 5, 2026: thumbnails are no longer AI-generated photos. They're now hand-coded SVG illustrations in the same style as the homepage hero — an organic sage "blob" frame, an optional backdrop (radar rings, radiating burst, scattered dots, or a grid), and 1–2 simple line-art icons matched to the post's topic (envelope for phishing, broken lock for incident response, document + shield for compliance, etc). Rendered to AVIF and uploaded straight to Sanity as the post's cover image — no design tool, no photo licensing, no repeated AI-generation cost.

- Runs automatically whenever a new post is created/published without a cover image, or on demand via `/blog-thumbnail [slug]`.
- The asset "kit" (blob generator + backdrops + icon library) lives at `.claude/skills/blog-thumbnail/kit.js`, with a CLI renderer at `.claude/skills/blog-thumbnail/generate.js`.
- To add a new icon or topic pairing: edit the icon library in `kit.js` and the keyword-to-icon table in `.claude/skills/blog-thumbnail/SKILL.md`.
- Palette is hardcoded in `kit.js` to match `app/globals.css` — if the site's color tokens change, update both.

## Design Staging Branch — `design/hugin-theme`

Started July 5, 2026: a staging branch to experiment with a new brand direction inspired by hugin.io — pale sage-green backgrounds, near-black text, a serif display headline font, and organic "blob" shape frames instead of hard rectangles. Your live preview follows whichever branch is checked out, so right now you're seeing this new look; your original navy/teal design is untouched on `main`.

- **Colors**: Pale sage bg (`#E9EFE2`), near-black text (`#171911`), deeper sage card surface (`#DEE7D3`), deep sage-black footer band (`#1E2417`). Monochrome accent system — no separate "accent color," just light/dark sage and near-black, per Hugin's minimal palette.
- **Fonts**: Using **Frank Ruhl Libre** (bold serif) for big headlines, paired with the existing **Inter** for body/nav. Swapped in from an earlier Fraunces/italic pairing that read too soft/feminine for a cybersecurity brand — Frank Ruhl Libre is denser and more structural.
- **Shapes**: Added an organic "blob" frame (CSS border-radius trick) around the hero illustration, in place of the old hard-edged gradient hero. This is the reusable pattern to apply to other imagery going forward.
- **Buttons**: Solid black pill buttons now hover to forest green (`var(--teal)`, repointed to `#3F5A3A`) instead of just fading opacity; outline buttons fill solid black on hover. Applied across Navbar, Hero, Footer.
- **Topic area cards**: Removed the old per-category rainbow colors (blue/orange/purple top-strips) — icons are now a uniform sage circle, matching the "Who this is for" cards.
- **Tags**: All tag pills (blog post tags, sidebar tag cloud, audience tags, and blog card category labels) are now rounded-full sage pills instead of square-ish bordered boxes or rainbow-colored text, consistent with the button/pill shape language.
- **Scroll animations**: Fixed a sync bug between the smooth-scroll library (Lenis) and the scroll-triggered reveal animations (GSAP ScrollTrigger) — they were running on separate render loops, which caused the "lagging" stutter on card/section reveals while scrolling. Now driven by a single synced loop (`components/SmoothScroll.tsx`).
- **Updated so far**: color tokens (`app/globals.css`), fonts (`app/layout.tsx`), Navbar, Hero, Footer, TopicPillars, tag components (`Badge`, `BlogCard`, blog post tags, sidebar tag cloud), scroll/animation sync. Homepage sections below the hero (WhoThisIsFor, StartHere, LatestGuides, TrustSignals) pull from the shared color tokens, so they picked up the new palette automatically.
- **Not yet touched**: Blog listing/post page layout, About/Contact, Categories page layout — still on older structural styling since they reference some colors directly beyond just tags.
- **To compare against the current live site**: `git checkout main` restores the navy/teal version.
- **To keep iterating on this direction**: stay on `design/hugin-theme` and keep asking for changes — nothing here is merged into `main` yet.

## Recent Changes

- May 2, 2026: **Complete rebrand to CyberSubmarine** — new color scheme (navy/teal), Inter font, CyberSubmarine navbar and footer, 6 new topic categories, rebuilt homepage with 6 new sections (CyberHero, WhoThisIsFor, TopicPillars, StartHere, LatestGuides, TrustSignals). About and contact pages still need rebuild.
- May 2, 2026: Connected Sanity CMS — all content now managed from Studio at /studio. Seeded authors, categories, posts.
- April 30, 2026: Full QA pass — SEO, responsive fixes, content fixes
- April 28, 2026: Initial build with Inkwell editorial theme (now replaced)
