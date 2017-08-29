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

var mixin       = require('merge-descriptors');
var app         = require('./application');
var buildPath   = require('./buildPath');
var tasks       = require('./tasks');
var manifest    = require('./manifest');
var utils       = require('./utils');
var staticTypes = require('./helper/static-types');

/*
 * Hive prototype
 *
 */

exports = module.exports = createHiveApplication();

/*
 * Create the Hive app
 * @return {function}
 * @api public
 *
 */

function createHiveApplication() {
  var hive = function(options) {
    hive.init(options);
  };

  mixin(hive, app, false);
  mixin(hive, buildPath, false);
  
  hive.staticTypes = staticTypes;
  hive.manifest = manifest;
  hive.utils = { __proto__: utils, app: hive };
  hive.tasks = { __proto__: tasks, app: hive };

  return hive;
}
