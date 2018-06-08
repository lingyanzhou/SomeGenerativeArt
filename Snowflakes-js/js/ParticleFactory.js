function ParticleFactory(img, phxEngine, renderer, particleContainer, objRegisters, posFunc) {
  this.phxEngine = phxEngine;
  this.renderer = renderer;
  this.particleContainer = particleContainer;
  this.objRegisters = objRegisters;
  this.baseTexture = PIXI.BaseTexture.fromImage(img);
  this.posFunc = posFunc;
  this.tiles = [];
  for (var i =0; i< ParticleFactory.TILE_ROW; i++) {
    this.tiles[i] = [];
    for (var j =0; j< ParticleFactory.TILE_COL; j++) {
      this.tiles[i][j] = new PIXI.Texture(this.baseTexture,
        new PIXI.Rectangle(j*ParticleFactory.TILE_WIDTH, i*ParticleFactory.TILE_HEIGHT, ParticleFactory.TILE_WIDTH, ParticleFactory.TILE_HEIGHT
        )
      )
    }
  }
}

ParticleFactory.prototype.getRandomTexture = function() {
  return this.tiles[Math.floor(Math.random()*ParticleFactory.TILE_ROW)][Math.floor(Math.random()*ParticleFactory.TILE_COL)];
}

ParticleFactory.prototype.make = function() {
  return new Snowflake(
    this.phxEngine,
    this.renderer,
    this.particleContainer,
    this.getRandomTexture(),
    this.objRegisters,
    this.posFunc()
  );
}

ParticleFactory.TILE_WIDTH = 64;
ParticleFactory.TILE_HEIGHT = 64;

ParticleFactory.TILE_ROW = 4;
ParticleFactory.TILE_COL = 4;
