export type Point = { x: number; y: number };

export enum PointType {
  open = ".",
  tree = "#",
}

enum FinalPointType {
  miss = "O",
  hit = "X",
}

export function CountTreeEncounters(
  input: PointType[][],
  slope: Point,
): number {
  return makeResultTree(input, slope)
    .filter((e) => e === PointType.tree)
    .length;
}

export function multiplyTreeEncounters(input: PointType[][], slopes: Point[]) {
  return slopes
    .map((slope) => CountTreeEncounters(input, slope))
    .reduce((a, b) => a * b);
}

function makeResultTree(input: PointType[][], slope: Point): PointType[] {
  const result: PointType[] = [];

  for (let { x, y } = slope; y < input.length; x += slope.x, y += slope.y) {
    const row = input[y];
    const col = row[x % input[0].length];
    result.push(col);
  }

  return result;
}

export { makeResultTree };
