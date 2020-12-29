import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";
export interface Passport {
  byr: unknown;
  iyr: unknown;
  eyr: unknown;
  hgt: unknown;
  hcl: unknown;
  ecl: unknown;
  pid: unknown;
  cid?: unknown;
}

export function countValidPassports(input: string): number {
  return parseInput(input)
    .map(makePassport)
    .map(isValidPassport)
    // @ts-expect-error boolean will automatically be casted to ToInt
    // see https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus-runtime-semantics-evaluation #8,9
    // and https://www.ecma-international.org/ecma-262/#sec-tonumeric
    .reduce((a, b) => a + b) as unknown as number;
}

function isValidPassport(passport: Partial<Passport>): passport is Passport {
  for (
    const requiredProperty of ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  ) {
    if (!(requiredProperty in passport)) return false;
  }
  return true;
}

function parseInput(input: string): string[][] {
  return input.split("\n\n").map((str) => str.split(/\s/));
}

function makePassport(input: string[]): Partial<Passport> {
  const passport: Partial<Passport> = {};

  for (const keyVal of input) {
    const [key, val] = keyVal.split(":");
    // assert(key in keyof Passport)
    passport[key as keyof Passport] = val;
  }
  return passport;
}

export { makePassport, parseInput };
