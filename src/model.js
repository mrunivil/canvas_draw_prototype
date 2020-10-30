import { config } from "./config";
export class Grid {
  constructor(width, height) {
    this.width = width || 10;
    this.height = height || 10;
    this.gridSize = config.gridSize;
    this.shapes = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.shapes.push(new Shape(1, 1, x, y));
      }
    }
  }
}
export class Shape {
  constructor(width, height, x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layers = [];
    this.isHighlighted = false;
  }
}
export class Shelf extends Shape {
  toggleSelection() {
    this.selected = !!!this.selected;
  }
}

export class ShapeSelector {
  constructor(shapes) {
    this.shapes = shapes || [];
  }
}
