import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";
import { CountTreeEncounters, makeResultTree, PointType } from "./lib.ts";

const testInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
].map((line) => line.split("")) as PointType[][];

Deno.test("CountTreeEncounters", () => {
  assertEquals(CountTreeEncounters(testInput, { x: 3, y: 1 }), 7);
});

Deno.test("makeResultTree", () => {
  assertEquals(
    makeResultTree(testInput, { x: 3, y: 1 }),
    [".", "#", ".", "#", "#", ".", "#", "#", "#", "#"],
  );
});
