// A simple example of how to generate .ild files, this will generate a spinning 3d cube.

var ILDA = require('../dist/ilda.js').ILDA;
var fs = require('fs');

if (process.argv.length < 3) {
	console.log('usage: node makecube.js [filename.js]');
	process.exit(0);
}

var file = new ILDA.File();
var TOTALFRAMES = 500;
var rot = { x:0, y:0, z:0 };
var filename = process.argv[2];

console.log('writing '+filename);

function drawLine(section, x0,y0, x1,y1, color) {
	section.points.push({
		x: x0,
		y: y0,
		z: 0,
		color: color,
		blanking: true,
	});
	for (var l=0; l<6; l++) {
		var t = l / 6.0;
		var x = x0 + (x1 - x0) * t;
		var y = y0 + (y1 - y0) * t;
		section.points.push({
			x: x,
			y: y,
			z: 0,
			color: color,
			blanking: false,
		});
	}
}

var vertices = [
	{ x: -1, y: -1, z: -1 },
	{ x: 1, y: -1, z: -1 },
	{ x: 1, y: 1, z: -1 },
	{ x: -1, y: 1, z: -1 },
	{ x: -1, y: -1, z: 1 },
	{ x: 1, y: -1, z: 1 },
	{ x: 1, y: 1, z: 1 },
	{ x: -1, y: 1, z: 1 },
];

var edges = [
	{ a: 0, b: 1, color: 1 },
	{ a: 1, b: 2, color: 1 },
	{ a: 2, b: 3, color: 1 },
	{ a: 3, b: 0, color: 1 },
	{ a: 4, b: 5, color: 72 },
	{ a: 5, b: 6, color: 72 },
	{ a: 6, b: 7, color: 72 },
	{ a: 7, b: 4, color: 72 },
	{ a: 0, b: 4, color: 123 },
	{ a: 1, b: 5, color: 123 },
	{ a: 2, b: 6, color: 123 },
	{ a: 3, b: 7, color: 123 }
];



function rotate2d(pt, ang) {
	var a = ang * 3.142 / 180.0;
	return {
		x: pt.x * Math.cos(a) - pt.y * Math.sin(a),
		y: pt.y * Math.cos(a) + pt.x * Math.sin(a)
	};
}

function rotateAndProject(point, rot) {

	var x = point.x;
	var y = point.y;
	var z = point.z;
	var ro;

	// rotate xy around z 
	ro = rotate2d({ x: x, y: y }, rot.z);
	x = ro.x;
	y = ro.y;

	// rotate xz around y 
	ro = rotate2d({ x: x, y: z }, rot.y);
	x = ro.x;
	z = ro.y;

	// rotate yz around x
	ro = rotate2d({ x: y, y: z }, rot.x);
	y = ro.x;
	z = ro.y;

	var zoffset = 1.0;
	var zdiv = 3.0;

	var sx = x * 1.0 / (z / zdiv + zoffset);
	var sy = y * 1.0 / (z / zdiv + zoffset);

	return {
		x: sx * 15000,
		y: sy * 15000
	};
}

function generateCubeFrame(fr) {
	var s = new ILDA.Section();
	s.type = ILDA.SectionTypes.THREE_DIMENSIONAL;
	s.name = 'CUBE'+fr;
	s.index = fr;
	s.head = 1;
	s.total = TOTALFRAMES;
	for (var i=0; i<1; i++) {
		for (var e=0; e<edges.length; e++) {
			var edge = edges[e];
			var s0 = rotateAndProject(vertices[edge.a], rot);
			var s1 = rotateAndProject(vertices[edge.b], rot);
			drawLine(s, s0.x, s0.y, s1.x, s1.y, edge.color);
		}
	}
	file.sections.push(s);
}

for (var i=0; i<TOTALFRAMES; i++) {
	generateCubeFrame(i);
	rot.x += 2.3;
	rot.y += 2.0;
	rot.z += 3.8;
}

ILDA.Writer.toByteArray(file, function(arr) {
	fs.writeFileSync(filename, new Buffer(new Uint8Array(arr)));
});
