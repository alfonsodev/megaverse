import { MegaverseState } from '../src/client';
import { parseStateToGoalFormat } from '../src/parseStateToGoalFormat';

describe('parseStateToGoalFormat', () => {
  test('converts current state to same foramt as goal', () => {
    let state: MegaverseState[][] = [
      [null, null],
      [null, { type: 0 }],
    ];
    let goal = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'POLYANET'],
    ];
    expect(parseStateToGoalFormat(state)).toStrictEqual(goal);

    state = [
      [null, null],
      [null, { type: 1, color: 'blue' }],
    ];
    goal = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'BLUE_SOLOON'],
    ];
    expect(parseStateToGoalFormat(state)).toStrictEqual(goal);

    state = [
      [null, null],
      [
        { type: 1, color: 'red' },
        { type: 2, color: 'up' },
      ],
    ];
    goal = [
      ['SPACE', 'SPACE'],
      ['RED_SOLOON', 'UP_COMETH'],
    ];
    expect(parseStateToGoalFormat(state)).toStrictEqual(goal);
  });
});
