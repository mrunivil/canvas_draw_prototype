import "./styles.css";

class Grid {
  constructor(width, height) {
    this.width = width || 10;
    this.height = height || 10;
    this.gridSize = 32;
    this.shapes = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.shapes.push(new Shape(x, y, 1, 1));
      }
    }
  }
}
class Shape {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.layers = [];
    this.isHighlighted = false;
  }
}
class Shelf extends Shape {}

class Engine {
  constructor(canvasElement) {
    this.play = true;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext("2d");
  }
  init() {
    this.grid = new Grid();
    this.canvasElement.width = this.grid.width * this.grid.gridSize;
    this.canvasElement.height = this.grid.height * this.grid.gridSize;
    this.canvasElement.addEventListener("mousemove", (evt) => {
      this.mousemove = evt;
    });
  }
  loop() {
    // console.log(this.play);
    if (this.play) {
      this.draw();
      if (this.mousemove) {
        const mouseCoord = this.translateCoordinates(
          this.mousemove.offsetX,
          this.mousemove.offsetY
        );

        this.grid.shapes.forEach(
          (s) =>
            (s.isHighlighted = s.x === mouseCoord.x && s.y === mouseCoord.y)
        );

        this.ctx.fillRect(this.mousemove.offsetX, this.mousemove.offsetY, 5, 5);
        // debugger
      }
    }
  }

  translateCoordinates(x, y) {
    return {
      x: Math.floor((x || 0) / this.grid.gridSize),
      y: Math.floor((y || 0) / this.grid.gridSize)
    };
  }

  draw() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.drawBackground();
  }

  drawBackground() {
    this.grid.shapes.forEach((shape) => {
      if (shape.isHighlighted) {
        this.ctx.fillRect(
          shape.x * this.grid.gridSize,
          shape.y * this.grid.gridSize,
          shape.width * this.grid.gridSize,
          shape.height * this.grid.gridSize
        );
      }
      this.ctx.strokeRect(
        shape.x * this.grid.gridSize,
        shape.y * this.grid.gridSize,
        shape.width * this.grid.gridSize,
        shape.height * this.grid.gridSize
      );
    });
  }

  drawInteractions() {}
}
const engine = new Engine(document.getElementById("game"));
const playBtn = document.querySelector("#play");
engine.init();
playBtn.addEventListener("click", function () {
  engine.play = !engine.play;
});

function loop() {
  requestAnimationFrame(() => {
    engine.loop();
    loop();
    // setTimeout(() => {
    //   loop();
    // }, 500);
  });
}
loop();
