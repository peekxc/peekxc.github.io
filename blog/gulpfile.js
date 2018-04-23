var gulp = require('gulp');
var fs = require('fs');
var glob = require('glob');
const yaml = require('js-yaml');
var S = require('string');
var file = require('gulp-file');
var pug = require('pug');


gulp.task("build-templates", function(){
	var jsFunctionString = pug.compileFileClient('layouts/templates/summary.pug', {name: "summary_template"});
	fs.writeFileSync("static/js/templates.js", jsFunctionString);
});


var path = {
  'content' : './content/**/*.+(md|Rmd)'
};

var processMDFile = function() {
  var indexFiles = [];
  glob(path.content, function(err, files){
    if(err) {
      console.log(err);
    } else {
      files.forEach(function(file) {
        var content = fs.readFileSync(file, 'utf8');
        content = content.split('---');
        var frontMatter = yaml.safeLoad(content[1].trim());
        // console.log(frontMatter);

        // you might have different definition of permalink then change this
        var href = frontMatter.slug;
        if(frontMatter.type != null && frontMatter.type == 'post' ){
          href = '/post/' + href;
        }

        var summary = content[2].replace(/(([^\s]+\s\s*){70})(.*)/,"$1…");

        // Build lunr index
        var index = {
          title: frontMatter.title,
					author: frontMatter.author,
					date: frontMatter.date,
          href: href,
					summary: summary,
          content: S(content[2]).trim().stripTags().stripPunctuation().s,
					categories: frontMatter.categories,
					tags: frontMatter.tags
        };
        //console.log(index);
        indexFiles.push(index);
      });
    }
    //console.log(indexFiles);
    file('search_index.json', JSON.stringify(indexFiles), {src: true}).pipe(gulp.dest('./static/'));
  });
};

var elasticlunr = require("elasticlunr");

gulp.task("save_index", function(){
	var elastic_lunr_index = elasticlunr(function () {
		this.addField('title');
		this.addField('author');
		this.addField('date');
		this.addField('href');
		this.addField('summary');
		this.addField('content');
		this.addField('categories');
		this.addField('tags');
		this.setRef('ref');
	});

	// Add the document in the json file to the search index
	fs.readFile('public/search_index.json', function (err, data) {
		if (err) throw err;

		// Put each item into the index
		var raw = JSON.parse(data);

		var docs = raw.map(function (doc) {
			return {
				ref: doc.ref,
				href: doc.href,
				title: doc.title,
				image: doc.image,
				author: doc.author,
				publish_date: doc.publish_date,
				wordcount: doc.wordcount,
				date: doc.date,
				tags: doc.tags,
				categories: doc.categories,
				keywords: doc.keywords,
				summary: doc.summary,
				content: doc.content
			}
		});

		docs.forEach(function(doc){
			elastic_lunr_index.addDoc(doc);
		});

		// Write the index to a file
		fs.writeFile('static/cached_index.json', JSON.stringify(elastic_lunr_index), function (err) {
			if (err) throw err;
			console.log('cache written');
		});
	});

});




gulp.task("lunr-index", processMDFile());