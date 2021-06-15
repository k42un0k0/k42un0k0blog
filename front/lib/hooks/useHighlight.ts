import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { highlightAllUnder } from 'prismjs';
import { useEffect, useRef } from 'react';
import type { RefObject, DependencyList } from 'react';

export function useHighlight(deps: DependencyList): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    pipe(ref.current, O.fromNullable, O.map(highlightAllUnder));
  }, deps);
  return ref;
}
