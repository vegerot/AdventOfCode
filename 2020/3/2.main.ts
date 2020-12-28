import { multiplyTreeEncounters, PointType } from "./lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  const data = inputFile.split("\n").map((line) =>
    line.split("")
  ) as PointType[][];
  data.pop();
  return multiplyTreeEncounters(data, [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]);
}

console.log(await main());
