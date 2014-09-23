var _ = require('underscore'),

	Backet = function() {
		this.products = {};
	};

Backet.prototype.getProductTypes = function() {
	return _.pluck(this.products, 'product');
};

Backet.prototype.put = function(product, amount) {
	var id = product.getId();
	if (_.isUndefined(this.products[id])) {
		this.products[id] = {
			product : product,
			amount  : amount
		};
	}
	else {
		this.products[id].amount += amount;
	}
};

Backet.prototype.getProductAmount = function(productId) {
	if (_.isUndefined(this.products[productId])) {
		return 0;
	}
	else {
		return this.products[productId].amount;
	}
};

module.exports = Backet;
