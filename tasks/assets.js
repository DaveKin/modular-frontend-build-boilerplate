var config = require('./config');
var gulp = require('gulp');
var assetglobs = [
	'./'+config.sourceDir+'/**/img/**/*.png',
	'./'+config.sourceDir+'/**/img/**/*.svg',
	'./'+config.sourceDir+'/**/img/**/*.jpg'
];

require('./clean');

gulp.task('assets', ['clean:assets'], function(){
  var stream = gulp.src(assetglobs)
  .pipe(gulp.dest('./'+config.outputDir+'/assets'));
  return stream;
});

gulp.task('assets:watch', function(){
	gulp.watch(assetglobs,['assets','css:dev'])
});