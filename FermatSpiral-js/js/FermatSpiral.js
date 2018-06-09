function FermatSpiral(ele) {
  this.svg = d3.select(ele)
    .attr("width", FermatSpiral.WIDTH)
    .attr("height", FermatSpiral.HEIGHT)
;

  this.fraction = 1;
  this.size = 10;
  this.scale = 10;

  this.draw();
}

FermatSpiral.WIDTH = 1000;
FermatSpiral.HEIGHT = 1000;
FermatSpiral.PARTICLES = 1000;
FermatSpiral.COLOR = 0xffffff;

FermatSpiral.scaleX = d3.scaleLinear().domain([-FermatSpiral.WIDTH/2, FermatSpiral.WIDTH/2]).range([0, FermatSpiral.WIDTH]);
FermatSpiral.scaleY = d3.scaleLinear().domain([-FermatSpiral.HEIGHT/2, FermatSpiral.HEIGHT/2]).range([FermatSpiral.HEIGHT, 0]);
FermatSpiral.scaleColor = d3.scaleThreshold().domain([Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3])
  .range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);

FermatSpiral.prototype.draw = function () {
  var i = 0
  var theta = 0;
  var radius = this.scale * Math.sqrt(theta);
  var x = radius * Math.cos(theta);
  var y = radius * Math.sin(theta);
  var data = [];
  while (i < FermatSpiral.PARTICLES) {
    theta += 2 * Math.PI * this.fraction;
    radius = this.scale * Math.sqrt(theta);
    x = radius * Math.cos(theta);
    y = radius * Math.sin(theta);
    data[i] = {'x':x, 'y': y, 'theta': theta % (Math.PI * 2)};
    i += 1 ;
  }
  var circles = this.svg.selectAll('circle')
    .data(data);
  circles.exit().remove();
  circles.enter().append('circle')
    .merge(circles)
    .transition().duration(1000)
    .style('fill', function(x) {return FermatSpiral.scaleColor(x.theta)})
    .attr('r', this.size)
    .attr('cx', function(x) {return FermatSpiral.scaleX(x.x)})
    .attr('cy', function(x) {return FermatSpiral.scaleY(x.y)})
  console.log(data.length)
}
