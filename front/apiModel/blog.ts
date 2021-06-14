import * as array from 'fp-ts/Array';
import { MonoidAny } from 'fp-ts/boolean';
import type { BlogType } from './../api/@types/index';

export const BlogTypes: UnionToTuple<BlogType> = [0, 1, 2];

export const BlogTypeMap: Map<BlogType, string> = new Map(array.zip(BlogTypes, ['Slide', 'Markdown', 'RichText']));

export function isBlogType(a: number): a is BlogType {
  return array.foldMap(MonoidAny)((b: BlogType) => b === a)(BlogTypes);
}
