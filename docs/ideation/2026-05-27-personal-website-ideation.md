---
date: 2026-05-27
topic: personal-website
focus: site structure, design system, content architecture, publishing workflow
mode: repo-grounded
---

# Ideation: Personal Website — silkevdb.github.io

## Grounding Context

**Project:** Personal website for Silke — software engineer, writer, systems thinker exploring intelligence, embodiment, healing, ecology, and technology.

**Tech stack (decided):** Astro + MDX + GitHub Pages + custom domain.

**Four sections:** About (interdisciplinary, personal, intellectual — not a standard bio), CV (professional identity, AI-native engineering philosophy as most distinctive), Writing (theme-first across 4 domains: Intelligence & AI / Mind & Body / Ecology & Care / Meaning & Creation, essays can appear in multiple themes), Feed (low-friction notebook stream: poems, sketches, photos, thoughts, links, journal fragments).

**Brand:** #2A2D2B charcoal, #F7F4EF warm cream, #D8C5E8 soft lavender, #FF4DA6 hot pink. Raleway headings, Open Sans body. "Digital notebook / cabinet of curiosities / field journal / artist-engineer workspace." Warm, textured, spacious, intelligent, human.

**External prior art:** Digital garden canon (Maggie Appleton, Gwern, Tom MacWright). Topography-over-timelines as core pattern. Epistemic disclosure (seedling/budding/evergreen maturity markers). Astro content collections architecture. Keystatic as low-friction native CMS. Wunderkammer tripartite organization.

**Key tensions:** many-to-many essays↔themes; Feed type polymorphism; low-friction mobile publishing; "generalist-integrator" identity vs. expert positioning.

## Topic Axes

1. Content architecture — how content is modeled, linked, cross-referenced
2. Publishing experience — friction from idea to live, tooling, devices
3. Navigation and discovery — how visitors find pathways through a multi-discipline site
4. Visual identity — how brand translates into spatial, textured digital form
5. Personal voice and positioning — how About/CV establish a distinctive identity across disciplines

## Ranked Ideas

### 1. Themes-as-Lenses with Build-Time Content Graph
**Description:** Essays live at canonical slugs. Themes are traversal paths through a build-time graph — not folders that contain files. At build time, Astro generates which essays share theme memberships, which Feed items reference essay slugs, and which themes co-occur. Adding a new theme is a new query, not a re-filing operation. Every new essay makes every existing essay more discoverable. Cross-collection aggregation (`[...essays, ...notes].sort(byDate)`) is idiomatic Astro. Prerequisite: pre-scaled Zod schema with `themes[]` array, optional `relatedSlugs[]`, and `status` fields defined before any content is written.
**Axis:** Content architecture
**Basis:** `direct:` Briefing states "a single essay can appear in multiple themes" — container/folder architecture cannot represent this without duplication. `external:` Maggie Appleton: topography-over-timelines; Gwern: structural relationship graph for similar pages.
**Rationale:** The many-to-many constraint in the briefing directly requires a graph model. Solving it with a folder structure creates duplicated pages or broken navigation. The graph model also enables future features (related content, thread navigation, build-time RSS per theme) at zero retroactive cost.
**Downsides:** More complex build step than folder-based organization. Not worth the overhead at 5 essays; schema investment pays off at 20+.
**Confidence:** 90%
**Complexity:** Medium
**Status:** Unexplored

---

### 2. Feed Publishing Protocol: Minimal Schema + Convention
**Description:** The only required frontmatter field is `type` (poem / sketch / photo / thought / link / fragment). Everything else is inferred from filename (`2026-05-27-title.md`) or left absent. Alongside the schema: adopt a no-edit-after-publish convention — each Feed entry is a dated specimen, treated as immutable after publication. The "is this good enough?" gate disappears, replaced by a simple protocol. The `type` field is the only authoring decision required and unlocks filtered views at zero future cost.
**Axis:** Publishing experience
**Basis:** `direct:` Briefing names "low friction publishing" as the key principle for Feed and lists the types of content it should accept: poems, sketches, photos, thoughts, plant photos, journal fragments, engineering reflections, unfinished thoughts.
**Rationale:** Most personal sites claim low friction but preserve the structural requirements of blogging. If the Feed is meant to capture what a physical notebook captures, the format contract needs to match a notebook's, not a CMS's. The typed schema also enables future filtered views (photos-only, poems-only) at zero additional authoring overhead.
**Downsides:** No-edit convention requires discipline; it's cultural, not technical. Some entries will be regrettable. Mitigation: dated annotations allowed alongside immutable items.
**Confidence:** 88%
**Complexity:** Low
**Status:** Unexplored

