var util = require('util'),

	Product = require('./product'),

	Apple = function() {
		Apple.super_.call(this, 12, 'kg');
	};

util.inherits(Apple, Product);

Apple.prototype._id = 'apple';

module.exports = new Apple();
