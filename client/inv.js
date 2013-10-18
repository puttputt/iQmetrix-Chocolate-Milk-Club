Template.inv.helpers({
	item: function()
	{
		return Inventory.find({}, {sort: {volume: 1}});
	}
});