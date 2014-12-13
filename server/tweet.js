
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
 * Get `Dodo` list id
 *
 * @param {String} userId
 *
 * @return {Number}
 */

Tweet.getDodoListId = function *getDodoList(userId) {
  var res = yield Twitter.get('lists/ownerships', { user_id: userId });
  var lists = res.lists;
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
};

/**
 * Get members in list.
 *
 * @param {Number} id
 *
 * @return {Array}
 */

Tweet.getMembersInList = function *getMembersInList(id) {
  var params = { list_id: id, skip_status: true, include_entities: false };
  var res = yield Twitter.get('lists/members', params);
  return res.users;
};

/**
 * Unfollow members in list.
 *
 * @param {Array} members
 *
 * @return {}
 */

Tweet.unfollowUsersInList = function *unfollowUsersInList(members) {
  for (var i = 0; i < members.length; i++) {
    unfollowMember(members[i].id);
  }
};

/**
 * Expose `Tweet`
 */

module.exports = Tweet;

/**
 * Private function to unfollow one member.
 */

function unfollowMember(userId) {
  Twitter.post('friendships/destroy', {user_id: userId});
}
