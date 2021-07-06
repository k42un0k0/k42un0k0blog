import type { ReactNode } from 'react';

export function print<T extends ReactNode>(v: T): RenderReturnType {
  return <>{v}</>;
}
