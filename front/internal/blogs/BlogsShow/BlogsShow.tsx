import 'easymde/dist/easymde.min.css';
import { useAspidaQuery } from '@aspida/react-query';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { md } from '../../../lib/md';
import { useApiClient } from '../../context/apiClient';
import { useHighlight } from '../../hooks/useHighlight';
export default function BlogsShow(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const id = router.query.id;

  if (id == null || !yup.number().isValidSync(id)) {
    return <div>not valid</div>;
  }
  const { data } = useAspidaQuery(apiClient.blogs._id(id), {});

  const ref = useHighlight([data]);
  console.log(data);
  if (data?.body == null) {
    return <div>now loading..</div>;
  }
  return (
    <div>
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
