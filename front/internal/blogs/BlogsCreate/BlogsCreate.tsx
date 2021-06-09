import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { pagesPath } from '../../../lib/$path';
import { useApiClient } from '../../../lib/apiClient';
import { katex } from '../../../lib/katex';
import { marked } from '../../../lib/marked';
import { KatexCssLink } from '../../components/layout';
import { MarkdownEditor } from '../../components/markdownEditor';
import { useHighlight } from '../../hooks/useHighlight';

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
        void queryClient.invalidateQueries(apiClient.blogs.$path());
      },
    }
  );
  const ref = useHighlight([markdown]);
  return (
    <div>
      <Head>
        <KatexCssLink />
      </Head>
      <h1>blogs page</h1>
      <MarkdownEditor
        onChange={(v: string): void => {
          setMarkdown(v);
        }}
      />
      <div>
        <span
          ref={ref}
          dangerouslySetInnerHTML={{
            __html: katex(marked(markdown)),
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
