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
var taskConfig   = config.tasks.html;
var handleErrors = hive.utils.notifyErrors;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var data        = require('gulp-data');
var htmlmin     = require('gulp-htmlmin');
var render      = require('gulp-nunjucks-render');
var path        = require('path');
var fs          = require('fs');
var browserSync = require('browser-sync');

/*
 * HTML prototype
 *
 */

exports = module.exports = htmlTask;

/*
 * HTML variables
 * @private
 *
 */

var exclude = path.normalize('!**/{' + taskConfig.excludeFolders.join(',') + '}/**');

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions).concat(exclude),
  dest: hive.getDest(taskConfig.dest)
};

/*
 * HTML task
 * @Public
 *
 */

function htmlTask() {
  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: taskConfig.src.map(function(src) {
        return path.join(config.root.src[0], src);
      }),
      envOptions: {
        watch: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulpif(hive.settings.htmlmin, htmlmin(taskConfig.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * Get template data
 * @private
 *
 */

var getData = function(file) {
  var dataPath = path.resolve(config.root.src[0], taskConfig.src[0], taskConfig.dataFile);
  var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  data.env = config.env;
  return data; 
};

/*
 * Get path data
 * @private
 *
 */

var getPath = function(srcPath) {
  return srcPath.map(function(src) {    
    return path.join(config.root.src[0], src);
  });
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('html', htmlTask);
