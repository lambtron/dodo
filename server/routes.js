
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Tweet = require('./tweet');

/**
 * Define `Routes`.
 */

var Routes = {};

/**
 * Render index html page.
 */

Routes.index = function *index() {
  this.body = yield render('index');
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
