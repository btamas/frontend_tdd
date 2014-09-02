var RomanCalculator = function() {
	this._romans = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
	this._arabics = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
};

RomanCalculator.prototype._convertToArabic = function(romanNumber) {
	var	arabic = 0;

	for (var i = 0; i < this._romans.length; i++) {
		if (romanNumber.indexOf(this._romans[i]) === 0) {
			arabic += this._arabics[i];
			romanNumber = romanNumber.substring(this._romans[i].length);
			i--;
		}
	}

	return arabic;
};

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
