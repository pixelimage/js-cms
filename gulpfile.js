
var gulp = require("gulp");
var exec = require('gulp-exec');

var dir = require( 'require-dir' );
	dir( './tasks', { recurse: true } );

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*', ['concat:js']);
  gulp.watch('./src/sass/**/*', ['concat:css']);
});
