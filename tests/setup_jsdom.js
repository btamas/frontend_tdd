var jsdom = require('jsdom'),
	fs = require('fs');

require.extensions['.html'] = function(module, filename) {
	module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = (function() {
	// emulate window and document
	global.window = jsdom.jsdom('<html><body><div id="sandbox"></div></body></html>').parentWindow;
	global.document = global.window.document;

	require('./setup_framework');
})();
