Template.tablePage.onCreated(function() {

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
  
  handsCroupier: function() {
    var tableId = Router.current().params._id;
    var userId = 'croupierID_'+tableId;
    return Hands.find({tableId: tableId, userId: userId}, {
        sort: [
            ["order", "desc"]
        ]
    });
  },
  

  currentUserOnTable: function() {
    currentUserId = Meteor.userId();
    var tableId = Router.current().params._id;
    var request = Tables.findOne({_id: tableId, 'users._id': currentUserId});
    if(request) {
      return true;
    }
    else {
      return false;
    }
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
        // ATTEND TON TOUR MAMENE (modif 12/05/2017)
        if(userWaiting && userReady && !userInProgress) {
            
            Turns.update({_id: userWaiting._id}, {$set: {'flagged':'ready'}});

            // distribution cartes croupier
            var userId = 'croupierID_'+tableId;
            var handsCroupier = Hands.find({userId: userId}).fetch();
            if(handsCroupier.length > 0) {
              handsCroupier.forEach(function(hand) {
                Hands.remove({_id: hand._id});
              });
            }

            return "ready";
            
            
          //}
        }
        else {
          var userReady = Turns.findOne({tableId: tableId, flagged: "ready"});
          var userInProgress = Turns.findOne({tableId: tableId, flagged: "in_progress"});
          if(!userReady && !userInProgress) {

            var allUsers = Turns.find({tableId: tableId}).fetch();
            var allUsersDone = Turns.find({tableId: tableId, flagged: "done"}).fetch();
            var croupierId = 'croupierID_'+tableId;
            var handsCroupier = Hands.find({userId: croupierId}).fetch();

            setTimeout(function(){
              // RESULTATS ENTRE JOUEURS ET LE CROUPIER
              var scoreCroupier = Score.findOne({userId: croupierId});
              allUsersDone.forEach(function(turn) {
                var scorePlayer = Score.findOne({userId: turn.user._id});
                if(scorePlayer > scoreCroupier && scorePlayer <= 21) {
                  console.log(turn.user.username+' a gagné');

                }
                else {
                  console.log(turn.user.username+' a perdu');
                }
              });

              setTimeout(function(){
                allUsers.forEach(function(turn) {
                  Meteor.call('removeHands', turn.user._id, function(error, result) {
                    //return true;
                  });
                  var score_id = Score.findOne({userId: Meteor.userId(), tableId: tableId})._id;
                  Score.update({_id: score_id}, {$set: {score: 0} });
                  Turns.update({_id: turn._id}, {$set: {'flagged':'ready'}});
                  
                });
              }, 1000);
              
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
  },
  'click .sit': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('addUserOnThisTable', tableId, function(error, result) {
        
    });
  },
  'click .standup': function(e) {
    var tableId = Router.current().params._id;
    Meteor.call('removeUserOnThisTable', tableId, function(error, result) {
    
    });
  }
});