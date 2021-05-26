import { useApiClientContext } from '../../lib/apiClient';

export function SignIn(): JSX.Element {
  const { apiClient, setAuthResponse } = useApiClientContext();
  const onSubmit = async (): Promise<void> => {
    const res = await apiClient.sign_in.$post({ body: { username: 'test@test.com', password: 'password' } });
    setAuthResponse(res);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>送信</button>
      </form>
    </div>
  );
}
