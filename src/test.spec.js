import { Grid, Shape, Point, Area } from "./model";
import { GridEngine } from "./gridEngine";
describe("testing grid engine", () => {
  let grid, newShape;

  beforeEach(() => {
    grid = new Grid(5, 5);
    newShape = new Shape(4, 1, 1, 0);
  });

  it("should return the shape which collides with given point", () => {
    expect(GridEngine.shapeAt(grid, new Point(0, 0))).toBeUndefined();
    grid.shapes = [newShape];
    expect(GridEngine.shapeAt(grid, new Point(2, 0))).toBeDefined();
  });
  it("should check if a collision for specific area appears", () => {
    expect(
      GridEngine.shapeCollisionInArea(grid, new Area(0, 0, 1, 3))
    ).toBeFalsy();
    grid.shapes = [newShape];
    expect(
      GridEngine.shapeCollisionInArea(grid, new Area(0, 0, 1, 3))
    ).toBeTruthy();
  });
  it("shoud check if a new shape can be added at specific point", () => {
    expect(
      GridEngine._canAddShapeAt(grid, newShape, new Point(0, 0))
    ).toBeTruthy();
    grid.shapes = [newShape];
    expect(
      GridEngine._canAddShapeAt(grid, newShape, new Point(0, 0))
    ).toBeFalsy();
    expect(
      GridEngine._canAddShapeAt(grid, newShape, new Point(3, 1))
    ).toBeFalsy();
  });
  it("should check if the shape would overlap with grid borders", () => {
    expect(GridEngine._checkBorderCollision(grid, new Point(0, 0))).toBeFalsy();
    expect(GridEngine._checkBorderCollision(grid, new Point(3, 0))).toBeFalsy();
    expect(
      GridEngine._checkBorderCollision(grid, new Point(5, 0))
    ).toBeTruthy();
    expect(
      GridEngine._checkBorderCollision(grid, new Point(3, 5))
    ).toBeTruthy();
  });
});
