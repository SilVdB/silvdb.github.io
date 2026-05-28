---
name: silkevdb.github.io
description: Personal digital notebook — sharp, honest, playful; ink on cool white with deliberate color marks.
colors:
  charcoal: "#2A2D2B"
  paper: "#F4F5F5"
  lavender: "#D8C5E8"
  pink: "#FF4DA6"
typography:
  display:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "'Open Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "'Open Sans', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
    textTransform: "uppercase"
rounded:
  none: "0"
  sm: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  "2xl": "96px"
components:
  nav-link:
    textColor: "{colors.charcoal}"
    typography: "{typography.body}"
    padding: "0"
  nav-link-active:
    textColor: "{colors.pink}"
    typography: "{typography.body}"
    padding: "0"
  type-chip:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.charcoal}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  type-chip-poem:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  essay-card:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "16px 0"
  theme-card:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: silkevdb.github.io

## 1. Overview

**Creative North Star: "The Marked Page"**

A page from a physical notebook: charcoal text on cool white, almost everything in those two registers. Then a lavender highlighter line runs through a phrase — deliberate, purposeful, once per spread. Somewhere on the page, a single stroke of pink marks the one thing that must not be missed. That is the entire color vocabulary. Every other visual decision flows from this image.

The system is sparse by commitment, not by timidity. Whitespace is the default. Text earns its position. Color is never ambient or decorative — it is always a mark with a reason. "Sharp, honest, playful" means the typography is precise, the voice is direct, and the personality comes through in what's chosen and placed, not in decoration layered on top.

This system explicitly rejects: SaaS landing-page mechanics (feature grids, hero metrics, gradient-glow CTAs), developer-portfolio templates (tech stack badges, GitHub contribution graphs, identical project cards), thought-leader personal-brand energy (hustle tone, optimised-for-share cadence), and wellness-blogger softness (serif on linen, passive-voice copy, motif illustration). None of these. The site looks like exactly one person made it for exactly the people who would find it interesting.

**Key Characteristics:**
- Charcoal on cool white is the canonical state; color is the exception
- Lavender behaves like a physical highlighter: used on text for secondary emphasis, once per section, never decorative
- Pink is a single-use emergency marker — if it appears twice on a screen, one instance is wrong
- Flat by default: no shadows, no glass, no gradients; depth through spacing and thin borders
- Typography-led: hierarchy through weight and scale contrast, not color or decoration
- Raleway headings carry the personality; Open Sans body carries the content

## 2. Colors: The Notebook Palette

Four colors, four distinct jobs. No fifth color exists.

### Primary
- **Notebook Ink** (`#2A2D2B`, oklch ≈ 17% L, chroma 0.007, hue 152): The default state of all text, borders, icons, and structural elements. Used everywhere text appears. Never substituted with pure black.

### Secondary
- **Lavender Highlight** (`#D8C5E8`, oklch ≈ 82% L, chroma 0.06, hue 305): Behaves like a physical highlighter applied to a notebook page. Used for inline text emphasis, active navigation states, type badges on feed entries, and thin border accents when a surface needs demarcation without weight. Never used as a background color on large surfaces.

### Tertiary
- **Urgent Pink** (`#FF4DA6`, oklch ≈ 67% L, chroma 0.28, hue 347): Reserved exclusively for maximum-emphasis moments: a single word that must not be missed, an active link the eye should land on first, a call-to-action with real stakes. If pink appears more than once per screen, remove one instance.

### Neutral
- **Notebook Paper** (`#F4F5F5`, oklch ≈ 96% L, chroma 0.003, hue 210): The page itself. Body background, card backgrounds, and any surface that reads as ground. Never pure white; the slight cool cast keeps it soft without warmth.

### Named Rules

**The Highlighter Rule.** Lavender marks passages; it does not fill regions. Use it on text spans, thin borders (≤1px), and small badge backgrounds. Never fill a section, hero, or card background with lavender — that is using the highlighter as paint.

**The Emergency Rule.** Pink appears at most once per rendered screen. Its visual weight comes entirely from its rarity. A page where pink appears three times is a page where nothing is urgent.

**The Ink Rule.** `#2A2D2B` on `#F4F5F5` is not a choice — it is the default resting state. Any deviation from this pairing (lavender on paper, pink on paper) is a deliberate exception that must earn its presence.

## 3. Typography

**Display Font:** Raleway (Google Fonts; weights 400/600/700)
**Body Font:** Open Sans (Google Fonts; weights 400/500/600)

**Character:** Raleway carries the personality — geometric, slightly idiosyncratic, confident without being loud. Open Sans does the work — readable, neutral, warm. The pairing is deliberate: one font with a point of view, one font that gets out of the way.

### Hierarchy

- **Display** (700, `clamp(2rem, 5vw, 3.5rem)`, line-height 1.1, tracking −0.01em): Page-level titles. Homepage name, major section headers. Appears once per page.
- **Headline** (600, `clamp(1.5rem, 3vw, 1.875rem)`, line-height 1.2): Section headers, essay titles on dedicated essay pages. Up to two or three per page.
- **Title** (600, `1.25rem`, line-height 1.3): Card titles, list item headings, navigation section headers.
- **Body** (400, `1rem`, line-height 1.75): All prose content. Max line length 65–75ch. Generous line-height is deliberate — the notebook aesthetic is not compressed.
- **Label** (500, `0.75rem`, line-height 1.4, `letter-spacing: 0.06em`, uppercase): Type badges on feed entries, metadata dates, small navigational labels. Never on body copy.

