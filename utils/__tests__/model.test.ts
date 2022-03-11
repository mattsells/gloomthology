import { formatISO } from 'date-fns';

import { serialize } from '../model';

describe('serialize()', () => {
  it('returns basic data', () => {
    const model = {
      val1: 1,
      val2: '2',
      val3: true,
    };

    expect(serialize(model)).toStrictEqual(model);
  });

  it('converts date values', () => {
    const date = new Date(2022, 2, 11, 8, 2, 0, 0);

    const model = {
      val1: 1,
      val2: '2',
      val3: true,
      val4: date,
    };

    const expectedResult = {
      ...model,
      val4: formatISO(date),
    };

    // FIXME: Not sure why this isn't working
    expect(serialize(model)).toStrictEqual(expectedResult);
  });
});
