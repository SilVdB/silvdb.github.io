---
title: "Personal Website — Full Build"
date: 2026-05-27
status: completed
origin: docs/brainstorms/2026-05-27-personal-website-requirements.md
plan-type: feature
---

# Personal Website — Full Build

## Problem Frame

Silke has no current public home that holds the full range of her work: software engineering, AI-native thinking, writing, philosophy, psychology, embodiment, ecology, and healing. The existing channels (LinkedIn, GitHub) each capture one register.

This plan delivers a complete Astro 5.x site from empty repo to live deployment on GitHub Pages, covering all five sections (Homepage, About, Writing, Feed, CV, Contact) with the structural scaffolding to hold real content. Content authoring is Silke's responsibility; this plan delivers the container.

**Scope boundaries:**
- In: all five sections, CI/CD pipeline, design system, content schema, nav, full URL structure
- Deferred: concept threads (needs 10-15 essays first), Feed→Writing content migration redirects, Keystatic CMS, RSS, search, dark mode, analytics

---

## Key Technical Decisions

**D1 — CSS via Tailwind v4 + custom brand values in `@theme`.**
Tailwind v4 (current) uses a CSS-first config: brand tokens live in a `@theme` block inside `src/styles/global.css`, generating utility classes like `bg-cream`, `text-pink`, `font-heading`. No `tailwind.config.js` file. Integration via `@tailwindcss/vite` Vite plugin (not the older `@astrojs/tailwind`). Handles all layout plumbing (flex, grid, spacing, responsive) without hand-written CSS.

**D2 — Many-to-many themes via `z.array(z.string())` in essay frontmatter.**
Typed `reference('themes')` collection would require a separate themes data file and validates nothing we can't catch in PR review. Plain strings are zero-overhead, sufficient for filtering via `getCollection()` + `.filter()`.

**D3 — Feed type filtering via static pre-rendered pages at `/feed/[type]`.**
No client-side JS required. `getStaticPaths()` enumerates all types at build time. Filter tabs are plain anchor links to pre-built routes.

**D4 — Date-from-filename for Feed entries.**
Filename convention: `YYYY-MM-DD-slug.md`. The `date` frontmatter field is optional; when absent, it is parsed from the entry `id` in page rendering. `type` is the only required frontmatter field.

**D5 — Engineering Philosophy as a named `<section>` on the CV page.**
No separate `/philosophy` URL at launch. The section is prominent and anchor-linkable (`/cv#philosophy`). A standalone URL can be extracted later with one redirect.

