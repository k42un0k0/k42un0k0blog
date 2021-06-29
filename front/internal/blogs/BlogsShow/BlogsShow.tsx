import { useAmp } from 'next/amp';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HeadKatex } from '../../../lib/components/layout';
import { useApiClient } from '../../../lib/context/apiClient';
import { useQueryWithSlug } from '../../../lib/hooks/useQueryWithSlug';
import { isNumber } from '../../../lib/utils/number';
import { idSchema } from '../../../lib/utils/schema';
import { formatAt } from '../../../lib/utils/struct';
import moon from '../../../public/moon.jpeg';
import type { BlogResponse } from '../../../api/@types';

const MarkdownViewer = dynamic(async () => import('../../../lib/components/viewer/MarkdownViewer'));
type Props = {
  data: BlogResponse | undefined;
};

export default function BlogsShow({ data }: Props): JSX.Element {
  const isAmp = useAmp();
  const router = useRouter();
  const apiClient = useApiClient();
  const id = idSchema.cast(router.query.id);

  if (data == null) {
    ({ data } = useQueryWithSlug(id, isNumber, apiClient.blogs._id));
  }

  if (data?.body == null) {
    return <div>now loading..</div>;
  }
  return (
    <p>
      <HeadKatex />
      <p>{formatAt('published_at')('yyyy年MM月dd日HH時mm分ss秒')(data)}</p>
      <p>{data.title}</p>
      {isAmp ? (
        <amp-img src="/moon.jpeg" width="1200" height="675" alt="a cool image" sizes="80vw" layout="responsive" />
      ) : (
        <div sx={{ width: '80vw' }}>
          <Image src={moon} alt="a cool image" sizes="80vw" layout="responsive" loading="lazy" />
        </div>
      )}

      <MarkdownViewer value={data.body} />
    </p>
  );
}
