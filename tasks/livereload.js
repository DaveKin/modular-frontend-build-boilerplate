var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('livereload:listen', function(){
	livereload.listen();
});
