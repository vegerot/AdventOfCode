import { CountTreeEncounters, PointType } from "./lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  const data = inputFile.split("\n").map((line) => line.split("")) as PointType[][];
  data.pop();
  return CountTreeEncounters(data, {x: 3, y: 1});
}

console.log(await main());
