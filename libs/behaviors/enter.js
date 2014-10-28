/**
 * @module behaviors/Enter
 */

var Backbone = require('backbone'),
	_ = require('underscore'),

	//Enter is a Marionette Behavior and it extends it.
	Enter = Backbone.Marionette.Behavior.extend(/** @lends module:behaviors/Enter~Enter */{
		/**
		 * @class Enter
		 * @constructs
		 * @extends external:Backbone.Marionette.Behavior
		 */
		initialize: function() {
			//Go throught events and find enter listeners.
			_.forEach(this.view.events || [], function(handler, eventSelector) {
				var event = eventSelector.split(' ')[0],
					selector = eventSelector.split(' ')[1] || '';

				if (event === 'enter') {
					var newListener = {};
					//It change enter event to keyup and triggers enter if the keycode is 13.
					newListener['keyup ' + selector] = 'onEnterKeyUpAggregator';
					this.events = _.extend({}, this.events, newListener);
				}
			}, this);
		},

		/**
		 * Aggregated event listener for keyup
		 * @param {Jquery.Event} event
		 */
		//This is the event handler function. It runs every keyup event on elements that is defined in selectors.
		onEnterKeyUpAggregator : function(event) {
			if (event.keyCode === 13) {
				Backbone.$(event.target).trigger('enter');
			}
		}
	});

module.exports = Enter;