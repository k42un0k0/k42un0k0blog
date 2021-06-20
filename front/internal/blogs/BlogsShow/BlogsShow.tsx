import { useRouter } from 'next/router';
import { HeadKatex } from '../../../lib/components/layout';
import { MarkdownViewer } from '../../../lib/components/viewer';
import { useApiClient } from '../../../lib/context/apiClient';
import { useQueryWithSlug } from '../../../lib/hooks/useQueryWithSlug';
import { isNumber } from '../../../lib/utils/number';
import { idSchema } from '../../../lib/utils/schema';
import { formatAt } from '../../../lib/utils/struct';

export default function BlogsShow(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const id = idSchema.cast(router.query.id);

  const { data } = useQueryWithSlug(id, isNumber, apiClient.blogs._id);

  if (data?.body == null) {
    return <div>now loading..</div>;
  }
  return (
    <div>
      <HeadKatex />
      <div>{formatAt('published_at')('yyyy年MM月dd日HH時mm分ss秒')(data)}</div>
      <div>{data.title}</div>
      <MarkdownViewer value={data.body} />
    </div>
  );
}
