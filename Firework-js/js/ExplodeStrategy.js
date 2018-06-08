function ExplodeStrategy (phxEngine, renderer, stage, chargeRegisters, speedThreshold, chargeColorStrategyGenerator, dieStrategyGenerator) {
  this.phxEngine = phxEngine;
  this.renderer = renderer;
  this.stage = stage;
  this.dieStrategyGenerator = dieStrategyGenerator ;
  this.chargeColorStrategyGenerator  = chargeColorStrategyGenerator ;
  this.chargeRegisters = chargeRegisters;
  this.speedThreshold = speedThreshold;
}

ExplodeStrategy.prototype.update = function(ds, particle) {
  if (particle.phxObj.velocity.y > this.speedThreshold) {
    var position = particle.phxObj.position;
    var velocity = particle.phxObj.velocity;
    var radius = particle.radius;
    particle.unregister();
    this.makeCharges(position, velocity, radius);
  }
}

ExplodeStrategy.prototype.makeCharges = function(position, velocity, radius) {
  var SPEED = 2;
  for (var i = 0; i<= 5; i+=1) {
    var speed = Math.random()*2+SPEED;
    for (var j = 0; j< Math.PI * 2; j+= Math.random() * Math.PI / 5 + Math.PI / 5) {
      var chargeVelocity = {x:velocity.x + speed * Math.cos(j), y:velocity.y + speed * Math.sin(j)}
      var tmp = new Charge(this.phxEngine, this.renderer, this.stage, this.chargeRegisters, radius, position, chargeVelocity, this.chargeColorStrategyGenerator(), this.dieStrategyGenerator())
      tmp.register();
    }
  }
}
