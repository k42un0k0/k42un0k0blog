import React from 'react';
import Layout from './Layout';

export function withLayout(Component: React.VFC): React.VFC {
  return function WithLayout(): JSX.Element {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };
}
