Template.tablePage.onCreated(function() {  
	var tableId = Router.current().params._id;
	Meteor.call('addUserOnThisTable', tableId, function(error, result) {
      
  });
});

Template.tablePage.onDestroyed(function() {  
	Meteor.call('removeUserOnThisTable', this.data._id, function(error, result) {
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
      //return "in progress";
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
          var userDone = Turns.findOne({tableId: tableId, flagged: "done"});
          if(userDone) {
            //return alert("ouech");
            var allUsersIsDone = Turns.find({tableId: tableId}).fetch();

            allUsersIsDone.forEach(function(turn) {
              Turns.update({_id: turn._id}, {$set: {'flagged':'waiting'}});
            });
          }
        }
      }
    }
  },
  yourTurn: function() {
    var tableId = Router.current().params._id;
    var userInProgressId = Turns.findOne({tableId: tableId, flagged: "in_progress", 'user._id': Meteor.userId()});

    return userInProgressId;
  } 
});

Template.tablePage.events({
  'click button': function(e) {
  	var tableId = Router.current().params._id;
    Meteor.call('dealCard', tableId, function(error, result) {
      
    });
  }
});