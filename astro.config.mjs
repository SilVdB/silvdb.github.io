import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { findAndReplace } from 'mdast-util-find-and-replace';

function remarkMark() {
  return (tree) => {
    findAndReplace(tree, [
      [/==([^=\n]+)==/g, (_, inner) => ({ type: 'html', value: `<mark>${inner}</mark>` })],
    ]);
  };
}

export default defineConfig({
  site: 'https://silkevdb.github.io',
  markdown: {
    remarkPlugins: [remarkMark],
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
