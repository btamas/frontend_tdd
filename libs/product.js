var Product = function(price, unit) {
	this._price = price;
	this._unit = unit;
};

Product.prototype._id = 'product';

Product.prototype.getId = function() {
	return this._id;
};

Product.prototype.getPrice = function() {
	return this._price;
};

Product.prototype.getUnit = function() {
	return this._unit;
};

module.exports = Product;