---

### 3. About as the Site's Theory of Itself
**Description:** The About page is not biographical, anchored in the past. It's the site's self-model: what kind of epistemic space this is, how to read it, what the intellectual project is. Personal biographical details appear as evidence for the argument, not as the argument itself. The organizing question: "what are you trying to figure out, and why does this particular combination of domains make sense as a single inquiry?" Written closer to an artist's statement or a manifesto than a bio. A visitor who understands the site's theory navigates all four sections with context rather than surprise.
**Axis:** Personal voice and positioning
**Basis:** `direct:` Briefing says About should "explain why these domains connect, what this website is, and what kind of exploration is happening here" — that's a theory, not a bio. `external:` Commonplace book key tradition: a working method described before the reader enters the collection.
**Rationale:** The standard bio ("I studied X, then Y, I care about Z") produces generic output and fails to explain why these specific domains belong together. A theory does the work a bio cannot: it makes the combination feel inevitable rather than accidental.
**Downsides:** Writing-heavy; the hardest page to write. Risk: becomes too abstract. Test: a visitor should be able to describe the intellectual project back to you in one sentence after reading.
**Confidence:** 82%
**Complexity:** Medium (primarily a writing challenge)
**Status:** Unexplored

---

### 4. AI-Native Engineering Philosophy as Standalone URL
**Description:** Extract the engineering philosophy from the CV and give it its own URL — `/philosophy` or `/how-i-work`. This makes it directly citable and shareable, independent of the resume. The document can evolve with visible revision history. A recruiter, collaborator, or interested reader links to the philosophy without linking to a resume. Every update signals the thinking is alive. The philosophy document — written with specificity (concrete examples, named positions, real decisions, not "I use AI tools") — becomes the primary positioning artifact for technical audiences.
**Axis:** Personal voice and positioning
**Basis:** `direct:` Briefing labels Engineering Philosophy "probably one of your most distinctive aspects now" — distinctive things deserve their own URLs, not burial in a list.
**Rationale:** Embedded in a CV section, the philosophy is invisible to external linking and indexing. Given its own URL, it participates in the web — gets cited, argued with, returned to. The briefing's warning that the CV "should not dominate the site" is resolved: the philosophy document transcends the CV section and becomes cross-site glue.
**Downsides:** Hard to write well. "AI-native" is a saturated phrase in 2026 — distinctiveness comes only from specificity. A generic philosophy page is worse than none.
**Confidence:** 90%
**Complexity:** Low (technically) / Medium (writing)
**Status:** Unexplored

---

### 5. Content Maturity Expressed as Visual Depth/Density
**Description:** Rather than labeled status tags (seedling/budding/evergreen), maturity signals are encoded in the visual language itself: dense prose with rich heading structure and references signals "core" material; sparser, fragmentary form with wider margins signals "edge" material. Typography and whitespace do the calibration work. The reader senses depth before reading. This extends across all content types — a Feed fragment looks and feels different from a finished essay not because a label says so, but because the typographic register is different.
**Axis:** Visual identity
**Basis:** `external:` Gwern's epistemic metadata (status, certainty, importance) and Maggie Appleton's maturity markers both solve reader calibration. `reasoned:` Achieving this through typography and density is more embodied than status badges, avoids borrowing Appleton's specific vocabulary, and aligns with the brand direction of warmth/texture through craft rather than decoration.
**Rationale:** Silke's site will contain finished essays alongside half-finished fragments. Without calibration, readers mis-invest attention. The mycelial model: mature tissue at center, exploratory at edges — not hierarchy, just developmental stage. Typography-first execution ages better than image-based texture and works at all screen sizes.
**Downsides:** Requires consistent typographic discipline across all templates. Harder to implement than a status badge. Design execution is the constraint.
**Confidence:** 79%
**Complexity:** Medium
**Status:** Unexplored

---

