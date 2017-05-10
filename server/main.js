import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.setInterval(function () {
	var usersOffline = Meteor.users.find({ "status.online": false }).fetch();
	usersOffline.forEach(function(user) {

		var tablesWhereUsers = Tables.find({ 'users._id': user._id}).fetch();
		if(tablesWhereUsers) {
			tablesWhereUsers.forEach(function(table) {
				//console.log(table._id);
				//Tables.update({_id: table._id}, { $pull: { users: user }});
				Tables.update({_id: table._id}, { $pull: { users: {_id: user._id}}});
				Turns.remove({user: user, tableId: table._id});
				Score.remove({userId: user._id, tableId: table._id});
				console.log(table);
			});
			//return console.log(tablesWhereUsers);
		}
	});
}, 10000);
