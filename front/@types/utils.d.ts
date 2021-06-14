type Last<T extends [...any]> = T extends [infer P, ...infer U] ? (U extends [] ? P : Last<U>) : never;

type Head<T extends [...any]> = T extends [infer P, ...any] ? P : any;

declare module 'markdown-it-texmath' {
  const d: any;
  export default d;
}

type UnionToTuple<T> = UnionPop<T> extends never ? [] : [...UnionToTuple<Exclude<T, UnionPop<T>>>, UnionPop<T>];

type UnionToOverloadFunction<T> = (T extends any ? (a: (b: T) => void) => void : never) extends (c: infer U) => void
  ? U
  : never;

type UnionPop<T> = UnionToOverloadFunction<T> extends (a: infer U) => void ? U : never;
