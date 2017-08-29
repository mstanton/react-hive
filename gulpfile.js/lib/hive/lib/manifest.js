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

var fs      = require('fs');
var path    = require('path');
var through = require('through2');
var mkdirp  = require('mkdirp');

/*
 * Manifest prototype
 *
 */

exports = module.exports = Manifest;

/*
 * function
 * @something
 *
 */

function Manifest(options) {
  this.opts = options || {};

  this.paths = {};
  this.streams = {};
}

/*
 * Add
 * @public
 *
 */

Manifest.prototype.add = function(name) { 
  this.streams[name] = through.obj(bufferContents.bind(this, name));
  this.paths[name] = [];

  return this.streams[name];
};

/*
 * Write file
 * @public
 *
 */

Manifest.prototype.writeFile = function(content) {
  var filePath = this.opts.filePath;
  var output = (content) ? JSON.stringify(content, null, 2) : JSON.stringify(this.paths, null, 2);

  mkdirp(path.dirname(filePath), function(err){
    if (err) console.error(err);
    else fs.writeFile(filePath, output);
  }); 
};

/*
 * bufferContents
 * @private
 *
 */

function bufferContents(streamName, file, enc, cb) {
  var stream = this.streams[streamName];
  
  stream.push(file);
  this.paths[streamName].push(path.basename(file.path));  

  cb();
}

/*
 * endStream
 * @private
 *
 */

function endStream(streamName, cb) {    
  delete this.streams[streamName];
  !Object.keys(this.streams).length;

  cb();
}
