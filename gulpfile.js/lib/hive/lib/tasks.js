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

var _ = require('lodash');

/*
 * Tasks prototype
 *
 */

var tasks = exports = module.exports = {};

/*
 * Task variables
 * @private
 *
 */

var sequence = {
  assets: ['fonts', 'svgSprite', 'images', 'static'],
  code: ['html', 'javascript', 'css'],
  postProcess: ['watch', 'browserSync']
};

var buildSequence = {
  dev:   ['clean', sequence.assets, sequence.code, sequence.postProcess],
  int:   ['clean', sequence.assets, sequence.code],
  prod:  ['clean', sequence.assets, sequence.code, 'server', 'sizereport']
};

/*
 * Get the enabled tasks
 * @public
 *
 */

tasks.getEnabledTasks = function() {
  return buildSequence[this.app.config.env];
};
