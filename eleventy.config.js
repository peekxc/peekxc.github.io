// import hljs from 'highlight.js';
// npx tailwindcss -c tailwind.config.js -o _src/styles.css
const fs = require('fs');
const _ = require("lodash");
var http = require('http');

var markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItKatex = require("@aquabx/markdown-it-katex");



const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const browsersync = require("@11ty/eleventy-server-browsersync")
// const katex = require("katex");


// Minifiers and optimizers
const CleanCSS = require("clean-css");

const EleventyFetch = require("@11ty/eleventy-fetch");
const dirOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const HTMLParser = require('node-html-parser');
const pluginTOC = require('eleventy-plugin-toc');
const { EleventyRenderPlugin } = require("@11ty/eleventy");

// Great: https://photogabble.co.uk/tutorials/font-subsetting-with-eleventyjs/

// const importSync = require('import-sync');
// const rehypeKatex = importSync('https://esm.sh/rehype-katex@7');
// const readingTime = require('eleventy-plugin-reading-time');
// const EleventyUnifiedPlugin = require("eleventy-plugin-unified");
const readingTime = require('reading-time');

module.exports = function(eleventyConfig) { 
	// eleventyConfig.addPlugin(dirOutputPlugin);// For logging sizes of things
	eleventyConfig.setUseGitIgnore(true);
	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addPlugin(pluginTOC, { 
		tags: ['h2'] // this generates the sidebar needed for scrollspy!
		// wrapperClass: ["scrollspy-nav"]
	});

	// eleventyConfig.addPlugin(require('eleventy-plugin-heroicons'));
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	// For reading time 
	eleventyConfig.addFilter("readingTime", (content) => {
		const stats = readingTime(content, { 'wordsPerMinute': 400 });
		return stats.text + ", " + stats.words + " words";
	});


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

	eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
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
    watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md", "lib/css/*.css"] 
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

// highlight: function (str, lang) {
// 	if (lang && hljs.getLanguage(lang)) { 
// 		try { return hljs.highlight(str, {language: lang}).value;} catch (__) {} 
// 	}
// 	return ''; // use external default escaping
// }