// Transformer to minify HTML output.

// const htmlmin = require("html-minifier");
// import htmlmin from "html-minifier";
import minifyHtml from "@minify-html/node";

const convert = async (rawContent, outputPath) => {
    const content = rawContent;
    if (outputPath && outputPath.endsWith(".html")) {
			// console.log("Testing");
			// const minified = htmlmin.minify(content, {
			//     useShortDoctype: true,
			//     removeComments: true,
			//     collapseWhitespace: true
			// });
			const minified = minifyHtml.minify(Buffer.from(content), { 
				keep_spaces_between_attributes: true, 
				keep_comments: false
			});
			return minified;
    }

    return content;
};

export default function (config) {
	config.addTransform("minifyHTML", convert);
}
// module.exports = {
//     initArguments: {},
//     configFunction: async (eleventyConfig = {}) => {
//         eleventyConfig.addTransform("minifyHTML", convert);
//     }
// };

export const config = {

}
