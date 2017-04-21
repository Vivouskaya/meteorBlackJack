Template.tablePage.onCreated(function() {  
  Session.set('score', 0);
});

Template.tablePage.helpers(function() {  
  var score = Session.get('score')[num];
  return score;
});

Template.tablePage.events({
  'click button': function(e) {

  	var tableId = Router.current().params._id;

    Meteor.call('dealCard', tableId, function(error, result) {
        $('.player-card-location').prepend('<div class="card">num:'+result.numero+'<br/>pts: '+result.value+'</div>');
    });
  }
});