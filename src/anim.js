/*

var SegmentTypes = {
	UNKNOWN: 1
}

var Segment = function() {
	this.type = SegmentTypes.UNKNOWN;
}

var Frame = function() {
	this.segments = [];
}

Frame.prototype.clone = function() {
	var f = new Frame();
	for (var s in this.segments) {
		f.segments.push({

		});
	}
	return f;
}

var Animation = function() {
	this.framerate = 15;
	this.frames = [];
}

Animation.prototype.append = function(data) {
	if (typeof(data) == typeof(Animation)) {
		for (frame in anim.frames) {
			this.frames.push(frame.clone());
		}
	}
	else if (typeof(data) == typeof(Frame)) {
		this.frames.push(frame.clone());
	}
}


ILDA['Frame'] = Frame;
ILDA['Animation'] = Animation;

*/
