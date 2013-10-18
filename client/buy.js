Template.buy.helpers({
	isMilk: function()
	{
		if(Inventory.find().count() > 0)
			return true;
		else
			return false;
	},
	rate: function()
	{
		var inv = Inventory.find();
		var totalCapacity = 0.0;
		var totalCost = 0.0;
		inv.forEach(function(item)
		{
			totalCost+=item.cost;
			totalCapacity+=item.container;
		});
		return (totalCost / (totalCapacity/glassSize)).toFixed(2);
	},
	credit: function()
	{
		if(Meteor.user())
			return Meteor.user().profile.credit;
	}
});

Template.buy.events({
	'click #buy': function(ev)
	{
		if(confirm('Are you sure you want to buy a glass?'))
		{
			Meteor.call('buyGlass', function(err, result)
			{
				if(!result)
				{
					alert('Sorry. You are broke, or there is no more milk :(');
				}
			});
		}
	}
});