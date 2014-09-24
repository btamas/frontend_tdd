var util = require('util'),

	Product = require('./product'),

	/**
	 * Represent apple
	 * @extends Product
	 * @constructor
	 */
	Apple = function() {
		Apple.super_.call(this, 12, 'kg');
	};

util.inherits(Apple, Product);

Apple.prototype._id = 'apple';

module.exports = new Apple();
