import * as O from 'fp-ts/Option';
import { highlightAllUnder } from 'prismjs';
import { useEffect, useRef } from 'react';
import type { RefObject, DependencyList } from 'react';

export function useHighlight(deps: DependencyList): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    O.map(highlightAllUnder)(O.fromNullable(ref.current));
  }, deps);
  return ref;
}
