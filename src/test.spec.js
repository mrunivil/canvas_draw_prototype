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
      GridEngine.shapeCollisionInArea(grid, new Area(0, 0, 3, 1))
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
      GridEngine._canAddShapeAt(grid, newShape, new Point(1, 1))
    ).toBeTruthy();
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
  it("should find the next available space in the grid", () => {
    grid.shapes = [newShape];
    const p1 = GridEngine.findNextFreeSlot(grid, newShape, new Point(2, 0));
    expect(p1.x).toBe(0);
    expect(p1.y).toBe(1);
    const p2 = GridEngine.findNextFreeSlot(grid, newShape, new Point(0, 4));
    expect(p2.x).toBe(0);
    expect(p2.y).toBe(1);
  });
  it("should add a new shape", () => {
    const newGrid = GridEngine.addShape(grid, newShape);
    expect(newGrid.shapes.length).toEqual(1);
  });
  it("should remove the shape", () => {
    grid.shapes = [
      { ...newShape, id: 1 },
      { ...newShape, id: 2 },
      { ...newShape, id: 3 }
    ];
    const origLength = grid.shapes.length;
    const newGrid = GridEngine.removeShape(grid, { ...newShape, id: 1 });
    expect(newGrid.shapes.length).toEqual(origLength - 1);
  });
});
