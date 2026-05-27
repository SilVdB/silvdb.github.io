---
date: 2026-05-27
topic: personal-website
---

# Personal Website — Requirements

## Summary

A personal website for Silke — software engineer, writer, systems thinker — built with Astro + MDX + GitHub Pages. Five sections (About, Writing, Feed, CV, Contact) plus a homepage that leads with a live stream of recent activity. Launches fully populated across all sections.

---

## Problem Frame

No current public home exists for Silke's work across software engineering, AI-native thinking, writing, philosophy, psychology, embodiment, ecology, and healing. The existing channels (LinkedIn, GitHub) each capture one register; none hold the full range or the connections between domains. This site is a personal space first — a "little corner of the internet" — that also happens to communicate professional identity without that identity dominating.

---

## Key Decisions

**Homepage leads with activity, not biography.** The site's aliveness is its first impression. Recent Feed entries and Writing pieces surface immediately rather than a static introduction page.

**About and CV are distinct registers.** About is personal territory — who Silke is as a thinker and person. CV is professional — credentials, work history, engineering philosophy. They serve different reader modes and do not intentionally blur.

**Writing is theme-first, not chronological.** The primary navigation into essays is by domain (Intelligence & AI / Mind & Body / Ecology & Care / Meaning & Creation), not by publish date. A single essay can appear under multiple themes.

**Feed follows a minimal-schema + no-edit convention.** The only required metadata is `type`. Everything else is optional or inferred from the filename. Entries are treated as immutable once published — the field journal model, not the blog-post model.

**Engineering Philosophy gets its own URL.** The most distinctive element of the CV earns a standalone linkable page (`/philosophy` or `/how-i-work`) so it can be cited and shared independently of the resume.

**Site launches fully alive.** All five sections are populated and functional at first publish. Not a "coming soon" scaffold.

**Architectural decisions deferred to planning.** Seven architectural decisions are documented in `docs/ideation/2026-05-27-personal-website-ideation.md` (content graph model, sections-as-growth-stages, concept threads, visual maturity signals, etc.) and remain to be resolved during planning.

---

## Actors

A1. **Author (Silke)** — creates and publishes all content across all sections. The primary relationship with the site is long-term: the site should make publishing feel low-friction and its growth feel natural over years.

A2. **Professional visitor** — arrives from a job referral, LinkedIn, or a project link. Needs to quickly understand Silke's professional identity and engineering philosophy.

A3. **Intellectual reader** — arrives from a link to an essay, the Feed, or word of mouth. Curious about the ideas and the range of domains. May not care about the CV at all.

A4. **Returning visitor** — has been before. Returns to see what's new. The homepage's live stream is primarily for them.

---

## Requirements

**Homepage**

R1. Homepage displays a stream of recent content — Feed entries and Writing pieces interleaved, sorted by recency.

R2. Each stream item shows its content type (e.g., poem, essay, thought, photo) and enough context (title or opening fragment) to invite clicking through.

R3. A name and one-line tagline appear above the stream to orient first-time visitors. It does not dominate — the stream is the main event.

R4. Navigation to all five sections is present and accessible from the homepage.

**About**

R5. About is personal territory: who Silke is as a thinker and person. It is not a professional CV and does not read like one.

R6. About is a warm personal narrative with a thematic spine — readable, human, with a clear point of view about why these domains connect. It reads as story, not argument. Biographical detail and the intellectual project are woven together rather than separated.

R7. About may include any combination of: timeline, influences, studies or certifications, personal philosophy, tools and workflows, photos of notebooks or sketches, a library section of books that have meant a lot.

R8. About does not duplicate CV content. Links to the CV or to individual essays are fine; restating credentials is not.

**Writing**

R9. Writing section organizes essays by theme across four domains: Intelligence & AI, Mind & Body, Ecology & Care, Meaning & Creation.

R10. A single essay can appear under multiple themes without duplication of the page itself.

R11. Theme is the primary entry point — chronological browsing is secondary, not the default view.

R12. Each theme has a brief description or framing so visitors understand what the theme is investigating before reading essays within it.

**Feed**

R13. Feed accepts a wide range of content types: poems, sketches, photos, thoughts, links with commentary, notebook fragments, plant photos, AI experiments, engineering reflections, unfinished thoughts, music or art references, quotes.

R14. The only required metadata field is `type`. Date is inferred from filename; all other fields are optional.

