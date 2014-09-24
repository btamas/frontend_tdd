var assert = require('chai').assert,
	_ = require('underscore'),

	Product = require('../libs/product'),
	Apple = require('../libs/apple'),
	Light = require('../libs/light'),
	Starship = require('../libs/starship');

this._products = {
	product  : [
		new Product(111, 'something'),
		{
			price : 111,
			unit  : 'something',
			id    : 'product'
		}
	],
	apple    : [
		Apple,
		{
			price : 12,
			unit  : 'kg',
			id    : 'apple'
		}
	],
	light    : [
		Light,
		{
			price : 15,
			unit  : 'year',
			id    : 'light'
		}
	],
	starship : [
		Starship, {
			price : 999.99,
			unit  : 'piece',
			id    : 'starship'
		}
	]
};

var productsTests = function(name, product, properties) {
	suite('testing properties of ' + name, function() {
		test('product has correct id', function() {
			assert.strictEqual(product.getId(), properties.id);
		});

		test('product has correct price', function() {
			assert.strictEqual(product.getPrice(), properties.price);
		});

		test('product has correct unit', function() {
			assert.strictEqual(product.getUnit(), properties.unit);
		});
	});
};

_.forEach(this._products, function(data, name) {
	productsTests(name, data[0], data[1]);
});
