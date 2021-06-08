/** @jsxImportSource theme-ui */
import { keyframes } from '@emotion/react';
import type { ComponentProps, ReactNode } from 'react';

type Props = ComponentProps<'div'> & {
  body?: ReactNode;
};

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
export default function Skelton({ body, ...props }: Props): JSX.Element {
  if (body != undefined) {
    return <>{body}</>;
  }
  return (
    <div
      sx={{
        height: '100%',
        backgroundColor: '#ddd',
        position: 'relative',
        overflow: 'hidden',
        '::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          background: `linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, 0.2
              ), transparent  80%)`,
          animationName: `${wave}`,
          animationDuration: '3s',
          animationIterationCount: 'infinite',
        },
      }}
      {...props}
    />
  );
}
