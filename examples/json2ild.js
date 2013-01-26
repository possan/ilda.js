var ILDA = require('../dist/ilda.js').ILDA;
var fs = require('fs');

if (process.argv.length < 4) {
	console.log('usage: node json2ild.js [input.json] [output.ild]');
	process.exit(0);
}

var jsonfile = process.argv[2];
var ildfile = process.argv[3];

console.log('converting '+jsonfile+' to '+ildfile+'...');

var json = fs.readFileSync(jsonfile);
var file = JSON.parse(json);

ILDA.Writer.toByteArray(file, function(bytearray2) {
	var b = new Buffer(bytearray2);
	console.log('writing file: ' + ildfile);
	fs.writeFileSync(ildfile, b);
});
