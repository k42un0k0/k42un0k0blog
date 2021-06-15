import * as O from 'fp-ts/Option';
import * as s from 'fp-ts/string';
import { pick } from './struct';

describe('pick', () => {
  it('pick from obj by key', () => {
    type Test = {
      test?: string;
    };
    const val: Test = {
      test: 'hello',
    };
    const actual = pick('test')(val);
    const expectVal = O.some('hello');
    const eqInstance = O.getEq(s.Eq);
    expect(eqInstance.equals(actual, expectVal)).toBe(true);
  });
  it('return None when value was not found', () => {
    type Test = {
      test?: string;
    };
    const val: Test = {
      test: undefined,
    };
    const actual = pick('test')(val);
    const expectVal = O.none;
    const eqInstance = O.getEq(s.Eq);
    expect(eqInstance.equals(actual, expectVal)).toBe(true);
  });
});
