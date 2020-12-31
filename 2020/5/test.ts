import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";
import {
  computeSeatId,
  findMissing,
  getLargestSeatId,
  sortByColumn,
  sortByRow,
} from "./lib.ts";

const testInput = [
  "FBFBBFFRLR",
  "BFFFBBFRRR",
  "FFFBBBFRRR",
  "BBFFBBFRLL",
  "FBFBBFFRLL",
] as const;

const splitInput = [
  ["FBFBBFF", "RLR"],
  ["BFFFBBF", "RRR"],
  ["FFFBBBF", "RRR"],
  ["BBFFBBF", "RLL"],
  ["FBFBBFF", "RLL"],
] as const;

Deno.test("getLargestSeatId", () => {
  assertEquals(getLargestSeatId(testInput), 820);
});

Deno.test("sortByColumn", () => {
  assertEquals(sortByColumn(JSON.parse(JSON.stringify(splitInput))), [
    ["BFFFBBF", "RRR"],
    ["FFFBBBF", "RRR"],
    ["FBFBBFF", "RLR"],
    ["BBFFBBF", "RLL"],
    ["FBFBBFF", "RLL"],
  ]);
});

Deno.test("sortByRow", () => {
  assertEquals(sortByRow(JSON.parse(JSON.stringify(splitInput))), [
    ["BBFFBBF", "RLL"],
    ["BFFFBBF", "RRR"],
    ["FBFBBFF", "RLR"],
    ["FBFBBFF", "RLL"],
    ["FFFBBBF", "RRR"],
  ]);
});

Deno.test("computeSeatId", () => {
  assertEquals(computeSeatId(splitInput[0]), 357);
  assertEquals(computeSeatId(splitInput[1]), 567);
  assertEquals(computeSeatId(splitInput[2]), 119);
  assertEquals(computeSeatId(splitInput[3]), 820);
});

/**
Deno.test('findMissingSeatId', () => {
  // TODO, because `findMissingSeatId` looks through the whole range and that's a long test to write
})
*/

Deno.test("findMissing", () => {
  // middle
  assertEquals(findMissing([1, 2, 4], [1, 4]), 3);
  assertEquals(findMissing([1, 3, 4], [1, 4]), 2);

  assertEquals(findMissing([1, 4, 5, 6, 8], [1, 8]), 7);

  // // first
  // assertEquals(findMissing([3,4,5], [2, 5]), 2)
  // // last
  // assertEquals(findMissing([5,6,7], [5, 8]), 8)
});
