var fs = require('fs'),
	async = require('async');

var result = [],
	fileRegex = /^(?!.*setup).*\.js$/;

var queue = async.queue(function(item, done) {
	fs.stat(item, function(err, stat) {
		if (stat && stat.isDirectory()) {
			files = fs.readdir(item, function(err, files) {
				if (err) {
					return done();
				}

				files.forEach(function(file) {
					queue.push(item + '/' +file);
				});
			});
		}
		else if (fileRegex.test(item)) {
			console.log('Loading file ' + item);
			result.push(item);
		}

		done();
	});
});

queue.drain = function() {
	var data = '';
	result.forEach(function(file) {
		data += 'require("' + file + '");';
	});

	fs.writeFileSync('./all_test_file.js', data);
};

queue.push('./tests');
