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
var taskConfig   = config.tasks.css;
var handleErrors = hive.utils.notifyErrors;
var manifest     = hive.manifest;
var staticTypes  = hive.staticTypes;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var flatten      = require('gulp-flatten');
var path         = require('path');
var browserSync  = require('browser-sync');
var merge        = require('merge2');
var _            = require('lodash');

/*
 * CSS prototype
 *
 */

exports = module.exports = cssTask;

/*
 * CSS variables
 * @private
 *
 */

var paths = {
  src: hive.getSrc(taskConfig.src, taskConfig.extensions),
  dest: hive.getDest(taskConfig.dest)
};

var manifest = new hive.manifest({ 
  filePath: path.join(hive.config.root.dest, taskConfig.dest, taskConfig.manifest)
});

/*
 * CSS task
 * @public
 *
 */

function cssTask() {
  if (config.settings.compile) {
    return compileStream();
  }
  return packageStream();
};

/*
 * Compile and cleanse style assets
 * @private
 *
 */

var compileStream = function() {
  taskConfig.sass.includePaths = taskConfig.src.vendor.map(function(src) {
    return path.join(config.root.src[1], src);
  });

  return gulp.src(paths.src.main)
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.init()))
    .pipe(sass(taskConfig.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(taskConfig.autoprefixer))
    .pipe(gulpif(config.settings.cssnano, cssnano({autoprefixer: false})))
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream()));
};

/*
 * Package style assets
 * @private
 *
 */

var packageStream = function() {
  var main = gulp.src(paths.src.main)
    .pipe(gulp.dest(path.join(paths.dest, staticTypes.buildPaths.MAIN)));

  var components = gulp.src(paths.src.components, { base: config.root.src[0] })
    .pipe(gulp.dest(path.join(paths.dest, staticTypes.buildPaths.MAIN)));

  var vendor = gulp.src(paths.src.vendor, { base : config.root.src[1] })
    .pipe(gulp.dest(path.join(paths.dest, staticTypes.buildPaths.VENDOR)));
  
  manifest.writeFile(taskConfig.src.vendor.map(function(src) {
    return path.join(paths.dest, staticTypes.buildPaths.VENDOR, src);
  }));

  return merge([main, components, vendor]);
};

/*
 * Gulp interface
 * @special
 *
 */

gulp.task('css', cssTask);
