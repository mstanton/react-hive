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
var taskConfig = config.tasks.images;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var changed     = require('gulp-changed');
var path        = require('path');
var browserSync = require('browser-sync');

/*
 * Image prototype
 *
 */

exports = module.exports = imagesTask;

/*
 * Image variables
 * @private
 *
 */

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions),
  dest: hive.getDest(taskConfig.dest)
};

/*
 * Image task
 * @public
 *
 */

function imagesTask() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulpif(config.settings.imagemin, imagemin()))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('images', imagesTask);
