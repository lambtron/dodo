
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Users = require('../lib/users');
var Dodo = require('../lib/dodo');
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
  var user = yield Tweet.getUser(request);
  yield Users.insert(user);
  this.body = yield render('success');
};

/**
 * Add new dodo to list.
 */

Routes.dodo = function *dodo() {
  if (!this.request.body) return;
  var body = this.request.body;
  var user = yield Users.findOne({ user_id: body.userId });
  if (!user) return this.body = 'User is not authenticated in Dodo.';
  var dodo = new Dodo(user.user_id);
  yield dodo.authenticateUser(user.token, user.secret);
  this.body = yield dodo.addToDodo(body.dodoId);
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
