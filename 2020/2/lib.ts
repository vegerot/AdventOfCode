import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";

export function countValidPasswords(list: string[]): number {
  return (
    (list
      .map(parsePasswordRule)
      .map(isValidPassword)
      // @ts-expect-error boolean will automatically be casted to ToInt
      // see https://www.ecma-international.org/ecma-262/#sec-addition-operator-plus-runtime-semantics-evaluation #8,9
      // and https://www.ecma-international.org/ecma-262/#sec-tonumeric
      .reduce((a, b) => a + b) as unknown) as number
  );
}

type PasswordRule = {
  range: [number, number];
  character: string;
  password: string;
};

function parsePasswordRule(password: string): PasswordRule {
  let ruleGroups = /(?<rangeLow>\d+)-(?<rangeHigh>\d+) (?<character>\w): (?<password>\S*)$/.exec(
    password
  );
  assert(ruleGroups?.groups);
  return {
    range: [
      parseInt(ruleGroups.groups.rangeLow),
      parseInt(ruleGroups.groups.rangeHigh),
    ],
    character: ruleGroups.groups.character,
    password: ruleGroups.groups.password,
  };
}

function isValidPassword(password: PasswordRule): boolean {
  const charsInPwd = password.password
    .split("")
    .filter((char) => char === password.character).length;

  return charsInPwd >= password.range[0] && charsInPwd <= password.range[1];
}

// exported just for tests
export { parsePasswordRule, isValidPassword };
