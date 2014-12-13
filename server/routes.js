
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Users = require('../lib/users');
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
  this.body = yield Tweet.getRequestToken();
};

/**
 * Callback for Twitter oauth.
 */

Routes.callback = function *callback() {
  var request = {
    token: this.request.query.oauth_token,
    verifier: this.request.query.oauth_verifier
  };
  var user = yield Tweet.getAccessToken(request);
  yield Users.insert(user);
  this.body = yield render('success');
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
