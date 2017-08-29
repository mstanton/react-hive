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
var taskConfig   = config.tasks.javascript;
var manifest     = hive.manifest;
var staticTypes  = hive.staticTypes;

if (!taskConfig) return;

/*
 * Module Definition
 *
 */

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

var rollup      = require('gulp-rollup-stream');
var babel       = require('rollup-plugin-babel');
var commonjs    = require('rollup-plugin-commonjs');
var resolve     = require('rollup-plugin-node-resolve');
var replace     = require('rollup-plugin-replace');
var legacy      = require('rollup-plugin-legacy');
var progress    = require('rollup-plugin-progress');

var path        = require('path');
var browserSync = require('browser-sync');
var merge       = require('merge2');
var _           = require('lodash');

/*
 * Javascript prototype
 *
 */

exports = module.exports = jsTask;

/*
 * Javascript variables
 * @private
 *
 */

var settings = {
  entry: '',
  format: '',
  moduleName: '',

  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
  },

  babel: {
    babelrc: false,
    exclude: "node_modules/**",
    presets: [
      ['es2015', { 'modules': false }],
      'stage-2',
      'react'
    ],
    plugins: ['external-helpers']
  },
  commonjs: {
    namedExports: {
      "node_modules/react/react.js": ["PropTypes", "Component", "Children", "createElement"],
      "node_modules/react-dom/index.js": ["render"]
    }
  },
  legacy: {},
  resolve: {
    'module': true,
    'browser': true,
    'main': true
  },
  progress: {
    clearLine: true
  }
};

var manifest = new hive.manifest({ 
  filePath: path.join(hive.config.root.dest, taskConfig.dest, taskConfig.manifest)
});

var bundles;

/*
 * Javascript task
 * @public
 *
 */

function jsTask() {
  return merge.apply(merge, getStreams.call(taskConfig))
    .pipe(gulpif(config.settings.browsersync, browserSync.stream({ once: true })));
    // .on('finish', function() {
    //   if (!config.settings.concat) manifest.writeFile.call(manifest);
    // });
};

/*
 * Parse through src packages and create streams
 * @return {object} gulp streams
 * @private
 *
 */

var getStreams = function() {
  var streams = [];

  _.forEach(this.src, function(bundle) {
    var args = Array.prototype.slice.call(arguments);
    if (_.isArray(bundle)) streams.push({ 'func' : getStream, 'args' : args });
    else streams.unshift({ 'func' : getModuleStream, 'args' : args });
  });

  return streams.map(function(stream) {
    return stream.func.apply(this, stream.args);
  }.bind(this));
};

/*
 * Instantiate a JavaScript stream 
 * @param {object} stream src paths
 * @param {object} stream name
 * @return {object} gulp stream
 * @private
 *
 */

var getStream = function(src, name) {
  var paths = {
    src: hive.getSrc(src, this.extensions),
    dest: (!config.settings.concat) ? hive.getDest(path.join(this.dest, name)) : hive.getDest(this.dest)
  };

  var destFile = name + '.' + this.extensions[0];

  return gulp.src(paths.src, { base: './' })
    // .pipe(gulpif(!config.settings.concat, manifest.add(name)))
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(config.settings.concat, concat(destFile)))
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.write('.')))
    .pipe(gulpif(config.settings.uglify, uglify()))
    .pipe(gulp.dest(paths.dest));
};

/*
 * Instantiate a JavaScript module stream 
 * @param {object} stream src paths
 * @param {object} stream name
 * @return {object} gulp stream
 * @private
 *
 * Removed include paths because it left out modules
 *  include : [
 *    "node_modules/redux/**",
 *    "node_modules/react/**",
 *    "node_modules/react-dom/**"
 *  ],
 *
 */

var getModuleStream = function(opts, name) {
  var options = _.merge(settings, opts);

  var paths = {
    src: path.join(config.root.src[0], options.entry[0] + '.' + this.extensions[0]),
    dest: hive.getDest(this.dest)
  };

  return gulp.src(paths.src)
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.init()))
    .pipe(rollup({
      format: options.format,
      moduleName: options.moduleName,
      plugins: [
        legacy(options.legacy),
        resolve(options.resolve),
        commonjs(options.commonjs),
        babel(options.babel),
        progress(options.progress),
        replace({ 'process.env.NODE_ENV' : JSON.stringify((config.env === 'prod') ? 'production' : 'development') })
      ]
    }))
    .pipe(gulpif(config.settings.sourcemaps, sourcemaps.write('.')))
    .pipe(gulpif(config.settings.uglify, uglify()))
    .pipe(gulp.dest(paths.dest));
};


/*
 * Gulp interface
 * @special
 *
 */

gulp.task('javascript', jsTask);
