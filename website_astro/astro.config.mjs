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
// import toml from "astro-toml";
import compressor from "astro-compressor";

import preact from '@astrojs/preact';
import UnoCSS from 'unocss/astro'
import vercel from "@astrojs/vercel";
import { visualizer } from "rollup-plugin-visualizer";



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
		preact(),
    mdx({
      smartypants: true, 
      remarkPlugins: [remarkDirective, remarkDirectiveRehype, remarkMath],
      rehypePlugins: [rehypeKatex],
      gfm: true, 
    }),
		UnoCSS(),
		icon(), 
		compressor({ brotli: true, gzip: false, zstd: false })
  ],
	vite: {
		css: {
      transformer: "lightningcss",
    },
    // plugins: [visualizer({
    //     emitFile: true,
    //     filename: "stats.html",
    // })]
	},
  adapter: vercel({
		webAnalytics: {
			enabled: true,
		}, 
    imageService: false
	}), 
   devToolbar: {
    enabled: false // It's not that useful tbh 
  }
});