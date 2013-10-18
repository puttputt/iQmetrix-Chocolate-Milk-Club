Template.content.helpers({
	admin: function()
	{
		if(Meteor.user().profile.admin)
			return true;
		else
			return false;
	}
})