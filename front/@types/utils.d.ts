type TupleHead<T extends [...any]> = T extends [infer U, ...any] ? U : any;
type TupleTail<T extends [...any]> = T extends [any, ...infer U] ? U : any;
type TupleInit<T extends [...any]> = T extends [...infer U, any] ? U : any;
type TupleLast<T extends [...any]> = T extends [...any, infer U] ? U : any;

declare module 'markdown-it-texmath' {
  const d: any;
  export default d;
}

type UnionToTuple<T> = UnionLast<T> extends never ? [] : [...UnionToTuple<UnionInit<T>>, UnionLast<T>];
type UnionHead<T> = UnionInit<T> extends never ? UnionLast<T> : UnionHead<UnionInit<T>>;

type UnionInit<T> = Exclude<T, UnionLast<T>>;
type UnionLast<T> = UnionToOverloadFunction<T> extends (a: infer U) => void ? U : never;

type UnionToOverloadFunction<T> = (T extends any ? (a: (b: T) => void) => void : never) extends (c: infer U) => void
  ? U
  : never;
