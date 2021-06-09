import * as O from 'fp-ts/Option';
import * as f from 'fp-ts/function';
import { useEffect, useRef } from 'react';
import { pick } from '../../lib/fp';
import { parentElement } from '../../lib/htmlElement';
import type { RefObject } from 'react';

export function usePaddingToParent<E extends HTMLElement>(): RefObject<E> {
  const containerRef = useRef<E>(null);
  useEffect(() => {
    const cleanUpOpt = f.pipe(
      O.fromNullable(containerRef.current),
      O.chain(parentElement),
      O.bindTo('parent'),
      O.bind('paddingTop', ({ parent }) => f.pipe(pick('style')(parent), O.chain(pick('paddingTop')))),
      O.bind('clientHeight', () => f.pipe(O.fromNullable(containerRef.current), O.chain(pick('clientHeight')))),
      O.map(({ parent, clientHeight, paddingTop }) => {
        parent.style.paddingTop = clientHeight.toString() + 'px';
        return (): void => {
          parent.style.paddingTop = paddingTop;
        };
      })
    );
    return O.getOrElse(
      f.constant(function () {
        void 0;
      })
    )(cleanUpOpt);
  });
  return containerRef;
}
