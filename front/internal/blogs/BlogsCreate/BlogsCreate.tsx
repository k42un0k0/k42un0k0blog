import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { pagesPath } from '../../../lib/$path';
import { useApiClient } from '../../../lib/apiClient';
import { marked } from '../../../lib/marked';
import { useHighlight } from '../../hooks/useHighlight';

const Editor = dynamic<{ onChange: (v: string) => void }>(async (): Promise<any> => import('react-simplemde-editor'), {
  ssr: false,
});

export default function BlogsCreate(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const [markdown, setMarkdown] = useState('');
  const mutation = useMutation(
    async () => {
      await apiClient.blogs.post({ body: { title: 'hello', body: 'test', blog_type: 1 } });
      await router.push(pagesPath.blogs.$url());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        void queryClient.invalidateQueries(apiClient.blogs.$path());
      },
    }
  );
  const ref = useHighlight([markdown]);
  return (
    <div>
      <h1>blogs page</h1>
      <Editor
        onChange={(v: string): void => {
          setMarkdown(v);
        }}
      />
      <div>
        <span
          ref={ref}
          dangerouslySetInnerHTML={{
            __html: marked(markdown),
          }}
        />
      </div>
      <button
        onClick={(): void => {
          mutation.mutate();
        }}
      >
        押して
      </button>
    </div>
  );
}
