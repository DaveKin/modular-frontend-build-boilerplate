var config = require('./config');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var glob = require('glob');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename2");

require('./clean');
require('./livereload');

gulp.task('js:lint',function(){
  gulp.src(['./'+config.sourceDir+'/**/*.js'])
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:dev',['clean:js','js:lint'],function(){
  var bundleThis = function(srcArray) {
    srcArray.forEach(function(sourceFile) {
        var bundle = browserify([sourceFile],{debug:true}).bundle();
        bundle
        .pipe(source(sourceFile))
        .pipe(buffer())
        .pipe(rename(function (pathObj, filePath) {
          var re = new RegExp(config.sourceDir+'\/'+config.bundleDir+'\/?');
          return pathObj.join(
            pathObj.dirname(filePath).replace(re,''),
            pathObj.basename(filePath)
          );
        }))
        .pipe(gulp.dest('./'+config.outputDir+'/js'))
        .pipe(livereload());
    });
  };
  var files = glob.sync('./'+config.sourceDir+'/'+config.bundleDir+'/**/*.js');
  bundleThis(files);
});

gulp.task('js:build',['clean:js','js:lint'],function(){
  var bundleThis = function(srcArray) {
    srcArray.forEach(function(sourceFile) {
        var bundle = browserify([sourceFile],{debug:true}).bundle();
        bundle
        .pipe(source(sourceFile))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename(function (pathObj, filePath) {
          var re = new RegExp(config.sourceDir+'\/'+config.bundleDir+'\/?');
          return pathObj.join(
            pathObj.dirname(filePath).replace(re,''),
            pathObj.basename(filePath)
          );
        }))
        .pipe(gulp.dest('./'+config.outputDir+'/js'))
        .pipe(livereload());
    });
  };
  var files = glob.sync('./'+config.sourceDir+'/'+config.bundleDir+'/**/*.js');
  bundleThis(files);
});


gulp.task('js:watch', ['livereload:listen'], function(){
  gulp.watch('./'+config.sourceDir+'/**/*.js',['js:dev']);
});