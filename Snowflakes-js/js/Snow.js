var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner || Matter.Runner;

function Snow(ele, debugEle) {
  this.phxEngine = Engine.create();

  if (debugEle != null) {
    this.debugRender = Render.create({
      element: document.querySelector(debugEle),
      engine: this.phxEngine,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: Snow.WIDTH+0, y: Snow.HEIGHT+0 }
      },
      options: {
        width: Snow.WIDTH+0,
        height: Snow.HEIGHT+0,
        wireframes: true,

      }
    });
    Render.run(this.debugRender);
  }

  this.app = new PIXI.Application({
    width: Snow.WIDTH,
    height: Snow.HEIGHT,
    autoStart: false,
    view: document.querySelector(ele),
    backgroundColor: '#000000'
  });

  this.particleContainer = new PIXI.particles.ParticleContainer();
  this.app.stage.addChild(this.particleContainer);
  this.particleRegister = [];
  this.particleFactory = new ParticleFactory(Snow.TEXTURES, this.phxEngine, this.app.renderer, this.particleContainer, [this.particleRegister], this.randomReleasePosition.bind(this));
  this.forceField = new ForceField(Snow.FORCE_MAG_SCALE, Snow.FORCE_TIME_SCALE);
  this.isPaused = true;
  this.app.ticker.add(this.tick, this);
}

Snow.WIDTH = 800;
Snow.HEIGHT = 800;
Snow.FORCE_MAG_SCALE = 0.0005;
Snow.FORCE_TIME_SCALE = 0.003;
Snow.TEXTURES = "img/snowflakes.png"

Snow.prototype.start = function () {
  this.app.ticker.start();
}

Snow.prototype.pause = function () {
  this.app.ticker.stop();
}

Snow.prototype.toggleAnimation = function () {
  if (this.isPaused) {
    this.app.ticker.start();
    this.isPaused = false;
  } else {
    this.app.ticker.stop();
    this.isPaused = true;
  }
}

Snow.prototype.randomReleasePosition = function () {
  return {
    x: Math.random() * Snow.WIDTH,
    y: 0
  };
}

Snow.prototype.snow = function () {
  var tmp = this.particleFactory.make();
  tmp.register();
}

Snow.prototype.tick = function (dt) {
  this.forceField.tick(dt);
  for (var o of this.particleRegister.slice()) {
    if (o.phxObj.position.y > Snow.HEIGHT+50
      || o.phxObj.position.y < -50
      || o.phxObj.position.x > Snow.WIDTH+50
      || o.phxObj.position.x < -50
    ) {
      o.unregister();
      o.destroy();
    }
  }
  for (var o of this.particleRegister) {
    this.forceField.apply(o.phxObj);
  }
  for (var o of this.particleRegister) {
    o.updateView(this.app.ticker.elapsedMS);
  }
  Engine.update(this.phxEngine);
  this.app.render();
};
