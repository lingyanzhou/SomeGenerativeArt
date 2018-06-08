var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner ||Matter.Runner;

function Snowflake(phxEngine, renderer, stage, texture, objRegisters, initPosition) {
  this.phxEngine = phxEngine;
  this.renderer = renderer;
  this.stage = stage;
  this.radius = Snowflake.randomRadius();
  this.phxObj = new Bodies.circle(initPosition.x, initPosition.y, this.radius, {
    collisionFilter: {
      group: -1
    }
  });
  this.phxObj.frictionAir = this.frictionAir();
  this.objRegisters = objRegisters;
  this.sprite = new PIXI.Sprite(texture);
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.sprite.width = 2 * this.radius;
  this.sprite.height = 2 * this.radius;
}

Snowflake.randomRadius = function () {
  return Math.random() * 6 + 6;
}

Snowflake.prototype.frictionAir = function () {
  return (16-this.radius) * 0.05;
}

Snowflake.prototype.updateView = function (td) {
  this.sprite.x = this.phxObj.position.x;
  this.sprite.y = this.phxObj.position.y;
  this.sprite.rotation = this.phxObj.angle;
}

Snowflake.prototype.register = function () {
  World.add(this.phxEngine.world, this.phxObj);
  this.stage.addChild(this.sprite);
  for (var r of this.objRegisters) {
    r.push(this);
  }
}

Snowflake.prototype.unregister = function () {
  Matter.Composite.remove(this.phxEngine.world, this.phxObj);
  this.stage.removeChild(this.sprite);
  for (var r of this.objRegisters) {
    r.splice(r.indexOf(this), 1);
  }
}

Snowflake.prototype.destroy = function () {
  this.sprite.destroy();
}
