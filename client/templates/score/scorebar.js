Template.scorebar.helpers({ 
  scoreCalcul: function (userId) {
    var tableId = Router.current().params._id;
    var score = Score.findOne({userId: userId, tableId: tableId});
    
    return score.score;
    
  },
  colorCalcul: function(userId) {
  	var tableId = Router.current().params._id;
    var score = Score.findOne({userId: userId, tableId: tableId});

    var color = '';
    if (score.score === 0) {
      color = 'grey';
    }
    else if (score.score <= 21) {
      color = 'green';
    }
    else {
      color = 'red';
    }
    
    return color;
  } 
});