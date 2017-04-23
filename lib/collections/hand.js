import { Meteor } from 'meteor/meteor'

Hands = new Meteor.Collection('hands');

playingHands = function(tableId, userId, cardNum, order) {
	//Hands.insert({tableId: tableId, cardNum: cardNum});
	card = Cards.findOne({numero: cardNum});
	Hands.insert({tableId: tableId, userId: userId , card: card, order: order});
};
