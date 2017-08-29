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

var hive   = require('../lib/hive');
var config = hive.config;

if (!config) return;

/*
 * Module Definition
 *
 */

var gulp    = require('gulp');
var del     = require('del');
var through = require('through2');
var hive    = require('../lib/hive');

/*
 * Clean prototype
 *
 */

exports = module.exports = cleanTask;

/*
 * Clean task
 * @public
 *
 */

function cleanTask(cb) {
  del(config.root.originalRoot).then(function(paths) {
    cb();
  });
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('clean', cleanTask);
