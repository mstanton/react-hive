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

var hive        = require('../lib/hive');
var config      = hive.config;
var staticTypes = hive.staticTypes;

/*
 * Module Definition
 *
 */

var gulp     = require('gulp');
var path     = require('path');
var colors   = require('chalk');
var cliusage = require('command-line-usage');

/*
 * Help prototype
 *
 */

exports = module.exports = helpTask;

/*
 * Help variables
 * @private
 *
 */

var helptext = [{
    'header': 'HIVE: Horizontal Intergartion View Environment',
    'content': colors.gray('HIVE is an integrated build environemnt that shares application data and helper methods across all gulp tasks.')
  },{
    'content': colors.white('[bold]{Tasks:}') 
  },{
  'optionList': [
    {
      'name': 'env dev',
      'typeLabel': '',
      'description': colors.gray('Generate a development version of your website and initiate a BrowserSync server.\n')
    },{
      'name': 'env int',
      'typeLabel': '',
      'description': colors.gray('Generate a integration package of your website that includes all uncompiled/pre-transpiled assets.\n')
    },{
      'name': 'env prod',
      'typeLabel': '',
      'description': colors.gray('Generate a production version of your website and initiate a full Express server.')
    }
  ]
}];

/*
 * Help task
 * @public
 *
 */

function helpTask() {
  console.log(cliusage(helptext));
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('help', helpTask);