**D6 — Astro 5.x Content Layer API.**
`src/content.config.ts` (not v4's `src/content/config.ts`). Collections use `defineCollection` with `loader: glob({...})`. Page rendering uses `render()` imported from `astro:content`, not `entry.render()`.

**D7 — No `base` config needed.**
Deploying to `silkevdb.github.io` (user pages). GitHub Pages serves user page repos at root. `base: '/'` would break asset paths.

**D8 — Google Fonts loaded via `<link>` in Layout.astro.**
Raleway + Open Sans. Self-hosting deferred; `<link rel="preconnect">` + display-swap is sufficient for launch.

---

## File Structure

```
silkevdb.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── CNAME                         # custom domain
├── src/
│   ├── content/
│   │   ├── essays/                   # .mdx files, one per essay
│   │   └── feed/                     # .md or .mdx files, YYYY-MM-DD-slug format
│   ├── content.config.ts             # Astro 5 Content Layer schema
│   ├── pages/
│   │   ├── index.astro               # Homepage (activity stream)
│   │   ├── about.astro
│   │   ├── cv.astro                  # CV + Engineering Philosophy section
│   │   ├── contact.astro
│   │   ├── writing/
│   │   │   ├── index.astro           # Theme index (4 domains)
│   │   │   ├── [theme].astro         # Theme pages (filtered essays)
│   │   │   └── [...slug].astro       # Individual essay pages
│   │   └── feed/
│   │       ├── index.astro           # Full feed, reverse chrono
│   │       └── [type].astro          # Type-filtered feed pages
│   ├── layouts/
│   │   └── Layout.astro              # Base shell: fonts, nav, tokens
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── ActivityStream.astro      # Homepage stream (essays + feed interleaved)
│   │   ├── FeedEntry.astro           # Single feed card
│   │   ├── EssayCard.astro           # Essay teaser card
│   │   └── ThemeCard.astro           # Theme card on writing index
│   └── styles/
│       └── global.css                # Tailwind import + @theme brand tokens
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Implementation Units

### Unit 1 — Astro Scaffold + CI/CD

**Files created/modified:**
- `package.json` — `astro`, `@astrojs/mdx`, `tailwindcss`, `@tailwindcss/vite`
- `astro.config.mjs` — site URL, MDX integration, Tailwind Vite plugin, output: `static`
- `tsconfig.json` — `"extends": "astro/tsconfigs/strict"`
- `.github/workflows/deploy.yml` — build + deploy pipeline
- `public/CNAME` — custom domain placeholder (value TBD; can be empty until domain is configured)
- `src/env.d.ts` — `/// <reference types="astro/client" />`

**Approach:**
`npm create astro@latest` with blank template, then add `@astrojs/mdx` and Tailwind v4. Minimal `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://silkevdb.github.io', // update when custom domain is set
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
```

GitHub Actions deploy workflow — two jobs (build via `withastro/action@v6`, deploy via `actions/deploy-pages@v4`). Permissions: `pages: write`, `id-token: write`. Concurrency group `pages` with `cancel-in-progress: false`.

**Verification:**
- `astro build` exits 0 on an empty pages directory
- GitHub Actions workflow file is syntactically valid (`act` dry-run or push to main)
- `astro check` exits 0

---

### Unit 2 — Design System

**Files created/modified:**
- `src/styles/global.css`
- `src/layouts/Layout.astro` — imports global.css, loads Google Fonts, sets base body classes

**Approach:**

`global.css` — Tailwind v4 entry point with brand tokens declared in `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Colors — used as bg-charcoal, text-cream, border-lavender, etc. */
  --color-charcoal: #2A2D2B;
  --color-cream:    #F7F4EF;
  --color-lavender: #D8C5E8;
  --color-pink:     #FF4DA6;

  /* Fonts — used as font-heading, font-body */
  --font-heading: 'Raleway', sans-serif;
  --font-body:    'Open Sans', sans-serif;

  /* Content widths — used as max-w-prose-col, max-w-wide */
  --width-prose-col: 42rem;
  --width-wide:      60rem;
}
```

These `@theme` values generate Tailwind utility classes automatically. Example usage in components:
- `class="bg-cream text-charcoal"` — brand colors
- `class="font-heading text-3xl"` — Raleway heading
- `class="max-w-prose-col mx-auto px-6"` — prose column layout

`Layout.astro` imports `global.css` and applies base classes to `<body>`: `bg-cream text-charcoal font-body`. Includes `<link>` tags for Google Fonts (Raleway weights 400/600/700, Open Sans 400/500/600) with `rel="preconnect"` and `display=swap`.

**Verification:**
- `bg-cream` and `text-pink` resolve to correct hex values in browser DevTools
- Raleway loads for heading elements, Open Sans for body
- `astro check` exits 0
- `astro build` output includes only Tailwind classes actually used (no unused CSS)

---

### Unit 3 — Content Schema

**Files created/modified:**
- `src/content.config.ts`
- `src/content/essays/` — directory (with one placeholder `.mdx` to validate schema)
- `src/content/feed/` — directory (with one placeholder `.md` to validate schema)

**Approach:**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { image } from 'astro:assets';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    themes: z.array(z.string()),
    description: z.string().optional(),
    status: z.enum(['draft', 'seedling', 'budding', 'evergreen']).optional(),
    image: image().optional(),
  }),
});

const feed = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/feed' }),
  schema: ({ image }) => z.object({
    type: z.enum(['poem', 'sketch', 'photo', 'thought', 'link', 'fragment', 'quote', 'note']),
    title: z.string().optional(),
    date: z.coerce.date().optional(),   // optional: infer from filename when absent
    description: z.string().optional(),
    url: z.string().url().optional(),   // for 'link' type
    image: image().optional(),
  }),
});

