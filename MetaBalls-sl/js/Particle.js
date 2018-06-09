function Particle(x, y, vx, vy, radius) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
}

Particle.prototype.testBounceT = function(wallY) {
  if (this.y - this.radius < wallY) {
    this.y = wallY + this.radius;
    this.vy = Math.abs(this.vy)
  }
}

Particle.prototype.testBounceB = function(wallY) {
  if (this.y + this.radius > wallY) {
    this.y = wallY - this.radius;
    this.vy = -Math.abs(this.vy)
  }
}

Particle.prototype.testBounceL = function(wallX) {
  if (this.x - this.radius < wallX) {
    this.x = wallX + this.radius;
    this.vx = Math.abs(this.vx)
  }
}

Particle.prototype.testBounceR = function(wallX) {
  if (this.x + this.radius > wallX) {
    this.x = wallX - this.radius;
    this.vx = -Math.abs(this.vx)
  }
}

Particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
}
