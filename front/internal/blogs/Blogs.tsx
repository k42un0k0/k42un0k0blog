import { useAspidaQuery } from '@aspida/react-query';
import Link from 'next/link';
import { pagesPath } from '../../lib/$path';
import { useApiClient } from '../../lib/context/apiClient';

export default function Blogs(): JSX.Element {
  const apiClient = useApiClient();
  const { data } = useAspidaQuery(apiClient.blogs, {});
  return (
    <div>
      <h1>blogs page</h1>
      <Link href={pagesPath.blogs.new.$url()}>goto blogs create page</Link>
      <Link href={pagesPath.blogs._id(1).edit.$url()}>goto blogs edit page</Link>
      {data?.map((item) => {
        return <div key={item.id}>{JSON.stringify(item)}</div>;
      })}
    </div>
  );
}
