
var gulp = require("gulp");
var sass = require("gulp-sass");
var pleeease = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat")
var runSequence = require('run-sequence');

/* ! ---------- __val__ ---------- ---------- ---------- ---------- */

var dir = './js_cms/_cms/css';

var css = {
	main:{
		dest:'cms.css',
		src:[
			"./src/sass/cms.scss"
		]
	}
}

/* ! ---------- __val__ ---------- ---------- ---------- ---------- */

gulp.task("sass", function() {
    return gulp.src(css.main.src)
		//.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(pleeease({
			autoprefixer: { 'browsers': ['last 2 versions','IE 9']},
			mqpacker: false,
			minifier: false
			//out: 'all.min.css',
		}))
		//.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(dir));
});

gulp.task('concat:css', function(callback) {
  return runSequence(
    'sass',
    callback
  );
});
