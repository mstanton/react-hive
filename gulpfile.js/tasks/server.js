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
var logger = hive.utils.logger;
var colors = hive.utils.colors;

/*
 * Module Definition
 *
 */

var gulp     = require('gulp');
var path     = require('path');
var mLogger  = require('morgan');
var open     = require('open');
var compress = require('compression');
var express  = require('express');

/*
 * Server prototype
 *
 */

exports = module.exports = serverTask;

/*
 * Server variables
 * @private
 *
 */

var settings = {
  root: path.resolve(process.cwd(), config.root.dest),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

/*
 * Server task
 * @public
 *
 */

function serverTask() {
  var url = 'http://localhost:' + settings.port;

  express()
    .use(compress())
    .use(mLogger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port);

  logger.info('production server started on ' + colors.green(url));
  open(url);
};

/*
 * gulp interface
 * @special
 *
 */

gulp.task('server', serverTask);
