
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('simple-twitter');

/**
 * Expose `Dodo`.
 */

module.exports = Dodo;

/**
 * Initialize a new `Dodo`.
 */

function Dodo(userId, token, secret) {
  if (!(this instanceof Dodo)) return new Dodo(userId, token, secret);
  this.twitter = getAuthenticatedTwitter(token, secret);
  this.userId = userId;
}

/**
 * Add to list and mute user.
 *
 * @param {String} userId
 * @param {String} dodoId
 */

Dodo.prototype.addToDodo = function *addToDodo(dodoId) {
  var listId = yield getDodoListId(this.userId, this.twitter);
  yield this.twitter.post('mutes/users/create', { user_id: dodoId });
  return yield this.twitter.post('lists/members/create', { list_id: listId, user_id: dodoId });
};

/**
 * Private helper function to get authenticated twitter client.
 *
 * @param {String} token
 * @param {String} secret
 *
 * @return {Object} twitter
 */

function getAuthenticatedTwitter(token, secret) {
  return thunkify(new Twitter(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    token,
    secret
  ));
};

/**
 * Private helper function to get user's `Dodo` list id.
 *
 * @param {String} userId
 * @param {Object} twitter
 *
 * @return {Number}
 */

function *getDodoListId(userId, twitter) {
  var res = yield twitter.get('lists/ownerships', '?user_id=' + userId);
  var lists = JSON.parse(res).lists;
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
};
