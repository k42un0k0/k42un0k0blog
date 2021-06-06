import * as O from 'fp-ts/Option';
import * as f from 'fp-ts/function';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
import { useApiClientContext } from '../../../lib/apiClient';
import { pick } from '../../../lib/fp';
import { parentElement } from '../../../lib/htmlElement';
import { useMockApi } from '../hooks/useMockApi';
import { flex } from '../styles/utils';

export default function Header(): JSX.Element {
  const query = useMockApi([
    {
      title: 'React',
      link: '/tags/1',
    },
  ]);
  const snackbar = useSnackbar();
  const { apiClient, removeAuthToken } = useApiClientContext();
  const onClickLogout = async (): Promise<void> => {
    await apiClient.auth.sign_out.post();
    removeAuthToken();
    snackbar.enqueueSnackbar('Sign Out Successful');
  };
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const parentOpt = f.pipe(O.fromNullable(containerRef.current), O.chain(parentElement));
    const paddingTopOpt = f.pipe(
      O.Do,
      O.bind('parent', () => parentOpt),
      O.bind('paddingTop', ({ parent }) => f.pipe(pick('style')(parent), O.chain(pick('paddingTop')))),
      O.bind('clientHeight', () => f.pipe(O.fromNullable(containerRef.current), O.chain(pick('clientHeight')))),
      O.map(({ parent, clientHeight, paddingTop }) => {
        parent.style.paddingTop = clientHeight.toString() + 'px';
        return paddingTop;
      })
    );
    return (): void => {
      f.pipe(
        O.Do,
        O.bind('parent', () => parentOpt),
        O.bind('paddingTop', () => paddingTopOpt),
        O.map(({ parent, paddingTop }) => {
          parent.style.paddingTop = paddingTop;
        })
      );
    };
  });
  return (
    <header
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        ...flex.verticalCenter,
      }}
    >
      <Link href="/">
        <div>Home</div>
      </Link>

      {query.data?.map((item) => {
        return (
          <Link key={item.link} href={item.link}>
            <div key={item.link}>{item.title}</div>
          </Link>
        );
      })}
      <button onClick={onClickLogout}>ログアウト</button>
    </header>
  );
}
