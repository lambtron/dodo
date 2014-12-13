
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
 * Initiate signin with Twitter oauth flow.
 */

Routes.oauth = function *oauth() {
  var token = yield Tweet.getRequestToken();
  this.body = yield render('oauth', { token: token });
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
