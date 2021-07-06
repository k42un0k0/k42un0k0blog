import { useAspidaQuery } from '@aspida/react-query';
import { pipe } from 'fp-ts/lib/function';
import Link from 'next/link';
import { pagesPath } from '../../lib/$path';
import { useApiClient } from '../../modules/apiClient';
import { withLayout } from '../../modules/layout';
import { BlogRow } from './components/BlogRow';

export default pipe(function Blogs(): JSX.Element {
  const apiClient = useApiClient();
  const { data } = useAspidaQuery(apiClient.blogs, {});
  return (
    <div>
      <h1>blogs page</h1>
      <Link href={pagesPath.blogs.new.$url()}>goto blogs create page</Link>
      <Link href={pagesPath.blogs._id(1).edit.$url()}>goto blogs edit page</Link>
      <ul>
        {data?.map((item) => {
          return (
            <Link href={pagesPath.blogs._id(item.id).$url()}>
              <li key={item.id}>
                <BlogRow item={item} />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}, withLayout);
