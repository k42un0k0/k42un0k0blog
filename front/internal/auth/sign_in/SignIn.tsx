import { useRouter } from 'next/router';
import * as yup from 'yup';
import { pagesPath } from '../../../lib/$path';
import { withLayout } from '../../../lib/components/layout';
import { useApiClientContext } from '../../../lib/context/apiClient';
import { withApiProvider } from '../../../lib/hoc/withApiProvider';
import type { FormEvent } from 'react';

export default withApiProvider(
  withLayout(function SignIn(): JSX.Element {
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
  })
);
