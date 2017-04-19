import { Meteor } from 'meteor/meteor'

Tables = new Mongo.Collection('tables');

Meteor.methods({
	dealCard: function(tableId) {

		if(Hands.find({tableId: tableId}).count() < 52) {
			var card = Math.floor((Math.random() * (52-0) )+1);
			var playingCardExist = Hands.findOne({tableId: tableId, cardNum: card});
			
			while(playingCardExist) {
				card = Math.floor((Math.random() * (52-0) )+1);
				playingCardExist = Hands.findOne({tableId: tableId, cardNum: card});
			}

			playingHands(tableId, card);
			console.log('There are ' + Hands.find().count({tableId: tableId}) + ' card played');
		}
		// CONFIGURER MESSAGE D'ERREUR
		else { return console.log('TOUTES LES CARTES SONT SORTIES'); }
	}
});
