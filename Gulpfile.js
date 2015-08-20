'use strict';
 
var gulp = require('gulp');
var del = require('del');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename2");
/* stylesheet processing */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var assets  = require('postcss-assets');
var sourcemaps = require('gulp-sourcemaps');
var csscomb = require('gulp-csscomb');
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
  del(['run/**/*.js'], function(err){
    cb(err);
  });
});
gulp.task('clean:img', function (cb) {
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
  gulp.src('./source/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(csscomb())
    .pipe(csslint())
    .pipe(csslint.reporter('text'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./run'))
    .pipe(livereload());
})
 
/* Build the production CSS, optimised as much as possible*/
gulp.task('css:build', ['clean:css'], function(){
  gulp.src('./source/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([assets({
      loadPaths: ['./source/**/*']
    }), autoprefixer]))
    .pipe(minifycss({processImport:false}))
    .pipe(csslint())
    .pipe(csslint.reporter('text'))
    .pipe(gulp.dest('./run'))
    .pipe(livereload());
});

/* watch the scss files and run the dev task */
gulp.task('css:watch', function () {
  gulp.watch('./source/**/*.scss', ['css:dev']);
});

/* watch the scss files and run the build task */
gulp.task('css:watch:build', function () {
  gulp.watch('./source/**/*.scss', ['css:build']);
});


/* JS tasks */
gulp.task('js:lint',function(){
  gulp.src(['./source/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js:dev',['clean:js','js:lint'],function(){
  var b = browserify({
    entries: './source/main.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(jshint())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./run'))
    .pipe(livereload());
});

gulp.task('js:build',['clean:js','js:lint'],function(){
  var b = browserify({
    entries: './source/main.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest('./run'))
    .pipe(livereload());
});

gulp.task('js:watch',function(){
  gulp.watch('./source/**/*.js',['js:dev']);
});

/* image tasks */
gulp.task('images', ['clean:img'], function(){
  gulp.src(['./source/**/img/**/*.png','./source/**/img/**/*.svg','./source/**/img/**/*.jpg'])
  .pipe(rename(function (pathObj, filePath) {
    return pathObj.join(
      pathObj.dirname(filePath).replace(/img\/?/,''),
      pathObj.basename(filePath)
    );
  }, { verbose: true }))
  .pipe(gulp.dest('./run/assets'));
});

/* combined tasks */
gulp.task('watch',['css:watch','js:watch'], function(){
  livereload.listen();
});
gulp.task('dev',['images','css:dev','js:dev']);
gulp.task('build',['images','css:build','js:build']);
gulp.task('default',['dev','watch']);
