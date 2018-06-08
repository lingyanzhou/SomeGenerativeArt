function MultiTextureFilter(sprites, vertSrc, fragSrc, uniforms) {
  PIXI.Filter.call(this, vertSrc, fragSrc)
  this.maskMatrices = [];
  this.maskSprites = sprites;
  this.uniforms = uniforms;
  for (i in this.maskSprites) {
    this.maskSprites[i].renderable = false;
    this.maskMatrices[i] = new PIXI.Matrix();
    this.uniforms["mapSampler"+i] = this.maskSprites[i]._texture;
    this.uniforms["filterMatrix"+i] = this.maskMatrices[i];
  }
}
MultiTextureFilter.prototype = Object.create(PIXI.Filter.prototype);
/**
 * Applies the filter.
 *
 * @param {PIXI.FilterManager} filterManager - The manager.
 * @param {PIXI.RenderTarget} input - The input target.
 * @param {PIXI.RenderTarget} output - The output target.
 */


MultiTextureFilter.prototype.apply = function apply(filterManager, input, output) {
  for (i in this.maskSprites) {
    this.uniforms["filterMatrix"+i] = filterManager.calculateSpriteMatrix(this.maskMatrices[i], this.maskSprites[i]);
  }
  // draw the filter...
  filterManager.applyFilter(this, input, output);
};
