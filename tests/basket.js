var chai = require('chai'),
	assert = chai.assert,
	factories = require('chai-factories'),
	sinon = require('sinon'),
	_ = require('underscore'),

	Backet = require('../libs/basket');

chai.use(factories);

suite('basket', function() {
	chai.factory('product', {
		getId : sinon.stub().returns('sampleProduct')
	});

	setup(function() {
		this.basket = new Backet();
	});

	test('new basket is empty', function() {
		var productTypes = this.basket.getProductTypes();

		assert.strictEqual(productTypes.length, 0);

		var amount = this.basket.getProductAmount('something');

		assert.strictEqual(amount, 0);
	});

	test('can get back product that put', function() {
		var sampleProduct = chai.create('product');

		this.basket.put(sampleProduct, 5);

		var productTypes = this.basket.getProductTypes();
		assert.strictEqual(productTypes.length, 1);
		assert.isTrue(_.contains(productTypes, sampleProduct));

		var amount = this.basket.getProductAmount(sampleProduct.getId());
		assert.strictEqual(amount, 5);
	});

	test('can add same item type', function() {
		var product1 = chai.create('product'),
			product2 = chai.create('product');

		this.basket.put(product1, 5);
		this.basket.put(product2, 3);

		var productTypes = this.basket.getProductTypes();
		assert.strictEqual(productTypes.length, 1);
		assert.isTrue(_.contains(productTypes, product1));

		var amount = this.basket.getProductAmount(product1.getId());
		assert.strictEqual(amount, 8);
	});

	test('can add different item type', function() {
		var product1 = chai.create('product'),
			product2 = chai.create('product', { getId: sinon.stub().returns('apple') });

		this.basket.put(product1, 5);
		this.basket.put(product2, 3);
		this.basket.put(product1, 1);

		var productTypes = this.basket.getProductTypes();
		assert.strictEqual(productTypes.length, 2);
		assert.isTrue(_.contains(productTypes, product1));
		assert.isTrue(_.contains(productTypes, product2));

		var amount = this.basket.getProductAmount(product1.getId());
		assert.strictEqual(amount, 6);

		amount = this.basket.getProductAmount(product2.getId());
		assert.strictEqual(amount, 3);
	});
});
