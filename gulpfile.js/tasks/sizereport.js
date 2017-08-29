/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 */

'use strict';

/*
 * HIVE Definition
 *
 */

var hive         = require('../lib/hive');
var config       = hive.config;
var taskConfig   = config.tasks.javascript;
var repeatString = hive.utils.repeatString;

/*
 * Module Definition
 *
 */

var gulp       = require('gulp');
var sizereport = require('gulp-sizereport');
var path       = require('path');

/*
 * Size report prototype
 *
 */

exports = module.exports = sizeReportTask;

/*
 * Size report variables
 * @private
 *
 */

var files = '/**/*';

/*
 * Size report task
 * @public
 *
 */

function sizeReportTask() {
  return gulp.src([config.root.dest + files, '*!manifest.json'])
    .pipe(sizereport({
      gzip: true
    }));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('sizereport', sizeReportTask);
