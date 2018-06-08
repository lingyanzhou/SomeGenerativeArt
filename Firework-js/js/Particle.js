var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner ||Matter.Runner;

function Particle(phxEngine, renderer, stage, objRegisters) {
  this.phxEngine = phxEngine;
  this.renderer = renderer;
  this.stage = stage;
  this.phxObj = null;
  this.objRegisters = objRegisters;
  this.sprite = null;
  this.customMovement = null;
}

Particle.prototype.updateView = function (td) {
}

Particle.prototype.register = function () {
  World.add(this.phxEngine.world, this.phxObj);
  this.stage.addChild(this.sprite);
  for (var r of this.objRegisters) {
    r.push(this);
  }
}

Particle.prototype.unregister = function () {
  Matter.Composite.remove(this.phxEngine.world, this.phxObj);
  this.stage.removeChild(this.sprite);
  for (var r of this.objRegisters) {
    r.splice(r.indexOf(this), 1);
  }
}

Particle.prototype.destroy = function () {
  this.sprite.destroy();
}

Particle.prototype.setColor = function (color) {
}
