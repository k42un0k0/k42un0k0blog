/** @jsxImportSource theme-ui */
import { keyframes } from '@emotion/react';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'div'>;

const wave = keyframes({
  '0%': {
    left: '-100%',
  },
  '25%': {
    left: '-100%',
  },
  '100%': {
    left: '100%',
  },
});
export default function Skelton(props: Props): JSX.Element {
  return (
    <div
      {...props}
      sx={{
        backgroundColor: '#ddd',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          background: `linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, 0.2
            ), transparent  80%)`,
          animationName: `${wave}`,
          animationDuration: '3s',
          animationIterationCount: 'infinite',
        }}
      ></div>
    </div>
  );
}
