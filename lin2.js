/* 2-d linear algebra primitives.

   Some notes on the design: The vector and matrix functions are
     implemented as object methods for the sole reason of syntactic
     simplicity. I have not tested for complexity penalties in the
     constructor functions, however. The objects themselves are thought
     of as immutable (ie. methods return new objects).

   A vector v is a 2-tuple (x, y) where x, y are numbers. The methods
     implemented are:

       v.add(w): Vector addition.
       v.sub(w): Vector subtraction.
       v.scale(s): v scaled by the scalar s.
       v.length(): The length of v.
       v.direction(): The direction of v.
       v.distance(w): The distance between v and w.
       v.dot(w): Dot product.

   A matrix m is a 2-tuple (v, w) where v, w are vectors. The methods
     implemented are:

       m.add(n): Matrix addition by the matrix n.
       m.sub(n): Matrix subtraction.
       m.scale(s): m scaled by the scalar s.
       m.transpose(): Matrix transposition (ie. switch rows/cols).
       m.mul(n): Matrix multiplication.
       m.mulv(v): Multiplication by vector v.
       m.det(): Determinant of m (ie. the area of the v, w parallelogram).
 */

function vector(x, y) {
    return {
	x: x, y: y,
	direction: function() { return this.scale(1/this.length()) },
	length: function() { return Math.sqrt(this.dot(this)) },
	distance: function(w) { return this.sub(w).length() },
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
	add: function(m) { return matrix(this.v.add(m.v), this.w.add(m.w)) },
	sub: function(m) { return matrix(this.v.sub(m.v), this.w.sub(m.w)) },
	transpose: function() { return matrix(vector(this.v.x, this.w.x),
					      vector(this.v.y, this.w.y)) },
	mul: function(m) { n = n.transpose();
			   return matrix(this.v.dot(m.v), this.w.dot(m.w)) },
	mulv: function(v) { return vector(this.v.dot(v), this.w.dot(v)) },
	det: function() { return this.v.x * this.w.y - this.v.y * this.w.x }
    }
}


function rotm(alpha) {
    return matrix(vector(Math.cos(alpha), -Math.sin(alpha)),
		  vector(Math.sin(alpha), Math.cos(alpha)))
}
