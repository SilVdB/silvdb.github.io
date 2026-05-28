export const THEMES = [
  {
    slug: 'intelligence-and-ai',
    label: 'Intelligence and AI',
    description: 'Cognition, agents, software engineering, human vs machine thinking, attention, distributed intelligence.',
  },
  {
    slug: 'mind-and-body',
    label: 'Mind and body',
    description: 'Nervous systems, trauma, embodiment, meditation, regulation.',
  },
  {
    slug: 'ecology-and-nature',
    label: 'Ecology and nature',
    description: 'Gardening, herbalism, slowness, rituals, relationship with nature.',
  },
  {
    slug: 'meaning-and-creation',
    label: 'Meaning and creation',
    description: 'Philosophy, creativity, identity, art.',
  },
] as const;

export type ThemeSlug = typeof THEMES[number]['slug'];
