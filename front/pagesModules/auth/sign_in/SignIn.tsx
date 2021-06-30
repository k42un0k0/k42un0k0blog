import { pipe } from 'fp-ts/function';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { pagesPath } from '../../../lib/$path';
import { useApiClientContext } from '../../../modules/apiClient';
import { withApiProvider } from '../../../modules/apiClient/hoc';
import { withLayout } from '../../../modules/layout';
import type { FormEvent } from 'react';

export default pipe(
  function SignIn(_props: { unko: 1 }): JSX.Element {
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
  },
  withApiProvider,
  withLayout
);
