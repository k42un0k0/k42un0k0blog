import { idSchema } from '../../../lib/schema';
import { planeApiClient } from '../../../modules/apiClient/client';
import { BlogsShow } from '../../../pagesModules/blogs/BlogsShow';
import type { GetServerSideProps } from 'next';
import type { ComponentProps } from 'react';

export const getServerSideProps: GetServerSideProps<ComponentProps<typeof BlogsShow>> = async (context) => {
  const id = idSchema.validateSync(context.params?.id);
  const res = await (id != null ? planeApiClient.blogs._id(id).$get({}) : Promise.resolve(undefined));

  // データをprops経由でページに渡します。
  return { props: { data: res } };
};

export default BlogsShow;
