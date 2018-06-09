var Engine = Engine || Matter.Engine,
  Render = Render || Matter.Render,
  World = World || Matter.World,
  Bodies = Bodies || Matter.Bodies,
  Body = Body || Matter.Body,
  Events = Events || Matter.Events,
  Runner = Runner || Matter.Runner;

function Flow(ele) {
  this.app = new PIXI.Application({
    width: Flow.WIDTH,
    height: Flow.HEIGHT,
    autoStart: false,
    view: document.querySelector(ele),
    backgroundColor: '#ffffff'
  });

  this.particleContainer = new PIXI.particles.ParticleContainer();
  this.particles= [];
  for (let i=0; i<Flow.PARTICLES; i++) {
    let particle = new Particle(this.particleContainer, Flow.PARTICLE_RADIUS, {x: Flow.WIDTH*Math.random(), y: Flow.HEIGHT*Math.random()});
    particle.register();
    this.particles.push(particle);
  }
  this.renderTexture = PIXI.RenderTexture.create(Flow.WIDTH, Flow.HEIGHT);
  this.renderTextureSprite = new PIXI.Sprite(this.renderTexture);
  this.renderTexture2 = PIXI.RenderTexture.create(Flow.WIDTH, Flow.HEIGHT);
  this.renderTextureSprite2 = new PIXI.Sprite(this.renderTexture2);
  this.fakeStage = new PIXI.Container();
  this.fakeStage.addChild(this.renderTextureSprite);
  this.fakeStage.addChild(this.particleContainer);
  this.renderTextureSprite.alpha = 1;
  this.particleContainer.alpha = 0.05;
  this.app.stage.addChild(this.renderTextureSprite2);
  this.forceField = new ForceField(Flow.FORCE_MAG_SCALE, Flow.FORCE_TIME_SCALE, Flow.WIDTH, Flow.HEIGHT, Flow.FORCE_GRID_SIZE);
  this.app.ticker.add(this.tick, this);
  this.app.ticker.start();
}

Flow.WIDTH = 900;
Flow.HEIGHT = 700;
Flow.PARTICLE_RADIUS = 0.6;
Flow.FORCE_GRID_SIZE = 10;
Flow.FORCE_MAG_SCALE = 1;
Flow.FORCE_TIME_SCALE = 0.005;
Flow.PARTICLES = 1000;

Flow.prototype.randomReleasePosition = function () {
  return {
    x: Math.random() * Flow.WIDTH,
    y: 0
  };
}

Flow.prototype.Flow = function () {
  var tmp = this.particleFactory.make();
  tmp.register();
}

Flow.prototype.tick = function (dt) {
  this.forceField.tick(dt);

  for (var o of this.particles) {
    if (o.position.x < 0) {
      o.position.x += Flow.WIDTH;
    }
    if (o.position.x > Flow.WIDTH) {
      o.position.x -= Flow.WIDTH;
    }
    if (o.position.y < 0) {
      o.position.y += Flow.HEIGHT;
    }
    if (o.position.y > Flow.HEIGHT) {
      o.position.y -= Flow.HEIGHT;
    }
    o.update(this.app.ticker.elapsedMS, this.forceField);
  }
  this.app.renderer.render(this.fakeStage, this.renderTexture2);
  this.app.renderer.render(this.app.stage, this.renderTexture);
  this.app.render();
};
