
/**
* Module dependencies.
*/

var OAuth = require('oauth').OAuth;

/**
 * Initialize `oauth`.
 */

var oauth = new OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

/**
 * Manually `thunk` OAuth.getOAuthRequestToken.
 */

oauth.thunkedGetOAuthRequestToken = function() {
  return function(fn) {
    oauth.getOAuthRequestToken(function(err, token, secret, res) {
      if (err) fn(err, null);
      fn(null, { token: token, secret: secret, res: res });
    });
  };
};

/**
* Expose `oauth`.
*/

module.exports = oauth;
