import { useRouter } from 'next/router';
import { pagesPath } from '../../lib/$path';
import { useIsLoggedIn } from './hooks';
import type { VFC } from 'react';

export function withAuthGuard(Component: VFC): VFC {
  return function WithAuthGuard(): RenderReturnType {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();
    if (!isLoggedIn()) {
      if (typeof window != 'undefined') {
        void router.replace(pagesPath.auth.sign_in.$url({ query: { redirect_to: window.location.toString() } }));
      }
      return <div>Loading ...</div>;
    }

    return <Component />;
  };
}
