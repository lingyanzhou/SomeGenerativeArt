function MetaBalls(eleId, metaBallsFragId) {
  this.app = new PIXI.Application({
    width: MetaBalls.WIDTH,
    height: MetaBalls.HEIGHT,
    autoStart: false,
    view: document.querySelector(eleId),
    backgroundColor: '#000000'
  });
  var metaBallsFrag = document.querySelector(metaBallsFragId).text;
  metaBallsFrag = metaBallsFrag.replace("%%___BALLSIZE___%%", ""+MetaBalls.PARTICLES);
  console.log(metaBallsFrag)

  this.bg = new PIXI.Sprite(PIXI.Texture.EMPTY);
  this.bg.width = MetaBalls.WIDTH;
  this.bg.height = MetaBalls.HEIGHT;

  this.app.stage.addChild(this.bg);

  this.particles = [];
  for (let i=0; i<MetaBalls.PARTICLES; i++) {
    this.particles.push(new Particle(MetaBalls.WIDTH/2, MetaBalls.HEIGHT/2, Math.random()*4-2, Math.random()*4-2, Math.random()*20+20));
  }
  this.metaBallsFilter = new PIXI.Filter('', metaBallsFrag, {balls: {type:'3fv', value: []}});

  for (let i=0; i<MetaBalls.PARTICLES; ++i) {
    this.metaBallsFilter.uniforms.balls[i*3+0] = (this.particles[i].x);
    this.metaBallsFilter.uniforms.balls[i*3+1] = (this.particles[i].y);
    this.metaBallsFilter.uniforms.balls[i*3+2] = (this.particles[i].radius);
  }

  this.bg.filters = [this.metaBallsFilter];

  this.app.ticker.add(this.tick, this);
  this.app.ticker.start();
}

MetaBalls.PARTICLES = 7;
MetaBalls.WIDTH = 1024;
MetaBalls.HEIGHT = 512;

MetaBalls.prototype.tick = function (dt) {

  for (let p of this.particles) {
    p.update();
    p.testBounceT(0);
    p.testBounceB(MetaBalls.HEIGHT);
    p.testBounceL(0);
    p.testBounceR(MetaBalls.WIDTH);
  }
  for (let i=0; i<MetaBalls.PARTICLES; ++i) {
    this.metaBallsFilter.uniforms.balls[i*3+0] = (this.particles[i].x);
    this.metaBallsFilter.uniforms.balls[i*3+1] = (this.particles[i].y);
    this.metaBallsFilter.uniforms.balls[i*3+2] = (this.particles[i].radius);
  }

  //this.metaBallsFilter.uniforms.balls =  [400., 400., 400.];
  this.app.render();
};
