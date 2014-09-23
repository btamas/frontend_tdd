var _ = require('underscore'),

	Cashier = function() {};

Cashier.prototype.calculates = function(basket) {
	var price = 0,
		productTypes = basket.getProductTypes();

	_.forEach(productTypes, function(productType) {
		var amount = basket.getProductAmount(productType.getId());
		price += amount * productType.getPrice();
	});

	return price;
};

module.exports = Cashier;
