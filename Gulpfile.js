'use strict';
 
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename2");
var debug = require('gulp-debug');
var glob = require('glob');
/* stylesheet processing */
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var postcss = require('gulp-postcss');
var assets  = require('postcss-assets');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var csslint = require('gulp-csslint');
var minifycss = require('gulp-minify-css');
/* js processing */
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
/* image processing */

/* clean the run folder */
gulp.task('clean:css', function (cb) {
  del(['run/**/*.css'], function(err){
    cb(err);
  });
});
gulp.task('clean:js', function (cb) {
  del(['run/**/*.js','run/**/*.js.map'], function(err){
    cb(err);
  });
});
gulp.task('clean:assets', function (cb) {
  del(['run/assets'], function(err){
    cb(err);
  });
});


/* CSS tasks */

gulp.task('css:lint',function(){
  gulp.src('./run/**/*.css')
  .pipe(csslint())
  .pipe(csslint.reporter('text'));
});

/* build the development CSS, readable format with sourcemap for debugging */
gulp.task('css:dev', ['clean:css'], function(){
  gulp.src('./source/5-bundles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
        extensions: ['.scss']
    }))
    //.pipe(debug({title:'cssdev pre-sass',minimal:false}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([assets,autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./run/css'))
    .pipe(csslint())
    .pipe(csslint.reporter('text'))
    .pipe(livereload());
})
 
/* Build the production CSS, optimised as much as possible*/
gulp.task('css:build', ['clean:css'], function(){
  gulp.src('./source/5-bundles/**/*.scss')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([assets, autoprefixer]))
    .pipe(minifycss({processImport:false}))
    .pipe(gulp.dest('./run/css'))
    .pipe(csslint())
    .pipe(csslint.reporter('text'))
    .pipe(livereload());
});

/* watch the scss files and run the dev task */
gulp.task('css:watch', ['css:dev'], function () {
  gulp.watch('./source/**/*.scss', ['css:dev']);
});

/* watch the scss files and run the build task */
gulp.task('css:watch:build', ['css:build'], function () {
  gulp.watch('./source/**/*.scss', ['css:build']);
});


/* JS tasks */
gulp.task('js:lint',function(){
  gulp.src(['./source/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:dev',['clean:js','js:lint'],function(){
  var files = glob.sync('./source/5-bundles/**/*.js');
  var bundleThis = function(srcArray) {
    srcArray.forEach(function(sourceFile) {
        var bundle = browserify([sourceFile],{debug:true}).bundle();
        bundle
        .pipe(source(sourceFile))
        .pipe(buffer())
        .pipe(rename(function (pathObj, filePath) {
          return pathObj.join(
            pathObj.dirname(filePath).replace(/source\/5-bundles\/?/,''),
            pathObj.basename(filePath)
          );
        }))
        .pipe(gulp.dest('./run/js'))
        .pipe(livereload());
    });
  };
  bundleThis(files);
});

gulp.task('js:build',['clean:js','js:lint'],function(){
  var files = glob.sync('./source/5-bundles/**/*.js');
  var bundleThis = function(srcArray) {
    srcArray.forEach(function(sourceFile) {
        var bundle = browserify([sourceFile],{debug:true}).bundle();
        bundle
        .pipe(source(sourceFile))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename(function (pathObj, filePath) {
          return pathObj.join(
            pathObj.dirname(filePath).replace(/source\/5-bundles\/?/,''),
            pathObj.basename(filePath)
          );
        }))
        .pipe(gulp.dest('./run/js'))
        .pipe(livereload());
    });
  };
  bundleThis(files);
});

gulp.task('js:watch', ['js:dev'], function(){
  gulp.watch('./source/**/*.js',['js:dev']);
});

/* assets tasks */
gulp.task('assets', ['clean:assets'], function(){
  gulp.src(['./source/**/img/**/*.png','./source/**/img/**/*.svg','./source/**/img/**/*.jpg'])
  // .pipe(rename(function (pathObj, filePath) {
  //   return pathObj.join(
  //     pathObj.dirname(filePath).replace(/img\/?/,''),
  //     pathObj.basename(filePath)
  //   );
  // }, { verbose: true }))
  .pipe(gulp.dest('./run/assets'));
});

/* combined tasks */
gulp.task('watch',['css:watch','js:watch'], function(){
  livereload.listen();
});
gulp.task('dev',['assets','css:dev','js:dev']);
gulp.task('build',['assets','css:build','js:build']);
gulp.task('default',['watch']);
