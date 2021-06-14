import * as E from 'fp-ts/Either';
import * as yup from 'yup';
import type { Auth } from '../api/@types';

export const authSchema = yup.object({
  code: yup.number().required(),
  expire: yup.string().required(),
  token: yup.string().required(),
});

export function jsonToAuth(v: string): E.Either<yup.ValidationError, Auth> {
  return E.tryCatch(
    () => {
      return authSchema.validateSync(v);
    },
    (e) => {
      if (e instanceof yup.ValidationError) {
        return e;
      }
      throw new Error('jsontoAuthで起きたヤバイエラー');
    }
  );
}
