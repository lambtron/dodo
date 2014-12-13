
/**
 * Module dependencies.
 */

var Twitter = require('../server/tweet');
var Users = require('../lib/users');

/**
 * Main function.
 */

function *main() {
  var users = yield Users.find({});
  for (var i = 0; i < users.length; i++) {
    var dodoListId = yield Twitter.getDodoListId(users[i].id);
    var members = yield Twitter.getMembersInList(dodoListId);
    Twitter.unfollowMembersInList(members);
  }
}

/**
 * Initiate `main`.
 */

main();
