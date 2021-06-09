type Last<T extends [...any]> = T extends [infer P, ...infer U] ? (U extends [] ? P : Last<U>) : never;

type Head<T extends [...any]> = T extends [infer P, ...any] ? P : any;

declare module 'markdown-it-texmath' {
  const d: any;
  export default d;
}
