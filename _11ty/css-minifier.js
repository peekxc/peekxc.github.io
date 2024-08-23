// From: https://starbeamrainbowlabs.com/blog/posts/506-eleventy-minification.html
const CleanCSS = require("clean-css");
const clean_CSS = async (source, output_path) => {
  if(!output_path.endsWith(".css") || !is_production){ return source; }
	const result = new CleanCSS({ level: 2 }).minify(source).styles.trim();
	console.log(`MINIFY ${output_path}`, source.length, `â†’`, result.length, `(${((1 - (result.length / source.length)) * 100).toFixed(2)}% reduction)`);
	return result;
};

module.exports = {
	initArguments: {},
	configFunction: async (eleventyConfig = {}) => {
		eleventyConfig.addTransform("cssmin", clean_CSS);
	}
};
