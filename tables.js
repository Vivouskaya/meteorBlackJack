import { Meteor } from 'meteor/meteor'

Tables = new Mongo.Collection('tables');

Meteor.methods({
	dealCard: function(score) {
		var card = Math.floor((Math.random() * (52-0) )+1);
		return card;
		//var value = Math.floor((Math.random() * (13-0) )+1);
		//return alert(card);
		/*
		var newScore = score + card;
		return alert(newScore);
		Session.set('score', newScore);
		*/
	}
});