export const collections = { essays, feed };
```

Feed date-from-filename utility (used in page components, not in schema):

```typescript
// src/lib/feedDate.ts
export function dateFromFeedId(id: string): Date {
  const match = id.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) throw new Error(`Feed entry id '${id}' does not start with YYYY-MM-DD`);
  return new Date(match[1]);
}
```

Placeholder content files:
- `src/content/essays/2026-05-27-example.mdx` — minimal frontmatter matching schema
- `src/content/feed/2026-05-27-example.md` — `type: thought`, no other fields

**Verification:**
- `astro check` finds no schema violations
- `getCollection('essays')` and `getCollection('feed')` return entries without TypeScript errors
- `dateFromFeedId('2026-05-27-title')` returns correct date; throws on malformed id

---

### Unit 4 — Layout + Navigation

**Files created/modified:**
- `src/layouts/Layout.astro` — (extends Unit 2; adds `<Nav>` component)
- `src/components/Nav.astro`

**Approach:**

`Nav.astro` renders a horizontal/responsive nav with links to all five sections. Uses `Astro.url.pathname` to set `aria-current="page"` on the active route.

Nav links: Home (`/`), About (`/about`), Writing (`/writing`), Feed (`/feed`), CV (`/cv`), Contact (`/contact`).

Nav layout: site title/logo mark on the left, links on the right. On narrow viewports, links collapse to a simple stacked nav (no JS burger menu required — CSS `:focus-within` or `<details>` toggle).

`Layout.astro` props: `title: string`, `description?: string`. Renders `<meta>` tags for basic SEO + OpenGraph title/description. Canonical URL via `Astro.site + Astro.url.pathname`.

**Verification:**
- All five nav links render and are accessible (keyboard-navigable, ARIA labels correct)
- Active page link has `aria-current="page"`
- `<title>` tag reflects the page-specific title passed as prop
- Layout renders without errors on a bare `index.astro` that passes title

---

### Unit 5 — Homepage

**Files created/modified:**
- `src/pages/index.astro`
- `src/components/ActivityStream.astro`
- `src/components/FeedEntry.astro` (stub — used again in Unit 7)
- `src/components/EssayCard.astro` (stub — used again in Unit 6)

**Approach:**

Homepage structure (top to bottom):
1. Name + one-line tagline — `<h1>` + `<p class="tagline">`. Not a paragraph; stream is the main event (R3).
2. Activity stream — Feed entries and Writing pieces interleaved, sorted by date descending, capped at ~20 items (R1).

`ActivityStream.astro` receives a pre-built `items` array. Caller (index.astro) builds it:

```typescript
const essays = await getCollection('essays', e => e.data.status !== 'draft');
const feedEntries = await getCollection('feed');

const stream = [
  ...essays.map(e => ({ type: 'essay' as const, date: e.data.date, entry: e })),
  ...feedEntries.map(e => ({
    type: 'feed' as const,
    date: e.data.date ?? dateFromFeedId(e.id),
    entry: e,
  })),
].sort((a, b) => b.date.valueOf() - a.date.valueOf()).slice(0, 20);
```

Each item in the stream renders as either `<EssayCard>` or `<FeedEntry>` based on `type`. Both show: content type label, date, title or opening fragment (R2).

**Verification:**
- Homepage renders at `/`
- Stream items are sorted descending by date
- Draft essays are excluded from stream
- Each item shows type label + date + title/fragment
- Name and tagline appear above stream
- All five nav links present

---

### Unit 6 — Writing Section

**Files created/modified:**
- `src/pages/writing/index.astro` — theme index
- `src/pages/writing/[theme].astro` — theme pages
- `src/pages/writing/[...slug].astro` — individual essay pages
- `src/components/EssayCard.astro` — (complete implementation)
- `src/components/ThemeCard.astro`

**Approach:**

**Theme definitions** — hardcoded in `src/lib/themes.ts` (not a content collection; themes are stable and few):

```typescript
export const THEMES = [
  {
    slug: 'intelligence-and-ai',
    label: 'Intelligence & AI',
    description: 'Cognition, agents, software engineering, human vs machine thinking, attention, distributed intelligence.',
  },
  {
    slug: 'mind-and-body',
    label: 'Mind & Body',
    description: 'Nervous systems, trauma, embodiment, meditation, regulation.',
  },
  {
    slug: 'ecology-and-care',
    label: 'Ecology & Care',
    description: 'Gardening, herbalism, slowness, rituals, relationship with nature.',
  },
  {
    slug: 'meaning-and-creation',
    label: 'Meaning & Creation',
    description: 'Philosophy, creativity, identity, art.',
  },
] as const;

