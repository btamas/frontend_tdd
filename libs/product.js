/**
 * Represent a product
 * @param {number} price
 * @param {string} unit
 * @constructor
 */
var Product = function(price, unit) {
	/**
	 * Price of the product
	 * @type {number}
	 * @private
	 */
	this._price = price;

	/**
	 * Unit of the product
	 * @type {string}
	 * @private
	 */
	this._unit = unit;
};

/**
 * Id of the product
 * @type {string}
 * @private
 */
Product.prototype._id = 'product';

/**
 * Gives back the id of the product
 * @returns {string}
 */
Product.prototype.getId = function() {
	return this._id;
};

/**
 * Gives back the price of the product
 * @returns {number}
 */
Product.prototype.getPrice = function() {
	return this._price;
};

/**
 * Gives backe the unit of the product
 * @returns {string}
 */
Product.prototype.getUnit = function() {
	return this._unit;
};

module.exports = Product;
