import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string(),
  body: yup.string(),
});
