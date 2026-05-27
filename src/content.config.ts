import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: ({ image }) =>
    z.object({
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
  schema: ({ image }) =>
    z.object({
      type: z.enum(['poem', 'sketch', 'photo', 'thought', 'link', 'fragment', 'quote', 'note']),
      title: z.string().optional(),
      date: z.coerce.date().optional(),
      description: z.string().optional(),
      url: z.string().url().optional(),
      image: image().optional(),
    }),
});

export const collections = { essays, feed };
