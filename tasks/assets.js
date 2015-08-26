var config = require('./config');
var gulp = require('gulp');
var rename = require("gulp-rename2");

require('./clean');

gulp.task('assets', ['clean:assets'], function(){
  gulp.src(['./'+config.sourceDir+'/**/img/**/*.png','./'+config.sourceDir+'/**/img/**/*.svg','./'+config.sourceDir+'/**/img/**/*.jpg'])
  .pipe(rename(function (pathObj, filePath) {
    return pathObj.join(
      pathObj.dirname(filePath).replace(/img\/?/,''),
      pathObj.basename(filePath)
    );
  }, { verbose: false }))
  .pipe(gulp.dest('./'+config.outputDir+'/assets'));
});