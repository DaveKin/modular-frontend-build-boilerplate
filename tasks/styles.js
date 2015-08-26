var config = require('./config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var postcss = require('gulp-postcss');
var assets  = require('postcss-assets');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var csslint = require('gulp-csslint');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var rebaser = require("postcss-assets-rebase");
var debug = require("gulp-debug");

require('./clean');

gulp.task('css:lint',function(){
  gulp.src('./'+config.outputDir+'/**/*.css')
  .pipe(csslint(config.csslint))
  .pipe(csslint.reporter('text'));
});


gulp.task('css:rendermods', function(cb){
  gulp.src('./'+config.sourceDir+'/4-modules/**/*.scss')
  .pipe(sass())
  .pipe(debug({minimal:false}));
});

/* build the development CSS, readable format with sourcemap for debugging */
gulp.task('css:dev', ['clean:css'], function(){


  gulp.src('./'+config.sourceDir+'/'+config.bundleDir+'/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass())
    .pipe(postcss([
      assets(config.assets),
      //rebaser(config.rebaser),
      autoprefixer(config.autoprefixer)
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'+config.outputDir+'/css'))
    .pipe(csslint(config.csslint))
    .pipe(csslint.reporter('text'))
    .pipe(livereload());
})
 
/* Build the production CSS, optimised as much as possible*/
gulp.task('css:build', ['clean:css'], function(){
  gulp.src('./'+config.sourceDir+'/'+config.bundleDir+'/**/*.scss')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([assets, autoprefixer(config.autoprefixer)]))
    .pipe(minifycss({processImport:false}))
    .pipe(gulp.dest('./'+config.outputDir+'/css'))
    .pipe(csslint(config.csslint))
    .pipe(csslint.reporter('text'))
    .pipe(livereload());
});

require('./livereload');

/* watch the scss files and run the dev task */
gulp.task('css:watch', ['css:dev','livereload:listen'], function () {
  gulp.watch('./'+config.sourceDir+'/**/*.scss', ['css:dev']);
});

/* watch the scss files and run the build task */
gulp.task('css:watch:build', ['css:build','livereload:listen'], function () {
  gulp.watch('./'+config.sourceDir+'/**/*.scss', ['css:build']);
});