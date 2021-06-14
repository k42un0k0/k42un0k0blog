import { useRouter } from 'next/router';
import * as yup from 'yup';
import { pagesPath } from '../../../lib/$path';
import { useApiClientContext } from '../../context/apiClient';
import type { FormEvent } from 'react';

export default function SignIn(): JSX.Element {
  const { apiClient, setAuthResponse } = useApiClientContext();
  const router = useRouter();
  const redirectTo = yup.string().validateSync(router.query.redirect_to);
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await apiClient.sign_in.$post({ body: { username: 'test@test.com', password: 'password' } });
    setAuthResponse(res);
    void router.push(redirectTo == null ? pagesPath.$url() : new URL(redirectTo));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>送信</button>
      </form>
    </div>
  );
}
