import { isBlogType } from './blog';

describe('isBlogType', () => {
  it('return true when given 0 or 1 or 2', () => {
    expect(isBlogType(0)).toBe(true);
    expect(isBlogType(1)).toBe(true);
    expect(isBlogType(2)).toBe(true);
  });
  it('return false when given -10 ~ -1, 3 ~ 10  or NaN string', () => {
    [...Array(8).keys()]
      .map((i) => i + 3)
      .map((i) => {
        expect(isBlogType(i)).toBe(false);
      });
    [...Array(10).keys()]
      .map((i) => -i - 1)
      .map((i) => {
        expect(isBlogType(i)).toBe(false);
      });
  });
});
