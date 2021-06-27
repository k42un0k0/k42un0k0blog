import { useRouter } from 'next/router';
import { pagesPath } from '../$path';
import { useIsLoggedIn } from '../context/apiClient';

export function withAuthGuard(Component: React.VFC): React.VFC {
  return function AuthGuard(): JSX.Element {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();
    if (!isLoggedIn()) {
      if (typeof window != 'undefined') {
        void router.replace(pagesPath.auth.sign_in.$url({ query: { redirect_to: router.asPath } }));
      }
      return <div>Loading ...</div>;
    }
    return <Component />;
  };
}