R15. Feed entries follow a no-edit-after-publish convention — each entry is a dated specimen. Amendments may be added as dated annotations; the original entry is not altered.

R16. Feed is browsable by type — a visitor can filter to see only poems, only photos, etc.

R17. Feed displays in reverse chronological order. No pagination labels required; scroll-based or load-more is acceptable.

**CV**

R18. CV documents professional experience, selected projects, skills, and tooling stack.

R19. Engineering Philosophy is the most prominent element — it has its own linkable URL (e.g., `/philosophy` or `/how-i-work`) and is the first substantial thing a professional visitor encounters in this section.

R20. CV includes a downloadable resume or CV (PDF).

R21. CV includes a "how I work" section that describes working style, AI-native workflows, and systems thinking approach.

R22. CV visual register matches the rest of the site — it does not feel like a separate LinkedIn-export grafted onto a personal site.

**Contact**

R23. Contact page lists: email address, LinkedIn profile URL, GitHub profile URL.

R24. Additional platform links (e.g., other social or professional profiles) can be added without structural changes.

R25. No contact form. Links only.

R26. Contact is reachable from site navigation.

**Global**

R27. Site is built with Astro + MDX, deployed to GitHub Pages, and served from a custom domain.

R28. Visual identity follows the established brand: `#2A2D2B` charcoal, `#F7F4EF` warm cream, `#D8C5E8` soft lavender, `#FF4DA6` hot pink. Raleway for headings, Open Sans for sub-headings and body. The feel is warm, textured, spacious, intelligent, human.

R29. Typography and spacing are treated as the primary vehicle for warmth and texture — not image-based backgrounds or decorative overlays.

R30. All five sections are populated with real content before the site is published publicly.

---

## Key Flows

F1. **First-time professional visitor**
- **Arrives via:** a job referral link or LinkedIn
- **Path:** Homepage → sees recent activity + brief intro → navigates to CV → reads Engineering Philosophy → optionally browses a Writing essay → Contact

F2. **Intellectual reader follows a link to an essay**
- **Arrives via:** shared link to a specific essay
- **Path:** Essay page → sees theme(s) it belongs to → browses related essays in that theme → discovers Feed or About

F3. **Author publishes a Feed entry**
- **Path:** Creates a Markdown file with a `type` field and any additional optional fields → commits and pushes → entry appears in Feed stream and on homepage

F4. **Returning visitor checks what's new**
- **Arrives via:** direct URL or bookmark
- **Path:** Homepage → scrolls the activity stream → clicks into a Feed entry or essay that's new since last visit

---

## Scope Boundaries

**Deferred for later**

- Search across all content
- Newsletter or email subscription
- RSS feed
- Dark mode
- Analytics and visitor tracking
- Automated "related content" suggestions

**Outside this site's identity**

- Contact form of any kind
- Comments, likes, or any social interaction mechanics
- User accounts or authentication
- Content collaboration with other authors

---

## Dependencies / Assumptions

- **Content readiness.** The site launches fully alive (R30), which means Silke prepares actual content — Feed entries, at least a few essays per theme, About narrative, CV text, and Engineering Philosophy — before launch. This is the primary pre-launch dependency.

- **Custom domain.** Domain name is TBD but the build targets a custom domain from day one. GitHub Pages custom domain configuration is part of the initial setup.

- **Logo asset.** A logo mark (the stylized tally/signal icon from the brand guide) exists as an asset. It needs to be exported in SVG or appropriately sized PNG for web use.

- **Ideation doc as planning input.** Seven architectural decisions in `docs/ideation/2026-05-27-personal-website-ideation.md` remain Unexplored. Planning should resolve these before implementation begins.

---

## Sources

- `BRIEFING.md` — full project brief with section descriptions, design direction, and content scope
- `docs/ideation/2026-05-27-personal-website-ideation.md` — 7 ranked architectural decisions with basis and rationale
- Brand guide (image): color palette, logo mark variants, typography system
- Maggie Appleton — [A Brief History & Ethos of the Digital Garden](https://maggieappleton.com/garden-history) — topography-over-timelines, maturity markers
- Gwern.net — [Design of This Website](https://gwern.net/design) — epistemic metadata, compounding architecture
- Keystatic CMS — [Astro integration docs](https://keystatic.com/docs/installation-astro) — low-friction publishing option for Astro + GitHub Pages
