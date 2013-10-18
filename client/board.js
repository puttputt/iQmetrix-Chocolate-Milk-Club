Template.board.helpers({
	user: function()
	{
		return Meteor.users.find({}, {
			sort: { 'profile.consumed': -1},
			limit: 5
		});
	}
});