import { katex } from './katex';

describe('katex', () => {
  it('replace', () => {
    expect(() => katex('$c = \\pm\\sqrt{a^2 + b^2}$')).not.toThrow();
  });
});