export type ThemeSlug = typeof THEMES[number]['slug'];
```

Essays store theme slugs in frontmatter: `themes: ['intelligence-and-ai', 'mind-and-body']`.

**`writing/index.astro`** — renders all four `<ThemeCard>` components. Each card shows label, description, and essay count.

**`writing/[theme].astro`** — `getStaticPaths()` returns one path per THEMES entry. Page body: theme label + description, then `EssayCard` list for essays where `themes.includes(theme)`.

**`writing/[...slug].astro`** — renders a single essay. Imports `render` from `astro:content`. Shows: title, date, themes as links to theme pages, rendered MDX body. Bottom: "More in [theme]" links for each of the essay's themes.

**`EssayCard.astro`** — shows title, date, themes list, description snippet. Links to essay page.

**Verification:**
- `/writing` renders all four theme cards with correct counts
- `/writing/intelligence-and-ai` shows only essays with that theme
- An essay in two themes appears on both theme pages (no duplication)
- Individual essay page renders MDX content
- Theme links on essay page navigate back to correct theme page
- Essay with `status: 'draft'` does not appear on any theme page

---

### Unit 7 — Feed Section

**Files created/modified:**
- `src/pages/feed/index.astro`
- `src/pages/feed/[type].astro`
- `src/components/FeedEntry.astro` — (complete implementation)

**Approach:**

**`feed/index.astro`** — loads all feed entries, sorts by date (using `dateFromFeedId` for entries without explicit date), renders as a vertically scrolled stream. No pagination label required; if count exceeds ~50 entries, load-more is acceptable but a simple long page is fine at launch.

Filter bar at top: links to `/feed` (All), `/feed/poem`, `/feed/thought`, `/feed/photo`, etc. Only show filter links for types that have at least one entry. Active filter highlighted via `Astro.url.pathname` matching.

**`feed/[type].astro`** — `getStaticPaths()` derives paths from unique `type` values across all feed entries at build time (not from a hardcoded list). This means adding a new type to a feed entry automatically creates its filtered page.

**`FeedEntry.astro`** — renders a single feed item. Display varies by type:
- `photo` / `sketch` — image full-width
- `poem` — body text in a distinct typographic register (slightly wider line spacing, optional indent)
- `link` — title as external link + commentary
- `thought` / `fragment` / `note` / `quote` — body text

All types show: type label (small, lavender background, R2), date.

**Verification:**
- `/feed` renders all entries in reverse chronological order
- `/feed/poem` shows only `type: poem` entries
- A type that has no entries does not appear as a filter link
- Adding a new entry with a new type causes `/feed/[type]` to be generated at build time
- Date renders correctly for entries that omit `date` frontmatter (parsed from filename)
- `astro build` generates static HTML for all type-filter routes

---

### Unit 8 — About Page

**Files created/modified:**
- `src/pages/about.astro`
- `src/content/about.mdx` (or inline in the page — see approach)

**Approach:**

About is a single long-form page, not a collection. Two options:
1. Content inline in `about.astro` as MDX-compatible markup
2. `about.mdx` file imported into `about.astro` via Astro's `<Content>` import

Recommend option 2: `src/content/about.mdx` imported as a local MDX file (not a content collection). This lets Silke author the page as a Markdown file without needing to edit `.astro`. Import pattern:

```astro
---
import AboutContent from '../content/about.mdx';
import Layout from '../layouts/Layout.astro';
---
<Layout title="About">
  <article class="about-narrative">
    <AboutContent />
  </article>
</Layout>
```

The about page requires no programmatic data — it is a static authored MDX document. Placeholder: a single `<h1>About</h1>` line.

Typography for About: the page uses `--content-width` prose column, comfortable line-height (`1.75`), generous section spacing. No sidebar; full attention on the text.

**Verification:**
- `/about` renders without errors
- MDX content from `src/content/about.mdx` appears on the page
- Page uses Layout component (nav present)
- Prose column is constrained to `--content-width`

---

### Unit 9 — CV Page

**Files created/modified:**
- `src/pages/cv.astro`
- `src/content/cv.mdx` (or authored inline)

**Approach:**

CV page follows the same MDX-import pattern as About. Single long-form MDX file: `src/content/cv.mdx`.

Required sections in the CV MDX (scaffold with placeholder headings):
1. Engineering Philosophy — prominent, first substantial section after a brief intro. Anchor: `#philosophy`. This is the AI-native, systems-thinking positioning (R19, R21).
2. How I Work — working style, cognitive tools, collaboration patterns (R21).
3. Experience — work history, roles (R18).
4. Selected Projects — noteworthy work (R18).
5. Skills & Tooling stack (R18).
6. Resume Download — `<a href="/cv.pdf" download>Download CV (PDF)</a>`. PDF is placed in `public/cv.pdf` when ready (R20).

