var Noise = noise.Noise;

function ForceField(magScale, tScale, width, height, gridSize) {
  this.dirNoise = new Noise(Math.random());
  this.t = 0;
  this.width = width;
  this.height = height;
  this.magScale = magScale;
  this.tScale = tScale;
  this.angleTable = [];
  this.gridSize = gridSize;
  this.calculate();
}

ForceField.prototype.tick = function (dt) {
  this.t += dt;
  this.calculate();
}

ForceField.POS_SCALE = 0.005;

ForceField.prototype.calculate = function () {
  this.angleTable = [];
  for (let i=0; i * this.gridSize - this.gridSize < this.height; i += 1) {
    this.angleTable[i] = [];
    for (let j=0; j * this.gridSize - this.gridSize < this.width; j += 1) {
      this.angleTable[i][j] = Math.PI * 2 * this.dirNoise.perlin3(ForceField.POS_SCALE * i * this.gridSize, ForceField.POS_SCALE * j * this.gridSize, this.t * this.tScale);
    }
  }
}

ForceField.prototype.lookup = function (position) {
  if (position.x < 0 || position.x >= this.width ||
    position.y < 0 || position.y >= this.height
  ) {
    return {x:0, y: 0};
  }
  var angle = this.angleTable[Math.floor(position.y/this.gridSize)][Math.floor(position.x/this.gridSize)];
  var force = {}
  force.x = this.magScale * Math.cos(angle);
  force.y = this.magScale * Math.sin(angle);
  return force;
}
