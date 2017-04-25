Template.previewTable.helpers({
	handsPlayed: function(userId) {
		var tableId = Router.current().params._id;
		return Hands.find({tableId: tableId, userId: userId}, {
        sort: [
            ["order", "desc"]
        ]
    });
	}
});