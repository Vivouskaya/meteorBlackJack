import { Meteor } from 'meteor/meteor'

Tables = new Mongo.Collection('tables');

Meteor.methods({

	addUserOnThisTable: function(tableId) {
		
		var currentUser = Meteor.user();
		if(currentUser) {
			Tables.update({_id: tableId}, { $addToSet: { users: currentUser }});
		}

	},

	removeUserOnThisTable: function(tableId) {
		
		var currentUser = Meteor.user();
		Tables.update({_id: tableId}, { $pull: { users: currentUser }});

	},

	dealCard: function(tableId) {

		if(Hands.find({tableId: tableId}).count() < 52) {
			var cardNum = Math.floor((Math.random() * (52-0) )+1);
			var playingCardExist = Hands.findOne({tableId: tableId, card.numero: cardNum});
			
			while(playingCardExist) {
				cardNum = Math.floor((Math.random() * (52-0) )+1);
				playingCardExist = Hands.findOne({tableId: tableId, card.numero: cardNum});
			}

			playingHands(tableId, cardNum);
			console.log('There are ' + Hands.find().count({tableId: tableId}) + ' card played');
			return true;
		}
		// CONFIGURER MESSAGE D'ERREUR
		else { return console.log('TOUTES LES CARTES SONT SORTIES'); }
	}
});
