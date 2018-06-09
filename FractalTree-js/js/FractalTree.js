function FractalTree(ele, debugEle) {
  this.app = new PIXI.Application({
    width: FractalTree.WIDTH,
    height: FractalTree.HEIGHT,
    autoStart: false,
    view: document.querySelector(ele),
    backgroundColor: '#000000'
  });

  this.pen = new PIXI.Graphics();
  this.app.stage.addChild(this.pen);
  this.pen.x = FractalTree.WIDTH/2;
  this.pen.y = FractalTree.HEIGHT;


  this.preview = new PIXI.Graphics();
  this.app.stage.addChild(this.preview);
  this.preview.width= 1*FractalTree.WIDTH/5;
  this.preview.x = FractalTree.WIDTH/10;
  this.preview.y = FractalTree.HEIGHT;

  this.trunk = 100;
  this.branchRatio1 = 0.6;
  this.branchRatio2 = 0.7;
  this.branchRatio3 = 0.8;
  this.branchAngle1 = 0.3;
  this.branchAngle2 = 0.1;
  this.branchAngle3 = - 0.3;

  this.maxLevel = 7;
  this.draw();

  this.app.ticker.add(this.tick, this);
  this.app.ticker.start();
}

FractalTree.WIDTH = 1000;
FractalTree.HEIGHT = 600;
FractalTree.LINECOLOR = 0xffffff;

FractalTree.prototype.draw = function () {
  this.pen.clear();
  this.doDraw(this.pen, new PIXI.Matrix(), 10, this.maxLevel);
  this.preview.clear();
  this.doDraw(this.preview, new PIXI.Matrix(), 10, 1);
}

FractalTree.prototype.doDraw = function (pen, transform, trunkSize, level) {
  pen.lineStyle(trunkSize, FractalTree.LINECOLOR);
  var trunkEnd = transform.apply(new PIXI.Point(0, -this.trunk));
  var trunkBegin = transform.apply(new PIXI.Point(0, 0));
  pen.moveTo(trunkBegin.x, trunkBegin.y);
  pen.lineTo(trunkEnd.x, trunkEnd.y);
  if (level <= 0) {
    return;
  }
  var transform1 = transform.clone().rotate(this.branchAngle1).scale(this.branchRatio1, this.branchRatio1).translate(0, -this.trunk);
  var transform2 = transform.clone().rotate(this.branchAngle2).scale(this.branchRatio2, this.branchRatio2).translate(0, -this.trunk);
  var transform3 = transform.clone().rotate(this.branchAngle3).scale(this.branchRatio3, this.branchRatio3).translate(0, -this.trunk);
  this.doDraw(pen, transform1, trunkSize*this.branchRatio1, level-1);
  this.doDraw(pen, transform2, trunkSize*this.branchRatio2, level-1);
  this.doDraw(pen, transform3, trunkSize*this.branchRatio3, level-1);
}

FractalTree.prototype.tick = function (dt) {
  this.app.render();
};