### 6. Concept Threads as Lateral Cross-Theme Navigation
**Description:** Alongside the four domain themes, define 4-6 concept threads — recurring ideas that cut across multiple domains (e.g., "attention," "regulation," "emergence," "making," "slowness"). Each thread is a curated ordered array of essay slugs in a config file. Thread indicators appear on each essay page in that thread. A visitor following the "attention" thread encounters Silke's thinking across Intelligence & AI, Mind & Body, and Meaning & Creation in one continuous reading experience that no theme page can provide. Threads are defined after 10-15 essays exist, not at launch.
**Axis:** Navigation and discovery
**Basis:** `reasoned:` The site's intellectual proposition is that these disciplines *connect*. If navigation only routes visitors within themes, the connection is described but never demonstrated. Concept threads make cross-domain connection a navigable experience. Mycorrhizal network topology as structural analogy: lateral connections between nodes, not hub-and-spoke routing through theme pages.
**Rationale:** Hub-and-spoke navigation (through theme pages) serves single-domain readers. Lateral thread navigation rewards the interdisciplinary reader — which is the site's primary audience. The config-file approach makes updating a thread a 30-second edit; threads never go stale from technical complexity.
**Downsides:** Threads require editorial curation. Recommend: define threads retroactively once content accumulates, not on day one.
**Confidence:** 84%
**Complexity:** Medium
**Status:** Unexplored

---

### 7. Sections as Growth Stages — Content Migration Architecture
**Description:** The site's sections are developmental states, not permanent buckets. Feed = seedling (raw observation), Writing = budding/evergreen (developed argument), About/CV = crystallized positions. A `status` field in the content schema (`draft | seedling | budding | evergreen`) drives both visual treatment (survivor #5) and section membership. When a Feed fragment matures into a Writing essay, it migrates — with a redirect from the old slug — rather than being republished. The architecture makes the Feed genuinely low-stakes: you don't need to decide whether something is "a real essay" before publishing it.
**Axis:** Content architecture
**Basis:** `external:` Digital garden growth stages as primary time signal. `reasoned:` Content naturally evolves from rough to formed; architecture should support migration without republishing. This also resolves Feed/Writing's apparent separation — they're the same content at different developmental stages.
**Rationale:** Resolves Feed's low-friction requirement at the architectural level, not just the tooling level. The sections aren't conceptually separate — they're the same intellectual material at different stages of articulation. This is more honest to how thinking actually works than a hard wall between "notebook entries" and "essays."
**Downsides:** Requires redirect management when content graduates (Astro supports this). Adds one field to the schema. Medium complexity.
**Confidence:** 78%
**Complexity:** Medium
**Status:** Unexplored

---

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| 1 | About as Corridor (Pain #5) | Weaker version of survivor #3; routing logic less generative than theory logic |
| 2 | Identity Collision framing (Pain #2) | Frames the problem; absorbed into survivors #3 and #4 as the solution |
| 3 | Invisible Cross-Links (Pain #6) | Absorbed into survivor #6 (Concept Threads) |
| 4 | Mobile Reading concern (Pain #7) | Design constraint, not an idea; below ambition floor |
| 5 | Theme Classification at Query Time (Inv #2) | The mechanism within survivor #1, not a separate idea |
| 6 | CV from Structured Data (Inv #3) | Implementation detail; downstream of survivor #4 decisions |
| 7 | Publishing = Git Push (Inv #4) | Describes current state; not a distinct move |
| 8 | /now Automated from Feed (Inv #5) | Tactical; valid but below ambition floor for this session |
| 9 | Infinite Scroll + Type Filters (Inv #6) | Downstream of survivor #2's Feed protocol |
| 10 | About as System Diagram (Inv #7) | Design execution idea; belongs in brainstorm/design phase |
| 11 | Homepage as Current State (Assump #1) | Interesting reframe; confidence insufficient; risks disorienting first-time visitors |
| 12 | CV as Where Domains Converge (Assump #2) | Absorbed into survivors #3 and #4 |
| 13 | Navigation Shows Connections (Assump #4) | Absorbed into survivors #6 and #1 |
| 14 | Publishing Friction as Format (Assump #7) | Same insight as survivor #2, less specific |
| 15 | Pre-Scaled Schema (Lev #1) | Valid prerequisite — merged into survivor #1 |
| 16 | CV as Lens, Not Section (Lev #3) | Overcomplicates information architecture; standalone philosophy URL is simpler with equivalent benefit |
| 17 | Site as Founding Essay (Lev #5) | Content recommendation, not structural idea; valuable but save for brainstorm |
| 18 | Herbarium Provenance Labels (Cross #1) | Absorbed into survivor #5 |
| 19 | Darkroom Contact Sheet (Cross #2) | Visual metaphor; belongs in design phase |
| 20 | Commonplace Book Key (Cross #3) | Absorbed into survivor #3 |
| 21 | Field Station Log — CV (Cross #5) | Absorbed into survivor #4 |
| 22 | Score and Performance — Themes (Cross #6) | Conceptual framing absorbed into survivor #1 |
| 23 | Wunderkammer Register (Cross #8) | Overlaps survivors #1 and #6; adds overhead not warranted at launch |
