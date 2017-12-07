var gulp = require('gulp');
var fs = require('fs');
var glob = require('glob');
const yaml = require('js-yaml');
var S = require('string');
var file = require('gulp-file');

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

        // Build lunr index
        var index = {
          title: frontMatter.title,
          href: href,
          content: S(content[2]).trim().stripTags().stripPunctuation().s
        }
        //console.log(index);
        indexFiles.push(index);
      });
    }
    //console.log(indexFiles);
    file('search_index.json', JSON.stringify(indexFiles), {src: true}).pipe(gulp.dest('./public/'));
  });
};

gulp.task("lunr-index", processMDFile());