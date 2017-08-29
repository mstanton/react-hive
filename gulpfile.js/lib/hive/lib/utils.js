/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 */

'use strict';

/*
 * Module Definition
 *
 */

var glog   = require('gulplog');
var colors = require('chalk');
var _      = require('lodash');
var gutil  = require('gulp-util');
var chalk  = require('chalk');
var notify = require('gulp-notify');

/*
 * Deep Pluck
 * @param key {string} 
 * @returns {array} Returns a new array of property values
 *
 */

module.exports.deepPluck = function(obj, key) {
  if (_.has(obj, key)) {
    return [obj[key]];
  }
  
  var res = [];
  _.forEach(obj, function(v) {
    if (typeof v === "object" && (v = module.exports.deepPluck(v, key)).length) {
      res.push.apply(res, v);
    }
  });
  return _.flatten(res);
};

/*
 * Find Value
 * @param obj {array}
 * @param key {string} 
 * @returns {Array} Returns a new array of property values
 *
 */

module.exports.findValue = function(obj, searchValue) {
  var result = false

  _.forEach(obj, function(val, key) {
    if (searchValue === val) {
      result = true;
      return false;
    }
  });
  return result;
};

/*
 * Logger
 *
 */

module.exports.logger = function() {
  var logger = {};

  logger.info = function(msg) {
    glog.info(msg);
  };

  logger.warn = function(msg) {
    glog.warn(module.exports.colors.orange(msg));
  };

  logger.debug = function(msg) {
    glog.debug(msg);
  };

  logger.error = function(msg) {
    glog.error(module.exports.colors.red(msg));
  };

  return logger;
}();

/*
 * Colors
 *
 */

module.exports.colors = colors;

/*
 * Notify Errors
 *
 */

module.exports.notifyErrors = function(error, callback) {
    var lineNumber = (error.line) ? 'LINE ' + error.line + ' -- ' : '';
    var report = '';
    var chalkErrorBgColor = gutil.colors.white.bgRed;

    report += chalkErrorBgColor('TASK:') + ' [' + error.plugin + ']\n';
    report += chalkErrorBgColor('PROB:') + ' ' + chalk.red(error.message) + '\n';
    if (error.line) { report += chalkErrorBgColor('LINE:') + ' ' + error.line + '\n'; }
    if (error.file) { report += chalkErrorBgColor('FILE:') + ' ' + error.file + '\n'; }

    notify({
      title: 'Task Failed [' + error.plugin + ']',
      message: lineNumber + 'See console.',
      sound: 'Sosumi'
    }).write(error);
    gutil.beep();
    console.error(report);
    this.emit('end');
};

/*
 * Repeat String
 *
 */

module.exports.repeatString = function(pattern, number) {
  var string = ''
  while (number > 0){
    number--
    string += pattern
  }
  return string
};
