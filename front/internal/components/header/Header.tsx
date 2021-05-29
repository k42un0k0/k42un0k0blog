import { useSnackbar } from 'notistack';
import { useApiClientContext } from '../../../lib/apiClient';

export default function Header(): JSX.Element {
  const snackbar = useSnackbar();
  const { apiClient, removeAuthToken } = useApiClientContext();
  return (
    <header>
      <button
        onClick={async (): Promise<void> => {
          await apiClient.auth.sign_out.post();
          removeAuthToken();
          snackbar.enqueueSnackbar('Sign Out Successful');
        }}
      >
        ログアウト
      </button>
    </header>
  );
}
