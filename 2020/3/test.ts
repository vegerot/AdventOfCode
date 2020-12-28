import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";
import {
  CountTreeEncounters,
  makeResultTree,
  multiplyTreeEncounters,
  PointType,
} from "./lib.ts";

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
  assertEquals(CountTreeEncounters(testInput, { x: 1, y: 1 }), 2);
  assertEquals(CountTreeEncounters(testInput, { x: 3, y: 1 }), 7);
  assertEquals(CountTreeEncounters(testInput, { x: 5, y: 1 }), 3);
  assertEquals(CountTreeEncounters(testInput, { x: 7, y: 1 }), 4);
  assertEquals(CountTreeEncounters(testInput, { x: 1, y: 2 }), 2);
});
Deno.test("multiplyTreeEncounters", () => {
  assertEquals(
    multiplyTreeEncounters(
      testInput,
      [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
      ],
    ),
    336,
  );
});

Deno.test("makeResultTree", () => {
  assertEquals(
    makeResultTree(testInput, { x: 3, y: 1 }),
    [".", "#", ".", "#", "#", ".", "#", "#", "#", "#"],
  );
});
