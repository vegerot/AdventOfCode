import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  countValidPasswords,
  parsePasswordRule,
  isValidPassword,
} from "./lib.ts";

const exampleInput = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

// Deno.test("countValidPasswords", () => {
//   assertEquals(countValidPasswords(exampleInput), 2);
// });
//

Deno.test("countValidPasswords", () => {
  assertEquals(countValidPasswords(exampleInput), 2);
});

Deno.test("parsePasswordRule", () => {
  assertEquals(parsePasswordRule(exampleInput[0]), {
    range: [1, 3],
    character: "a",
    password: "abcde",
  });
  assertEquals(parsePasswordRule(exampleInput[1]), {
    range: [1, 3],
    character: "b",
    password: "cdefg",
  });
  assertEquals(parsePasswordRule(exampleInput[2]), {
    range: [2, 9],
    character: "c",
    password: "ccccccccc",
  });

  // custom test for 2-digit numbers
  assertEquals(parsePasswordRule("10-13 a: abcde"), {
    range: [10, 13],
    character: "a",
    password: "abcde",
  });
});

Deno.test("isValidPassword", () => {
  assertEquals(
    isValidPassword({
      range: [1, 3],
      character: "a",
      password: "abcde",
    }),
    true
  );
  assertEquals(
    isValidPassword({
      range: [1, 3],
      character: "b",
      password: "cdefg",
    }),
    false
  );

  assertEquals(
    isValidPassword({
      range: [2, 9],
      character: "c",
      password: "ccccccccc",
    }),
    true
  );

  // custom test for 2-digit numbers
  assertEquals(
    isValidPassword({
      range: [10, 13],
      character: "a",
      password: "abcde",
    }),
    false
  );
});
