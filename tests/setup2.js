var jsdom = require('jsdom'),
	fs = require('fs');

module.exports = (function() {
	global.window = jsdom.jsdom('<html></html>').parentWindow;
	global.document = global.window.document;
	global.loadHTML = function(fileName, dirname) {
		dirname = dirname ? dirname : __dirname;
		return fs.readFileSync(dirname + '\\' + fileName, 'utf8');
	};
	var Backbone = require('backbone'),
		jQuery = require('jquery');

		Backbone.$ = jQuery;

		require('backbone.marionette');
})();

