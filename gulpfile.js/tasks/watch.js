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

var gulp  = require('gulp');
var watch = require('gulp-watch'); 
var path  = require('path');
var _     = require('lodash');

/*
 * Watch prototype
 *
 */

exports = module.exports = watchTask;

/*
 * Watch task
 * @public
 *
 */

function watchTask() {
  var tasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'templates', 'javascript', 'css'];

  tasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    var glob = (task.watch) ? hive.getSrc(task.watch, task.extensions) : hive.getSrc(task.src, task.extensions);

    if (!glob) return;
    watch(glob, function() {
     require('./' + taskName)();
    });
  });
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('watch', watchTask);
