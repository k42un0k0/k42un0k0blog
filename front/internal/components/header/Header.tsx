/** @jsxImportSource theme-ui */
import { useSnackbar } from 'notistack';
import { useApiClientContext } from '../../../lib/apiClient';

export default function Header(): JSX.Element {
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
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <button onClick={onClickLogout}>ログアウト</button>
    </header>
  );
}
