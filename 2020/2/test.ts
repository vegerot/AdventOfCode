import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  countValidSledPasswords,
  countValidTobogganPasswords,
  parsePasswordRule,
  isValidSledPassword,
  isValidTobogganPassword,
} from "./lib.ts";

const exampleInput = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

// Deno.test("countValidPasswords", () => {
//   assertEquals(countValidPasswords(exampleInput), 2);
// });
//

Deno.test("countValidSledPasswords", () => {
  assertEquals(countValidSledPasswords(exampleInput), 2);
});

Deno.test("countValidTobogganPasswords", () => {
  assertEquals(countValidTobogganPasswords(exampleInput), 1);
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

Deno.test("isValidSledPassword", () => {
  assertEquals(
    isValidSledPassword({
      range: [1, 3],
      character: "a",
      password: "abcde",
    }),
    true
  );
  assertEquals(
    isValidSledPassword({
      range: [1, 3],
      character: "b",
      password: "cdefg",
    }),
    false
  );

  assertEquals(
    isValidSledPassword({
      range: [2, 9],
      character: "c",
      password: "ccccccccc",
    }),
    true
  );

  // custom test for 2-digit numbers
  assertEquals(
    isValidSledPassword({
      range: [10, 13],
      character: "a",
      password: "abcde",
    }),
    false
  );
});

Deno.test("isValidTobogganPassword", () => {
  assertEquals(
    isValidTobogganPassword({
      range: [1, 3],
      character: "a",
      password: "abcde",
    }),
    true
  );
  assertEquals(
    isValidTobogganPassword({
      range: [1, 3],
      character: "b",
      password: "cdefg",
    }),
    false
  );

  assertEquals(
    isValidTobogganPassword({
      range: [2, 9],
      character: "c",
      password: "ccccccccc",
    }),
    false
  );

  // custom test for 2-digit numbers
  assertEquals(
    isValidTobogganPassword({
      range: [10, 13],
      character: "a",
      password: "abcde",
    }),
    false
  );
});
