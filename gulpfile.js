// Include gulp
var gulp = require('gulp'),
		pug = require('gulp-pug'),
		stylus = require('gulp-stylus'),
		livereload = require('gulp-livereload');

// Other includes
var fs = require('fs');

// Compile *.pug templates to static html
gulp.task('pug', function() {
	return gulp.src('views/index.pug') // Get source files with gulp.src
		.pipe(pug()) // Sends it through a gulp plugin
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./')) // Outputs the file in the destination folder
		.pipe(livereload());
	//.pipe(browserSync.reload({ stream: true }));
});

// Compile stylus code to CSS
gulp.task('stylus', function() {
	return gulp.src('stylesheets/*.styl') // Get source files with gulp.src
		.pipe(stylus({ compress: true })) // Sends it through a gulp plugin
		.pipe(gulp.dest('css')) // Outputs the file in the destination folder
		.pipe(livereload());
	//.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('stylesheets/*.styl', ['stylus']);
	gulp.watch('views/*.pug', ['pug']);
});


gulp.task('default', ['stylus', 'pug'], function() {
	gulp.run('watch');
});