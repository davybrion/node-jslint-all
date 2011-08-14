var fs = require('fs'),
	path = require('path'),
	exec = require('child_process').exec;

// TODO: rewrite this to make it fully asynchronous

function getJsFilesRecursively(startPath, callback) {
	exec('find ' + startPath, function(err, stdout) {
		var jsFiles = []
		stdout.split('\n').forEach(function(f) {
			if (!/node_modules\//.test(f) && /.js$/.test(f)) {
				jsFiles.push(f);
			};
		});

		callback(null, jsFiles);
	});
};

module.exports = {
	check: function(path, options, callback) {
		getJsFilesRecursively(path, function(err, jsFiles) {
			jsFiles.forEach(function(f) {
				console.log(f);
			});
		});

		callback(null, null);
	}
};