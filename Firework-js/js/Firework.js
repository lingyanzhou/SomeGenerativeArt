var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner || Matter.Runner;

function Firework(ele, debugEle) {
  this.phxEngine = Engine.create();

  if (debugEle != null) {
    this.debugRender = Render.create({
      element: document.querySelector(debugEle),
      engine: this.phxEngine,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: Firework.WIDTH+0, y: Firework.HEIGHT+0 }
      },
      options: {
        width: Firework.WIDTH+0,
        height: Firework.HEIGHT+0,
        wireframes: true,

      }
    });
    Render.run(this.debugRender);
  }

  this.app = new PIXI.Application({
    width: Firework.WIDTH,
    height: Firework.HEIGHT,
    autoStart: false,
    view: document.querySelector(ele),
    backgroundColor: '#000000'
  });

  this.renderTexture = PIXI.RenderTexture.create(Firework.WIDTH, Firework.HEIGHT, PIXI.SCALE_MODES.LINEAR, 0.5);
  this.renderTextureSwp = PIXI.RenderTexture.create(Firework.WIDTH, Firework.HEIGHT, PIXI.SCALE_MODES.LINEAR, 0.5);

  this.bg = new PIXI.Sprite();
  this.bg.width = Firework.WIDTH;
  this.bg.height = Firework.HEIGHT;
  this.bg.alpha = 0.9;

  this.backgroundContainer = new PIXI.Container();
  this.backgroundContainer.addChild(this.bg); //TODO
  this.particleContainer = new PIXI.particles.ParticleContainer();
  this.app.stage.addChild(this.backgroundContainer);
  this.app.stage.addChild(this.particleContainer);
  this.particleRegister = [];

  this.isPaused = true;
  this.app.ticker.add(this.tick, this);
}

Firework.WIDTH = 800;
Firework.HEIGHT = 400;
Firework.SHELL_RADIUS = {min: 1, max: 3};
Firework.SHELL_RELEASE_SPEED = {min: 12, max: 19};

Firework.prototype.start = function () {
  this.app.ticker.start();
}

Firework.prototype.pause = function () {
  this.app.ticker.stop();
}

Firework.prototype.toggleAnimation = function () {
  if (this.isPaused) {
    this.app.ticker.start();
    this.isPaused = false;
  } else {
    this.app.ticker.stop();
    this.isPaused = true;
  }
}

Firework.prototype.randomReleaseVelocity = function () {
  return {
    x: 0,
    y: -Math.random() * (Firework.SHELL_RELEASE_SPEED.max - Firework.SHELL_RELEASE_SPEED.min) - Firework.SHELL_RELEASE_SPEED.min
  };
}

Firework.prototype.randomReleasePosition = function () {
  return {
    x: Math.random() * Firework.WIDTH,
    y: Firework.HEIGHT
  };
}

Firework.prototype.randomShellRadius = function () {
  return Math.random() * (Firework.SHELL_RADIUS.max - Firework.SHELL_RADIUS.min) + Firework.SHELL_RADIUS.min;
}

Firework.prototype.randomExplosionSpeed = function () {
  return Math.random()*8-6;
}

Firework.prototype.fireShell = function () {
  var tmp = new Shell(
    this.phxEngine,
    this.app.renderer,
    this.particleContainer,
    [this.particleRegister],
    this.randomShellRadius(),
    this.randomReleasePosition(),
    this.randomReleaseVelocity(),
    new RainbowColorStrategy(100),
    new ExplodeStrategy(
      this.phxEngine,
      this.app.renderer,
      this.particleContainer,
      [this.particleRegister],
      this.randomExplosionSpeed(),
      function () { return new RainbowColorStrategy(100); },
      function () { return new DieStrategy(500); }
    )
  );
  tmp.register();
}

Firework.prototype.tick = function (dt) {
  this.bg.texture = this.renderTextureSwp;
  var tmp = this.renderTextureSwp;
  this.renderTextureSwp = this.renderTexture;
  this.renderTexture = tmp;

  for (var o of this.particleRegister.slice()) {
    o.updateView(this.app.ticker.elapsedMS);
  }
  Engine.update(this.phxEngine);
  this.app.renderer.render(this.app.stage, this.renderTextureSwp);
  this.app.render();
};
