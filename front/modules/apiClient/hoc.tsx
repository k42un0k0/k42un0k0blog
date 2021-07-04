import { useRouter } from 'next/router';
import React from 'react';
import { pagesPath } from '../../lib/$path';
import { useIsLoggedIn } from './hooks';

export function withAuthGuard(Component: React.VFC): React.VFC {
  return function WithAuthGuard(): JSX.Element {
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
