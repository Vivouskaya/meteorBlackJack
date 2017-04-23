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
	}
});

Template.tablePage.rendered = function(){
  
};

Template.tablePage.events({
  'click button': function(e) {
  	var tableId = Router.current().params._id;
    Meteor.call('dealCard', tableId, function(error, result) {
    	//return true;
        //$('.player-card-location').prepend('<div class="card">num:'+result.numero+'<br/>pts: '+result.value+'</div>');
    });
  }
});