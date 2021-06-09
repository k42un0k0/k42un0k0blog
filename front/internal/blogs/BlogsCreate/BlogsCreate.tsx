/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { Switch } from 'theme-ui';
import { pagesPath } from '../../../lib/$path';
import { useApiClient } from '../../../lib/apiClient';
import { md } from '../../../lib/md';
import { HeadKatex } from '../../components/layout';
import { MarkdownEditor } from '../../components/markdownEditor';
import { createStyle, createStyles } from '../../components/styles/utils';
import { useHighlight } from '../../hooks/useHighlight';

const child = createStyle({
  width: ['150vw', '150vw', null],
  flex: ['0 0 auto', '0 0 auto', '0 0 auto'],
  transition: '.5s',
  '&.toggle': {
    transform: 'translate(-150vw,0)',
  },
  '&.toggle2': {
    flex: ['0 0 auto', '0 0 auto', '1 1 auto'],
    transform: [null, null, 'none'],
  },
});
const styles = createStyles({
  content: {
    display: 'flex',
    overflow: 'hidden',
  },
  editor: {
    ...child,
  },
  preview: {
    paddingTop: 50,
    ...child,
  },
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
        void queryClient.invalidateQueries(apiClient.blogs.$path());
      },
    }
  );
  const ref = useHighlight([markdown]);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const isPC = !(useBreakpointIndex() < 2);
  const disablePreview = toggle2 && isPC;
  const showmihiraki = isPC;
  return (
    <div style={{ display: 'grid', height: '100vh', gridTemplateRows: 'auto auto 1fr' }}>
      <HeadKatex />
      <h1>
        blogs page
        <button
          onClick={(): void => {
            mutation();
          }}
        >
          押して
        </button>
      </h1>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'inline-block', width: 150, textAlign: 'right' }}>
          <Switch
            label="プレビュー"
            disabled={disablePreview}
            sx={{
              bakgroundColor: 'gray',
              'input:checked ~ &': {
                backgroundColor: 'lightgreen',
              },
            }}
            onClick={(): void => {
              if (!toggle) {
                setToggle2(false);
              }
              setToggle(!toggle);
            }}
            checked={toggle}
          />
        </div>

        {showmihiraki && (
          <div style={{ display: 'inline-block', width: 100 }}>
            <Switch
              label="見開く"
              sx={{
                bakgroundColor: 'gray',

                'input:checked ~ &': {
                  backgroundColor: 'lightgreen',
                },
              }}
              onClick={(): void => {
                if (!toggle2) {
                  setToggle(false);
                }
                setToggle2(!toggle2);
              }}
              checked={toggle2}
            />
          </div>
        )}
      </div>
      <div sx={styles.content}>
        <div sx={styles.editor} className={(toggle ? 'toggle' : '') + (toggle2 ? ' toggle2' : '')}>
          <MarkdownEditor
            sx={{
              height: '100%',
              '.EasyMDEContainer': {
                height: '100%',
              },
              '.CodeMirror': {
                height: '100%',
              },
            }}
            onChange={(v: string): void => {
              setMarkdown(v);
            }}
          />
        </div>
        <div sx={styles.preview} className={(toggle ? 'toggle' : '') + (toggle2 ? ' toggle2' : '')}>
          <div>
            <span
              ref={ref}
              dangerouslySetInnerHTML={{
                __html: md.render(markdown),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
