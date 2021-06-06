import * as O from 'fp-ts/Option';
/**
 * keyを使ってオブジェクトから値を取り出す
 * @param  {string} key
 */
export function pick<K extends string>(key: K) {
  return function pick1<T extends { [P in K]?: unknown }>(obj: T): O.Option<NonNullable<T[K]>> {
    return O.fromNullable(obj[key]);
  };
}
