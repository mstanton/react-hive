/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 *
 * templates.js
 * ============
 * The template.js task can be enabled by adding the following 
 * json snippet to the hive.config.json file.
 *
 * "templates": {
 *   "src": "html/templates",
 *   "dest": "templates",
 *   "watch" : "html/templates",
 *   "extensions": ["njx"]
 * }, 
 *
 */

'use strict';

/*
 * HIVE Definition
 *
 */

var hive         = require('../lib/hive');
var config       = hive.config;
var taskConfig   = hive.config.tasks.templates;
var handleErrors = hive.utils.notifyErrors;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var nunjucks    = require('gulp-nunjucks');
var concat      = require('gulp-concat');
var path        = require('path');
var browserSync = require('browser-sync');

/*
 * Templates prototype
 *
 */

exports = module.exports = templatesTask;

/*
 * Templates variables
 * @private
 *
 */

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions),
  dest: path.join(config.root.src[0], taskConfig.dest)
};

/*
 * Templates task
 * @public
 *
 */

function templatesTask() {
  return gulp.src(paths.src)
    .pipe(nunjucks.precompile({
      name: function(file) {
        return path.parse(file.path).name;
      }
    }))    
    .on('error', handleErrors)
    .pipe(concat(taskConfig.output))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('templates', templatesTask);
