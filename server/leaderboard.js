Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish('thePlayers', function(){
  var player = this.userId;
  return PlayersList.find({'createdBy': player});
});

Meteor.methods({
  'insertPlayerData': function(playerName){
    var currentUserId = Meteor.userId();
    // Add player to collection.
    PlayersList.insert({
      'name': playerName,
      'score': 0,
      'createdBy': currentUserId
    });
  },
  'removePlayerData': function(playerId){
    PlayersList.remove(playerId);
  },
  'modifyPlayerScore': function(playerId, value){
    PlayersList.update(playerId, {$inc: {'score': value}});
  }
});
