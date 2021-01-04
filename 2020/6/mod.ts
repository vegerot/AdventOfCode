export function countAnyoneYeses(input: string): number {
  return parseInput(input)
    .map(countAnyoneSingleYes)
    .reduce((a, b) => a + b);
}

export function countEveryoneYeses(input: string): number {
  return parseInput(input)
    .map(countEveryoneYes)
    .reduce((a, b) => a + b);
}

function parseInput(input: string): string[][][] {
  /**
   * There MUST be a better way to do this 😩
   *
   * problem: how to deal with trailing newline?  I could just ignore all empty lines in `countEveryoneYes`
   * But maybe it makes sense for someone to answer no to everything
   * If I `split("\n")` first and `pop()`, I have to recombine the rest of the array
   *
   * The best solution I can think of is to include the false empty answer,
   * then delete the last nested element
   *
   */
  const ret = input.split("\n\n")
    .map((str) =>
      str.split("\n")
        .map((line) => line.split(""))
    );

  // remove the last nested element
  // There's gotta be a better way
  {
    ret[ret.length - 1].pop();
  }

  return ret;
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

function countEveryoneYes(group: string[][]): number {
  const everyone: Record<string, boolean> = {};
  for (const answers of group[0]) {
    for (const answer of answers) {
      everyone[answer] = true;
    }
  }

  if (group.length === 1) {
    return Object.keys(everyone).length;
  }

  for (const person of group.slice(1)) {
    for (const key of Object.keys(everyone)) {
      if (person.indexOf(key) !== -1) continue;
      else {
        delete everyone[key];
        if (Object.keys(everyone).length === 0) {
          return 0;
        }
      }
    }
  }

  return Object.keys(everyone).length;
}

export { countAnyoneSingleYes, countEveryoneYes, parseInput };
