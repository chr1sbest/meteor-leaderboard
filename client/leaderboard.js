Session.set('selectedPlayer', this._id);
Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  //define helper functions
  'player': function() {
    var currentUserId = Meteor.userId();
    return PlayersList.find({}, {sort: {score: -1, name: 1}})
  },
  'selectedClass': function() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if (playerId == selectedPlayer) {
      return 'selected';
    } else {
      return 'unselected';
    }
  },
  'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }
});

Template.leaderboard.events({
  //define events
  'click .player': function() {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  },
  'click .increment': function(){
    var playerId = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', playerId, 5);
  },
  'click .decrement': function(){
    var playerId = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', playerId, -5);
  },
  'click .remove': function(){
    var playerId = Session.get('selectedPlayer');
    Meteor.call('removePlayerData', playerId);
  }
});

Template.addPlayerForm.events({
  'submit form': function (event){
    event.preventDefault();
    var playerName = event.target.playerName.value;
    Meteor.call('insertPlayerData', playerName);
    event.target.reset();
  }
});
