var util = require('util'),

	Product = require('./product'),

	/**
	 * Represent a light
	 * @extends Product
	 * @constructor
	 */
	Light = function() {
		Light.super_.call(this, 15, 'year');
	};

util.inherits(Light, Product);

Light.prototype._id = 'light';

module.exports = new Light();
