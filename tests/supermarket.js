var assert = require('chai').assert,

	Apple = require('../libs/apple'),
	Light = require('../libs/light'),
	Starship = require('../libs/starship'),
	Basket = require('../libs/basket'),
	Cashier = require('../libs/cashier');

suite('supermarket integration test', function() {
	setup(function() {
		this.apple = Apple;
		this.light = Light;
		this.starship = Starship;
		this.basket = new Basket();
		this.cashier = new Cashier();
	});
	
	test('can calculate correctly', function() {
		var price = this.cashier.calculates(this.basket);
		assert.strictEqual(price, 0);

		this.basket.put(this.apple, 5);
		this.basket.put(this.light, 3);
		this.basket.put(this.apple, 1);

		price = this.cashier.calculates(this.basket);
		assert.strictEqual(price, 117);

		this.basket.put(this.apple, 5);

		price = this.cashier.calculates(this.basket);
		assert.strictEqual(price, 177);

		this.basket.put(this.light, 4);

		price = this.cashier.calculates(this.basket);
		assert.strictEqual(price, 237);
	});
});
