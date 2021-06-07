import * as O from 'fp-ts/Option';
import * as f from 'fp-ts/function';
import { useEffect, useRef } from 'react';
import { pick } from '../../lib/fp';
import { parentElement } from '../../lib/htmlElement';
import type { RefObject } from 'react';

export function usePaddingToParent<E extends HTMLElement>(): RefObject<E> {
  const containerRef = useRef<E>(null);
  useEffect(() => {
    const parentOpt = f.pipe(O.fromNullable(containerRef.current), O.chain(parentElement));
    const paddingTopOpt = f.pipe(
      O.Do,
      O.bind('parent', () => parentOpt),
      O.bind('paddingTop', ({ parent }) => f.pipe(pick('style')(parent), O.chain(pick('paddingTop')))),
      O.bind('clientHeight', () => f.pipe(O.fromNullable(containerRef.current), O.chain(pick('clientHeight')))),
      O.map(({ parent, clientHeight, paddingTop }) => {
        parent.style.paddingTop = clientHeight.toString() + 'px';
        return paddingTop;
      })
    );
    return (): void => {
      f.pipe(
        O.Do,
        O.bind('parent', () => parentOpt),
        O.bind('paddingTop', () => paddingTopOpt),
        O.map(({ parent, paddingTop }) => {
          parent.style.paddingTop = paddingTop;
        })
      );
    };
  });
  return containerRef;
}
