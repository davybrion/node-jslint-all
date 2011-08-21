#!/usr/bin/env node

var runner = require('../lib/runner.js'),
	consoleReporter = require('../lib/console_reporter.js'),
	nopt = require('nopt'),
	path = require('path');

var optionSet = {
	// node-jslint-all options
	'exclude' : String,			// path to exclude from the jslint check
	// JSLint options
	'adsafe' : Boolean, 	  // true, if ADsafe rules should be enforced
	'bitwise' : Boolean,    // true, if bitwise operators should not be allowed
	'browser' : Boolean,    // true, if the standard browser globals should be predefined
	'cap' : Boolean,        // true, if upper case HTML should be allowed
	'continue' : Boolean, 	// true, if the continuation statement should be tolerated
	'css' : Boolean,        // true, if CSS workarounds should be tolerated
	'debug' : Boolean,      // true, if debugger statements should be allowed
	'devel' : Boolean,      // true, if logging should be allowed (console, alert, etc.)
	'es5' : Boolean,        // true, if ES5 syntax should be allowed
	'evil' : Boolean,       // true, if eval should be allowed
	'forin' : Boolean,      // true, if for in statements need not filter
	'fragment' : Boolean,   // true, if HTML fragments should be allowed
	'indent' : Number,      // the indentation factor
	'maxerr' : Number,      // the maximum number of errors to allow
	'maxlen' : Number,      // the maximum length of a source line
	'newcap' : Boolean,     // true, if constructor names must be capitalized
	'node' : Boolean,       // true, if Node.js globals should be predefined
	'nomen' : Boolean,      // true, if names should be checked
	'on' : Boolean,         // true, if HTML event handlers should be allowed
	'onevar' : Boolean,     // true, if only one var statement per function should be allowed
	'passfail' : Boolean,   // true, if the scan should stop on first error
	'plusplus' : Boolean,   // true, if increment/decrement should not be allowed
	'regexp' : Boolean,     // true, if the . should not be allowed in regexp literals
	'rhino' : Boolean,      // true, if the Rhino environment globals should be predefined
	'undef' : Boolean,      // true, if variables should be declared before used
	'safe' : Boolean,       // true, if use of some browser features should be restricted
	'windows' : Boolean,    // true, if MS Windows-specific globals should be predefined
	'strict' : Boolean,     // true, require the "use strict"; pragma
	'sub' : Boolean,        // true, if all forms of subscript notation are tolerated
	'white' : Boolean,     	// true, if strict whitespace rules apply
	'widget' : Boolean     	// true  if the Yahoo Widgets globals should be predefined
};

var	options = nopt(optionSet);

if (!options.argv.remain.length) {
	console.warn('No path specified!');
	console.warn("Usage: " + process.argv[1] + " [--" + Object.keys(optionSet).join("] [--") + "] <path>");
	process.exit(1);
}

var pathToCheck = path.resolve(path.normalize(options.argv.remain[0]));

if (options.exclude) {
	options.exclude = path.resolve(path.normalize(options.exclude));	
}

delete options.argv;
runner.check(pathToCheck, options, function(err, results) {
	if (results.length > 0) {
		consoleReporter.report(results);
		process.exit(1);
	}
});
