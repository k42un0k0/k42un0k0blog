import 'easymde/dist/easymde.min.css';
import { format, parseISO } from 'date-fns/fp';
import { fromNullable, getOrElse, map } from 'fp-ts/Option';
import { pipe, constant } from 'fp-ts/function';
import { useRouter } from 'next/router';
import { md } from '../../../lib/md';
import { isNumber } from '../../../lib/number';
import { idSchema } from '../../../lib/schema';
import { HeadKatex } from '../../components/layout';
import { useApiClient } from '../../context/apiClient';
import { useHighlight } from '../../hooks/useHighlight';
import { useQueryWithSlug } from '../../hooks/useQueryWithSlug';

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
      <div>
        {pipe(
          data.published_at,
          fromNullable,
          map(parseISO),
          map(format('yyyy年MM月dd日HH時mm分ss秒')),
          getOrElse(constant(''))
        )}
      </div>
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
