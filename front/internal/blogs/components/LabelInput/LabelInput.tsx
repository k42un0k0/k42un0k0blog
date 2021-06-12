/** @jsxImportSource theme-ui */
import { Label, Input } from 'theme-ui';
import { createStyles } from '../../../components/styles/utils';
import type { ChangeEventHandler } from 'react';

const styles = createStyles({
  container: {
    '& label': {
      transition: '.25s',
      transform: 'translate(10px, 30px)',
      transformOrigin: 'left',
    },
    '&:focus-within label, &.has-value label': {
      transform: 'translate(0px, 0px) scale(0.8)',
    },
    '& input': {
      borderColor: '#ccc',
    },
  },
});

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
};
export default function LabelInput({ name, value, onChange }: Props): JSX.Element {
  return (
    <div sx={styles.container} className={value ? 'has-value' : ''}>
      <Label htmlFor={name}>タイトル</Label>
      <Input id={name} name={name} value={value} onChange={onChange} />
    </div>
  );
}
