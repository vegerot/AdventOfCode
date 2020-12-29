import { countValidPassports } from "./lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  return countValidPassports(inputFile);
}

console.log(await main());
