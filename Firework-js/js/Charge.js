var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner ||Matter.Runner;

function Charge(phxEngine, renderer, stage, objRegisters, radius, position, velocity, colorStrategy, dieStrategy) {
  Particle.call(this, phxEngine, renderer, stage, objRegisters);
  this.radius = radius;
  this.phxObj = Bodies.circle(0, 0, this.radius, {
    frictionAir: 0.05,
    collisionFilter: {
      group: -1
    }
  });
  Body.setPosition(this.phxObj, position);
  Body.setVelocity(this.phxObj, velocity);
  this.colorStrategy  = colorStrategy;
  this.dieStrategy = dieStrategy;
  this.sprite = new PIXI.Sprite();
  var graphics = new PIXI.Graphics();
  graphics.beginFill(0xffffff);
  graphics.drawCircle(0, 0, this.radius);
  graphics.endFill();
  this.sprite.texture = graphics. generateCanvasTexture(PIXI.SCALE_MODES.NEAREST, 1);
  this.colorStrategy.initColor(this);
  this.sprite.x = this.phxObj.position.x;
  this.sprite.y = this.phxObj.position.y;
}
Charge.prototype = Object.create(Particle.prototype);

Charge.prototype.updateView = function (td) {
  this.sprite.x = this.phxObj.position.x;
  this.sprite.y = this.phxObj.position.y;
  if (this.colorStrategy) { // TODO
    this.colorStrategy.update(td, this);
  }
  if (this.dieStrategy) { // TODO
    this.dieStrategy.update(td, this);
  }
}

Charge.prototype.draw = function (color) {
  this.sprite.tint = color;
}
