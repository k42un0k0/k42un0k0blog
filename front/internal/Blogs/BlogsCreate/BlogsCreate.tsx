import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { pagesPath } from '../../../lib/$path';
import { useApiClient } from '../../../lib/apiClient';
import { Header } from '../../components/header';

export default function BlogsCreate(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await apiClient.blogs.post({ body: { title: 'hello', body: 'test', blog_type: 1 } });
      await router.push(pagesPath.blogs.$url());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        void queryClient.invalidateQueries(apiClient.blogs.$path());
      },
    }
  );
  return (
    <div>
      <Header />
      <h1>blogs page</h1>
      <button
        onClick={(): void => {
          mutation.mutate();
        }}
      >
        押して
      </button>
    </div>
  );
}
