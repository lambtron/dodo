
/**
 * Module dependencies.
 */

var Twitter = require('../lib/twitter');
var OAuth = require('../lib/oauth');

/**
 * Define `Tweet`.
 */

var Tweet = {};

/**
 * Unfollow user.
 */

/**
 * Get `Dodo` list.
 */

/**
 * Get Request token.
 *
 * @return {String}
 */

Tweet.getRequestToken = function *getRequestToken() {
  var request = yield OAuth.thunkedGetOAuthRequestToken();
  return request.token;
};

/**
 * Get User and related tokens.
 *
 * @param {Object} request
 *   @property {String} token
 *   @property {String} secret
 *   @property {String} verifier
 *
 * @return {Object}
 */

Tweet.getUser = function *gerUser(request) {
  var access = yield OAuth.thunkedGetOAuthAccessToken(request.token, '',
    request.verifier);
  var user = {
    user_id: access.res.user_id,
    handle: access.res.screen_name,
    token: access.token,
    secret: access.secret
  };
  return user;
};

/**
 * Expose `Tweet`
 */

module.exports = Tweet;
