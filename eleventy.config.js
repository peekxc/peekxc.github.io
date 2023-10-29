// import hljs from 'highlight.js';
// npx tailwindcss -c tailwind.config.js -o _src/styles.css
const fs = require('fs');
const _ = require("lodash");

var markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const browsersync = require("@11ty/eleventy-server-browsersync")
const katex = require("katex");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");

module.exports = function(eleventyConfig) {
	eleventyConfig.setUseGitIgnore(true);
	eleventyConfig.addPlugin(syntaxHighlight);
	// eleventyConfig.addPlugin(require('eleventy-plugin-heroicons'));
	
	// Copy folders `x/` to `_site/x/`
	eleventyConfig.addPassthroughCopy({ "lib/css": "css" })
	eleventyConfig.addPassthroughCopy({ "lib/js" : "js" });
	eleventyConfig.addPassthroughCopy({ "lib/fonts" : "fonts"}); // katex expects top-level fonts, see: https://katex.org/docs/font
	// eleventyConfig.addPassthroughCopy("CV");
	// eleventyConfig.addPassthroughCopy({ "data": "data" });
	// eleventyConfig.addPassthroughCopy({ "images": "images" });
	
	// Set markdown library
	// See: https://dev.to/matthewtole/eleventy-markdown-and-tailwind-css-14f8
	const md = markdownIt({ 
		linkify: true, 						// Autoconvert URL-like text to links
		html: true,					 			// Enable HTML tags in source
		typographer: false,				// Enable some language-neutral replacement + quotes beautification
		breaks: false
		// highlight: function (str, lang) {
		// 	if (lang && hljs.getLanguage(lang)) { 
		// 		try { return hljs.highlight(str, {language: lang}).value;} catch (__) {} 
		// 	}
		// 	return ''; // use external default escaping
		// }
	}).use(markdownItKatex);
	// eleventyConfig.setLibrary('md', md);
	eleventyConfig.setLibrary("md", md.use(markdownItAnchor).use(markdownItAttrs))

  
  // Let pug use filter! this is needed for pathPrefix url!	
	global.filters = eleventyConfig.javascriptFunctions; // magic happens here
	eleventyConfig.setPugOptions({ // and here
    globals: ['filters']
	});

  // Serving + watching options
  // DOESNT WORK 
  eleventyConfig.setServerOptions({
    domDiff: false, // this seems slower but better 
    port: 8080,
    watch: ["_includes/*.pug", "_includes/**/*.pug", "content/*.md", "content/**/*.md", "lib/css/*.css"] 
  })

  // Use regular browser sync
  // DOESNT WORK 
  // eleventyConfig.setServerOptions({
  //   module: "@11ty/eleventy-server-browsersync",
  //   port: 8080,
  //   open: false,
  //   notify: false,
  //   ui: false,
  //   ghostMode: false
  // })
	eleventyConfig.addPassthroughCopy("resources");
	eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.png");
	eleventyConfig.addPassthroughCopy("content/**/*.gif");
	// eleventyConfig.ignores.add("content/_jobs/*");
	return {
		templateFormats: [ "md", "pug", "html" ], // - "liquid"
		dir: {
			input: "content",
			includes: "../_includes", 
			data: "../_data",
			output: "docs" // needed for GH pgaes
		}, 
		passthroughFileCopy: true,
		pathPrefix: "/"
	};
};