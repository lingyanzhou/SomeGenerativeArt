function Fire(eleId, vertId, fireFragId, blendFragId) {
  this.app = new PIXI.Application({
    width: Fire.WIDTH,
    height: Fire.HEIGHT,
    autoStart: false,
    view: document.querySelector(eleId),
    backgroundColor: '#000000'
  });
  var vert = document.querySelector(vertId).text;
  var fireFrag = document.querySelector(fireFragId).text;
  var blendFrag = document.querySelector(blendFragId).text;

  this.fireTextures = [];
  this.fireTextures[0] = PIXI.RenderTexture.create(Fire.WIDTH, Fire.HEIGHT);
  this.fireTextures[1] = PIXI.RenderTexture.create(Fire.WIDTH, Fire.HEIGHT);
  this.fireSprites = [];
  this.fireSprites[0] = new PIXI.Sprite(this.fireTextures[0]);
  this.fireSprites[1] = new PIXI.Sprite(this.fireTextures[1]);
  this.fireSource = new PIXI.Sprite(PIXI.Texture.from(Fire.SOURCE));
  this.coolingTexture = PIXI.Texture.from(Fire.COOLING);
  this.coolingTexture.baseTexture.wrapMode =  PIXI.WRAP_MODES.MIRRORED_REPEAT;
  this.coolingSource = new PIXI.Sprite(this.coolingTexture);

  this.app.stage.addChild(this.coolingSource);
  this.app.stage.addChild(this.fireSource);
  this.app.stage.addChild(this.fireSprites[1]);
  this.app.stage.addChild(this.fireSprites[0]);

  this.fireFilter = new MultiTextureFilter([this.coolingSource], vert, fireFrag, {offset: 0.0, scale: 0.5})
  this.blendFilter = new MultiTextureFilter([this.fireSource], vert, blendFrag, {});

  this.lastUpdate = 0;
  this.app.ticker.add(this.tick, this);
  this.app.ticker.start();
}

Fire.WIDTH = 256;
Fire.HEIGHT = 256;
Fire.COOLING = "img/Perlin.png";
Fire.SOURCE = "img/fire.png";


Fire.prototype.start = function () {
  this.app.ticker.start();
}

Fire.prototype.pause = function () {
  this.app.ticker.stop();
}

Fire.prototype.toggleAnimation = function () {
  if (this.isPaused) {
    this.app.ticker.start();
    this.isPaused = false;
  } else {
    this.app.ticker.stop();
    this.isPaused = true;
  }
}

Fire.prototype.randomizeRippleSeed = function (x, y) {
  this.rippleFilters[0].uniforms.rippleSeed = new Float32Array([Math.random()*Fire.HEIGHT, Math.random()*Fire.HEIGHT]);
}

Fire.prototype.resetSeed = function (x, y) {
  this.rippleFilters[0].uniforms.rippleSeed = new Float32Array([-10, -10]);
}

Fire.prototype.tick = function (dt) {

  this.lastUpdate += 1;
  if (this.lastUpdate >= 2) {
    this.fireFilter.uniforms.offset += 0.01;
    this.fireFilter.uniforms.scale = Math.random()*.1+0.2;
    this.fireSprites[0].filters = [this.fireFilter];
    this.app.renderer.render(this.fireSprites[0], this.fireTextures[1]);
    this.fireSprites[1].filters = [this.blendFilter];
    this.app.renderer.render(this.fireSprites[1], this.fireTextures[0]);

    this.app.render();

    this.lastUpdate = 0;
  }
  this.app.render();
};
