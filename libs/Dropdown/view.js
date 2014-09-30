var Backbone = require('backbone'),

	/**
	 * @name module:Dropdown
	 * @constructor
	 * @extends Backbone.Marionette.View
	 */
	Dropdown = Backbone.Marionette.View.extend(
		/** @lends module:Dropdown.prototype **/
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
			 * Handles title click and set the open class to the list
			 */
			onTitleClick : function() {
				this.$(this.ui.dropList).addClass('open');
			},

			/**
			 * Handles item click and set the clicked item to active
			 * @param {Jquery.Event} event
			 */
			onDropdownItemClick : function(event) {
				this.$(this.ui.dropdownItems).removeClass('active');
				this.$(event.target).addClass('active');
			}
		}
	);

/**
 * @exports Dropdown
 */
module.exports = Dropdown;
