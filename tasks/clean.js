var config = require('./config');
var gulp = require('gulp');
var del = require('del');

/* clean the run folder */
gulp.task('clean:all', function(cb){
  del([config.outputDir], function(err){
    cb(err);
  });  
});

/* clean the css output */
gulp.task('clean:css', function (cb) {
  del([config.outputDir + '/css'], function(err){
    cb(err);
  });
});

/* clean the output js */
gulp.task('clean:js', function (cb) {
  del([config.outputDir + '/js'], function(err){
    cb(err);
  });
});

/* clean the output assets folder */
gulp.task('clean:assets', function (cb) {
  del([config.outputDir + '/assets'], function(err){
    cb(err);
  });
});