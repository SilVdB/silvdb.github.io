# silkevdb.github.io

Personal site — [silkevdb.github.io](https://silkevdb.github.io)

Built with [Astro 5](https://astro.build) + [Tailwind v4](https://tailwindcss.com) + GitHub Pages.

---

## How to run

```bash
bun install
bun dev            # dev server at http://localhost:4321
bun run build      # production build to dist/
bun run check      # TypeScript + Astro diagnostics
```

---

## How to add content

### Feed entry

Create a file in `src/content/feed/` named `YYYY-MM-DD-slug.md`. The date in the filename is used as the entry date if no `date` field is set in frontmatter.

```markdown
---
type: thought
---

Your content here.
```

**Required:** `type` — one of `poem`, `sketch`, `photo`, `thought`, `link`, `fragment`, `quote`, `note`.

**Optional fields:**

| Field | Use |
|-------|-----|
| `title` | Shown as a heading; for `link` type, becomes the external link text |
| `date` | Overrides the filename date (`YYYY-MM-DD`) |
| `description` | Body text shown on feed cards |
| `url` | Required for `link` type — the external URL |
| `image` | For `photo` / `sketch` — displayed full-width |

Adding a new `type` value automatically creates a `/feed/[type]` filter page on the next build.

---

### Essay (Writing)

Create a file in `src/content/essays/` named anything (convention: `YYYY-MM-DD-slug.mdx`).

```markdown
---
title: "Your Essay Title"
date: 2026-05-27
themes: ["intelligence-and-ai"]
description: "A one-sentence summary shown in listings."
status: seedling
---

Your essay content in MDX.
```

**Required:** `title`, `date`, `themes` (array of theme slugs — see below).

**Optional:** `description`, `status` (`draft` | `seedling` | `budding` | `evergreen`).

Essays with `status: draft` are excluded from all listings and pages — use this to hide work in progress.

**Available theme slugs:**

| Slug | Label |
|------|-------|
| `intelligence-and-ai` | Intelligence & AI |
| `mind-and-body` | Mind & Body |
| `ecology-and-care` | Ecology & Care |
| `meaning-and-creation` | Meaning & Creation |

An essay can belong to multiple themes: `themes: ["intelligence-and-ai", "mind-and-body"]`.

---

## How to adapt page content

### About page

Edit `src/content/about.mdx` — plain Markdown/MDX, no frontmatter needed. Changes appear at `/about`.

### CV page

Edit `src/content/cv.mdx`. The page scaffolds six sections:

- **Engineering Philosophy** — linked at `/cv#philosophy`
- How I Work
- Experience
- Selected Projects
- Skills & Tooling
- Resume (download link — place your PDF at `public/cv.pdf`)

Use `<h2 id="section-name">Section Name</h2>` for anchor-linkable headings.

### Contact page

Edit `src/pages/contact.astro`. The link list is a plain `<ul>` — add or remove `<li>` entries as needed.

### Site title and metadata

- Site URL: `astro.config.mjs` → `site`
- Page titles use the pattern `{title} — Silke Van den Broeck` — change the suffix in `src/layouts/Layout.astro`
- Default meta description: `src/layouts/Layout.astro` → `description` prop default
- Custom domain: `public/CNAME`

### Brand tokens

Colors, fonts, and content widths live in `src/styles/global.css` in the `@theme` block:

```css
@theme {
  --color-charcoal: #2A2D2B;
  --color-cream:    #F7F4EF;
  --color-lavender: #D8C5E8;
  --color-pink:     #FF4DA6;
  --font-heading:   'Raleway', sans-serif;
  --font-body:      'Open Sans', sans-serif;
}
```

These generate Tailwind utility classes (`bg-cream`, `text-pink`, `font-heading`, etc.).

---

## How to deploy

Deployment is automatic. Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

**Steps for the first deploy:**
1. Go to the repo → Settings → Pages
2. Set Source to **GitHub Actions**
3. Push to `main` — the workflow runs and the site goes live at `https://silkevdb.github.io`

**Custom domain:** add your domain to `public/CNAME` and configure your DNS to point to GitHub Pages. Update `site` in `astro.config.mjs` to match.

**Manual deploy** (if needed):

```bash
bun run build      # outputs to dist/
```

Then upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
