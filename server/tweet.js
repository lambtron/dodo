
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
 * Get Access token.
 *
 * @param {Object} request
 *   @property {String} token
 *   @property {String} secret
 *   @property {String} verifier
 */

Tweet.getAccessToken = function *getAccessToken(request) {
  var access = yield OAuth.thunkedGetOAuthAccessToken(request.token, '',
    request.verifier);
  return access;
};

/**
 * Expose `Tweet`
 */

module.exports = Tweet;
