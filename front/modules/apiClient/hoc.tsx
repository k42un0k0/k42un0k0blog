import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import React from 'react';
import { pagesPath } from '../../lib/$path';
import { useIsLoggedIn } from './hooks';
import { ApiClientProvider, useApiClientValue } from '.';
import type { QueryClientProviderProps } from 'react-query';

export function withAuthGuard(Component: React.VFC): React.VFC {
  return function WithAuthGuard(): JSX.Element {
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

const QueryClientProvider = dynamic<QueryClientProviderProps>(async () =>
  import('react-query').then((mod) => mod.QueryClientProvider)
);
const queryClient = new QueryClient();

export function withApiProvider<P>(Component: React.VFC<P>): React.VFC<P> {
  return function WithApiProvider(props): JSX.Element {
    const apiClientValue = useApiClientValue();
    return (
      <ApiClientProvider value={apiClientValue}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </ApiClientProvider>
    );
  };
}
