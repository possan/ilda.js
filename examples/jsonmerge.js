var ILDA = require('../dist/ilda.js').ILDA;
var fs = require('fs');

if (process.argv.length < 4) {
	console.log('usage: node jsonmerge.js [input.json] {input2.json} {input3.json ...} [output.ild]');
	process.exit(0);
}

var outputfile = process.argv[process.argv.length-1];
process.argv.pop();

var obj = {};

for (var i=2; i<process.argv.length; i++) {
	console.log('merging '+process.argv[i]);
	var inp = JSON.parse(fs.readFileSync(process.argv[i]));
	for (k in inp) {
		if (typeof(obj[k]) === 'undefined')
			obj[k] = [];
		for (p in inp[k])
			obj[k].push(inp[k][p]);
	}
}

console.log('writing '+outputfile);
fs.writeFileSync(outputfile, JSON.stringify(obj, undefined, 2));

