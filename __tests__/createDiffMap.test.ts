import { createDiffMap } from '../src/createDiffMap';

describe('createDiffMap', () => {
  it('when equal return an empty array', () => {
    const goal = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'POLYANET'],
    ];
    const state = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'POLYANET'],
    ];
    const result = createDiffMap(goal, state);
    expect(result).toStrictEqual([[], []]);
  });
  test('when different returns coordinates', () => {
    let goal = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'POLYANET'],
    ];
    let state = [
      ['SPACE', 'SPACE'],
      ['SPACE', 'SPACE'],
    ];
    const result = createDiffMap(goal, state);
    expect(result).toStrictEqual([[], [1]]);

    goal = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'WHITE_COMETH'],
    ];
    state = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
    ];
    expect(createDiffMap(goal, state)).toStrictEqual([[], [2]]);

    goal = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'WHITE_SOLOON'],
      ['UP_COMETH', 'SPACE', 'SPACE'],
    ];
    state = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
    ];
    expect(createDiffMap(goal, state)).toStrictEqual([[], [2], [0]]);
  });
});
