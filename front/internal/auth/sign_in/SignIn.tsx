import { useRouter } from 'next/router';
import { pagesPath } from '../../../lib/$path';
import { useApiClientContext } from '../../../lib/apiClient';
import type { FormEvent } from 'react';

export default function SignIn(): JSX.Element {
  const { apiClient, setAuthResponse } = useApiClientContext();
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await apiClient.sign_in.$post({ body: { username: 'test@test.com', password: 'password' } });
    setAuthResponse(res);
    void router.push(pagesPath.$url());
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>送信</button>
      </form>
    </div>
  );
}
