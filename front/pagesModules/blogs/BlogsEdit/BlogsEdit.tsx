import { yupResolver } from '@hookform/resolvers/yup';
import { pipe } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useUpdateEffect } from 'react-use';
import { pagesPath } from '../../../lib/$path';
import { isNumber } from '../../../lib/number';
import { idSchema } from '../../../lib/schema';
import { createStyles } from '../../../lib/styles/lib';
import { useApiClient, withAuthGuard } from '../../../modules/apiClient';
import { withLayout, HeadKatex } from '../../../modules/layout';
import { useQueryWithSlug } from '../../../modules/react-query/useQueryWithSlug';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import { schema } from './lib/schema';

const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

type FormValues = { title: string; body: string };
export default pipe(
  function BlogsEdit(): RenderReturnType {
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
    const { handleSubmit, control, setValue } = useForm<FormValues>({
      resolver: yupResolver(schema),
    });
    useUpdateEffect((): void => {
      setValue('title', query.data?.title ?? '');
      setValue('body', query.data?.body ?? '');
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
        <Controller
          name="title"
          control={control}
          render={({ field }): RenderReturnType => <LabelInput {...field} />}
        />
        <Controller
          name="body"
          control={control}
          render={({ field: { ref: _, ...field } }): RenderReturnType => <BlogEditor {...field} />}
        />
      </form>
    );
  },
  withAuthGuard,
  withLayout
);
