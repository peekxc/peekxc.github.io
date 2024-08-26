const PRODUCTION = false

// Node-js imports
import fs from 'fs';

// First-class plugins
import pugPlugin from "@11ty/eleventy-plugin-pug";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// Third-party plugins
import { compress } from 'eleventy-plugin-compress';
import lazyimages from 'eleventy-plugin-lazyimages';
// import pluginTOC from 'eleventy-plugin-toc';
import pluginTOC from 'eleventy-plugin-nesting-toc';
import markdownIt from "markdown-it"
import markdownItKatex from "@aquabx/markdown-it-katex";
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import readingTime from 'reading-time';
import lightningcss from '@11tyrocks/eleventy-plugin-lightningcss';
import HTMLParser from 'node-html-parser'
// import { Image } from "@11ty/eleventy-img"; // buggy 
// import { InputPathToUrlTransformPlugin } from "@11ty/eleventy"; // messes with paths
import { DateTime } from 'luxon';

// Local plugins 
import htmlMinifier from "./_11ty/html-minifier.js"

function readHTML(path) {
	const html_str = fs.readFileSync(path, "utf8");
	return html_str; 
}

function reading_time(content){
	const stats = readingTime(content, { 'wordsPerMinute': 400 });
	return stats.text; 
	// + stats.words + " words"
}

export default function (config) {
	config.setDataDeepMerge(true)
	config.setUseGitIgnore(true);
	config.setLayoutResolution(false);
	config.ignores.add("/_vercel/speed-insights/script.js");
	config.ignores.add("/_vercel/insights/script.js");

	// Generate table of contents
	config.addPlugin(syntaxHighlight);
	
	// Minify HTML, CSS, images
	if (PRODUCTION){
		config.addPlugin(htmlMinifier);
		config.addPlugin(lightningcss);		// NOTE: lightningcss is awesome / the way to go!
		
		// Adds lazy, blurred images low quality image placeholders (LQIP) by modifying the *output* directory
		config.addPlugin(lazyimages, {
			preferNativeLazyLoad: true
		});
	}

	// Copy folders `x/` to `_site/x/`
	config.addPassthroughCopy({ "content/fonts" : "fonts"}); // katex expects top-level fonts, see: https://katex.org/docs/font
	config.addPassthroughCopy("resources");
	config.addPassthroughCopy("content/**/*.jpg");
  config.addPassthroughCopy("content/**/*.png");
	config.addPassthroughCopy("content/**/*.gif");

	// Set markdown library (see: https://dev.to/matthewtole/eleventy-markdown-and-tailwind-css-14f8)
	const md = markdownIt({ 
		linkify: false, 						// Autoconvert URL-like text to links
		html: true,					 				// Enable HTML tags in source
		typographer: true,					// Enable some language-neutral replacement + quotes beautification
		breaks: false								// Convert \n into <br/> tags
	}).use(markdownItKatex)
		.use(markdownItAnchor, { level: 2 })
		.use(markdownItAttrs);	
	config.setLibrary("md", md);

	// Register table of contents plugin 
	// NOTE: this registers a TOC filter, through in a non-standard way
	pluginTOC.configFunction(config, { tags: ['h2'] });

	// Add filters to PUG
	config.addFilter("readingTime", reading_time);
	config.addFilter("readHTML", readHTML);
	config.addFilter("markdown", (content) => md.render(content));
	config.addFilter("markdown_inline", (content) => md.renderInline(content));
	config.addFilter("uppercase", (string) => string.toUpperCase());
	config.addFilter("toHTML", (content) => HTMLParser.parse(content).firstChild);
	config.addFilter("date", (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED))
	// HTMLParser.parse(value).firstChild
	// config.addFilter("toc", (content) => pluginTOC(content));
	// console.log(pluginTOC)

	// Configure pug plugin (see: https://github.com/11ty/eleventy-plugin-template-languages/blob/main/pug/test/test-plugin-core-tests.js)
	config.addPlugin(pugPlugin, { 
		globals: ['filters'],
		debug: false, 
		filters: config.getFilters({ type: "sync" }),
	});

	// Compression - this should be the last plugin loaded, and after transforms
	config.addPlugin(compress, {
		enabled: PRODUCTION,
		algorithm: 'brotli'
	});

	// Serving + watching options
	config.setServerOptions({
		domDiff: false, // this seems slower but better 
		port: 8080,
		watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md", "lib/css/*.css"] 
	})

	// To call eleventy correctly, use `npx eleventy ...` from root 
	// The includes, layouts, and data directories seem relative to either content/* or docs/* folders
	return {
		templateFormats: [ "md", "pug", "html", "css", "js"], // - "liquid"
		dir: {
			input: "content",
			output: "docs", // needed for GH pgaes
			includes: "../_includes", // NOTE: this depends on where you call eleventy from 
			layouts: "../_includes",  // NOTE: this depends on where you call eleventy from 
			data: "../_data"          // NOTE: this depends on where you call eleventy from 
		}, 
		passthroughFileCopy: true,
		pathPrefix: "/"
	};
}