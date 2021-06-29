import { useBreakpointIndex } from '@theme-ui/match-media';
import dynamic from 'next/dynamic';
import { useToggle, useUpdateEffect } from 'react-use';
import { useState } from 'react';
import { Switch } from 'theme-ui';
import { MarkdownEditor } from '../../../../lib/components/markdownEditor';
import { createStyles, sequence } from '../../../../lib/styles/utils';
import 'easymde/dist/easymde.min.css';

const MarkdownViewer = dynamic(async () => import('../../../../lib/components/viewer/MarkdownViewer'));

const childStyles = createStyles({
  base: {
    width: '100%',
    height: '100%',
    flex: '0 0 auto',
    boxSizing: 'border-box',
    transition: 'transform .5s',
  },
  preview: {
    transform: 'translate(-100%,0)',
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
    '&.preview': childStyles.preview,
    '&.spread': {
      ...childStyles.spread,
      paddingRight: [null, null, 20],
    },
  },
  markdowneditor: {
    height: '100%',
    '.EasyMDEContainer': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '.CodeMirror': {
      height: '100%',
    },
  },
  view: {
    ...childStyles.base,
    '&.preview': childStyles.preview,
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
  value: string;
  onChange: (v: string) => void;
};
export default function BlogEditor({ value: valueProp, onChange }: Props): JSX.Element {
  const [preview, previewPreview] = useToggle(false);
  const [spread, previewSpread] = useToggle(false);
  const isPC = useBreakpointIndex() >= 2;
  const disablePreview = spread && isPC;
  const showmihiraki = isPC;
  const [value, setValue] = useState(valueProp || '');
  useUpdateEffect(() => {
    setValue(valueProp);
  }, [valueProp]);
  const handleChange = (v: string): void => {
    setValue(v);
    onChange(v);
  };

  const onClickPreview = (): void => {
    if (!preview) {
      previewSpread(false);
    }
    previewPreview();
  };

  const onClickSpread = (): void => {
    if (!spread) {
      previewPreview(false);
    }
    previewSpread();
  };
  return (
    <div sx={styles.container}>
      <div sx={styles.tools}>
        <div sx={styles.tools_tool}>
          <Switch
            label="プレビュー"
            disabled={disablePreview}
            sx={styles.tools_switch}
            onClick={onClickPreview}
            defaultChecked={preview}
          />
        </div>
        {showmihiraki && (
          <div sx={styles.tools_tool}>
            <Switch label="見開き" sx={styles.tools_switch} onClick={onClickSpread} defaultChecked={spread} />
          </div>
        )}
      </div>
      <div sx={styles.content}>
        <div sx={styles.editor} className={(preview ? 'preview' : '') + (spread ? ' spread' : '')}>
          <MarkdownEditor sx={styles.markdowneditor} value={value} onChange={handleChange} />
        </div>
        <div sx={styles.view} className={(preview ? 'preview' : '') + (spread ? ' spread' : '')}>
          <MarkdownViewer value={value} />
        </div>
      </div>
    </div>
  );
}
