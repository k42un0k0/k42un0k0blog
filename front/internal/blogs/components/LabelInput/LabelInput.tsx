/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { Label, Input } from 'theme-ui';
import { createStyles } from '../../../../lib/components/styles/utils';
import type { ChangeEvent, ChangeEventHandler } from 'react';

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
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
};
export default function LabelInput({ name, onChange, ...props }: Props): JSX.Element {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    onChange(e);
  };
  return (
    <div sx={styles.container} className={value ? 'has-value' : ''}>
      <Label htmlFor={name}>タイトル</Label>
      <Input id={name} name={name} onChange={handleChange} {...props} />
    </div>
  );
}
