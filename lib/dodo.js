
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

function Dodo() {
  if (!(this instanceof Dodo)) return new Dodo();
  this.twitter = {};
}

/**
 * Authenticate twitter client.
 *
 * @param {String} token
 * @param {String} secret
 */

Dodo.prototype.authenticateUser = function *authenticateUser(token, secret) {
  var config = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token,
    accessTokenSecret: secret
  };
  this.twitter = thunkify(new Twitter(
    config.consumerKey,
    config.consumerSecret,
    config.accessToken,
    config.accessTokenSecret
  ));
  return;
};

/**
 * Add to list and mute user.
 *
 * @param {String} userId
 * @param {String} dodoId
 */

Dodo.prototype.addToDodo = function *addToDodo(userId, dodoId) {
  var listId = yield this.getDodoListId(userId);
  yield this.twitter.post('lists/members/create',
    { list_id: listId, user_id: dodoId });
  yield this.twitter.post('mutes/users/create', { user_id: dodoId });
  return;
};

/**
 * Get `Dodo` list id.
 *
 * @param {String} userId
 *
 * @return {Number}
 */

Dodo.prototype.getDodoListId = function *getDodoListId(userId) {
  var res = yield this.twitter.get('lists/ownerships', '?user_id=' + userId);
  var lists = JSON.parse(res).lists;
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
};

/**
 * Destroy twitter.
 */

Dodo.prototype.destroy = function *destroy() {
  this.twitter = {};
  return;
};
