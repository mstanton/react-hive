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

var hive       = require('../lib/hive');
var config     = hive.config;
var taskConfig = config.tasks.fonts;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var changed     = require('gulp-changed');
var path        = require('path');
var browserSync = require('browser-sync');

/*
 * Fonts prototype
 *
 */

exports = module.exports = fontsTask;

/*
 * Fonts variables
 * @private
 *
 */

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions),
  dest: hive.getDest(taskConfig.dest)
};

/*
 * Fonts task
 * @public
 *
 */

function fontsTask() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('fonts', fontsTask);
