/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { Select } from 'theme-ui';
import { pagesPath } from '../../../lib/$path';
import { isBlogType } from '../../../pkg/model/blog';
import { HeadKatex } from '../../components/layout';
import { createStyles } from '../../components/styles/utils';
import { useApiClient } from '../../context/apiClient';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import type { BlogType } from '../../../api/@types';

const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

export default function BlogsEdit(): JSX.Element {
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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [blogType, setBlogType] = useState<BlogType>(0);

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
      <LabelInput
        name="title"
        value={title}
        onChange={(e): void => {
          setTitle(e.target.value);
        }}
      />
      <Select
        value={blogType}
        onChange={(e): void => {
          const v = parseInt(e.target.value);
          if (isBlogType(v)) {
            setBlogType(v);
          }
        }}
      >
        {[0, 1, 2].map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </Select>
      <BlogEditor
        value={body}
        onChange={(v): void => {
          setBody(v);
        }}
      />
    </div>
  );
}
