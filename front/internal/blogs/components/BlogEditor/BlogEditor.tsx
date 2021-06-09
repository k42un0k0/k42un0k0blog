/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useToggle } from 'react-use';
import { Switch } from 'theme-ui';
import { md } from '../../../../lib/md';
import { MarkdownEditor } from '../../../components/markdownEditor';
import { createStyles, sequence } from '../../../components/styles/utils';
import { useHighlight } from '../../../hooks/useHighlight';

const childStyles = createStyles({
  base: {
    width: '100vw',
    flex: '0 0 auto',
    transition: 'transform .5s',
    '&.preview': {
      transform: 'translate(-100vw,0)',
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
  content: {
    display: 'flex',
    overflow: 'hidden',
    paddingTop: 20,
  },
  editor: {
    ...childStyles.base,
    '&.spread': {
      ...childStyles.spread,
      paddingRight: [10, 40, 60],
    },
  },
  preview: {
    ...childStyles.base,
    '&.spread': {
      ...childStyles.spread,
      paddingLeft: [10, 40, 60],
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
export default function BlogEditor({ value, onChange }: Props): JSX.Element {
  const ref = useHighlight([value]);
  const [preview, previewPreview] = useToggle(false);
  const [spread, previewSpread] = useToggle(false);
  const isPC = useBreakpointIndex() >= 2;
  const disablePreview = spread && isPC;
  const showmihiraki = isPC;
  return (
    <>
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
              },
              '.CodeMirror': {
                height: '100%',
              },
            }}
            onChange={(v: string): void => {
              onChange(v);
            }}
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
    </>
  );
}
