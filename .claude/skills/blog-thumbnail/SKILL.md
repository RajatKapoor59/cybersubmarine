---
name: blog-thumbnail
description: Generate an SVG-based, hand-drawn line-art cover thumbnail (organic blob frame, radar/burst/scatter backdrop, topic icon) for a CyberSubmarine blog post and save it to Sanity as WebP. Auto-trigger whenever a new blog post is created or published in Sanity and has no coverImage — do not wait to be asked.
user_invocable: true
---

# Blog Thumbnail Skill

Generates a thumbnail entirely from code — no AI image generation. It composes a few small SVG pieces (an organic "blob" frame, an optional decorative backdrop, and 1–2 topic icons) from `kit.js`, rasterizes the result to WebP with `sharp`, and uploads it as the post's `coverImage` in Sanity.

This is the CyberSubmarine brand system carried over from the site's hero illustration (see `components/sections/CyberHero.tsx` on the `design/hugin-theme` branch) — pale sage blob, near-black line art, radar rings. Every thumbnail should look like it belongs to the same family while still being visually distinct per post.

## When to trigger

- User runs `/blog-thumbnail` with or without a slug.
- User asks to "generate a thumbnail", "create a cover image", or "add a cover" for a post.
- **Proactively**: any time you create, import, or publish a blog post document in Sanity during this conversation (e.g. as the last step of an article-writing workflow) and it has no `coverImage` — generate one without being asked, then mention you did it.

## Step 1 — Get the post

If given a slug, use it. Otherwise query Sanity for posts missing a cover and ask the user to pick one (or just do all of them if the user says "all"):

```groq
*[_type == "post" && !defined(coverImage)] | order(publishedAt desc) { "slug": slug.current, title }
```

Then fetch the full record:

```groq
*[_type == "post" && slug.current == $slug][0] {
  _id, title, excerpt, "category": category->slug.current
}
```

Use `resource: { projectId: "eucyejox", dataset: "production" }`.

## Step 2 — Pick the composition

Read the title + excerpt + category and match against the table below (first match wins; combine keywords freely — this table is a starting point, not an exhaustive list). Every entry gives: icon(s) with position/scale, and a backdrop.

Canvas is always 1600×1200, center `(CX, CY) = (800, 600)`. Icon coordinates below assume that center; offset icons are given as absolute x/y.

| Topic keywords | Icon(s) | Backdrop |
|---|---|---|
| phishing, email, spoofing, BEC | `envelope` (badge: true) at center, scale 1.2 | `radarRings` |
| SOC, monitoring, detection, XDR, MDR, alerts | `monitor` at center, scale 1.2 | `radarRings` |
| compliance, SOC 2, ISO 27001, certification, audit prep | `document` at center-left (x-50), scale 1.4 **+** `shield` (check: true) offset (x+115,y+115), scale 0.68 | none (`""`) |
| audit, assessment, maturity, scoring, benchmarks | `gauge` at center, scale 1.5 | `radarRings` |
| ransomware, breach, incident response, "what to do when" | `lock` (broken: true) at center, scale 1.35 **+** `triangleAlert` offset (x+145,y-135), scale 0.52 | `radiatingBurst` |
| MSSP, managed security, partners, outsourcing | `networkNodes` at center, scale 1.4 | `scatterDots` |
| cloud, Microsoft 365, SharePoint, Teams, Azure | `cloud` at (x, y-10), scale 1.3 **+** `lock` (broken: false) at (x, y+35), scale 0.62 | `gridDots` |
| identity, access, MFA, conditional access, SSO | `key` at (x-10, y), scale 1.3 | `radarRings` |
| biometrics, passwordless, device trust | `fingerprint` at center, scale 1.4 | `scatterDots` |
| backup, disaster recovery, infrastructure, servers | `server` at center, scale 1.3 | `gridDots` |
| tool comparisons, vendor reviews | `magnifier` at center, scale 1.3 | `scatterDots` |
| policy, documentation, requirements (no better match) | `document` at center, scale 1.4 | none (`""`) |

If nothing matches well, default to `shield` (check: true) at center, scale 1.3, with `radarRings` — it's the most generic "security" icon.

