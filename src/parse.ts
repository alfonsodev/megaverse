// import data from "./__tests__/data.js";

import { MegaverseState } from './client';

const dataMap = {
  0: 'POLYANET',
  1: {
    blue: 'BLUE_SOLOON',
    red: 'RED_SOLOON',
    white: 'WHITE_SOLOON',
    purple: 'PURPLE_SOLOON',
  },
  2: {
    up: 'UP_COMETH',
    down: 'DOWN_COMETH',
    left: 'LEFT_COMETH',
    right: 'RIGHT_COMETH',
  },
};

export function parseStateToGoalFormat(state: MegaverseState[][]): string[][] {
  const result: string[][] = [];
  for (const [i, row] of state.entries()) {
    result.push([]);
    for (const col of row) {
      let value = 'SPACE';
      if (col?.direction || col?.color) {
        value = dataMap?.[col?.type]?.[col?.color] ?? dataMap?.[col?.type]?.[col?.direction];
      } else if (col?.type == 0) {
        value = dataMap[0];
      }

      result?.[i].push(value);
    }
  }
  return result;
}
