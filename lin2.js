/* 2-d linear algebra primitives */

function vector(x, y) {
    return {
	x: x, y: y,
	dir: function() { return this.scale(1/this.length()) },
	length: function() { return Math.sqrt(this.dot(this)) },
	dist: function(w) { return this.sub(w).length() },
	scale: function(s) { return vector(s*this.x, s*this.y) },
	add: function(w) { return vector(this.x + w.x, this.y + w.y) },
	sub: function(w) { return vector(this.x - w.x, this.y - w.y) },
	dot: function(w) { return this.x * w.x + this.y * w.y }
    }
}

function matrix(v, w) {
    return {
	v: v, w: w,
	scale: function(s) { return matrix(this.v.scale(s), this.w.scale(s)) },
	add: function(n) { return matrix(this.v.add(n.v), this.w.add(n.w)) },
	sub: function(n) { return matrix(this.v.sub(n.v), this.w.sub(n.w)) },
	trans: function() { return matrix(vector(this.v.x, this.w.x),
					  vector(this.v.y, this.w.y)) },
	mul: function(n) { n = n.trans();
			   return matrix(this.v.dot(n.v), this.w.dot(n.w)) },
	mulv: function(v) { return vector(this.v.dot(v), this.w.dot(v)) },
	det: function() { return this.v.x * this.w.y - this.v.y * this.w.x }
    }
}


function rotm(alpha) {
    return matrix(vector(Math.cos(alpha), -Math.sin(alpha)),
		  vector(Math.sin(alpha), Math.cos(alpha)))
}
