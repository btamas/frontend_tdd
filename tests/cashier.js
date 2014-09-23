var chai = require('chai'),
	assert = chai.assert,
	factories = require('chai-factories'),
	sinon = require('sinon'),

	Cashier = require('../libs/cashier');

chai.use(factories);

suite('cashier', function() {
	chai.factory('product', {
		getId    : sinon.stub().returns('sampleProduct'),
		getPrice : sinon.stub().returns(12)
	});

	setup(function() {
		this.cashier = new Cashier();
	});

	test('can calculate empty basket', function() {
		var basket = {
			getProductTypes  : sinon.stub().returns([]),
			getProductAmount : sinon.stub().returns(0)
		};

		assert.strictEqual(this.cashier.calculates(basket), 0);
	});

	test('can calculate basket with one item', function() {
		var sampleProduct = chai.create('product'),
			basket = {
				getProductTypes  : sinon.stub().returns([ sampleProduct ]),
				getProductAmount : sinon.stub().withArgs(sampleProduct.getId()).returns(5)
			};

		assert.strictEqual(this.cashier.calculates(basket), 60);
	});

	test('can calculate basket with more item', function() {
		var product1 = chai.create('product'),
			product2 = chai.create('product', {
				getId    : sinon.stub().returns('apple'),
				getPrice : sinon.stub().returns(5)
			}),
			basket = {
				getProductTypes  : sinon.stub().returns([ product1, product2 ]),
				getProductAmount : sinon.stub()
					.withArgs(product1.getId()).returns(5)
					.withArgs(product2.getId()).returns(10)
			};

		assert.strictEqual(this.cashier.calculates(basket), 170);
	});
});
