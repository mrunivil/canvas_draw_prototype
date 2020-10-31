import { config } from "./config";
export class Grid {
  constructor(width, height) {
    this.width = width || 10;
    this.height = height || 10;
    this.gridSize = config.gridSize;
    this.shapes = [];
  }
}
export class Area {
  constructor(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 1;
    this.height = height || 1;
    this.points = [];
    for (let ax = 0; ax < this.width; ax++) {
      for (let ay = 0; ay < this.height; ay++) {
        this.points.push(new Point(ax + x, ay + y));
      }
    }
  }
}
export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class Shape {
  constructor(width, height, x, y) {
    this.x = x || 0;
    this.y = y || 0;
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
