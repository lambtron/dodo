
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Users = require('../lib/users');
var Dodo = require('../lib/dodo');
var Tweet = require('./tweet');

/**
 * Define `Routes` and `dodo`.
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

Routes.addDodo = function *addDodo() {
  if (!this.request.body) return this.body = 'Need to pass dodoId and userId in body.';
  var body = this.request.body;
  if (!body.dodoId || !body.userId) return this.body = 'Both dodoId and userId required.';
  var user = yield Users.findOne({ user_id: body.userId });
  if (!user) return this.body = 'User is not authenticated in Dodo.';
  var dodo = new Dodo(user.user_id, user.token, user.secret);
  yield dodo.addToDodo(body.dodoId);
  dodo = null;
  return this.body = 'OK';
};

/**
 * Show pages.
 */

Routes.showPage = function *showPage(page) {
  this.body = yield render(page);
};

/**
 * Expose `Routes`.
 */

module.exports = Routes;
