import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";
import {
  countValidPassports,
  isValidPassport,
  makePassport,
  parseInput,
  Passport,
  validateProperty,
} from "./lib.ts";

const testInput1 = {
  raw: `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
  parsed: [
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
  ],
  passports: [
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
  ],
};

const testInput2 = {
  raw: `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
  passports: [
    {
      "eyr": "1972",
      "cid": "100",
      "hcl": "#18171d",
      "ecl": "amb",
      "hgt": "170",
      "pid": "186cm",
      "iyr": "2018",
      "byr": "1926",
    },
    {
      "iyr": "2019",
      "hcl": "#602927",
      "eyr": "1967",
      "hgt": "170cm",
      "ecl": "grn",
      "pid": "012533040",
      "byr": "1946",
    },
    {
      "hcl": "dab227",
      "iyr": "2012",
      "ecl": "brn",
      "hgt": "182cm",
      "pid": "021572410",
      "eyr": "2020",
      "byr": "1992",
      "cid": "277",
    },
    {
      "hgt": "59cm",
      "ecl": "zzz",
      "eyr": "2038",
      "hcl": "74454a",
      "iyr": "2023",
      "pid": "3556412378",
      "byr": "2007",
    },
    {
      "pid": "087499704",
      "hgt": "74in",
      "ecl": "grn",
      "iyr": "2012",
      "eyr": "2030",
      "byr": "1980",
      "hcl": "#623a2f",
    },
    {
      "eyr": "2029",
      "ecl": "blu",
      "cid": "129",
      "byr": "1989",
      "iyr": "2014",
      "pid": "896056539",
      "hcl": "#a97842",
      "hgt": "165cm",
    },
    {
      "hcl": "#888785",
      "hgt": "164cm",
      "byr": "2001",
      "iyr": "2015",
      "cid": "88",
      "pid": "545766238",
      "ecl": "hzl",
      "eyr": "2022",
    },
    {
      "iyr": "2010",
      "hgt": "158cm",
      "hcl": "#b6652a",
      "ecl": "blu",
      "byr": "1944",
      "eyr": "2021",
      "pid": "093154719",
    },
  ],
} as const;

Deno.test("countValidPassportsLax", () => {
  assertEquals(countValidPassports(testInput1.raw), 2);
});

Deno.test("countValidPassportsStrict", () => {
  assertEquals(countValidPassports(testInput2.raw, true), 4);
});
Deno.test("parseInput", () => {
  assertEquals(parseInput(testInput1.raw), testInput1.parsed);
});

Deno.test("makePassport", () => {
  assertEquals<Partial<Passport>>(
    makePassport(testInput1.parsed[0]),
    testInput1.passports[0],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testInput1.parsed[1]),
    testInput1.passports[1],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testInput1.parsed[2]),
    testInput1.passports[2],
  );

  assertEquals<Partial<Passport>>(
    makePassport(testInput1.parsed[3]),
    testInput1.passports[3],
  );
});

Deno.test("isValidPassportLax", () => {
  assertEquals(isValidPassport(testInput1.passports[0]), true);
  assertEquals(isValidPassport(testInput1.passports[1]), false);
  assertEquals(isValidPassport(testInput1.passports[2]), true);
  assertEquals(isValidPassport(testInput1.passports[3]), false);
});

Deno.test("isValidPassportStrict", () => {
  assertEquals(isValidPassport(testInput2.passports[0], true), false);
  assertEquals(isValidPassport(testInput2.passports[1], true), false);
  assertEquals(isValidPassport(testInput2.passports[2], true), false);
  assertEquals(isValidPassport(testInput2.passports[3], true), false);

  assertEquals(isValidPassport(testInput2.passports[4], true), true);
  assertEquals(isValidPassport(testInput2.passports[5], true), true);
  assertEquals(isValidPassport(testInput2.passports[6], true), true);
  assertEquals(isValidPassport(testInput2.passports[7], true), true);
});

Deno.test("validateProperty", () => {
  {
    assertEquals(validateProperty("60in", "hgt"), true);
    assertEquals(validateProperty("190cm", "hgt"), true);
    assertEquals(validateProperty("190in", "hgt"), false);
    assertEquals(validateProperty("190", "hgt"), false);

    assertEquals(validateProperty("59cm", "hgt"), false);
    assertEquals(validateProperty("170", "hgt"), false);
    assertEquals(validateProperty("74in", "hgt"), true);
    assertEquals(validateProperty("165cm", "hgt"), true);
  }

  {
    assertEquals(validateProperty("2002", "byr"), true);
    assertEquals(validateProperty("2003", "byr"), false);
  }

  {
    assertEquals(validateProperty("#123abc", "hcl"), true);
    assertEquals(validateProperty("#123abz", "hcl"), false);
    assertEquals(validateProperty("123abc", "hcl"), false);
  }

  {
    assertEquals(validateProperty("brn", "ecl"), true);
    assertEquals(validateProperty("wat", "ecl"), false);
  }

  {
    assertEquals(validateProperty("000000001", "pid"), true);
    assertEquals(validateProperty("0123456789", "pid"), false);
  }
});
