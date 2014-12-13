
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
 */

Tweet.getRequestToken = function *getRequestToken() {
  var oauth = yield OAuth.thunkedGetOAuthRequestToken();
  return oauth.token;
};

/**
 * Expose `Tweet`
 */

module.exports = Tweet;
