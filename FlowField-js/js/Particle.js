var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner ||Matter.Runner;

function Particle(stage, radius, initPosition) {
  this.stage = stage;
  this.radius = radius;
  this.position = initPosition;
  this.velocity = {x:0, y:0};
  this.sprite = PIXI.Sprite.from(Particle.PARTICLE_FILE);
  this.sprite.tint = (Math.random()*0x7fffff); // To make them biased
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.sprite.width = 2*this.radius;
  this.sprite.height = 2*this.radius;
  this.sprite.x = this.position.x;
  this.sprite.y = this.position.y;
  this.maxSpeed = this.radius;
}

Particle.PARTICLE_FILE = 'img/particle.png';

Particle.randomRadius = function () {
  return Math.random() * 6 + 6;
}

Particle.prototype.frictionAir = function () {
  return (16-this.radius) * 0.05;
}

Particle.prototype.update = function (td, forceField) {
  this.position.x = this.position.x + this.velocity.x;
  this.sprite.x = this.position.x;
  this.position.y = this.position.y + this.velocity.y;
  this.sprite.y = this.position.y;
  var force = forceField.lookup(this.position);
  this.velocity.x = this.velocity.x + force.x;
  this.velocity.y = this.velocity.y + force.y;
  var speed = Particle.vec2Length(this.velocity);
  if (speed > this.maxSpeed) {
    this.velocity.x = this.velocity.x / speed * this.maxSpeed;
    this.velocity.y = this.velocity.y / speed * this.maxSpeed;
  }
}

Particle.vec2Length = function(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

Particle.prototype.register = function () {
  this.stage.addChild(this.sprite);
}

Particle.prototype.unregister = function () {
  this.stage.removeChild(this.sprite);
}

Particle.prototype.destroy = function () {
  this.sprite.destroy();
}
