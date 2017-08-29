/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 */

'use strict';

/*
 * Module definition
 *
 */

var path   = require('path');
var _      = require('lodash');
var argv   = require('minimist');
var config = require('../../../../hive.config');

/*
 * Application prototype
 *
 */

var app = exports = module.exports = {};

/*
 * App variables
 * @private
 *
 */

var defaults = {
  env: 'dev',
  settings: {
    'autoprefixer': false,
    'browsersync': false,
    'compile': false,
    'concat': false,
    'cssnano': false,
    'flatten': true,
    'htmlmin': false,
    'imagemin': false,
    'sourcemaps': false,
    'uglify': false   
  }
};

/*
 * Initialize the Hive app
 * @private
 *
 */

app.init = function(options) {
  this._cache = {};
  this.config = {};
  this.settings = {};
  this.dependencies = {};

  this.setConfiguration(_.merge({}, defaults, _.omit(argv(options), '_')));
};

/*
 * Set Application Configuration
 * @param {object} params object 
 * @private
 *
 */

app.setConfiguration = function(options) {
  this.config.env = options.env || defaults.env;

  // If invalid environment value provided, default to 'dev'
  if (!this.utils.findValue(this.staticTypes.buildEnv, this.config.env)) this.config.env = defaults.env;

  this.config.root = _.merge({ dest: config.options[this.config.env].rootDest }, config.root);
  this.config.root.originalRoot = _.values(_.mapValues(config.options, function(opt) {
    return opt.rootDest;
  }));

  this.config.tasks = config.tasks;
  this.config.settings = _.mapValues(options.settings, function(val, key) {
    if (_.indexOf(config.options[this.config.env].settings, key) != -1) return true;
    return val;
  }.bind(this));
};

/*
 * Retireve and store application values
 * @param {string} Key to store or retrieve
 * @param {string} Value to be stored
 * @public
 *
 */

app.cache = function(key, value) {
  if (!value) return this._cache[key];
  this._cache[key] = value;
};

/*
 * Get the enabled tasks sequence
 * Proxy to tasks
 *
 */

app.getEnabledTasks = function() {
  return this.tasks.getEnabledTasks();
};
