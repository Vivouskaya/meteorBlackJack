import { Meteor } from 'meteor/meteor'

Hands = new Meteor.Collection('hands');

playingHands = function(tableId, userId, cardNum, order) {
	//Hands.insert({tableId: tableId, cardNum: cardNum});
	card = Cards.findOne({numero: cardNum});
	Hands.insert({tableId: tableId, userId: userId , card: card, order: order});
	var score = Score.findOne({userId: userId, tableId: tableId});

	var value = 0;
	if(card.value === 11) {
		if (score.score > 10) {
			value = score.score + 1;
		}
		else {
			value = score.score + 11;
		}
	}
	else {
		value = score.score + card.value;
	}

	Score.update({userId: userId, tableId: tableId}, {$set: {score: value} });
};
