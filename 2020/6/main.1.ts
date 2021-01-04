import { countAnyoneYeses } from "./mod.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  return countAnyoneYeses(inputFile);
}

console.log(await main());
