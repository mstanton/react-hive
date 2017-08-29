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
var taskConfig = config.tasks.svgSprite;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var svgstore    = require('gulp-svgstore');
var path        = require('path');
var browserSync = require('browser-sync');

/*
 * SVG Sprite prototype
 *
 */

exports = module.exports = svgSpriteTask;

/*
 * SVG Sprite variables
 * @private
 *
 */

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions),
  dest: hive.getDest(taskConfig.dest)
};

/*
 * SVG Sprite task
 * @public
 *
 */

function svgSpriteTask() {
  return gulp.src(paths.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('svgSprite', svgSpriteTask);
