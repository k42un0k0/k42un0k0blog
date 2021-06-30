import * as E from 'fp-ts/Either';
import * as yup from 'yup';
export const idSchema = yup.number().integer();

export const jsonTo =
  <T>(schema: yup.BaseSchema<any, any, T>) =>
  (v: string): E.Either<yup.ValidationError, T> => {
    return E.tryCatch(
      () => {
        return schema.validateSync(v);
      },
      (e) => {
        if (e instanceof yup.ValidationError) {
          return e;
        }
        throw new Error('jsontoAuthで起きたヤバイエラー');
      }
    );
  };
