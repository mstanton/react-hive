/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 *
 * gulpfile.js
 * ===========
 * Individual gulp tasks are divided into seperate files within 
 * gulpfile.js/tasks. Any files located in that directory are
 * automatically required below.
 *
 * hive.js
 * =======
 * HIVE is an integrated build engine that shares application 
 * data and helper methods across all gulp tasks.
 *
 */

'use strict';

/*
 * Module Definition
 *
 */

var requireDir = require('require-dir');
var hive       = require('./lib/hive')(process.argv.slice(2));

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true });
