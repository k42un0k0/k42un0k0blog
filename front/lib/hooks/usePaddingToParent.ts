import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function usePaddingToParent<E extends HTMLElement>(): RefObject<E> {
  const containerRef = useRef<E>(null);
  useEffect(() => {
    const clientHeight = containerRef.current?.clientHeight;
    const parent = containerRef.current?.parentElement;
    const paddingTop = parent?.style.paddingTop;
    if (clientHeight == null || parent == null || paddingTop == null) return;
    parent.style.paddingTop = clientHeight.toString() + 'px';
    return (): void => {
      parent.style.paddingTop = paddingTop;
    };
  });
  return containerRef;
}
