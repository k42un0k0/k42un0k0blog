import type { ReactNode } from 'react';

export function print<T extends ReactNode>(v: T): JSX.Element {
  return <>{v}</>;
}
