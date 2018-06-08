function WaterRipple(eleId, fragId, frag2Id, vert3Id, frag3Id) {
  this.app = new PIXI.Application({
    width: WaterRipple.WIDTH,
    height: WaterRipple.HEIGHT,
    autoStart: false,
    view: document.querySelector(eleId),
    backgroundColor: '#000000'
  });
  var waterRippleFrag = document.querySelector(fragId).text;
  var waterRippleFrag2 = document.querySelector(frag2Id).text;
  var waterRippleVert3 = document.querySelector(vert3Id).text;
  var waterRippleFrag3 = document.querySelector(frag3Id).text;
  this.rippleTextures = [];
  this.rippleTextures[0] = PIXI.RenderTexture.create(WaterRipple.WIDTH, WaterRipple.HEIGHT);
  this.rippleTextures[1] = PIXI.RenderTexture.create(WaterRipple.WIDTH, WaterRipple.HEIGHT);
  this.rippleTextures[2] = PIXI.RenderTexture.create(WaterRipple.WIDTH, WaterRipple.HEIGHT);
  this.rippleSprites = [];
  this.rippleSprites[0] = new PIXI.Sprite(this.rippleTextures[0]);
  this.rippleSprites[1] = new PIXI.Sprite(this.rippleTextures[1]);
  this.rippleSprites[2] = new PIXI.Sprite(this.rippleTextures[2]);
  this.bg = new PIXI.Sprite(PIXI.Texture.from(WaterRipple.CHECKBOARD));

  this.app.stage.addChild(this.bg);
  this.app.stage.addChild(this.rippleSprites[2]);
  this.rippleFilters = [];
  this.rippleFilters[0] = new PIXI.Filter(null, waterRippleFrag);
  this.rippleFilters[1] = new PIXI.Filter(null, waterRippleFrag2);
  this.displacementFilter = new PIXI.filters.DisplacementFilter(this.rippleSprites[2], 10);
  this.shadowFilter = new MultiTextureFilter([this.rippleSprites[2]], waterRippleVert3, waterRippleFrag3, {});
  this.bg.filters = [this.displacementFilter, this.shadowFilter];

  this.randomizeRippleSeed();
  this.lastUpdate = 0;
  this.app.ticker.add(this.tick, this);
  this.app.ticker.start();
}

WaterRipple.WIDTH = 800;
WaterRipple.HEIGHT = 800;
WaterRipple.CHECKBOARD = "img/checkerboard-pattern.png";


WaterRipple.prototype.start = function () {
  this.app.ticker.start();
}

WaterRipple.prototype.pause = function () {
  this.app.ticker.stop();
}

WaterRipple.prototype.toggleAnimation = function () {
  if (this.isPaused) {
    this.app.ticker.start();
    this.isPaused = false;
  } else {
    this.app.ticker.stop();
    this.isPaused = true;
  }
}

WaterRipple.prototype.randomizeRippleSeed = function (x, y) {
  this.rippleFilters[0].uniforms.rippleSeed = new Float32Array([Math.random()*WaterRipple.HEIGHT, Math.random()*WaterRipple.HEIGHT]);
}

WaterRipple.prototype.resetSeed = function (x, y) {
  this.rippleFilters[0].uniforms.rippleSeed = new Float32Array([-10, -10]);
}

WaterRipple.prototype.tick = function (dt) {

  this.lastUpdate += 1;
  if (this.lastUpdate >= 1) {
    this.randomizeRippleSeed();
    this.rippleSprites[0].filters = [this.rippleFilters[0]];
    this.app.renderer.render(this.rippleSprites[0], this.rippleTextures[1]);
    this.rippleSprites[1].filters = [];
    this.app.renderer.render(this.rippleSprites[1], this.rippleTextures[0]);
    this.rippleSprites[1].filters = [this.rippleFilters[1]]
    this.app.renderer.render(this.rippleSprites[1], this.rippleTextures[2]);
    this.resetSeed();
    this.lastUpdate = 0;
  }
  this.app.render();
};
