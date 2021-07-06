import React from 'react';
import Layout from './Layout';

export function withLayout<P>(Component: React.VFC<P>): React.VFC<P> {
  return function WithLayout(props): RenderReturnType {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
}
