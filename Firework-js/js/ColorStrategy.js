function ColorStrategy () {
  this.particle = null;
}

ColorStrategy.prototype.initColor = function (particle) {
  particle.draw(this.color);
}

ColorStrategy.prototype.update = function (ds, particle) {
}

function ConstantColorStrategy (color) {
  ColorStrategy.call(this);
  this.color = color;
}

ConstantColorStrategy.prototype = Object.create(ColorStrategy.prototype);

RainbowColorStrategy.prototype.initColor = function (particle) {
  particle.draw(this.color);
}

function RainbowColorStrategy (changePeriod) {
  ColorStrategy.call(this);
  this.changePeriod = changePeriod;
  this.colorIndex = Math.floor(Math.random()*RainbowColorStrategy.colors.length);
  this.sinceLastChange = Math.random()*this.changePeriod;
}

RainbowColorStrategy.prototype = Object.create(ColorStrategy.prototype);
RainbowColorStrategy.colors = [0xff0000, 0xE2571E, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x96bf33, 0x0000FF];

RainbowColorStrategy.prototype.initColor = function (particle) {
  particle.draw(RainbowColorStrategy.colors[this.colorIndex]);
}

RainbowColorStrategy.prototype.update = function (ds, particle) {
  this.sinceLastChange += ds;
  if(this.sinceLastChange >= this.changePeriod) {
    this.sinceLastChange = 0;
    this.colorIndex = (this.colorIndex + 1) % RainbowColorStrategy.colors.length;
    particle.draw(RainbowColorStrategy.colors[this.colorIndex]);
  }
}
