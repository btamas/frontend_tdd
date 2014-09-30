module.exports = (function() {
	var Backbone = require('backbone'),
		jQuery = require('jquery');

	Backbone.$ = jQuery;

	require('backbone.marionette');
})();

