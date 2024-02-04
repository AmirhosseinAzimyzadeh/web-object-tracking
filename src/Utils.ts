import { Point } from "./drawBoundingBox";

function distance(p1: Point | null, p2: Point | null): number {
  if (p1 === null || p2 === null) return Infinity;
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

const Utils = {
  distance,
};

export default Utils;