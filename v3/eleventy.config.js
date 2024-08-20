// var markdownIt = require('markdown-it');
import markdownIt from "markdown-it"
import pugPlugin from "@11ty/eleventy-plugin-pug";
import readingTime from 'reading-time';
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

export default function (config) {
	config.setDataDeepMerge(true)
	config.setUseGitIgnore(true);
	config.setLayoutResolution(false);

	// Copy folders `x/` to `_site/x/`
	config.addPassthroughCopy({ "lib/css": "css" })
	config.addPassthroughCopy({ "lib/js" : "js" });
	config.addPassthroughCopy({ "lib/fonts" : "fonts"});

	// Set markdown library (see: https://dev.to/matthewtole/eleventy-markdown-and-tailwind-css-14f8)
	const md = markdownIt({ 
		linkify: false, 						// Autoconvert URL-like text to links
		html: true,					 				// Enable HTML tags in source
		typographer: true,					// Enable some language-neutral replacement + quotes beautification
		breaks: false								// Convert \n into <br/> tags
	})
	config.setLibrary("md", md);

	// magic to add basic filters 
	pugPlugin.options = { 
		globals: ['filters'],
		debug: false, 
		filters: { "readingTime" : readingTime }
	}
	// global.filters = config.javascriptFunctions; // magic happens here
	config.addFilter( "readingTime", readingTime);

	// Add plugins 
	config.addPlugin(pugPlugin);
	config.addPlugin(InputPathToUrlTransformPlugin);

	// Add callable filters 
	config.addFilter("readingTime", (content) => {
		const stats = readingTime(content, { 'wordsPerMinute': 400 });
		return stats.text + ", " + stats.words + " words";
	});

	config.addFilter("url", function(value) { value })

	// Serving + watching options
	config.setServerOptions({
		domDiff: false, // this seems slower but better 
		port: 8080,
		watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md", "lib/css/*.css"] 
	})

	// Base Config
	return {
		templateFormats: [ "md", "pug"], // - "liquid"
		dir: {
			input: "content",
			output: "docs", // needed for GH pgaes
			includes: "../_includes", 
			data: "../_data",
		}, 
		passthroughFileCopy: true,
		pathPrefix: "/"
	}
}