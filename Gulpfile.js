'use strict';
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

require('./tasks/clean');
require('./tasks/styles');
require('./tasks/javascript');
require('./tasks/assets');

/* report tasks - currently only `gulp report:csstargets` available */
require('./tasks/report');

/* combined tasks */
gulp.task('watch',['assets:watch','css:watch','js:watch']);
gulp.task('dev', gulpSequence('assets', ['css:dev','js:dev']));
gulp.task('build', gulpSequence('assets',['css:build','js:build']));
gulp.task('default',['dev','watch']);
