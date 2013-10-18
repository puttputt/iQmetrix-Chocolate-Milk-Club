Template.content.helpers({
	admin: function()
	{
		var user = Meteor.user();
		if(user)
			if(user.profile.admin)
				return true;
			else
				return false;
		else
			return false;
	}
})