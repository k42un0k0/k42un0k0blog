/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useToggle } from 'react-use';
import { useState } from 'react';
import { Switch } from 'theme-ui';
import { MarkdownEditor } from '../../../../lib/components/markdownEditor';
import { useHighlight } from '../../../../lib/hooks/useHighlight';
import { createStyles, sequence } from '../../../../lib/styles/utils';
import { md } from '../../../../lib/utils/md';

const childStyles = createStyles({
  base: {
    width: '100%',
    height: '100%',
    flex: '0 0 auto',
    boxSizing: 'border-box',
    transition: 'transform .5s',
    '&.preview': {
      transform: 'translate(-100%,0)',
    },
  },
  spread: sequence([
    null,
    null,
    {
      transition: '0s',
      width: '50%',
      transform: 'none',
    },
  ]),
});
const styles = createStyles({
  container: { height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr' },
  content: {
    display: 'flex',
    overflow: 'hidden',
    paddingTop: 20,
  },
  editor: {
    ...childStyles.base,
    '&.spread': {
      ...childStyles.spread,
      paddingRight: [null, null, 20],
    },
  },
  preview: {
    ...childStyles.base,
    '&.spread': {
      ...childStyles.spread,
      paddingLeft: [null, null, 20],
    },
    paddingTop: 50,
    overflow: 'auto',
    lineBreak: 'anywhere',
  },
  tools: {
    textAlign: 'right',
  },
  tools_tool: {
    display: 'inline-block',
    width: 130,
  },
  tools_switch: {
    bakgroundColor: 'gray',

    'input:defaultChecked ~ &': {
      backgroundColor: 'lightgreen',
    },
  },
});

type Props = {
  onChange: (v: string) => void;
};
export default function BlogEditor({ onChange }: Props): JSX.Element {
  const [preview, previewPreview] = useToggle(false);
  const [spread, previewSpread] = useToggle(false);
  const isPC = useBreakpointIndex() >= 2;
  const disablePreview = spread && isPC;
  const showmihiraki = isPC;
  const [value, setValue] = useState('');
  const handleChange = (v: string): void => {
    setValue(v);
    onChange(v);
  };
  const ref = useHighlight([value]);
  return (
    <div sx={styles.container}>
      <div sx={styles.tools}>
        <div sx={styles.tools_tool}>
          <Switch
            label="プレビュー"
            disabled={disablePreview}
            sx={styles.tools_switch}
            onClick={(): void => {
              if (!preview) {
                previewSpread(false);
              }
              previewPreview();
            }}
            defaultChecked={preview}
          />
        </div>
        {showmihiraki && (
          <div sx={styles.tools_tool}>
            <Switch
              label="見開き"
              sx={styles.tools_switch}
              onClick={(): void => {
                if (!spread) {
                  previewPreview(false);
                }
                previewSpread();
              }}
              defaultChecked={spread}
            />
          </div>
        )}
      </div>
      <div sx={styles.content}>
        <div sx={styles.editor} className={(preview ? 'preview' : '') + (spread ? ' spread' : '')}>
          <MarkdownEditor
            sx={{
              height: '100%',
              '.EasyMDEContainer': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              },
              '.CodeMirror': {
                height: '100%',
              },
            }}
            onChange={handleChange}
          />
        </div>
        <div sx={styles.preview} className={(preview ? 'preview' : '') + (spread ? ' spread' : '')}>
          <div>
            <span
              ref={ref}
              data-line-numbers={true}
              dangerouslySetInnerHTML={{
                __html: md.render(value),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
