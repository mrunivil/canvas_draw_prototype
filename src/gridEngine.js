import { Point } from "./model";
export class GridEngine {
  constructor() {
    this.idCounter = 1;
  }
  static addShape(grid, shape) {
    let ret = grid;
    if (GridEngine._canAddShapeAt(grid, shape, new Point(shape.x, shape.y))) {
      ret = { ...grid, shapes: [...grid.shapes, shape] };
    } else {
      const freeSpot = GridEngine.findNextFreeSlot(
        grid,
        shape,
        new Point(shape.x, shape.y)
      );
      if (freeSpot) {
        ret = {
          ...grid,
          shapes: [
            ...grid.shapes,
            { ...shape, x: freeSpot.x, y: freeSpot.y, id: this.idCounter }
          ]
        };
        this.idCounter++;
      }
    }
    return ret;
  }
  static removeShape(grid, shape) {
    grid.shapes.splice(
      grid.shapes.findIndex((s) => s.id === shape.id),
      1
    );
    return grid;
  }
  static shapeCollisionInArea(grid, area) {
    let collision = false;
    for (let point of area.points) {
      collision = !!GridEngine.shapeAt(grid, point);
      if (collision) {
        break;
      }
    }
    return collision;
  }
  static _checkBorderCollision(grid, point) {
    return !(point.x < grid.width && point.y < grid.height);
  }
  static shapeAt(grid, point) {
    return grid.shapes.find(
      (s) =>
        point.x >= s.x &&
        point.x < s.x + s.width - 1 &&
        point.y >= s.y &&
        point.y <= s.y + s.height - 1
    );
  }
  static findNextFreeSlot(grid, shape, point) {
    let foundFreeSlot = false;
    for (let y = 0; y < grid.height - 1; y++) {
      if (foundFreeSlot) {
        break;
      }
      for (let x = 0; x < grid.width - 1; x++) {
        if (foundFreeSlot) {
          break;
        }
        // const area = new Area(x, y, shape.width, shape.height);
        // const collision = GridEngine.shapeCollisionInArea(grid, area);
        if (GridEngine._canAddShapeAt(grid, shape, new Point(x, y))) {
          return new Point(x, y);
        }
      }
    }
  }
  static _canAddShapeAt(grid, shape, point) {
    const borderCollision = GridEngine._checkBorderCollision(
      grid,
      new Point(point.x + shape.width - 1, point.y + shape.height - 1)
    );
    const collision = grid.shapes.find((s) => {
      const diffX = s.x - point.x;
      let collideX = false;
      if (diffX >= 0) {
        collideX = s.x + s.width - 1 >= point.x;
      } else {
        collideX = point.x + shape.width - 1 >= s.x;
      }
      const diffY = s.y - point.y;
      let collideY = false;
      if (diffY <= 0) {
        collideY = s.y + s.height - 1 >= point.y;
      } else {
        collideY = point.y + shape.height - 1 >= s.y;
      }
      return collideX && collideY;
    });

    return collision === undefined && !borderCollision;

    //   let collision = false;
    //   for (let width = 0; width < shape.width; width++) {
    //     if (collision) {
    //       break;
    //     }
    //     for (let height = 0; height < shape.height; height++) {
    //       const targetCoordinates = new Point(point.x + width, point.y + height);
    //       const foundShape = GridEngine.shapeAt(grid, targetCoordinates);
    //       const borderCollision = GridEngine._checkBorderCollision(
    //         grid,
    //         targetCoordinates
    //       );
    //       collision = !!foundShape || borderCollision;

    //       if (collision) {
    //         break;
    //       }
    //     }
    //   }
    //   return !collision;
    // }
  }
}

function printGrid(grid) {
  let output = "";
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      if (GridEngine.shapeAt(grid, new Point(x, y))) {
        output += " X ";
      } else {
        output += " - ";
      }
    }
    output += "\n";
  }
  console.log(output);
}

(() => {
  console.clear();
  // let grid = new Grid(10, 10);
  // grid = GridEngine.addShape(grid, new Shape(2, 1), new Point(0, 0));
  // grid = GridEngine.addShape(grid, new Shape(2, 1), new Point(0, 0));
  // grid = GridEngine.addShape(grid, new Shape(2, 1), new Point(0, 0));
  // grid = GridEngine.addShape(grid, new Shape(2, 1), new Point(0, 0));
  // printGrid(grid);
})();
