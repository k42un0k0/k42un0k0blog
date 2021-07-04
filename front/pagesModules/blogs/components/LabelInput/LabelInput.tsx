import { forwardRef } from 'react';
import { Label, Input } from 'theme-ui';
import { createStyles } from '../../../../lib/styles/lib';
import type { ChangeEvent, ChangeEventHandler, Ref } from 'react';

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
export default forwardRef(function LabelInput(
  { name, value, onChange, ...props }: Props,
  ref: Ref<HTMLInputElement>
): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e);
  };
  return (
    <div sx={styles.container} className={value ? 'has-value' : ''}>
      <Label htmlFor={name}>タイトル</Label>
      <Input ref={ref} id={name} name={name} onChange={handleChange} {...props} />
    </div>
  );
});
