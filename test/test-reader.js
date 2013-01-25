var ILDA = require('../dist/ilda.js').ILDA;
var fs = require('fs');
var Buffer = require('buffer').Buffer;

var files = [
	// '2002.ild',
	'3palms',
	// '747.ild',
	'alice',
	// 'aurora60.ild',
	// 'maze.ild',
	// 'orca.ild',
	'test_30k'
];

Buffer.prototype.toByteArray = function () { return Array.prototype.slice.call(this, 0); }

function checkFile(fn, fn2, fn3, fn4) {
	console.log('trying to load file: ' + fn);
	fs.stat(fn, function(err, stat) {
	    if (err) {
	        console.error(err);
	        return;
	    }
		// console.log(stat);
		fs.open(fn, 'r', function(err, fd) {
		    if (err) {
		        console.error(err);
		        return;
		    }
		    var buffer = new Buffer(stat.size);
		    fs.read(fd, buffer, 0, stat.size, 0, function(err, num) {
		        console.log('got '+fn+': ('+num+' bytes)');
		        var bytearray = buffer.toByteArray();
        		var b3 = new Buffer(bytearray);
				console.log('writing file: ' + fn4);
	        	fs.writeFileSync(fn4, b3);
		       	ILDA.Reader.fromByteArray(bytearray, function(file) {
					console.log('writing file: ' + fn2);
		        	fs.writeFileSync(fn2, JSON.stringify(file, null, 2));
		        	ILDA.Writer.toByteArray(file, function(bytearray2) {
		        		var b = new Buffer(bytearray2);
						console.log('writing file: ' + fn3);
			        	fs.writeFileSync(fn3, b);
		        	});
		        });
		    });
		});
	});
}


for (var f in files) {
	checkFile(
		'data/'+files[f]+'.ild',
		'build/'+files[f]+'.json',
		'build/'+files[f]+'-new.ild',
		'build/'+files[f]+'-new2.ild'
	);
}