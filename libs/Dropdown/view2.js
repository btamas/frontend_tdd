/**
 * @name module:Dropdown2
 * @constructor
 * @extends module:Dropdown
 */
var Dropdown2 = Dropdown.extend(
	/** @lends module:Dropdown2.prototype **/
	{
		/**
		 * Valamicuccos
		 * @param {number} a
		 * @returns {*}
		 */
		valami : function(a) {
			return a;
		}
	}
);

/**
 * @exports Dropdown2
 */
module.exports = Dropdown2;