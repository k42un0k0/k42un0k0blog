export function isNumber(a: unknown): a is number {
  return typeof a === 'number';
}
