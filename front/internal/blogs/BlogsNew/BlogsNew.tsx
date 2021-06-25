import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Select } from 'theme-ui';
import { pagesPath } from '../../../lib/$path';
import { HeadKatex } from '../../../lib/components/layout';
import { useApiClient } from '../../../lib/context/apiClient';
import { AuthGuardHoC } from '../../../lib/hoc/AuthGuard';
import { createStyles } from '../../../lib/styles/utils';
import { updateAt } from '../../../lib/utils/struct';
import BlogEditor from '../components/BlogEditor/BlogEditor';
import { LabelInput } from '../components/LabelInput';
import { schema } from '../constants/schema';
import type { BlogCreateRequestBody, BlogType } from '../../../api/@types';
import type { ReactElement } from 'react';
const styles = createStyles({
  container: { display: 'grid', height: '100%', gridTemplateRows: 'auto auto 1fr', padding: [10, 40, 60] },
});

type FormValues = { title: string; blog_type: BlogType; body: string; publish: boolean };
export default AuthGuardHoC(function BlogsNew(): JSX.Element {
  const router = useRouter();
  const apiClient = useApiClient();
  const mutation = useMutation(async (data: FormValues) => {
    const { publish, ...values } = data;
    const body = updateAt(
      'published_at',
      publish ? format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx") : undefined
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
});
