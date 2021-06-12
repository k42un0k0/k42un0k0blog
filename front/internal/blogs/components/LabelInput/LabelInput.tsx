/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { Label, Input } from 'theme-ui';
import { createStyles } from '../../../components/styles/utils';

const styles = createStyles({
  container: {
    paddingBottom: 20,
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
  name: string;
};
export default function LabelInput({ name }: Props): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <div sx={styles.container} className={value ? 'has-value' : ''}>
      <Label htmlFor={name}>タイトル</Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e): void => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
