/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media';
import { useToggle } from 'react-use';
import { Switch } from 'theme-ui';
import { md } from '../../../../lib/md';
import { MarkdownEditor } from '../../../components/markdownEditor';
import { createStyle, createStyles, sequence } from '../../../components/styles/utils';
import { useHighlight } from '../../../hooks/useHighlight';

const child = createStyle({
  padding: [10, 40, 60],
  width: '100vw',
  flex: '0 0 auto',
  transition: 'transform .5s',
  '&.toggle': {
    transform: 'translate(-100vw,0)',
  },
  '&.toggle2': {
    ...sequence([
      null,
      null,
      {
        transition: '0s',
        width: '50%',
        transform: 'none',
      },
    ]),
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
    ...child,
    paddingTop: 110,
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

    'input:checked ~ &': {
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
  const [preview, togglePreview] = useToggle(false);
  const [spread, toggleSpread] = useToggle(false);
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
                toggleSpread(false);
              }
              togglePreview();
            }}
            checked={preview}
          />
        </div>

        {showmihiraki && (
          <div sx={styles.tools_tool}>
            <Switch
              label="見開き"
              sx={styles.tools_switch}
              onClick={(): void => {
                if (!spread) {
                  togglePreview(false);
                }
                toggleSpread();
              }}
              checked={spread}
            />
          </div>
        )}
      </div>
      <div sx={styles.content}>
        <div sx={styles.editor} className={(preview ? 'toggle' : '') + (spread ? ' toggle2' : '')}>
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
        <div sx={styles.preview} className={(preview ? 'toggle' : '') + (spread ? ' toggle2' : '')}>
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
