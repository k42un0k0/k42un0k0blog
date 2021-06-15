import { getOrElse, map, fromNullable } from 'fp-ts/Option';
import { flow, constant } from 'fp-ts/function';
import { formatFromISO } from '../utils/string';
import type { Option } from 'fp-ts/Option';

/**
 * keyを使ってオブジェクトから値を取り出す
 * @param  {string} key
 */
export function pick<K extends string>(key: K) {
  return function pick1<T extends { [P in K]?: unknown }>(obj: T): Option<NonNullable<T[K]>> {
    return fromNullable(obj[key]);
  };
}

/**
 * keyの値をvalueで更新する
 * @param  {string} key
 */
export const updateAt =
  <K extends string, V>(key: K, value: V) =>
  <T extends { [P in K]?: V }>(obj: T): T => {
    const result = {
      ...obj,
      [key]: value,
    };
    return result;
  };

export const formatAt =
  <K extends string>(key: K) =>
  (f: string): ((b: { [k in K]?: string }) => string) =>
    flow(pick(key), map(formatFromISO(f)), getOrElse(constant('')));
