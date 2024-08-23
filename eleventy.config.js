// import hljs from 'highlight.js';
// npx tailwindcss -c tailwind.config.js -o _src/styles.css
const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItKatex = require("@aquabx/markdown-it-katex");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const HTMLParser = require('node-html-parser');
const pluginTOC = require('eleventy-plugin-toc');
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const readingTime = require('reading-time');
const { compress } = require('eleventy-plugin-compress');

// Great: https://photogabble.co.uk/tutorials/font-subsetting-with-eleventyjs/
// const _ = require("lodash");
// var http = require('http');
// const browsersync = require("@11ty/eleventy-server-browsersync")
// const katex = require("katex");
// const importSync = require('import-sync');
// const rehypeKatex = importSync('https://esm.sh/rehype-katex@7');
// const readingTime = require('eleventy-plugin-reading-time');
// const EleventyUnifiedPlugin = require("eleventy-plugin-unified");
const PRODUCTION = true

module.exports = function(eleventyConfig) { 
	// eleventyConfig.addPlugin(dirOutputPlugin);// For logging sizes of things
	eleventyConfig.setUseGitIgnore(true);
	eleventyConfig.ignores.add("/_vercel/speed-insights/script.js");
	eleventyConfig.ignores.add("/_vercel/insights/script.js");

	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addPlugin(pluginTOC, { 
		tags: ['h2'] // this generates the sidebar needed for scrollspy!
		// wrapperClass: ["scrollspy-nav"]
	});
	
	// Minify HTML, CSS
	// Adds lazy, blurred images low quality image placeholders (LQIP)
	// NOTE: lightningcss is awesome / the way to go!
	if (PRODUCTION){
		eleventyConfig.addPlugin(require("./_11ty/html-minifier.js"));
		eleventyConfig.addPlugin(require("@11tyrocks/eleventy-plugin-lightningcss"));
		eleventyConfig.addPlugin(require('eleventy-plugin-lazyimages'), {
			preferNativeLazyLoad: true
		});
	}

	// Compression - this should be the last plugin loaded, and after transforms
	eleventyConfig.addPlugin(compress, {
		enabled: PRODUCTION,
		algorithm: 'brotli'
	});


	// For reading time 
	eleventyConfig.addFilter("readingTime", (content) => {
		const stats = readingTime(content, { 'wordsPerMinute': 400 });
		return stats.text + ", " + stats.words + " words";
	});


	// Copy folders `x/` to `_site/x/`
	eleventyConfig.addPassthroughCopy({ "content/fonts" : "fonts"}); // katex expects top-level fonts, see: https://katex.org/docs/font
	eleventyConfig.addPassthroughCopy("resources");
	eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.png");
	eleventyConfig.addPassthroughCopy("content/**/*.gif");

	// Set markdown library
	// See: https://dev.to/matthewtole/eleventy-markdown-and-tailwind-css-14f8
	const md = markdownIt({ 
		linkify: false, 						// Autoconvert URL-like text to links
		html: true,					 				// Enable HTML tags in source
		typographer: true,					// Enable some language-neutral replacement + quotes beautification
		breaks: false								// Convert \n into <br/> tags
	}).use(markdownItKatex)
		.use(markdownItAnchor, {
			level: 2,  							// heading level for generating IDs
			// markdownItAnchor.permalink[#](permalinkOpts)
			// permalink: true,
			// permalinkClass: 'header-link',
			// permalinkSymbol: '#'
		})
		.use(markdownItAttrs);	
	eleventyConfig.setLibrary("md", md);

	eleventyConfig.addFilter("markdown", (content) => {
		return md.render(content);
	});
	eleventyConfig.addFilter("markdown_inline", (content) => {
		return md.renderInline(content);
	});

	eleventyConfig.addFilter("readHTML", (path) => {
		const html_str = fs.readFileSync(path, "utf8");
		return html_str; 
	})

	eleventyConfig.addFilter("markdown", (content) => {
		return md.render(content);
	});

	eleventyConfig.addFilter("uppercase", function(string) {
    return string.toUpperCase();
  });

	eleventyConfig.addFilter("toHTML", function(value) {
		el = HTMLParser.parse(value);
		// console.log(el.firstChild.structure);
		return el.firstChild;
	});


	// eleventyConfig.addFilter("addClass", function(el){
	// 	el.classList.add(class);
	// 	return el;
	// });

  // Let pug use filter! this is needed for pathPrefix url!	
	global.filters = eleventyConfig.javascriptFunctions; // magic happens here
	eleventyConfig.setPugOptions({ // and here
    globals: ['filters'],
		debug: false
	});

  // Serving + watching options
  // DOESNT WORK 
  eleventyConfig.setServerOptions({
    domDiff: false, // this seems slower but better 
    port: 8080,
    watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md", "content/css/*.css"] 
  })
	// eleventyConfig.ignores.add("content/_jobs/*");

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
};

// highlight: function (str, lang) {
// 	if (lang && hljs.getLanguage(lang)) { 
// 		try { return hljs.highlight(str, {language: lang}).value;} catch (__) {} 
// 	}
// 	return ''; // use external default escaping
// }