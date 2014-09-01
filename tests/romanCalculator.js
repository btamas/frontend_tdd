var assert = require('chai').assert,

	RomanCalculator = require('../libs/romanCalculator');

suite('test Roman Calculator', function() {
	setup(function() {
		this.romanCalculator = new RomanCalculator();
	});

	test('is this a roman calculator12', function() {
		assert.strictEqual(this.romanCalculator.isRomanCalculator(), true);
	});
});
