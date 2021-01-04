import { countEveryoneYeses } from "./mod.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  return countEveryoneYeses(inputFile);
}

console.log(await main());