Available icon names (see `kit.js`): `envelope`, `monitor`, `shield`, `document`, `lock`, `triangleAlert`, `networkNodes`, `key`, `magnifier`, `cloud`, `server`, `gauge`, `fingerprint`.
Available backdrops: `radarRings`, `scatterDots`, `radiatingBurst`, `gridDots`, or none.

**Don't reuse the exact same icon+backdrop pairing back-to-back** if generating several thumbnails in one session — vary it even within the same topic bucket (e.g. alternate `radarRings` and `scatterDots` for two SOC posts) so a blog index page doesn't look repetitive.

## Step 3 — Derive a deterministic seed

Compute a seed from the slug so re-running for the same post gives the same blob shape, but different posts look different:

```
seed = (sum of character codes in slug) % 1000 / 100   →  a float roughly in [0, 10)
```

Use this as both `seed` (blob shape) and set `marginSeed = seed + 5` (the margin dot-field — generate.js already offsets this by default, no need to pass it explicitly unless you want to override).

## Step 4 — Generate the image

Run the generator from the skill directory:

```bash
node .claude/skills/blog-thumbnail/generate.js '<json-spec>' <output-path-without-extension>
```

Spec shape:

```json
{
  "seed": 4.2,
  "blobRadius": 430,
  "backdrop": "radarRings",
  "icons": [
    { "name": "envelope", "x": 800, "y": 600, "scale": 1.2, "opts": true }
  ]
}
```

For two-icon compositions, add a second entry to `icons` with the offset x/y from the table above (CX=800, CY=600). `opts` is passed straight to the icon function — for `envelope` it's the badge boolean, for `shield` it's the checkmark boolean, for `lock` it's the broken boolean; omit for icons that take no options.

Output to a scratch path, e.g. `/tmp/cybersubmarine-thumb-<slug>`. This writes `.svg`, `.avif`, and `.webp` next to that prefix.

## Step 5 — Upload to Sanity

Upload the **`.webp`** file (default) using the write token from `.env.local`:

```bash
curl -s -X POST \
  "https://eucyejox.api.sanity.io/v2024-01-01/assets/images/production?filename=<slug>-cover.webp" \
  -H "Authorization: Bearer ${SANITY_API_WRITE_TOKEN}" \
  -H "Content-Type: image/webp" \
  --data-binary @<output-path>.webp
```

Read `SANITY_API_WRITE_TOKEN` from `.env.local` (never print it, never commit it). The response JSON's `document._id` is the asset ID (looks like `image-<hash>-1600x1200-webp`).

`generate.js` also produces an `.avif` alongside — Sanity itself accepts AVIF fine (confirmed: full metadata/blurhash/palette extraction works on upload). WebP is the default here because a *separate*, since-fixed bug in `app/blog/[slug]/page.tsx`'s `generateMetadata` (an `"coverImage" in post` check that grabbed the raw Sanity image object instead of its URL string) broke the Next.js static build the first time any post ever got a real `coverImage` — this had nothing to do with image format, but WebP was chosen as the safer default while diagnosing it. If you want to switch back to AVIF as the primary upload, it should work now that the real bug is fixed — just swap `.webp`/`image/webp` for `.avif`/`image/avif` above.

## Step 6 — Patch and publish the post

```
mcp__sanity__patch_documents
documentId: <post _id>
set: [{ "path": "coverImage", "value": {
  "_type": "image",
  "asset": { "_type": "reference", "_ref": "<assetId>" },
  "alt": "<post title> — CyberSubmarine"
}}]
```

Then `mcp__sanity__publish_documents` with the post's `_id`.

## Step 7 — Confirm

Tell the user, briefly:
- Which post got a thumbnail
- The icon/backdrop combo used (one line, e.g. "envelope + alert badge, radar rings")
- That it's live

## Notes

- No text, logos, or watermarks ever go in the image — the icon and shape carry the meaning.
- Palette is fixed to the site's sage theme (`BG #E9EFE2`, `SURFACE #DEE7D3`, `BORDER #C9D5BA`, `FG #171911`) — defined once in `kit.js`, don't hardcode colors elsewhere.
- If the brand palette in `app/globals.css` changes, update the constants at the top of `kit.js` to match.
- `kit.js` and `generate.js` live in this skill folder and resolve `sharp` from the project's own `node_modules` (this folder is inside the repo tree) — don't copy them elsewhere to run.
