import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { pagesPath } from '../../lib/$path';
import { flex } from '../../lib/styles/constants';
import { useApiClientContext } from '../apiClient';
import { useMockApi } from '../mockapi/useMockApi';
import { withSnackbarProvider } from '../snackbar/withSnackbarProvider';
import { usePaddingToParent } from '../style/usePaddingToParent';

export default withSnackbarProvider(function Header(): JSX.Element {
  const query = useMockApi([
    {
      title: 'React',
      link: '/tags/1',
    },
  ]);
  const snackbar = useSnackbar();
  const { apiClient, removeAuthToken, isLoggedIn } = useApiClientContext();
  const onClickLogout = (): void => {
    void apiClient.auth.sign_out.post();
    removeAuthToken();
    snackbar.enqueueSnackbar('Sign Out Successful');
  };
  const containerRef = usePaddingToParent<HTMLElement>();
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
      {isLoggedIn() ? (
        <button onClick={onClickLogout}>ログアウト</button>
      ) : (
        <Link href={pagesPath.auth.sign_in.$url({ query: {} })}>
          <a>ログイン</a>
        </Link>
      )}
    </header>
  );
});
