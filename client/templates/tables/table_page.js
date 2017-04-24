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
    //var currentUser = Meteor.user();

    var userInProgress = Turns.findOne({tableId: tableId, flagged: "in_progress"});
    if(userInProgress) {
      return "in progress";
    }
    else if(!userInProgress) {
      var userReady = Turns.findOne({tableId: tableId, flagged: "ready"});
      if (userReady) {
        //userReady.update({flagged: "in_progress"});
        Turns.update({tableId: tableId}, { $set: { flagged: "in_progress" }});
        //return "update In progress";
      }
      else {
        var userWaiting = Turns.findOne({tableId: tableId, flagged: "waiting"});
        if(userWaiting) {
          //return "Waiting";
          //userWaiting.update($set {flagged: "ready"});
          Turns.update({tableId: tableId}, { $set: { flagged: "ready" }});
          return "ready";
        }
        else {
          var usersAllDone = Turns.findOne({tableId: tableId, flagged: "done"});
          if(usersAllDone) {
            return "Done";
          }
        }
      }
    }
  } 
});

Template.tablePage.events({
  'click button': function(e) {
  	var tableId = Router.current().params._id;
    Meteor.call('dealCard', tableId, function(error, result) {
    	//return true;
        //$('.player-card-location').prepend('<div class="card">num:'+result.numero+'<br/>pts: '+result.value+'</div>');
    });
  }
});