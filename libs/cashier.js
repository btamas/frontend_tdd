var _ = require('underscore'),

	/**
	 * Represent a cashier
	 * @constructor
	 */
	Cashier = function() {};

/**
 * Calculates the price of the basket
 * @param {Basket} basket
 * @returns {number}
 */
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
