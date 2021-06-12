import * as array from 'fp-ts/array';
import { MonoidAny } from 'fp-ts/boolean';
import type { BlogType } from './../../api/@types/index';

export function isBlogType(a: number): a is BlogType {
  return array.foldMap(MonoidAny)((b: BlogType) => b === a)([0, 1, 2]);
}
