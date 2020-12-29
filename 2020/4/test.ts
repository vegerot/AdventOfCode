import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";
import {
  countValidPassports,
  makePassport,
  parseInput,
  Passport,
} from "./lib.ts";

const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const testParse = [
  [
    "ecl:gry",
    "pid:860033327",
    "eyr:2020",
    "hcl:#fffffd",
    "byr:1937",
    "iyr:2017",
    "cid:147",
    "hgt:183cm",
  ],
  [
    "iyr:2013",
    "ecl:amb",
    "cid:350",
    "eyr:2023",
    "pid:028048884",
    "hcl:#cfa07d",
    "byr:1929",
  ],
  [
    "hcl:#ae17e1",
    "iyr:2013",
    "eyr:2024",
    "ecl:brn",
    "pid:760753108",
    "byr:1931",
    "hgt:179cm",
  ],
  [
    "hcl:#cfa07d",
    "eyr:2025",
    "pid:166559648",
    "iyr:2011",
    "ecl:brn",
    "hgt:59in",
  ],
];

const testPassports: Partial<Passport>[] = [
  {
    byr: "1937",
    iyr: "2017",
    eyr: "2020",
    hgt: "183cm",
    hcl: "#fffffd",
    ecl: "gry",
    pid: "860033327",
    cid: "147",
  },
  {
    byr: "1929",
    iyr: "2013",
    eyr: "2023",
    hcl: "#cfa07d",
    ecl: "amb",
    pid: "028048884",
    cid: "350",
  },
  {
    byr: "1931",
    iyr: "2013",
    eyr: "2024",
    hgt: "179cm",
    hcl: "#ae17e1",
    ecl: "brn",
    pid: "760753108",
  },
  {
    iyr: "2011",
    eyr: "2025",
    hgt: "59in",
    hcl: "#cfa07d",
    ecl: "brn",
    pid: "166559648",
  },
];
Deno.test("countValidPassports", () => {
  assertEquals(countValidPassports(testInput), 2);
});
Deno.test("parseInput", () => {
  assertEquals(parseInput(testInput), testParse);
});

Deno.test("makePassport", () => {
  assertEquals<Partial<Passport>>(
    makePassport(testParse[0]),
    testPassports[0],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testParse[1]),
    testPassports[1],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testParse[2]),
    testPassports[2],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testParse[3]),
    testPassports[3],
  );
});
