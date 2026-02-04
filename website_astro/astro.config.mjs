// @ts-check
import { defineConfig } from "astro/config";
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
// import smartypants from "remark-smartypants";
// import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math' /* for latex math support */
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from "remark-directive-rehype";
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import preact from '@astrojs/preact';
import UnoCSS from 'unocss/astro'
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://mattpiekenbrock.com",
  trailingSlash: "never",
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  markdown: {
    smartypants: true,
    remarkPlugins: [remarkDirective, remarkMath], // for content collections
		rehypePlugins: [rehypeKatex]
  },

  integrations: [
    mdx({
      smartypants: true, 
      remarkPlugins: [remarkDirective, remarkDirectiveRehype, remarkMath],
      rehypePlugins: [rehypeKatex],
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