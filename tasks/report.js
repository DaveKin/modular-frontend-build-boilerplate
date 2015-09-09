var config = require('./config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var autoprefixer = require('autoprefixer');
var cssstats = require('gulp-cssstats');
var fs = require('fs');
var madge = require('madge');
var sassgraph = require('sass-graph');

require('./styles');

gulp.task('reports', ['report:csstargets','report:cssstats','report:dependencies'])

gulp.task('report:csstargets', function(){
	ensureReportsDir();
	var info = autoprefixer(config.autoprefixer).info();
	fs.writeFileSync('./'+config.reportsDir+'/csstargets.txt', info);
});

gulp.task('report:cssstats', function() {
	ensureReportsDir();
    buildstream()
    .pipe(cssstats({ specificityGraph:true }))
    .pipe(gulp.dest('./'+config.reportsDir));
});

gulp.task('report:dependencies', function(){
	ensureReportsDir();
	var jsdeps = madge('./'+config.sourceDir+'/'+config.bundleDir);
	var sassdeps = sassgraph.parseDir('./'+config.sourceDir+'/'+config.bundleDir);
	fs.writeFileSync('./'+config.reportsDir+'/deps-js.json', JSON.stringify(jsdeps.obj(),null,4));
	fs.writeFileSync('./'+config.reportsDir+'/deps-sass.json', JSON.stringify(sassdeps,null,4));
});

function ensureReportsDir(){
	var dir = './'+config.reportsDir;
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}
}