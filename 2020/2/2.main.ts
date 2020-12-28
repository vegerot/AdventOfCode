import { countValidTobogganPasswords } from "./lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  const data = inputFile.split("\n");
  data.pop();
  return countValidTobogganPasswords(data);
}

console.log(await main());
