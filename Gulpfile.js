'use strict';
var gulp = require('gulp');

require('./tasks/clean');
require('./tasks/styles');
require('./tasks/javascript');
require('./tasks/assets');

/* report tasks - currently only `gulp report:csstargets` available */
require('./tasks/report');

/* combined tasks */
gulp.task('watch',['css:watch','js:watch']);
gulp.task('dev',['assets','css:dev','js:dev']);
gulp.task('build',['assets','css:build','js:build']);
gulp.task('default',['watch']);
