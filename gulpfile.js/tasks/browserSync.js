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
var taskConfig   = hive.config.tasks.browserSync;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var path        = require('path');
var browserSync = require('browser-sync');
var glob        = require('glob');
var _           = require('lodash');
var history     = require('connect-history-api-fallback');

/*
 * BrowserSync prototype
 *
 */

exports = module.exports = browserSyncTask;

/*
 * BrowserSync task
 * @public
 *
 */

function browserSyncTask() {
  var middleware = [];

  middleware = middleware.concat(createRoutes());
  middleware = middleware.concat(history());
  middleware.length && _.merge(taskConfig, {'middleware' : middleware});
  browserSync.init(taskConfig);
};

/*
 * Create route middleware
 * @private
 *
 */

function createRoutes() {
  var routes = glob.sync(path.resolve(hive.getSrc(taskConfig.routes.src, taskConfig.routes.extensions)));

  if (!routes.length) return false;

  return routes.map(function(route){
    return require(route);
  });
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('browserSync', browserSyncTask);
