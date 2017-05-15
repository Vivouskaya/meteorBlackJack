Tracker.autorun(function() {
	// cartes croupier
	var countUsers = 0;
	var countUsersIsready = 0;
	var allTables = Tables.find().fetch();
	allTables.forEach(function(table) {
		if(table.users){
			if(table.users.length > 0){
				var userId = 'croupierID_'+table._id;
				var handsCroupier = Hands.find({userId: userId}).fetch().length;
				if(handsCroupier < 2) {
					var turnsInThisTable = Turns.find({tableId: table._id}).fetch();
					turnsInThisTable.forEach(function(turn) {
						if(turn.flagged == "ready" || turn.flagged == "waiting") {
							countUsersIsready++;
						}
						countUsers++;
					});
					console.log('Joueurs sur la table: '+countUsers);
					console.log('Joueurs ready: '+countUsersIsready);
					if(countUsers == countUsersIsready) { Meteor.call('dealCroupierCard', table._id, function(error, result) {}); }
				}
			}
			else if(table.users.length == 0) {
				var userId = 'croupierID_'+table._id;
				var handsCroupier = Hands.find({userId: userId}).fetch();
				if(handsCroupier.length > 0) {
					handsCroupier.forEach(function(hand) {
						Hands.remove({_id: hand._id});
					});
				}
			}
		}
	});
});

