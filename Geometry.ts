import * as PIXI from "pixi.js";
export class Geometry {
  public geometry: PIXI.Geometry;
  constructor() {
    this.geometry = new PIXI.Geometry()
      .addAttribute(
        "aVertexPosition", // the attribute name
        [
          -100,
          -100, // x, y
          100,
          -100, // x, y
          100,
          100,
          -100,
          100,
        ], // x, y
        2
      ) // the size of the attribute
      .addAttribute(
        "aUvs", // the attribute name
        [
          0,
          0, // u, v
          1,
          0, // u, v
          1,
          1,
          0,
          1,
        ], // u, v
        2
      ) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3]);
  }
}
