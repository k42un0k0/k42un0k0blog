import { yupResolver } from '@hookform/resolvers/yup';
import { pipe } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Select } from 'theme-ui';
import { pagesPath } from '../../../lib/$path';
import { updateAt } from '../../../lib/struct';
import { createStyles } from '../../../lib/styles/lib';
import { useApiClient, withAuthGuard } from '../../../modules/apiClient';
import { HeadKatex, withLayout } from '../../../modules/layout';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import { schema } from './lib/schema';
import type { BlogCreateRequestBody, BlogType } from '../../../api/@types';
const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

type FormValues = { title: string; blog_type: BlogType; body: string; publish: boolean };
export default pipe(
  function BlogsNew(): RenderReturnType {
    const router = useRouter();
    const apiClient = useApiClient();
    const mutation = useMutation(async (data: FormValues) => {
      const { publish, ...values } = data;
      const body = updateAt(
        'published_at',
        publish ? new Date().toISOString() : undefined
      )<BlogCreateRequestBody>(values);

      await apiClient.blogs.post({ body });
      await router.push(pagesPath.blogs.$url());
    });
    const { register, handleSubmit, control } = useForm<FormValues>({ resolver: yupResolver(schema) });
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
        <input type="checkbox" {...register('publish')} />
        <Controller
          name="title"
          control={control}
          render={({ field }): RenderReturnType => <LabelInput {...field} />}
        />
        <Select {...register('blog_type')}>
          {[0, 1, 3].map((i) => {
            return (
              <option key={i} value={i}>
                {i}
              </option>
            );
          })}
        </Select>
        <Controller name="body" control={control} render={({ field }): RenderReturnType => <BlogEditor {...field} />} />
      </form>
    );
  },
  withLayout,
  withAuthGuard
);
