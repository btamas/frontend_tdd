/**
 * RomanCalculator
 *
 * @constructor
 */
var RomanCalculator = function() {
	/**
	 * Contains roman decimal places
	 * @type {string[]}
	 * @private
	 */
	this._romans = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

	/**
	 * Contains arabic decimal places
	 * @type {number[]}
	 * @private
	 */
	this._arabics = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
};

/**
 * Convert roman number to arabic
 *
 * @param {string} roman - Roman number
 * @returns {number} Arabic number
 * @private
 */
RomanCalculator.prototype._convertToArabic = function(roman) {
	var	arabic = 0;

	for (var i = 0; i < this._romans.length; i++) {
		if (roman.indexOf(this._romans[i]) === 0) {
			arabic += this._arabics[i];
			roman = roman.substring(this._romans[i].length);
			i--;
		}
	}

	return arabic;
};

/**
 * Convert arabic numbers to roman
 * @param {number} arabic - Arabic number
 * @returns {string} Roman number
 * @private
 */
RomanCalculator.prototype._convertToRoman = function(arabic) {
	var roman = '';

	for (var i = 0; i < this._arabics.length; i++) {
		if (arabic >= this._arabics[i]) {
			roman += this._romans[i];
			arabic -= this._arabics[i];
			i--;
		}
	}

	return roman;
};

/**
 * Summarize two roman number
 * @param {string} roman1 - First roman number
 * @param {string} roman2 - Second roman number
 * @throws Too big number
 * @returns {string} Result roman number
 */
RomanCalculator.prototype.summarize = function(roman1, roman2) {
	var arabic1 = this._convertToArabic(roman1),
		arabic2 = this._convertToArabic(roman2),
		sum = arabic1 + arabic2;

	if (sum > 3999) {
		throw Error('Too big number');
	}
	return this._convertToRoman(sum);
};

module.exports = RomanCalculator;
