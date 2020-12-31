import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";

export function getLargestSeatId(input: readonly string[]): number {
  const splitInput = input
    .map((seatCode) =>
      [seatCode.slice(0, 7), seatCode.slice(7)] as [string, string]
    );

  // TODO sorting is slow and stupid, just find the max (taking into account tied columns
  const largestSeat = sortByRow(sortByColumn(splitInput))[0];

  const largestSeatId = computeSeatId(largestSeat);

  return largestSeatId;
}

export function findMissingSeatId(input: readonly string[]): number {
  const splitInput = input
    .map((seatCode) =>
      [seatCode.slice(0, 7), seatCode.slice(7)] as [string, string]
    );

  return findMissing(
    splitInput.map(computeSeatId),
    [computeSeatId(["FFFFFFB", "LLL"]), computeSeatId(["BBBBBBF", "RRR"])],
  );
}

function findMissing(
  list: readonly number[],
  [low, high]: [number, number],
): number {
  // either sort it first (easy)
  // or put each element in `list` into an object, then go through the range and find the missing one

  const presentSet = new Set(list);

  for (let i = low; i <= high; ++i) {
    if (
      !presentSet.has(i) && presentSet.has(i - 1) && presentSet.has(i + 1)
    ) {
      return i;
    }
  }

  assert(false);
}

const CharToInt = {
  F: 0,
  B: 1,
  R: 1,
  L: 0,
} as const;

// on second thought, this should just return an array of the largest, instead of sorting
function sortByColumn(input: [string, string][]): [string, string][] {
  return input.sort((a, b) => (a[1] === b[1] ? 0 : a[1] < b[1] ? 1 : -1));
}

// on second thought, this should just return the longest
function sortByRow(input: [string, string][]): [string, string][] {
  return input.sort((a, b) => (a[0] === b[0] ? 0 : // use CharToInt here instead, and merge with `sortByColumn` (add param to new function)
    a[0] > b[0]
    ? 1
    : -1)
  );
}
function computeSeatId([long, wide]: readonly [string, string]): number {
  let row = 0;
  const ROW_LENGTH = 7 as const;
  assert(long.length === ROW_LENGTH);
  for (let i = ROW_LENGTH - 1; i >= 0; --i) {
    row += CharToInt[long[i] as "F" | "B"] << (ROW_LENGTH - i - 1);
  }

  const COL_LENGTH = 3 as const;
  assert(wide.length === COL_LENGTH);
  let col = 0;
  for (let i = COL_LENGTH - 1; i >= 0; --i) {
    col += CharToInt[wide[i] as "R" | "L"] << (COL_LENGTH - i - 1);
  }

  return row * 8 + col;
}

export { computeSeatId, findMissing, sortByColumn, sortByRow };
