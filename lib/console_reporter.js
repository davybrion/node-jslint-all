module.exports = {
	report: function(results) {
		var padding = '   ';
		results.forEach(function(result) {
			result.jslintOutput.errors.forEach(function(e) {
				if (e) {
					console.log('File: ' + result.path);
					console.log(padding + 'at line ' + e.line + ', character ' + e.character);
					console.log(padding + e.reason);
					if (e.evidence) {console.log(padding + e.evidence); }
					console.log();
				}
			});
		});
	}
};