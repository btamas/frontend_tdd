var assert = require('chai').assert,
	_ = require('underscore'),

	RomanCalculator = require('../libs/romanCalculator');

suite('test Roman Calculator', function() {
	setup(function() {
		this.romanCalculator = new RomanCalculator();
		this.dataProvider = function() {
			return {
				I            : 1,
				II           : 2,
				III          : 3,
				IV           : 4,
				V            : 5,
				VI           : 6,
				VII          : 7,
				VIII         : 8,
				IX           : 9,
				X            : 10,
				XX           : 20,
				XL           : 40,
				L            : 50,
				LX           : 60,
				XC           : 90,
				C            : 100,
				CD           : 400,
				D            : 500,
				CM           : 900,
				M            : 1000,
				MMM          : 3000,
				CDXLIV       : 444,
				MMMCMXCIX    : 3999,
				MMMCCCXXXIII : 3333
			};
		};
	});

	test('arabic number convertion', function() {
		_.forEach(this.dataProvider(), function(arabic, roman) {
			assert.strictEqual(this.romanCalculator._convertToArabic(roman), arabic);
		}, this);
	});

	test('roman number convertion', function() {
		_.forEach(this.dataProvider(), function(arabic, roman) {
			assert.strictEqual(this.romanCalculator._convertToRoman(arabic), roman);
		}, this);
	});

	test('sum two romans', function() {
		var testData = {
			II       : ['I', 'I'],
			IV       : ['I', 'III'],
			XLI      : ['XI', 'XXX'],
			XLIX     : ['XXIII', 'XXVI'],
			MMXCVIII : ['XCIX', 'MCMXCIX'],
			MM       : ['MCMXCIX', 'I']
		};

		_.forEach(testData, function(romans, roman) {
			assert.strictEqual(this.romanCalculator.summarize(romans[0], romans[1]), roman);
		}, this);

		assert.throw(
			_.bind(
				function() {
					this.romanCalculator.summarize('MM', 'MM');
				},
				this
			),
			'Too big number'
		);
	});
});
