import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  computeThreeProduct,
  computeTwoProduct,
  findThreeWithSum,
  findTwoWithSum,
} from "./1.lib.ts";

const input = [1721, 979, 366, 299, 675, 1456];

Deno.test("finds 2sum to 2020", () => {
  assertArrayIncludes(
    findTwoWithSum(input, 2020),
    [1721, 299],
    "should have the right 2sum",
  );
});

Deno.test("find correct 2product", () => {
  assertEquals(computeTwoProduct(input, 2020), 1721 * 299);
});
//

Deno.test("finds 3sum to 2020", () => {
  assertArrayIncludes(findThreeWithSum(input, 2020), [979, 366, 675]);
});

Deno.test("find correct 3product", () => {
  assertEquals(computeThreeProduct(input, 2020), 979 * 366 * 675);
});

/*
Deno.test("binary search", () => {
  {
    assertEquals(binarySearch([2, 4, 6, 8], 2), 0)
    assertEquals(binarySearch([2, 4, 6, 8], 4), 1)
    assertEquals(binarySearch([2, 4, 6, 8], 6), 2)
    assertEquals(binarySearch([2, 4, 6, 8], 8), 3)
  }
  {
    assertEquals(binarySearch([1, 3, 5, 7, 9], 1), 0)
    assertEquals(binarySearch([1, 3, 5, 7, 9], 3), 1)
    assertEquals(binarySearch([1, 3, 5, 7, 9], 5), 2)
    assertEquals(binarySearch([1, 3, 5, 7, 9], 7), 3)
    assertEquals(binarySearch([1, 3, 5, 7, 9], 9), 4)
  }
})
*/
