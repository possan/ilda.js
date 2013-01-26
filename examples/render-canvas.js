(function() {

	var g_file = new ILDA.File();
	var section = 0;
	var point = 0;
	var defaultcolors = [
		'#f00',
		'#0f0',
		'#00f',
		'#ff0',
		'#0ff',
		'#f0f',
		'#fff'
	];

	Uint8Array.prototype.toByteArray = function () { return Array.prototype.slice.call(this, 0); }

	function dragOver(evt) {
		// console.log('dragOver', evt);
		evt.stopPropagation();
		evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; 
	}

	function drop(evt) {
		console.log('drop', evt);
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files;
		var count = files.length;
		if (count > 0)
			handleFiles(files);
	}

	function handleReaderLoad(evt) {
		console.log('handleReaderLoad', evt);
		if (evt.target.readyState == FileReader.DONE) {
			console.log('done', evt.target.result);
			var buffer = evt.target.result;
			console.log(buffer);
			var bytebuffer = new Uint8Array(buffer);
			// console.log(bytebuffer);
			var bytes = bytebuffer.toByteArray();
			// console.log(bytes);
			ILDA.Reader.fromByteArray(bytes, function(data) {
				console.log('loaded file', data);
				g_file = data;
			});
		}
	}

	function handleFiles(files) {
		var file = files[0];
		console.log('handleFiles', file);
		var reader = new FileReader();
		reader.onload = handleReaderLoad;
		reader.readAsArrayBuffer(file);
	}

	function loaded() {
		var dropbox = document.getElementById("upload");
		dropbox.addEventListener("dragover", dragOver, false);
		dropbox.addEventListener("drop", drop, false);
		dropbox = document.getElementById("screen");
		dropbox.addEventListener("dragover", dragOver, false);
		dropbox.addEventListener("drop", drop, false);
	}

	var can = document.getElementById('canvas1');
	var ctx = can.getContext('2d');

	var lastpoint = { x: 0, y: 0 };

	function stepLaser () {
		if (section >= g_file.sections.length) {
			section = 0;
			point = 0;
		}
		if (section < g_file.sections.length) {
			var seg = g_file.sections[section];
			if (point < seg.points.length) {
				var pt = seg.points[point];
				// console.log('draw', pt);
				var newpoint = {
					x: 250 + 240 * pt.x / 32768,
					y: 250 - 240 * pt.y / 32768
				}
				if (!pt.blanking) {
					ctx.strokeStyle = defaultcolors[pt.color % defaultcolors.length];
					ctx.beginPath();
				    ctx.moveTo(lastpoint.x, lastpoint.y);
				    ctx.lineTo(newpoint.x, newpoint.y);
				    ctx.closePath();
				    ctx.stroke();
			    }
			    lastpoint.x = newpoint.x;
			    lastpoint.y = newpoint.y;
				point ++;
			} else {
				section ++;
				point = 0;
			}
		}
	}

	var speed = 100;

	function moveLaser () {
		// fade background a bit...
		ctx.globalAlpha = 0.1;
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, 500, 500);
		ctx.globalAlpha = 1.0;
		for (var i=0; i<speed; i++ )
			stepLaser();
	}
	setInterval(moveLaser, 5);

	var re = document.getElementById('speed');
	re.addEventListener('change', function(){
		speed = re.value;
	});

	window.addEventListener('load', loaded);

})();
