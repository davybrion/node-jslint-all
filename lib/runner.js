var exec = require('child_process').exec,
	fs = require('fs'),
	jslint = require('./jslint.js'),
	fileCount = 0,
	results = [];

function getJsFilesRecursively(startPath, exclude, callback) {
	exec('find ' + startPath, function(err, stdout) {
		var jsFiles = [];
		stdout.split('\n').forEach(function(f) {
			if (!/node_modules\//.test(f) && /.js$/.test(f)) {
				if (exclude && f.indexOf(exclude) > -1) {
					return;
				}
				jsFiles.push(f);
			}
		});

		callback(null, jsFiles);
	});
}

function lint(filepath, options, postcallback) {
	fs.readFile(filepath, function(err, data) {
		if (err) { callback(err); }
		data = data.toString('utf8').replace(/^\#\!.*/, "");

		if (!jslint(data, options)) {
			results.push({
				path: filepath,
				jslintOutput: jslint.data()
			});
		}

		postcallback();
	});	
}

module.exports = {
	check: function(path, options, callback) {
		if (!options.hasOwnProperty('node')) { options.node = true; }
		if (!options.hasOwnProperty('es5')) { options.es5 = true; }

		var postLint = function() {
			if (--fileCount === 0) {
				callback(null, results);
			}
		};

		getJsFilesRecursively(path, options.exclude, function(err, jsFiles) {
			fileCount = jsFiles.length;
			jsFiles.forEach(function(f) {
				lint(f, options, postLint);
			});
		});
	}
};