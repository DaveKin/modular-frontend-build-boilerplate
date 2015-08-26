var config = require('./config');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer-core');

gulp.task('report:csstargets', function(){
	console.log('CSS Autoprefixer targets');
	console.log('------------------------');
	var targets = autoprefixer(config.autoprefixer).info();
	console.log(targets);
});
