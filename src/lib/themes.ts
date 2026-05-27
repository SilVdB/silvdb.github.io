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
