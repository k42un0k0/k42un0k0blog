/** @jsxImportSource theme-ui */
import { useSnackbar } from 'notistack';
import { useApiClientContext } from '../../../lib/apiClient';
import { useMockApi } from '../hooks/useMockApi';
import { flex, sticky } from '../styles/utils';

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
  return (
    <header
      sx={{
        ...sticky.top,
        ...flex.verticalCenter,
      }}
    >
      <div>Home</div>
      {query.data?.map((item) => {
        return <div key={item.link}>{item.title}</div>;
      })}
      <button onClick={onClickLogout}>ログアウト</button>
    </header>
  );
}
