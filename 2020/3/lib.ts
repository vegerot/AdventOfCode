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

function makeResultTree(input: PointType[][], slope: Point): PointType[] {
  const result: PointType[] = [];

  for (let { x, y } = slope; y < input.length; x += slope.x, y += slope.y) {
    const row = input[y];
    const col = row[x%input[0].length];
    result.push(col);
  }

  return result;
}

export { makeResultTree };
