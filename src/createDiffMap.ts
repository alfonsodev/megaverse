function reduce(stateRow: string[], goalRow: string[]): number[] {
  return stateRow.reduce((result: number[], value: string, index: number) => {
    if (value !== goalRow[index]) {
      result.push(index);
    }
    return result;
  }, []);
}

export function createDiffMap(goal: string[][], state: string[][]): number[][] {
  return goal.map((row: string[], i: number) => reduce(state[i]!, row));
}
