Template.addInventory.events({
	'click #add-inventory': function(ev)
	{
		ev.preventDefault();
		var name = $('#name').val();
		var container = parseFloat($('#container').val());
		var cost = parseFloat($('#cost').val());

		if(name && container > 0.0 && cost > 0.0)
		{
			Meteor.call('addInventory', name, container, cost);
		}
		else
		{
			console.log(name);
			console.log(container);
			console.log(cost);
			alert('ERROR');

		}
		clearForm();
	}
});

function clearForm()
{
	$('#name').val('');
	$('#container').val('');
	$('#cost').val('');
}