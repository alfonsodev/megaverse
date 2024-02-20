import { createDiffMap } from '../src/createDiffMap';
import { createRequestData } from '../src/createRequestData';

describe('createRequestData', () => {
  test('can prepare request data to be sent', () => {
    const candidateId = '00000000-0000-0000-0000-000000000000';
    const baseUrl = 'http://localhost:4000/api';
    const goal = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'WHITE_SOLOON'],
      ['UP_COMETH', 'DOWN_COMETH', 'LEFT_COMETH'],
      ['RIGHT_COMETH', 'SPACE', 'SPACE'],
      ['BLUE_SOLOON', 'RED_SOLOON', 'PURPLE_SOLOON'],
      ['SPACE', 'SPACE', 'SPACE'],
    ];
    const state = [
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
      ['SPACE', 'SPACE', 'SPACE'],
    ];

    const diff = createDiffMap(goal, state);
    const expected = [
      { body: { candidateId, color: 'white', column: 2, row: 1 }, url: `${baseUrl}/soloons` },
      { body: { candidateId, column: 0, direction: 'up', row: 2 }, url: `${baseUrl}/comeths` },
      { body: { candidateId, column: 1, direction: 'down', row: 2 }, url: `${baseUrl}/comeths` },
      { body: { candidateId, column: 2, direction: 'left', row: 2 }, url: `${baseUrl}/comeths` },
      { body: { candidateId, column: 0, direction: 'right', row: 3 }, url: `${baseUrl}/comeths` },
      { body: { candidateId, column: 0, color: 'blue', row: 4 }, url: `${baseUrl}/soloons` },
      { body: { candidateId, column: 1, color: 'red', row: 4 }, url: `${baseUrl}/soloons` },
      { body: { candidateId, column: 2, color: 'purple', row: 4 }, url: `${baseUrl}/soloons` },
    ];
    const result = createRequestData(goal, diff, candidateId, baseUrl);
    expect(result).toStrictEqual(expected);
  });
});
