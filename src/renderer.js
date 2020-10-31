class PipeLine {
  render(ctx) {}
}

export class Renderer {
  render() {}
}

export class BackgroundPipeLine {
  render(ctx) {
    if (this.grid && this.grid.shapes?.length) {
    }
  }
  get grid() {
    return this.grid;
  }
  set grid(grid) {
    this.grid = grid;
  }
}
export class ShapePipeLine {}

export class AnimationPipeLine {}
