var ILDA = require('../dist/ilda.js').ILDA;
var fs = require('fs');

if (process.argv.length < 4) {
	console.log('usage: node ild2json.js [input.ild] [output.json]');
	process.exit(0);
}

var ildfile = process.argv[2];
var jsonfile = process.argv[3];

console.log('converting '+ildfile+' to '+jsonfile+'...');

Buffer.prototype.toByteArray = function () { return Array.prototype.slice.call(this, 0); }

fs.stat(ildfile, function(err, stat) {
    if (err) {
        console.error(err);
        return;
    }
	// console.log(stat);
	fs.open(ildfile, 'r', function(err, fd) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    var buffer = new Buffer(stat.size);
	    fs.read(fd, buffer, 0, stat.size, 0, function(err, num) {
	        // console.log('got '+ildfile+': ('+num+' bytes)');
	        var bytearray = buffer.toByteArray();
	       	ILDA.Reader.fromByteArray(bytearray, function(file) {
				// console.log('writing file: ' + jsonfile);
	        	fs.writeFileSync(jsonfile, JSON.stringify(file, null, 2));
	        });
	    });
	});
});
