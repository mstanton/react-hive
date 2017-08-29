'use strict';

/*
 * Module Definition
 *
 */

var data = require('./data');

/*
 * Route prototype
 *
 */

exports = module.exports = {
  route: '/config',
  handle: function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data, '', 1));
  }
};
