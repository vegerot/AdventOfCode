import { assert } from "https://deno.land/std@0.82.0/testing/asserts.ts";

export function findTwoWithSum(list: number[], target: number): number[] {
  list.sort();
  let low = 0;
  let high = list.length - 1;

  while (low < high) {
    const sum = list[low] + list[high];
    if (sum < target) ++low;
    else if (sum > target) --high;
    else return [list[low], list[high]];
  }

  throw new Error("not found");
}

export function computeTwoProduct(list: number[], target: number): number {
  return findTwoWithSum(list, target).reduce((a, b) => a * b);
}

// low + missing + high === target
// missing = target - high - low
export function findThreeWithSum(list: number[], target: number): number[] {
  list = list.sort((a, b) => a - b);
  let low = 0;
  let high = list.length - 1;
  let mid = NaN;

  while (low < high) {
    mid = low + 1;
    // more importantly, make sure they're not equal
    assert(low < mid && mid < high);
    let missing = target - list[high] - list[low];

    while (mid < high) {
      if (list[mid] < missing) ++mid;
      else if (list[mid] > missing) {
        --high;
        break;
      } else return [list[low], list[mid], list[high]];
    }
    if (mid === high) ++low;
  }
  return [low, mid, high];
}

export function computeThreeProduct(list: number[], target: number): number {
  return findThreeWithSum(list, target).reduce((a, b) => a * b);
}

export function binarySearch(list: number[], target: number): number {
  let index = ~~list.length / 2;

  if (list.length === 0) return -1;
  if (list[index] < target)
    return binarySearch(list.slice(index + 1, list.length), target);
  if (list[index] > target) return binarySearch(list.slice(0, index), target);
  return index;
}
