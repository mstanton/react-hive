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

var hive         = require('../../lib/hive');
var config       = hive.config;
var taskConfig   = config.tasks.iconFont;
var handleErrors = hive.utils.notifyErrors;

if(!taskConfig) return;

/*
 * Module Definition
 *
 */

var path             = require('path');
var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var url              = require('url');
var generateIconSass = require('./generateIconScss');
var packageFile      = require('../../../package.json');

/*
 * Font Icon prototype
 *
 */

exports = module.exports = iconFontTask;

/*
 * Fonts variables
 * @private
 *
 */

var fontPath = path.join(config.root.dest, taskConfig.dest);
var cssPath = path.join(config.root.dest, config.tasks.css.dest);

var settings = {
  name: packageFile.name + ' icons',
  src: path.join(config.root.src[0], taskConfig.src, '/*.svg'),
  dest: path.join(config.root.dest, taskConfig.dest),
  sassDest: path.join(config.root.src[0], config.tasks.css.src.main, taskConfig.sassDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.scss'),
  sassOutputName: '_icons.scss',
  fontPath: url.resolve('.',path.relative(cssPath, fontPath)),
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'font-icons',
    prependUnicode: true,
    normalize: false,
    formats: taskConfig.extensions
  }
};

/*
 * Icon font task
 * @public
 *
 */

function iconFontTask() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('iconFont', iconFontTask);
