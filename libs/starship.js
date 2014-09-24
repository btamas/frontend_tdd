var util = require('util'),

	Product = require('./product'),

	/**
	 * Represent a starship
	 * @extends Product
	 * @constructor
	 */
	Starship = function() {
		Starship.super_.call(this, 999.99, 'piece');
	};

util.inherits(Starship, Product);

Starship.prototype._id = 'starship';

module.exports = new Starship();
