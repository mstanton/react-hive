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
var taskConfig = config.tasks.static;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp    = require('gulp');
var changed = require('gulp-changed')
var path    = require('path');

/*
 * Static prototype
 *
 */

exports = module.exports = staticTask;

/*
 * Static variables
 * @private
 *
 */

var exclude = ['!**/*.md'];

var paths = {
  src: [path.join(config.root.src[0], taskConfig.src, '**')],
  dest: hive.getDest(taskConfig.dest)
};

paths.src = paths.src.concat(exclude);

/*
 * Static task
 * @public
 *
 */

function staticTask() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('static', staticTask);
