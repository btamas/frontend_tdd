module.exports = (function() {
	// setup backbone
	var Backbone = require('backbone'),
		jQuery = require('jquery');

	Backbone.$ = window.$ = jQuery;

	require('backbone.marionette');

	Backbone.Marionette.Behaviors.behaviorsLookup = function() {
		return {
			Enter : require('../libs/behaviors/enter')
		};
	};
})();
