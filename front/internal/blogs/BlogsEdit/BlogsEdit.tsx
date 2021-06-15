/** @jsxImportSource theme-ui */
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Select } from 'theme-ui';
import { pagesPath } from '../../../lib/$path';
import { HeadKatex } from '../../../lib/components/layout';
import { createStyles } from '../../../lib/components/styles/utils';
import { useApiClient } from '../../../lib/context/apiClient';
import { useQueryWithSlug } from '../../../lib/hooks/useQueryWithSlug';
import { isNumber } from '../../../lib/utils/number';
import { idSchema } from '../../../lib/utils/schema';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import { schema } from '../constants/schema';
import type { ReactElement } from 'react';

const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

export default function BlogsEdit(): JSX.Element {
  const router = useRouter();

  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const id = idSchema.cast(router.query.id);
  const query = useQueryWithSlug(id, isNumber, apiClient.blogs._id);
  const mutation = useMutation(
    async (data: any) => {
      await apiClient.blogs.post({ body: data });
      await router.push(pagesPath.blogs.$url());
    },
    {
      onSuccess: () => {
        if (id != null) void queryClient.invalidateQueries(apiClient.blogs._id(id).$path());
      },
    }
  );
  const { register, handleSubmit, control } = useForm<{ title: string; blog_type: number; body: string }>({
    resolver: yupResolver(schema),
    defaultValues: query.data,
  });
  return (
    <form
      sx={styles.container}
      onSubmit={handleSubmit((data) => {
        mutation.mutate(data);
      })}
    >
      <HeadKatex />
      <h1>
        blogs page
        <input type="submit" value="押して"></input>
      </h1>
      <LabelInput {...register('title')} />
      <Select {...register('blog_type')}>
        {[0, 1, 3].map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </Select>
      <Controller name="body" control={control} render={({ field }): ReactElement => <BlogEditor {...field} />} />
    </form>
  );
}
