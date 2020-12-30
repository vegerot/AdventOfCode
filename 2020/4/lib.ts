import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";
export interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: EyeColor | string;
  pid: string;
  // cid?: unknown;
}

type EyeColor = "amb" | "blu" | "brn" | "gry" | "grn" | "hzl" | "oth";

export function countValidPassports(input: string, strict?: boolean): number {
  return parseInput(input)
    .map(makePassport)
    .map((passport) => isValidPassport(passport, strict))
    // @ts-expect-error boolean will automatically be casted to ToInt
    // see https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus-runtime-semantics-evaluation #8,9
    // and https://www.ecma-international.org/ecma-262/#sec-tonumeric
    .reduce((a, b) => a + b) as unknown as number;
}

function isValidPassport(
  passport: Partial<Passport>,
  strict?: boolean,
): passport is Passport {
  for (
    const requiredProperty
      of (["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] as Array<
        keyof Passport
      >)
  ) {
    if (!(requiredProperty in passport)) return false;
    else if (strict) {
      if (!validateProperty(passport[requiredProperty]!, requiredProperty)) {
        return false;
      }
    }
  }
  return true;
}

function validateProperty(value: string, key: keyof Passport): boolean {
  switch (key) {
    case "byr": {
      const num = parseFloat(value);
      if (!num || num < 1920 || num > 2002) return false;
      return true;
    }
    case "iyr": {
      const num = parseFloat(value);
      if (!num || num < 2010 || num > 2020) return false;
      return true;
    }
    case "eyr": {
      const num = parseFloat(value);
      return !(!num || num < 2020 || num > 2030);
    }
    case "hgt": {
      const res = /^(?<size>\d{2,3})(?<unit>\w{2})$/.exec(value);
      if (res?.groups) {
        const num = parseFloat(res.groups.size);
        return (res.groups.unit === "cm" && num >= 150 && num <= 193) ||
          (res.groups.unit === "in" && num >= 59 && num <= 76);
      }
      return false;
    }
    case "hcl":
      return /^#[0-9a-f]{6}$/.test(value);
    case "ecl":
      return (<EyeColor[]> ["amb", "blu", "brn", "grn", "gry", "hzl", "oth"])
        .includes(<EyeColor> value);
    case "pid":
      return /^[0-9]{9}$/.test(value);
    default:
      return true;
  }
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

export { isValidPassport, makePassport, parseInput, validateProperty };
