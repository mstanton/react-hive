/*
 * HIVE
 * Copyright(c) 2016 - Horizontal Integration
 * MIT Licensed
 *
 */

'use strict';

var buildPath = exports = module.exports = {};

var _     = require('lodash');
var path  = require('path'); 
var glob  = require('glob');

/*
 * BuildPath variables
 * @private
 *
 */

var defaults = {};

/*****************************************************************************
 *
 * Get Src
 * @public 
 *
 *****************************************************************************
 *
 */

buildPath.getSrc = function(srcPath, ext) {
  var src = _.cloneDeep(srcPath);

  if (typeof src === 'string' || _.isArray(src)) {
    return stringOrArraySrc.call(this, src, ext);
  } else if (_.isPlainObject(src)) {
    return objectSrc.call(this, src, ext);
  }
};

/*
 * Parse Object
 * @private 
 *
 */

function objectSrc(src, ext) {
  return _.mapValues(src, function(srcPath) {
    if (typeof srcPath === 'string' || _.isArray(srcPath)) {
      return stringOrArraySrc.call(this, srcPath, ext);
    }
  }.bind(this));
}

/*
 * Parse String || Array
 * @private 
 *
 */

function stringOrArraySrc(src, ext) {
  if (_.isArray(src)) {
    return _.compact(_.map(src, function(srcPath) {
      return resolveSrc.call(this, srcPath, ext);
    }.bind(this)));
  }
  return resolveSrc.call(this, src, ext);
}

/*
 * Resolve Src
 * @private 
 *
 */

function resolveSrc(src, ext) {
  var resolvedSrc;
  var rootDirs = this.config.root.src;

  _.forEach(rootDirs, function(rootDir) {
    var validSrc = getValidSrc(rootDir, src, getExtension(ext));

    if (validSrc) {
      resolvedSrc = validSrc;
      return false;
    }
  });
  return resolvedSrc;
}

/*
 * Get Valid Src
 * @private 
 *
 */

function getValidSrc(root, src, ext) {
  var scenario;

  scenario = path.join(root, src + '.' + ext); // search for file
  if (glob.sync(scenario).length) return scenario;
  
  scenario = path.join(root, src, '**/*.' + ext); // search in folder
  if (glob.sync(scenario).length) return scenario;

  scenario = path.join(src + '.' + ext); // search for file
  if (glob.sync(scenario).length) return scenario;
  
  scenario = path.join(src, '**/*.' + ext); // search in folder
  if (glob.sync(scenario).length) return scenario;

  return false;
}

/*
 * Get Extension
 * @private 
 *
 */

function getExtension(ext) {
  return (ext.length === 1) ? ext.join(',') : '{' + ext + '}';
}

/*****************************************************************************
 *
 * Get Dest
 * @public 
 *
 *****************************************************************************
 *
 */

buildPath.getDest = function(destPath) {
  var dest = (typeof(destPath) === 'string') ? destPath : destPath[this.config.env];

  return path.join(this.config.root.dest, dest);
};
