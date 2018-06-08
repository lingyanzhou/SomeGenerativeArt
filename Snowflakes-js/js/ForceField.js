var Noise = noise.Noise;
var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner ||Matter.Runner;

function ForceField(magScale, tScale) {
  this.magNoise = new Noise(Math.random());
  this.dirNoise = new Noise(Math.random());
  this.t = 0;
  this.magScale = magScale;
  this.tScale = tScale;
}

ForceField.prototype.tick = function (dt) {
  this.t += dt;
}
ForceField.POS_SCALE = 0.005;
ForceField.prototype.apply = function (phxObj) {
  var mag = this.magScale * this.magNoise.perlin3(ForceField.POS_SCALE * phxObj.position.x, ForceField.POS_SCALE * phxObj.position.y, this.t * this.tScale);
  var angle = Math.PI * 2 * this.dirNoise.perlin3(ForceField.POS_SCALE * phxObj.position.x, ForceField.POS_SCALE * phxObj.position.y, this.t * this.tScale);
  Body.applyForce(phxObj, phxObj.position, {x: mag*Math.cos(angle), y: mag*Math.sin(angle)});
}
