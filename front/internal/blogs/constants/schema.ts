import { fromNullable, getOrElse, map } from 'fp-ts/Option';
import { flow, constant } from 'fp-ts/function';
import * as yup from 'yup';
import { isBlogType } from '../../../apiModel/blog';

export const schema = yup.object().shape({
  title: yup.string(),
  blog_type: yup
    .number()
    .required()
    .test(
      'is-blog-type',
      '${value} is not blog type',
      flow(fromNullable, map(isBlogType), getOrElse<boolean>(constant(false)))
    ),
  body: yup.string(),
  publish: yup.bool(),
});
