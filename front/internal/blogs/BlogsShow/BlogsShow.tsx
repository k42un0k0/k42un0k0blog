import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/router';
import { HeadKatex } from '../../../lib/components/layout';
import { useApiClient } from '../../../lib/context/apiClient';
import { useHighlight } from '../../../lib/hooks/useHighlight';
import { useQueryWithSlug } from '../../../lib/hooks/useQueryWithSlug';
import { md } from '../../../lib/utils/md';
import { isNumber } from '../../../lib/utils/number';
import { idSchema } from '../../../lib/utils/schema';
import { formatAt } from '../../../lib/utils/struct';

export default function BlogsShow(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const id = idSchema.cast(router.query.id);

  const { data } = useQueryWithSlug(id, isNumber, apiClient.blogs._id);

  const ref = useHighlight([data]);
  if (data?.body == null) {
    return <div>now loading..</div>;
  }
  return (
    <div>
      <HeadKatex />
      <div>{formatAt('published_at')('yyyy年MM月dd日HH時mm分ss秒')(data)}</div>
      <div>{data.title}</div>
      <span
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: md.render(data.body),
        }}
      />
    </div>
  );
}
