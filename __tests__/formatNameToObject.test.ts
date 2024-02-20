import { formatNameToObject } from '../src/formatNameToObject';

describe('formatNameToObject', () => {
  test('given a string returns an object with color or direction', () => {
    expect(formatNameToObject('UP_COMETH')).toStrictEqual({ direction: 'up' });
    expect(formatNameToObject('DOWN_COMETH')).toStrictEqual({ direction: 'down' });
    expect(formatNameToObject('LEFT_COMETH')).toStrictEqual({ direction: 'left' });
    expect(formatNameToObject('RIGHT_COMETH')).toStrictEqual({ direction: 'right' });

    expect(formatNameToObject('WHITE_SOLOON')).toStrictEqual({ color: 'white' });
    expect(formatNameToObject('BLUE_SOLOON')).toStrictEqual({ color: 'blue' });
    expect(formatNameToObject('RED_SOLOON')).toStrictEqual({ color: 'red' });
    expect(formatNameToObject('PURPLE_SOLOON')).toStrictEqual({ color: 'purple' });

    expect(formatNameToObject('POLYANET')).toStrictEqual({});
    expect(formatNameToObject('SPACE')).toStrictEqual(null);
  });
});