Visual register: CV uses the same Layout as all pages. No LinkedIn-export styling. Headings in Raleway, section dividers via generous spacing + a thin lavender border-top, not horizontal rules (R22).

**Verification:**
- `/cv` renders without errors
- `#philosophy` anchor exists and scrolls to Engineering Philosophy section
- All six section scaffolds are present (even if content is placeholder)
- Resume download link renders (even if PDF is not yet placed in `public/`)
- Page shares visual register with the rest of the site

---

### Unit 10 — Contact Page

**Files created/modified:**
- `src/pages/contact.astro`

**Approach:**

Static page. No form, no JS. Plain link list (R23–R25):

```astro
<ul class="contact-links">
  <li><a href="mailto:>[email redacted]">>[email redacted]</a></li>
  <li><a href="https://linkedin.com/in/silkevdb" rel="noopener noreferrer">LinkedIn</a></li>
  <li><a href="https://github.com/SilVdB" rel="noopener noreferrer">GitHub</a></li>
</ul>
```

Adding a new platform link is a one-line addition to the list (R24). No structural change required.

Design: centered, spacious, minimal. The contact page is intentionally quiet — contact info is the entire content.

**Verification:**
- `/contact` renders
- All three links present and correct (mailto, LinkedIn, GitHub)
- No form elements anywhere on the page
- Page reachable from nav

---

## Dependencies & Sequencing

Units should be implemented in this order; later units depend on earlier ones:

```
Unit 1 (Scaffold)
  └── Unit 2 (Design System)
        └── Unit 4 (Layout + Nav)
              ├── Unit 5 (Homepage)   ← depends on Unit 3
              ├── Unit 6 (Writing)    ← depends on Unit 3
              ├── Unit 7 (Feed)       ← depends on Unit 3
              ├── Unit 8 (About)
              ├── Unit 9 (CV)
              └── Unit 10 (Contact)

Unit 3 (Content Schema) — can be done alongside Unit 2, before Units 5–7
```

Unit 3 (schema) and Unit 2 (design system) can proceed in parallel. All page units require Unit 4 (Layout) to be complete first.

---

## Risks

**R1 — Astro 5 API changes.** The Content Layer API (`src/content.config.ts`, `render()` from `astro:content`) is Astro 5-specific. Using v4 patterns will cause build errors. Mitigation: scaffold with latest Astro 5 (`npm create astro@latest`); check Astro 5 migration guide before writing any content collection code.

**R2 — Feed date-from-filename is a convention, not enforced by schema.** If a file is named without the `YYYY-MM-DD` prefix and has no `date` frontmatter, `dateFromFeedId` throws at render time. Mitigation: `dateFromFeedId` throws with a clear message naming the offending id; the author sees this at build time, not in production.

**R3 — Custom domain timing.** `public/CNAME` and `astro.config.mjs`'s `site` value must match the final domain. If the domain is unset at first deploy, the site works under `silkevdb.github.io` but canonical URLs will be wrong. Mitigation: update both when the domain is registered; a placeholder `silkevdb.github.io` in `site` is fine until then.

**R4 — Resume/CV PDF.** `public/cv.pdf` doesn't exist at scaffold time; the download link on `/cv` will 404 until it is placed. Mitigation: the link renders correctly regardless; Silke places the PDF in `public/` when ready.

---

## Deferred Work (v2)

- `/philosophy` standalone URL (extract from CV page with one redirect)
- Concept threads (`src/data/threads.yaml` → lateral cross-theme navigation) — implement after 10–15 essays
- Feed→Writing content migration: `status` field in essay schema already accommodates this; redirect machinery is the deferred piece
- Keystatic CMS integration for mobile publishing
- RSS feed per theme
- Search (pagefind or similar)
- Dark mode
- Analytics
