import "./styles.css";

import { Grid, Shape, ShapeSelector, Shelf } from "./model";
import { config } from "./config";

class Engine {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext("2d");
  }
  init() {
    this.lastUpdate = 0;
    this.currentOffset = {
      offsetX: 0,
      offsetXY: 0
    };
    this.grid = new Grid(20, 15);
    this.canvasElement.width = 1000;
    this.canvasElement.height = 1000;
    this.canvasElement.addEventListener("mousemove", (evt) => {
      this.mousemove = evt;
    });

    this.shapeSelector = new ShapeSelector([new Shelf(1, 1), new Shelf(3, 1)]);
    this.lastTickUpdate = 0;
  }
  loop() {
    // console.log(this.play);
    if (Date.now() - this.lastTickUpdate > 1000 / config.ticksPerSecond) {
      if (this.mousemove) {
        this.mouseCoord = this.translateCoordinates(
          this.mousemove.offsetX,
          this.mousemove.offsetY
        );
        this.grid.shapes.forEach(
          (s) =>
            (s.isHighlighted =
              s.x === this.mouseCoord.x && s.y === this.mouseCoord.y)
        );
      }
      this.lastTickUpdate = Date.now();
    }
    this.draw();
  }

  translateCoordinates(x, y) {
    return {
      x: Math.floor((x - this.currentOffset.offsetX || 0) / config.gridSize),
      y: Math.floor((y - this.currentOffset.offsetY || 0) / config.gridSize)
    };
  }

  draw() {
    this.now = Date.now();
    this.ctx.fillStyle = "#ccc";
    this.ctx.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.ctx.fillStyle = "#333333A0";
    this.currentTransform = this.ctx.transform;
    this.drawBackground();
    this.drawShapeSelection();
    this.drawDebug();
    this.ctx.restore();
    this.lastUpdate = Date.now();
    // this.ctx.fillRect(this.mousemove.offsetX, this.mousemove.offsetY, 5, 5);
  }

  drawDebug() {
    this.ctx.translate(50, 10);
    this.ctx.strokeText(
      `mousePos x:${this.mousemove?.offsetX}, y:${this.mousemove?.offsetY}`,
      10,
      10
    );
    this.ctx.strokeText(
      `relativeMousePos x:${
        this.mousemove?.offsetX - this.currentOffset?.offsetX
      }, y:${this.mousemove?.offsetY - this.currentOffset?.offsetY}`,
      10,
      20
    );
    this.ctx.strokeText(
      `gridCoord x:${this.mouseCoord?.x} y:${this.mouseCoord?.y}`,
      10,
      30
    );
    this.ctx.strokeText(
      `FPS: ${Math.floor(1000 / (this.now - this.lastUpdate))}`,
      10,
      40
    );
    this.ctx.strokeText(
      `Last Tick: ${Math.floor(Date.now() - this.lastTickUpdate)}`,
      10,
      50
    );
    this.ctx.strokeText(`config: ${JSON.stringify(config)}`, 10, 60);
    this.ctx.setTransform(this.currentTransform);
  }
  drawBackground() {
    this.currentOffset = {
      offsetX: config.mapOffsetX,
      offsetY: config.mapOffsetY
    };
    this.ctx.translate(this.currentOffset.offsetX, this.currentOffset.offsetY);
    this.grid.shapes.forEach((shape) => {
      if (shape.isHighlighted) {
        this.ctx.fillRect(
          shape.x * config.gridSize,
          shape.y * config.gridSize,
          shape.width * config.gridSize,
          shape.height * config.gridSize
        );
      }
      this.ctx.strokeRect(
        shape.x * config.gridSize,
        shape.y * config.gridSize,
        shape.width * config.gridSize,
        shape.height * config.gridSize
      );
    });
    this.ctx.setTransform(this.currentTransform);
  }

  drawShapeSelection() {
    this.selectorTransform = this.ctx.transform;
    this.ctx.translate(config.shapeOffsetX, config.shapeOffsetY);
    this.ctx.fillStyle = "#333";
    if (this.shapeSelector.shapes.length === 0) {
      this.ctx.fillText(`no shapes available`, 0, 0);
    } else {
      this.ctx.translate(5, 0);
      this.shapeSelector.shapes.forEach((shape, index) => {
        this.ctx.translate(0, config.gridSize * index + 5);
        this.drawShape(shape);
      });
    }
    this.ctx.setTransform(this.currentTransform);
  }
  drawShape(shape) {
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(
      0,
      0,
      shape.width * config.gridSize,
      shape.height * config.gridSize
    );
  }

  drawInteractions() {}
}
const engine = new Engine(document.getElementById("game"));
engine.init();

function loop() {
  requestAnimationFrame(() => {
    engine.loop();
    loop();
  });
}
loop();
