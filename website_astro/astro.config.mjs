// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite" // v4
// import tailwindcss from "@astrojs/tailwind"
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
// import smartypants from "remark-smartypants";
// import remarkRehype from 'remark-rehype'
// import remarkMath from 'remark-math' /* for latex math support */
// import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from "remark-directive-rehype";
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import preact from '@astrojs/preact';
import UnoCSS from 'unocss/astro'
import vercel from "@astrojs/vercel";


// remarkDirective, remarkDirectiveRehype, 
// https://astro.build/config
export default defineConfig({
  site: "https://mattpiekenbrock.com",
  trailingSlash: "never",
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },

  // vite: {
  //   plugins: [tailwindcss()],
  // },
  markdown: {
    smartypants: true,
    // remarkPlugins: [remarkDirective, remarkFrontmatter],
  },

  integrations: [
    mdx({
      smartypants: true, 
      remarkPlugins: [remarkDirective, remarkDirectiveRehype],
      rehypePlugins: [],
      gfm: true, 
    }), 
    preact(),
		UnoCSS(),
		icon(), 
  ],
  adapter: vercel({
		webAnalytics: {
			enabled: true,
		}
	})
});