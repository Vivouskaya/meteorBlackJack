Template.score.helpers({ 
  scoreCalcul: function (userId) {
    var tableId = Router.current().params._id;
    var score = 0;
    var allHands = Hands.find({tableId: tableId, userId: userId}).fetch();
    allHands.forEach(function(hand) {
      score += hand.card.value;
    });

    return score;
  },
  colorCalcul: function(userId) {
  	var tableId = Router.current().params._id;
    var score = 0;
    var allHands = Hands.find({tableId: tableId, userId: userId}).fetch();
    allHands.forEach(function(hand) {
      score += hand.card.value;
    });

    var color = '';
    if (score === 0) {
      color = 'grey';
    }
    else if (score <= 21) {
      color = 'green';
    }
    else {
      color = 'red';
    }

    return color;
  } 
});