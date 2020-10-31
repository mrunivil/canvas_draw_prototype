import { Grid, Point, Shape, Area } from "./model";
export class GridEngine {
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
          shapes: [...grid.shapes, { ...shape, x: freeSpot.x, y: freeSpot.y }]
        };
      }
    }
    return ret;
  }
  static removeShape(grid, shape) {}
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
    return !(point.x <= grid.width - 1 && point.y <= grid.height - 1);
  }
  static shapeAt(grid, point) {
    return grid.shapes.find(
      (s) => s.x + s.width - point.x >= 0 && s.y + s.height - point.y >= 0
    );
  }
  static findNextFreeSlot(grid, shape, point) {
    let foundFreeSlot = false;
    for (let y = 0; y < grid.height; y++) {
      if (foundFreeSlot) {
        break;
      }
      for (let x = 0; x < grid.width; x++) {
        if (foundFreeSlot) {
          break;
        }
        const area = new Area(x, y, shape.width, shape.height);
        const collision = GridEngine.shapeCollisionInArea(grid, area);
        if (!collision) {
          return new Point(x, y);
        }
      }
    }
  }
  static _canAddShapeAt(grid, shape, point) {
    let collision = false;
    for (let width = 0; width < shape.width; width++) {
      if (collision) {
        break;
      }
      for (let height = 0; height < shape.height; height++) {
        const targetCoordinates = new Point(point.x + width, point.y + height);
        const foundShape = GridEngine.shapeAt(grid, targetCoordinates);
        const borderCollision = GridEngine._checkBorderCollision(
          grid,
          targetCoordinates
        );
        collision = !!foundShape || borderCollision;

        if (collision) {
          console.log(
            "collision at " +
              JSON.stringify(new Point(point.x + width, point.y + height))
          );
          break;
        }
      }
    }
    return !collision;
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
