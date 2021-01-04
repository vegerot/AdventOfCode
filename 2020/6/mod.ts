export function countAnyoneYeses(input: string): number {
  return parseInput(input)
    .map(countAnyoneSingleYes)
    .reduce((a, b) => a + b);
}

// export function countEveryoneYeses(input: string): number {
//     return parseInput(input)
//         .map(countEveryoneYes)
//         .reduce((a,b)=>a + b);
// }

function parseInput(input: string): string[][][] {
  return input.split("\n\n")
    .map((str) =>
      str.split("\n")
        .map((line) => line.split(""))
    );
}

function countAnyoneSingleYes(group: string[][]): number {
  const atLeastOne: Record<string, boolean> = {};
  for (const answers of group.flat()) {
    for (const answer of answers) {
      atLeastOne[answer] = true;
    }
  }

  return Object.keys(atLeastOne).length;
}

// function countEveryoneYes(group: string[][]): number {
//   const everyone: Record<string, boolean> = {};
//   for (const answers of group.flat()) {
//     for (const answer of answers) {
//       everyone[answer] = true;
//     }
//   }

//   return Object.keys(everyone).length;
// }

export { countAnyoneSingleYes, parseInput };
