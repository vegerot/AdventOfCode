import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";
import {
  countAnyoneSingleYes,
  countAnyoneYeses,
  countEveryoneYes,
  countEveryoneYeses,
  parseInput,
} from "./mod.ts";

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b\n`;
const parsedInput = [
  [["a", "b", "c"]],
  [["a"], ["b"], ["c"]],
  [["a", "b"], ["a", "c"]],
  [["a"], ["a"], ["a"], ["a"]],
  [["b"]],
];

Deno.test("totalAnyoneYeses", () => {
  assertEquals<number>(countAnyoneYeses(testInput), 11);
});
Deno.test("totalEveryoneYeses", () => {
  assertEquals<number>(countEveryoneYeses(testInput), 6);
});

Deno.test("parseInput", () => {
  assertEquals<string[][][]>(parseInput(testInput), parsedInput);
});

Deno.test("countAnyoneSingleYes", () => {
  assertEquals<number>(countAnyoneSingleYes(parsedInput[0]), 3);
  assertEquals<number>(countAnyoneSingleYes(parsedInput[1]), 3);
  assertEquals<number>(countAnyoneSingleYes(parsedInput[2]), 3);
  assertEquals<number>(countAnyoneSingleYes(parsedInput[3]), 1);
  assertEquals<number>(countAnyoneSingleYes(parsedInput[4]), 1);
});

Deno.test("countEveryoneYes", () => {
  assertEquals<number>(countEveryoneYes(parsedInput[0]), 3);
  assertEquals<number>(countEveryoneYes(parsedInput[1]), 0);
  assertEquals<number>(countEveryoneYes(parsedInput[2]), 1);
  assertEquals<number>(countEveryoneYes(parsedInput[3]), 1);
  assertEquals<number>(countEveryoneYes(parsedInput[4]), 1);
});
