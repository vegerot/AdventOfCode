import { computeTwoProduct } from "./1.lib.ts";

async function main() {
  const inputFile = await Deno.readTextFile("./input.txt");
  const data = inputFile.split("\n").map(parseFloat);
  data.pop();

  return computeTwoProduct(data, 2020);
}

console.log(await main());
