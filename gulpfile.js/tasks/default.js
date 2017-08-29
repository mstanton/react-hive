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

var hive = require('../lib/hive');

/*
 * Module Definition
 *
 */

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var _            = require('lodash');

/*
 * Default prototype
 *
 */

exports = module.exports = defaultTask;

/*
 * Default task
 * @public
 *
 * The default task can be called with the following 
 * environment variables:
 *
 * gulp --env dev
 * gulp --env int
 * gulp --env prod
 *
 */

function defaultTask(cb) {
  var tasks = hive.getEnabledTasks();

  gulpSequence.apply(gulpSequence, tasks.concat(cb));
}

/*
 * gulp interface
 * @special
 *
 */

gulp.task('default', defaultTask);
