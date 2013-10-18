Template.addCredit.helpers({
	users: function()
	{
		return Meteor.users.find();
	}
});

Template.addCredit.events({
	'click #add-credit': function(ev)
	{
		ev.preventDefault();

		var user = $('#userSelect option:selected').attr('id');
		var amount = parseFloat($('#amount').val());
		if(user && amount > 0.0)
		{
			Meteor.call('addCredit', user, amount);
		}
		else
		{
			console.log(user);
			console.log(amount);
			alert('ERROR');
		}

		clearForm();
	}
});

function clearForm()
{
	$('#amount').val('');
}