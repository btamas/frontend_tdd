/**
 * @module views/Dropdown
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
		Dropdown = Backbone.Marionette.View.extend(
		/** @lends module:views/Dropdown~Dropdown.prototype */
		{
			ui : {
				title         : '.dropdownTitle',
				dropList      : '.dropList',
				dropdownItems : '.dropdownItem'
			},

			events : {
				'click @ui.title'         : 'onTitleClick',
				'click @ui.dropdownItems' : 'onDropdownItemClick'
			},

			/**
			 * Handles ui.title click event and set the open class to the ui.dropList
			 */
			onTitleClick : function() {
				this.$(this.ui.dropList).addClass('open');
			},

			/**
			 * Handles ui.dropItems click and set the clicked item to active
			 * @param {Jquery.Event} event
			 */
			onDropdownItemClick : function(event) {
				this.$(this.ui.dropdownItems).removeClass('active');
				this.$(event.target).addClass('active');
			}
		}
	);

module.exports = Dropdown;
