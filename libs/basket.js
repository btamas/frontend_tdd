var _ = require('underscore'),

	/**
	 * Represents Basket
	 * @constructor
	 */
	Basket = function() {
		/**
		 * This variable contains the content of the basket
		 * @type {object}
		 * @private
		 */
		this._products = {};
	};

/**
 * Gives back the product list that are in the basket
 * @returns {Product[]} Product list
 */
Basket.prototype.getProductTypes = function() {
	return _.pluck(this._products, 'product');
};

/**
 * Gives amount number of product to the basket
 * @param {Product} product
 * @param {number} amount
 * @returns {Basket}
 */
Basket.prototype.put = function(product, amount) {
	var id = product.getId();
	if (_.isUndefined(this._products[id])) {
		this._products[id] = {
			product : product,
			amount  : amount
		};
	}
	else {
		this._products[id].amount += amount;
	}

	return this;
};

/**
 * Gives back the amount of the specific product
 * @param {string} productId - Id of the requested product
 * @returns {number} Amount of product
 */
Basket.prototype.getProductAmount = function(productId) {
	if (_.isUndefined(this._products[productId])) {
		return 0;
	}
	else {
		return this._products[productId].amount;
	}
};

module.exports = Basket;
