Template.tablePage.onCreated(function() {  
  Session.set('score', 0);
});

Template.tablePage.helpers(function() {  
  var score = Session.get('score')[num];
  return score;
});

Template.tablePage.events({
  'click button': function(e) {
    var score = Session.get('score');
    Meteor.call('dealCard', score, function(error, card) {
        
    });
  }
});