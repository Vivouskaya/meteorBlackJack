import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.setInterval(function () {
	var usersOffline = Meteor.users.find({ "status.online": false }).fetch();
	usersOffline.forEach(function(userOffline) {
		var tablesWhereUsersOffline = Tables.find({ 'users._id': userOffline._id}).fetch();
		if(tablesWhereUsersOffline) {
			tablesWhereUsersOffline.forEach(function(table) {
				Tables.update({_id: table._id}, { $pull: { users: {_id: userOffline._id}}});
				Turns.remove({'user._id': userOffline._id, tableId: table._id});
				Score.remove({userId: userOffline._id, tableId: table._id});
				console.log(table.users+' leave table '+ table.name);
			});
			//return console.log(tablesWhereUsers);
		}
	});
	/*
	var usersOnline = Meteor.users.find({ "status.online": true }).fetch();
	usersOnline.forEach(function(userOnline) {
		var tablesWhereUsersOnline = Tables.findOne({ 'users._id': userOnline._id});
		if(!tablesWhereUsersOnline) {
			console.log(this.);
			
			if(Router.current().params._id) {
				console.log(tablesWhereUsersOnline);
				var positionOnTable = Tables.findOne({_id: Router.current().params._id}).users;
				var countPlayer = 0;
				positionOnTable.forEach(function(position) {
				  countPlayer++;
				});
				Tables.update({_id: Router.current().params._id}, { $set: { users: {_id: userOnline._id}}});
				Turns.insert({user: userOnline, tableId: Router.current().params._id, flagged: "waiting", position: countPlayer});
				Score.insert({userId: userOnline._id, tableId: Router.current().params._id, score: 0});
			}
			
		}
	});
	*/

	

}, 1000);

Meteor.setInterval(function () {
// cartes croupier
	var countUsers = 0;
	var countUsersIsready = 0;
	var allTables = Tables.find().fetch();
	allTables.forEach(function(table) {
		if(table.users){
			if(table.users.length > 0){
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
	});
}, 1000);