/**
 * @module views/ExtDropdown
 */

/**
 * @class
 * @extends module:views/Dropdown~Dropdown
 */
var Dropdown = Dropdown.extend(
	/** @lends module:views/ExtDropdown~Dropdown.prototype **/
	{
		/**
		 * Valamicuccos
		 * @param {number} a
		 * @returns {*}
		 */
		valami : function(a) {
			this.onDropdownItemClick()
		}
	}
);

module.exports = Dropdown;