var fs = require('fs'),
	path = require('path');

// TODO: rewrite this to make it fully asynchronous
function getJsFileNamesRecursivelySync(start) {
	var stat = fs.lstatSync(start),
		allJsFiles = [];

	if (!stat.isDirectory()) { return []; }

	var files = fs.readdirSync(start);

	files.forEach(function(f) {
		var fullpath = path.join(start, f),
			subStat = fs.lstatSync(fullpath);

		if (subStat.isDirectory() && !/node_modules\//.test(fullpath)) {
			allJsFiles = allJsFiles.concat(getJsFileNamesRecursivelySync(fullpath));
		} 
		else {
			if (/.js$/.test(fullpath)) {
				allJsFiles.push(fullpath);
			};
		}
	});

	return allJsFiles;
};

module.exports = {
	check: function(path, options, callback) {
		var jsFiles = getJsFileNamesRecursivelySync(path);
		jsFiles.forEach(function(f) {
			console.log(f);
		});

		callback(null, null);
	}
};