### Named Rules

**The Weight Rule.** Hierarchy is established through scale and weight contrast — never through color. A heading that relies on pink to stand out is failing at typography. The scale ratio between adjacent hierarchy levels must be ≥1.25.

**The Raleway Responsibility Rule.** Raleway only appears at Title level and above. It is a heading font. Setting body paragraphs in Raleway breaks the register.

## 4. Elevation

This system is flat by doctrine. No `box-shadow` anywhere. Depth is expressed through spacing (proximity = relationship, distance = separation) and through thin single-pixel borders at `rgba(216, 197, 232, 0.3)` (lavender at 30% opacity) when a surface boundary must be visible.

The notebook analogy holds: a page doesn't cast shadows on itself. Cards are sections of page, not objects floating above it.

**No shadow vocabulary.** If you're considering a shadow, use a `1px` border in `border-color: color-mix(in oklch, #D8C5E8 30%, transparent)` instead.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow` under any circumstances. The one exception: a focus-visible ring on interactive elements for accessibility — `outline: 2px solid #D8C5E8; outline-offset: 2px`. This is functional, not decorative.

## 5. Components

### Navigation Links
Unadorned text links. No underlines at rest, no background pills, no border accents. Active state: text color shifts to `#FF4DA6` (the one legitimate recurring use of pink — navigating the site is the primary action). Hover: `#FF4DA6` with a `150ms ease-out` color transition. Mobile: a `<details>` disclosure with `position: relative` so the dropdown stays anchored to the nav.

- **Default:** `color: #2A2D2B`, `font: Open Sans 400 0.875rem`
- **Active / hover:** `color: #FF4DA6`
- **Transition:** `color 150ms ease-out`

### Feed Type Chips / Badges
Small pill-shaped labels identifying feed entry types. Background is `#D8C5E8` (lavender) at full opacity for most types. `poem` type uses a `#FF4DA6` background with `#F4F5F5` text — the one type that warranted an emergency mark. Labels are uppercase, tracked, `0.75rem`. Pill shape (`border-radius: 9999px`), tight padding (`2px 8px`).

### Essay Cards
Cards are not cards. An essay card is a section of the page, separated by a thin `1px` border-bottom at lavender/30%. No background, no radius, no shadow. The title is the link; it turns `#FF4DA6` on hover. Metadata (date, theme tags) appears in label-sized text at `color-mix(in oklch, #2A2D2B 50%, #F4F5F5)` — reduced opacity charcoal.

### Theme Cards
The writing index uses bordered containers (not floating cards): `1px solid` lavender at 30%, `border-radius: 4px`, `padding: 24px`. On hover, border shifts to lavender at 100% opacity. No background change, no shadow, no transform. The hover is a border deepening, not a lift.

### Activity Stream
The homepage stream is a flat list. Each item — essay or feed entry — is separated only by a `1px` border-bottom. The stream reads as a continuous document, not a grid of cards. Essay and feed entries share the same structural rhythm; visual differentiation comes from the type badge only.

### Lavender Highlight Span
A signature component: `<mark>`-style inline lavender background on body text for emphasis. Background: `color-mix(in oklch, #D8C5E8 50%, transparent)`. No border-radius, no padding — it reads as a highlighter stroke on text, not a badge.

## 6. Do's and Don'ts

### Do:
- **Do** set body text in Open Sans at `1rem / 1.75` line-height with a 65–75ch max line length. The generous leading is the notebook register.
- **Do** use lavender (`#D8C5E8`) as a highlight on text spans and `1px` borders. Those are its two jobs.
- **Do** reserve pink (`#FF4DA6`) for the one highest-emphasis element per screen. Nav active state counts as that use.
- **Do** express depth through spacing and thin borders, never shadows. A `1px lavender/30%` border separates surfaces; nothing elevates above the page.
- **Do** use the Raleway 600–700 weight range for all heading levels. The weight contrast between Raleway headings and Open Sans body is the hierarchy engine.
- **Do** filter draft essays out of all public-facing routes. `status: draft` means the entry does not exist publicly.

### Don't:
- **Don't** fill any large surface with lavender. Background on a section, a hero, a card: prohibited. Lavender is a highlight color, not a fill color.
- **Don't** use pink more than once per screen. If you're considering a second pink element, remove the first and reconsider whether pink is the right tool at all.
- **Don't** add `box-shadow` to anything. The system is flat by doctrine; shadows break the notebook register.
- **Don't** use gradient text (`background-clip: text`), glassmorphism, or `backdrop-filter`. These are surface-level effects with no meaning in this system.
- **Don't** use `border-left` or `border-right` greater than `1px` as a colored accent stripe. This is an absolute ban. If a callout needs marking, use a full border or a background tint.
- **Don't** reach for SaaS-landing-page mechanics: feature-grid layouts, hero metrics with big numbers, gradient-glow CTAs, "→ Get started" buttons. This site has no conversion funnel.
- **Don't** build a developer portfolio: no tech stack badge rows, no GitHub activity graphs, no side-by-side project cards with icons and three bullets each.
- **Don't** drift into wellness-blogger softness: no serif-on-linen affect, no leaf or botanical motifs, no passive-voice copy, no soft beiges beyond `#F4F5F5`.
- **Don't** use thought-leader personal-brand energy: no hustle tone, no "let's connect" CTAs, no optimised-for-LinkedIn phrasing.
- **Don't** set body paragraphs in Raleway. It is a heading font only.
- **Don't** use more than four colors. The palette is closed.
