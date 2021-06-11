/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { pagesPath } from '../../../lib/$path';
import { useApiClient } from '../../../lib/apiClient';
import { HeadKatex } from '../../components/layout';
import { createStyles } from '../../components/styles/utils';
import BlogEditor from '../components/BlogEditor/BlogEditor';

const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

export default function BlogsNew(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await apiClient.blogs.post({ body: { title: 'hello', body: 'test', blog_type: 1 } });
      await router.push(pagesPath.blogs.$url());
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(apiClient.blogs.$path());
      },
    }
  );
  const [value, setValue] = useState('');
  return (
    <div sx={styles.container}>
      <HeadKatex />
      <h1>
        blogs page
        <button
          onClick={(): void => {
            mutation.mutate();
          }}
        >
          押して
        </button>
      </h1>
      <BlogEditor
        value={value}
        onChange={(v): void => {
          setValue(v);
        }}
      />
    </div>
  );
}
