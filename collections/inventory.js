Inventory = new Meteor.Collection('inv');

glassSize = 0.45;

Meteor.methods({
	buyGlass: function()
	{
		var user = Meteor.users.findOne(this.userId);
		var inv = Inventory.find();

		var inv = Inventory.find();
		var totalCapacity = 0.0;
		var totalCost = 0.0;
		var totalVolume = 0.0;
		inv.forEach(function(item)
		{
			totalCost+= parseFloat(item.cost);
			totalCapacity+= parseFloat(item.container);
			totalVolume+= parseFloat(item.volume);
		});

		//console.log(totalVolume);
		var rate = (totalCost / (totalCapacity/glassSize));

		if(user.profile.credit >= rate && totalVolume >= glassSize)
		{	
			//Update users credit
			var newCredit = parseFloat((user.profile.credit-rate).toFixed(2));

			Meteor.users.update({_id: user._id}, {$set: {'profile.credit': newCredit}});
			
			//Update inventory
			var poured = glassSize;
			inv = Inventory.find({}, {sort: {volume: 1}});
			inv.forEach(function(item)
			{

				if(poured>0.0)
				{
					//console.log('poured' + poured);
					var diff = item.volume - poured;
					//console.log('diff' + diff);
					if(diff>0.0)
					{
						//console.log('full')
						Inventory.update(item, {$set: {volume: parseFloat(diff.toFixed(2))}});
						poured = 0.0;
						//console.log(poured);
					}
					else
					{
						//console.log('empty');
						poured -= item.volume;
						Inventory.update(item, {$set: {volume: 0.0}});
						//console.log(poured);
					}
				}
				//console.log('end jug');
			});
			//console.log('end');
			//Update consumed
			var newConsumed = parseFloat((parseFloat(user.profile.consumed) + glassSize).toFixed(2));
			Meteor.users.update({_id: user._id}, {$set: {'profile.consumed': newConsumed}});
			return true;

		}
		else
		{
			//NOT ENOUGH MONEY OR PRODUCT
			return false;
		}
	},
	addCredit : function(user, amount)
	{
		user = Meteor.users.findOne({_id: user});
		var credit= parseFloat(user.profile.credit);
		credit += amount;
		Meteor.users.update({_id: user._id}, {$set: {'profile.credit': credit}});
	},
	addInventory : function(name, container, cost)
	{
		Inventory.insert({
			name: name,
			container: container,
			volume: container,
			cost: cost,
		});
	}

});