import Link from 'next/link';
import React from 'react';
import { pagesPath } from '../../lib/$path';

function Home(): JSX.Element {
  return (
    <div>
      <h1>home page</h1>
      <Link href={pagesPath.auth.sign_in.$url()}> goto signIn page </Link>
      <Link href={pagesPath.blogs.$url()}> goto blogs page </Link>
    </div>
  );
}

export default Home;
