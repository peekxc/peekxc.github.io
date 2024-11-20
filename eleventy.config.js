const PRODUCTION = true;

// Node-js imports
import fs from "fs";

// First-class plugins
import pugPlugin from "@11ty/eleventy-plugin-pug";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import Image, { generateHTML } from "@11ty/eleventy-img";
import { RenderPlugin } from "@11ty/eleventy";

// Third-party plugins
import { compress } from "eleventy-plugin-compress";
import lazyimages from "eleventy-plugin-lazyimages";
// import eleventyRemark from "@fec/eleventy-plugin-remark";
// import pluginTOC from 'eleventy-plugin-toc';
import pluginTOC from "eleventy-plugin-nesting-toc";
import markdownIt from "markdown-it";
import markdownItKatex from "@aquabx/markdown-it-katex";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItHeaderSections from "markdown-it-header-sections";
import readingTime from "reading-time";
import lightningcss from "@11tyrocks/eleventy-plugin-lightningcss";
import HTMLParser from "node-html-parser";
// import { InputPathToUrlTransformPlugin } from "@11ty/eleventy"; // messes with paths
import { DateTime } from "luxon";
import toml from "@iarna/toml";

// Local plugins
import htmlMinifier from "./_11ty/html-minifier.js";

function readHTML(path) {
	const html_str = fs.readFileSync(path, "utf8");
	return html_str;
}

function reading_time(content) {
	const stats = readingTime(content, { wordsPerMinute: 400 });
	return stats.text;
	// + stats.words + " words"
}

// Makes a shortcode callable from the markdown content
async function optimizeImage(
	src,
	alt = "",
	width = "auto",
	loading = "lazy",
	formats = ["webp", "jpeg"],
	sizes = "100vw",
	classes = "",
	styles = ""
) {
	console.log("-- [11ty] Optimizing image: " + alt + " with formats: " + formats);
	let metadata = await Image(src, {
		formats: formats,
		widths: [width],
		outputDir: "./_site/img",
		sharpOptions: { density: 180 },
		sharpWebpOptions: { lossless: false, quality: 40, effort: 6 },
		sharpJpegOptions: { quality: 40 },
	});
	let img_attr = { alt, sizes, loading: loading, decoding: "async", class: classes, style: styles };
	let options = {
		pictureAttributes: { class: classes, style: styles },
		whitespaceMode: "inline",
	};
	let img_html = Image.generateHTML(metadata, img_attr, options);
	// console.log(metadata);
	// console.log(img_html);
	return img_html;
}

export default function (config) {
	config.setLiquidParameterParsing("builtin"); // for named key-value parameters (doesn't work)
	config.addDataExtension("toml", (contents) => toml.parse(contents));
	config.setDataDeepMerge(true);
	config.setUseGitIgnore(true);
	config.setLayoutResolution(false);
	config.ignores.add("/_vercel/speed-insights/script.js");
	config.ignores.add("/_vercel/insights/script.js");

	config.addPlugin(syntaxHighlight);
	config.addPlugin(RenderPlugin);
	config.addShortcode("optimizeImg", optimizeImage);
	// config.addPlugin(eleventyRemark);

	// Minify HTML, CSS, images
	if (PRODUCTION) {
		config.addPlugin(htmlMinifier);
		config.addPlugin(lightningcss); // NOTE: lightningcss is awesome / the way to go!

		// Adds lazy, blurred images low quality image placeholders (LQIP) by modifying the *output* directory
		config.addPlugin(lazyimages, {
			preferNativeLazyLoad: true,
		});
	}

	// Copy folders `x/` to `_site/x/`
	config.addPassthroughCopy({ "content/fonts": "fonts" }); // katex needs top-level fonts: https://katex.org/docs/font
	config.addPassthroughCopy("content/resources");
	config.addPassthroughCopy("content/**/*.jpg");
	config.addPassthroughCopy("content/**/*.png");
	config.addPassthroughCopy("content/**/*.gif");
	config.addPassthroughCopy("content/**/*.txt");

	// Set markdown library (see: https://dev.to/matthewtole/eleventy-markdown-and-tailwind-css-14f8)
	const md = markdownIt({
		linkify: false, // Autoconvert URL-like text to links
		html: true, // Enable HTML tags in source
		typographer: true, // Enable some language-neutral replacement + quotes beautification
		breaks: false, // Convert \n into <br/> tags
	})
		.use(markdownItAnchor, { level: 2 })
		.use(markdownItAttrs)
		// .use(markdownItHeaderSections)
		.use(markdownItKatex);
	config.setLibrary("md", md);

	// Register table of contents plugin
	// NOTE: this registers a TOC filter, through in a non-standard way
	pluginTOC.configFunction(config, { tags: ["h2"] });

	// Add filters to PUG
	config.addFilter("readingTime", reading_time);
	config.addFilter("readHTML", readHTML);
	config.addFilter("markdown", (content) => md.render(content));
	config.addFilter("markdown_inline", (content) => md.renderInline(content));
	config.addFilter("uppercase", (string) => string.toUpperCase());
	config.addFilter("toHTML", (content) => HTMLParser.parse(content).firstChild);
	config.addFilter("date", (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED));
	config.addFilter("optimize_image", function (url) {
		return optimizeImage(url).then((img_html) => img_html);
	});
	// HTMLParser.parse(value).firstChild
	// config.addFilter("toc", (content) => pluginTOC(content));
	// console.log(pluginTOC)

	// Configure pug plugin (see: https://github.com/11ty/eleventy-plugin-template-languages/blob/main/pug/test/test-plugin-core-tests.js)
	config.addPlugin(pugPlugin, {
		globals: ["filters"],
		debug: false,
		filters: config.getFilters({ type: "sync" }),
	});

	// Compression - this should be the last plugin loaded, and after transforms
	config.addPlugin(compress, {
		enabled: PRODUCTION,
		algorithm: "brotli",
	});

	// Serving + watching options
	config.setServerOptions({
		domDiff: false, // this seems slower but better
		port: 8086,
		watch: ["_includes/**/*.pug", "_includes/*.pug", "content/*.md", "content/**/*.md", "lib/css/*.css"],
	});

	// To call eleventy correctly, use `npx eleventy ...` from root
	// The includes, layouts, and data directories seem relative to either content/* or docs/* folders
	return {
		templateFormats: ["md", "pug", "html", "css", "js"], // - "liquid"
		dir: {
			input: "content",
			output: "_site",
			includes: "../_includes", // NOTE: this depends on where you call eleventy from
			layouts: "../_includes", // NOTE: this depends on where you call eleventy from
			data: "../_data", // NOTE: this depends on where you call eleventy from
		},
		markdownTemplateEngine: "liquid",
		passthroughFileCopy: true,
		pathPrefix: "/",
	};
}
