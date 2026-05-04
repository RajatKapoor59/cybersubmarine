---
name: blog-thumbnail
description: Generate and save an AI cover image for a CyberSubmarine blog post. Fetches post data from Sanity, crafts a tailored image prompt, generates the image, and saves it directly as the post's coverImage in Sanity.
user_invocable: true
---

# Blog Thumbnail Skill

Generates a professional cover image for a CyberSubmarine blog post and saves it to Sanity.

## When to Trigger

- User says `/blog-thumbnail` with or without a slug
- User asks to "generate a thumbnail", "create a cover image", or "add an image" for a blog post

## Step-by-Step Process

### Step 1 — Get the slug

If the user provided a slug (e.g. `/blog-thumbnail what-is-managed-xdr`), use it directly.

If not, query Sanity for all posts and ask the user to pick one:
```groq
*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, title }
```

### Step 2 — Fetch post data

Query Sanity for the post:
```groq
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  excerpt,
  "category": category->name
}
```

Use projectId `eucyejox`, dataset `production`.

### Step 3 — Craft the image prompt

Build a prompt tailored to the article topic. Follow these rules:

**Style anchors (always include):**
- Professional editorial photography or clean digital illustration
- Dark, moody, high-contrast lighting — navy blues, deep teals, near-black backgrounds
- No text, logos, words, or watermarks in the image
- No people's faces unless absolutely central to the topic
- Cinematic, wide-aspect composition suitable for a blog header (16:9)

**Topic-to-visual mapping — use these as starting points:**

| Topic keywords | Visual direction |
|---|---|
| SOC / monitoring / analysts | Server room with blue glow, multiple screens showing dashboards |
| XDR / MDR / detection | Abstract network nodes connecting across dark background, data flow |
| Cyber insurance | Modern office with subtle digital overlay, document/shield motif |
| White label / MSP / partners | Two professionals in a modern office, tech background |
| Ransomware / incident / breach | Red-tinted locked server, warning light glow |
| Phishing / email | Close-up of laptop screen with glowing inbox, shallow depth of field |
| Compliance / regulation | Clean minimal desk with documents, cool blue lighting |
| Identity / MFA / access | Fingerprint or key glowing in teal against dark background |

Combine the article title, excerpt, and category to pick the best visual direction. Write a 2–3 sentence prompt that is specific and cinematic.

**Example prompt for "What is Managed XDR?":**
> "A dark server room with rows of rack-mounted hardware bathed in deep teal and navy blue light. Glowing network connection lines arc between nodes in the foreground, suggesting real-time threat detection. Cinematic wide-angle shot with dramatic volumetric lighting, no text or people, editorial photography style."

### Step 4 — Generate the image

Call `mcp__sanity__generate_image` with:
- `resource`: `{ projectId: "eucyejox", dataset: "production" }`
- `prompt`: the crafted prompt from Step 3
- `intent`: "Generate cover image for CyberSubmarine blog post: [title]"

### Step 5 — Save to Sanity

After generation, you will receive an asset ID (e.g. `image-abc123-1200x630-jpg`).

Patch the post document using `mcp__sanity__patch_document_from_json`:
- `documentId`: the post's `_id`
- `set`:
  ```json
  [
    {
      "path": "coverImage",
      "value": {
        "_type": "image",
        "asset": { "_type": "reference", "_ref": "<assetId>" },
        "alt": "<article title> — CyberSubmarine"
      }
    }
  ]
  ```

Then publish the draft using `mcp__sanity__publish_documents` with the post's `_id`.

### Step 6 — Confirm

Tell the user:
- Which post was updated
- A one-line description of the image that was generated
- That it's live and will appear on the blog immediately

## Error Handling

- If the post has no excerpt, use the title alone to craft the prompt
- If `generate_image` fails, retry once with a simpler prompt
- If patching fails due to schema validation, try deploying the schema first with `mcp__sanity__deploy_schema` using the post schema, then retry

## Tone

Be brief. Don't over-explain. After generating, just say what was made and confirm it's saved.
