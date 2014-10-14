module.exports = (function() {
	// setup backbone
	var Backbone = require('backbone'),
		jQuery = require('jquery');

	Backbone.$ = jQuery;

	require('backbone.marionette');
})();
