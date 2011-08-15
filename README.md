## node-jslint-all

node-jslint-all is JSLint on Node, with minimized output and recursive path scanning. It's heavily inspired
by node-jslint (https://github.com/reid/node-jslint) in that it's very simple in what it supports, but i wanted
minimal console output (only errors, basically) and recursive path scanning. 

## installation

	$ npm install -g node-jslint-all

## usage

If you want to execute node-jslint-all on all JavaScript files in this folder and its subfolders, just do:

	$ jslint-all . 

If you want to execute node-jslint-all on a specific path, just do:

	$ jslint-all /path/to/my/code

If you want to pass jslint options, just do:

	$ jslint-all --onevar --nomen --regexp --bitwise --newcap --evil false /path/to/my/code

The output is limited to only errors that were found, and if any errors were found, the process will return
with a non-zero exit code.