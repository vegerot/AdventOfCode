import { countValidPasswords } from "./lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  const data = inputFile.split("\n");
  data.pop();
  return countValidPasswords(data);
}

console.log(await main());
