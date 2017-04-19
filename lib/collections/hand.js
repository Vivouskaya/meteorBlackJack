import { Meteor } from 'meteor/meteor'

Hands = new Meteor.Collection('hands');

playingHands = function(tableId, cardNum) {
	Hands.insert({tableId: tableId, cardNum: cardNum});
};
