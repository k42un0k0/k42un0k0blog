import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateEffect } from 'react-use';
import * as yup from 'yup';
import { pagesPath } from '../../../lib/$path';
import { HeadKatex, withLayout } from '../../../lib/components/layout';
import { useApiClient } from '../../../lib/context/apiClient';
import { useQueryWithSlug } from '../../../lib/hooks/useQueryWithSlug';
import { createStyles } from '../../../lib/styles/utils';
import { isNumber } from '../../../lib/utils/number';
import { idSchema } from '../../../lib/utils/schema';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import type { ReactElement } from 'react';

export const schema = yup.object().shape({
  title: yup.string(),
  body: yup.string(),
});

const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

type FormValues = { title: string; body: string };
export default withLayout(function BlogsEdit(): JSX.Element {
  const router = useRouter();

  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const id = idSchema.cast(router.query.id);
  const query = useQueryWithSlug(id, isNumber, apiClient.blogs._id);
  const mutation = useMutation(
    async (data: any) => {
      await (id != null ? apiClient.blogs._id(id).$put({ body: data }) : void 0);
      await router.push(pagesPath.blogs.$url());
    },
    {
      onSuccess: () => {
        if (id != null) void queryClient.invalidateQueries(apiClient.blogs._id(id).$path());
      },
    }
  );
  const { register, handleSubmit, control, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: query.data,
  });
  useUpdateEffect((): void => {
    setValue('title', String(query.data?.title ?? ''));
    setValue('body', String(query.data?.body ?? ''));
  }, [query.data]);
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
      <Controller
        name="body"
        control={control}
        render={({ field: { ref: _, ...field } }): ReactElement => <BlogEditor {...field} />}
      />
    </form>
  );
});
