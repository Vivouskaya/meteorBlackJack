Template.tablePage.onCreated(function() {  
	var tableId = Router.current().params._id;
	Meteor.call('addUserOnThisTable', tableId, function(error, result) {
      
  });
});

Template.tablePage.onDestroyed(function() { 
  var currentUser = Meteor.user();
	Meteor.call('removeUserOnThisTable', this.data._id, currentUser, function(error, result) {
        return true;
  });
});

Template.tablePage.helpers({
	handsPlayed: function(userId) {
		var tableId = Router.current().params._id;
		return Hands.find({tableId: tableId, userId: userId}, {
        sort: [
            ["order", "desc"]
        ]
    });
	},
  playerSelected: function() {
    var tableId = Router.current().params._id;
    var userInProgress = Turns.findOne({tableId: tableId, flagged: "in_progress"});

    if(userInProgress) {
      return userInProgress.user;
    }
    else if(!userInProgress) {
      var userReady = Turns.findOne({tableId: tableId, flagged: "ready"});
      if (userReady) {
        Turns.update({_id: userReady._id}, {$set: {'flagged':'in_progress'}});
        return "update In progress";
      }
      else {
        var userWaiting = Turns.findOne({tableId: tableId, flagged: "waiting"});
        if(userWaiting) {
          //return "Waiting";
          /*
          var userDone = Turns.findOne({tableId: tableId, flagged: "done"});
          if(!userDone) {
          */
            
            Turns.update({_id: userWaiting._id}, {$set: {'flagged':'ready'}});
            return "ready";
            
          //}
        }
        else {
          var userReady = Turns.findOne({tableId: tableId, flagged: "ready"});
          var userInProgress = Turns.findOne({tableId: tableId, flagged: "in_progress"});
          if(!userReady && !userInProgress) {

            var allUsers = Turns.find({tableId: tableId}).fetch();
            setTimeout(function(){
              allUsers.forEach(function(turn) {
                Meteor.call('removeHands', turn.user._id, function(error, result) {
                  //return true;
                });
                var score_id = Score.findOne({userId: Meteor.userId(), tableId: tableId})._id;
                Score.update({_id: score_id}, {$set: {score: 0} });
                Turns.update({_id: turn._id}, {$set: {'flagged':'ready'}});
              });
              
            }, 3000);
          }
        }
      }
    }
  },
  yourTurn: function() {
    var tableId = Router.current().params._id;
    var userInProgressId = Turns.findOne({tableId: tableId, flagged: "in_progress", 'user._id': Meteor.userId()});

    return userInProgressId;
  },
  doneTurn: function() {
    var userId = Meteor.userId();
    var tableId = Router.current().params._id;
    return Hands.findOne({tableId: tableId, userId: userId});
  }
});

Template.tablePage.events({
  'click .deal': function(e) {
  	var tableId = Router.current().params._id;
    Meteor.call('dealCard', tableId, function(error, result) {
      
    });
  },

  'click .done': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('doneCard', tableId, function(error, result) {
      
    });
  }
});