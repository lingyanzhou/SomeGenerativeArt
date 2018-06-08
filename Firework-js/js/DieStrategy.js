function DieStrategy (timeToLive) {
  this.timeToLive = timeToLive;
  this.time = 0;
}

DieStrategy.prototype.update = function(ds, particle) {
  this.time += ds;
  particle.sprite.alpha = 1-Math.pow(this.time / this.timeToLive, 3);
  if (this.time >= this.timeToLive) {
    particle.unregister();
    particle.destroy();
  }
}
